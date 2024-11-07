package com.fil.service.impl;

import com.fil.dto.OHLC;
import com.fil.exceptions.NotFoundException;
import com.fil.market.StockMarket;
import com.fil.model.*;
import com.fil.model.enums.TransactionType;
import com.fil.repo.FundTransactionRepo;
import com.fil.repo.UserValuationRepo;
import com.fil.service.*;
import com.fil.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.*;

@Component
@Transactional
public class ScheduledTaskImpl implements Scheduler {

    @Autowired
    private FundHoldingService fundHoldingService;

    @Autowired
    private MutualFundService fundService;

    @Autowired
    private FundPriceService fundPriceService;

    @Autowired
    private StockMarket stockMarket;

    @Autowired
    private UserService userService;
    
    @Autowired
    private FundTransactionRepo fundTransactionRepo;

    @Autowired
    private UserValuationRepo userValuationRepo;

    @Override
    @Scheduled(cron = "0 0 18 * * *")
    public void calculateFundNewNav() {
        List<FundHolding> fundHoldings = fundHoldingService.findAllListed();

        Map<Ticker, List<FundHolding>> map = new HashMap<>();
        for (FundHolding fundHolding : fundHoldings) {
            if (!map.containsKey(fundHolding.getTicker())) {
                map.put(fundHolding.getTicker(), new ArrayList<>());
            }
            map.get(fundHolding.getTicker()).add(fundHolding);
        }

        map.entrySet().parallelStream().forEach(entry -> {

            String apiLastRefreshed = stockMarket.lastRefreshed(entry.getKey().getSymbol());
            Map<String, OHLC> dailyOHLC = stockMarket.getDailyOHLC(entry.getKey().getSymbol());

            entry.getValue().parallelStream().forEach(fundHolding -> {
                LocalDate stockLastRefreshed;
                try {
                    if (!apiLastRefreshed.equals(DateUtil.convertToLocalDateString(fundHolding.getLastUpdated()))) {
                        return;
                    }
                    stockLastRefreshed = LocalDate.parse(apiLastRefreshed);
                } catch (NotFoundException e) {
                    return;
                }

                LocalDate lastFetched = DateUtil.convertToLocalDate(fundHolding.getLastUpdated());
                lastFetched = lastFetched.plusDays(1);
                while (!stockLastRefreshed.isAfter(lastFetched)) {
                    OHLC ohlc = dailyOHLC.get(stockLastRefreshed.toString());
                    if (ohlc != null) {
                        double profit = ohlc.calculateProfit();
                        fundHolding.addProfit(profit);
                        fundHolding.setLastUpdated(DateUtil.convertToDate(lastFetched));
                    }
                    lastFetched = lastFetched.plusDays(1);
                }
            });
        });

        List<FundHolding> updatedList = new ArrayList<>();
        map.entrySet().parallelStream().forEach(entry -> {
            updatedList.addAll(entry.getValue());
        });

        fundHoldingService.saveAll(updatedList);

        List<MutualFund> all = fundService.findAll();

        all.parallelStream().forEach(fund -> {
            Optional<Double> nav = fundHoldingService.findByMutualFund(fund).parallelStream().map(FundHolding::getNav).reduce(Double::sum);
            if (nav.isEmpty()) {
                return;
            }

            double oldNav = fund.getAssetNav();
            double newNav = nav.get() + fund.getInHand();

            double profit = (newNav - oldNav) / oldNav;

            double oldTokenAmount = fund.getTokenPrice();
            double newTokenAmount = oldTokenAmount + (oldTokenAmount * profit);

            FundPrice fp = new FundPrice(fund, newTokenAmount);
            fundPriceService.save(fp);

            fund.setTokenPrice(newTokenAmount);
            fund.setAssetNav(newNav);
        });

        fundService.saveAll(all);

    }

    @Override
    @Scheduled(cron = "0 0 20 * * *")
    public void calculateUserNewValuation() {

        List<UserValuation> userValuations = new ArrayList<>();
        userService.listAllUsers().parallelStream().forEach(user -> {
            List<FundTransaction> transactions = fundTransactionRepo.findByUser(user);
            Map<MutualFund, List<FundTransaction>> map = new HashMap<>();
            transactions.parallelStream().forEach(t -> {
                if (!map.containsKey(t.getFund())) {
                    map.put(t.getFund(), new ArrayList<>());
                }
                map.get(t.getFund()).add(t);
            });

            double valuation = map.entrySet().parallelStream().map(entry -> {
                int qty = entry.getValue().parallelStream()
                        .map(t -> t.getType() == TransactionType.BUY ? t.getQuantity() : (-1 * t.getQuantity()))
                        .reduce(Integer::sum).orElse(0);
                double price = entry.getKey().getTokenPrice();
                return qty * price;
            }).reduce(Double::sum).orElse(0.0);

            userValuations.add(new UserValuation(user, valuation));

        });

        userValuationRepo.saveAll(userValuations);

    }

}
