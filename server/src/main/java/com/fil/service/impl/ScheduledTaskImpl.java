package com.fil.service.impl;

import com.fil.dto.OHLC;
import com.fil.exceptions.NotFoundException;
import com.fil.market.StockMarket;
import com.fil.model.FundHolding;
import com.fil.model.FundPrice;
import com.fil.model.MutualFund;
import com.fil.model.Ticker;
import com.fil.service.FundHoldingService;
import com.fil.service.FundPriceService;
import com.fil.service.MutualFundService;
import com.fil.service.Scheduler;
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

}
