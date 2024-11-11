package com.fil.service.impl;

import com.fil.dto.OHLC;
import com.fil.exceptions.InitialisationFailedException;
import com.fil.exceptions.NotFoundException;
import com.fil.market.StockMarket;
import com.fil.model.*;
import com.fil.model.enums.FundStatus;
import com.fil.model.enums.TransactionType;
import com.fil.repo.FundHoldingRepo;
import com.fil.repo.FundManagerRepo;
import com.fil.repo.FundTransactionRepo;
import com.fil.repo.MutualFundRepo;
import com.fil.service.FundPriceService;
import com.fil.service.MutualFundService;
import com.fil.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.*;

@Service
@Transactional
public class MutualFundServiceImpl implements MutualFundService {

    @Autowired
    MutualFundRepo mutualFundRepo;

    @Autowired
    FundManagerRepo fundManagerRepo;

    @Autowired
    FundHoldingRepo fundHoldingRepo;

    @Autowired
    FundTransactionRepo fundTransactionRepo;

    @Autowired
    FundPriceService fundPriceService;

    @Autowired
    StockMarket stockMarket;

    @Override
    public MutualFund save(MutualFund mf) {
        mutualFundRepo.save(mf);
        return mf;
    }

    @Override
    public void saveAll(List<MutualFund> list) {
        mutualFundRepo.saveAll(list);
    }

    @Override
    public List<MutualFund> findByManager(User user) {
        List<FundManager> byManager = fundManagerRepo.findByManager(user);
        return byManager.stream().map(FundManager::getMutualFund).toList();
    }

    @Override
    public List<MutualFund> findAll() {
        return mutualFundRepo.findAll();
    }

    @Override
    public List<MutualFund> search(String name) {
        return mutualFundRepo.findByNameLike(name);
    }

    @Override
    public MutualFund findById(int mfId) throws NotFoundException {
        return mutualFundRepo.findById(mfId).orElseThrow(NotFoundException::new);
    }

    @Override
    public void initiateFund(MutualFund mf) throws InitialisationFailedException {

        mf.setAssetNav(mf.getAssetSize());

        List<FundHolding> holdings = fundHoldingRepo.findByMutualFund(mf);
        int totalAmount = 0;

        for (FundHolding holding : holdings) {
            double amount = mf.getAssetSize() * holding.getRatio() * 0.01;
            Map<String, OHLC> dailyOHLC;
            LocalDate date;

            try {
                date = LocalDate.parse(stockMarket.lastRefreshed(holding.getTicker().getSymbol()));
                dailyOHLC = stockMarket.getDailyOHLC(holding.getTicker().getSymbol());
            } catch (NotFoundException e) {
                throw new InitialisationFailedException();
            }

            OHLC todayOhlc = dailyOHLC.getOrDefault(date.toString(), null);

            if (todayOhlc == null) {
                throw new InitialisationFailedException();
            }

            double price = todayOhlc.getClose();

            int qty = (int) (amount / price);
            amount = qty * price;
            holding.setAllocatedAmount(amount);
            holding.setQuantity(qty);
            holding.setNav(amount);
            holding.setLastUpdated(DateUtil.convertToDate(date));
        }

        fundHoldingRepo.saveAll(holdings);
        mf.setInHand(mf.getAssetSize() - totalAmount);
        mutualFundRepo.save(mf);

    }

    @Override
    public double userNav(User user) {
        Map<MutualFund, Integer> map = new HashMap<>();
        fundTransactionRepo.findByUser(user).forEach(ft -> {
            if (!map.containsKey(ft.getFund())) {
                map.put(ft.getFund(), 0);
            }
            int qty = ft.getType() == TransactionType.BUY ? ft.getQuantity() : (-1 * ft.getQuantity());
            map.put(ft.getFund(), map.get(ft.getFund()) + qty);
        });


        Optional<Double> nav = map.entrySet().parallelStream().map(entry -> entry.getKey().getTokenPrice() * entry.getValue()).reduce(Double::sum);
        return nav.orElse(0.0);
    }

    @Override
    public List<MutualFund> top5Funds(User user) {
        Set<MutualFund> map = new HashSet<>();
        List<MutualFund> mutualFunds = new ArrayList<>(fundTransactionRepo.findByUser(user).parallelStream().map(FundTransaction::getFund).toList());

        mutualFunds.sort((m1, m2) -> (int) (m2.getAssetSize() - m1.getAssetSize()));
        return mutualFunds.stream().limit(5).toList();

    }

    @Override
    public List<MutualFund> top5Funds() {
        List<MutualFund> mutualFunds = mutualFundRepo.findAll();
        mutualFunds.sort((m1, m2) -> (int) (m2.getAssetSize() - m1.getAssetSize()));
        return mutualFunds.stream().limit(5).toList();

    }

    @Override
    public double calculateTotalAsset(User user) {
        List<MutualFund> mutualFunds;
        if (user == null) {
            mutualFunds = mutualFundRepo.findAll();
        } else {
            mutualFunds = findByManager(user);
        }

        return mutualFunds.stream().map(MutualFund::getAssetSize).reduce(Double::sum).orElse(0.0);
    }

    @Override
    public double calculateTotalNav(User user) {
        List<MutualFund> mutualFunds;
        if (user == null) {
            mutualFunds = mutualFundRepo.findAll();
        } else {
            mutualFunds = findByManager(user);
        }

        return mutualFunds.stream().map(MutualFund::getAssetNav).reduce(Double::sum).orElse(0.0);
    }

    @Override
    public long totalListed(User user) {
        List<MutualFund> mutualFunds;
        if (user == null) {
            mutualFunds = mutualFundRepo.findAll();
        } else {
            mutualFunds = findByManager(user);
        }

        return mutualFunds.stream().filter(mf -> mf.getStatus() == FundStatus.LISTED).count();
    }

    @Override
    public long totalNonListed(User user) {
        List<MutualFund> mutualFunds;
        if (user == null) {
            mutualFunds = mutualFundRepo.findAll();
        } else {
            mutualFunds = findByManager(user);
        }

        return mutualFunds.stream().filter(mf -> mf.getStatus() == FundStatus.NOT_LISTED).count();
    }

    @Override
    public long totalIPO(User user) {
        List<MutualFund> mutualFunds;
        if (user == null) {
            mutualFunds = mutualFundRepo.findAll();
        } else {
            mutualFunds = findByManager(user);
        }

        return mutualFunds.stream().filter(mf -> mf.getStatus() == FundStatus.IPO).count();
    }

    @Override
    public List<Map<String, Double>> top5Performing(User user) {
        List<MutualFund> mutualFunds;
        if (user == null) {
            mutualFunds = mutualFundRepo.findAll();
        } else {
            mutualFunds = findByManager(user);
        }
        mutualFunds = new ArrayList<>(mutualFunds.stream().filter(fund -> fund.getStatus() == FundStatus.LISTED).toList());
        mutualFunds.sort((m1, m2) -> (int) (m2.getAssetSize() - m1.getAssetSize()));
        mutualFunds = mutualFunds.stream().limit(5).toList();

        List<Map<String, Double>> result = new ArrayList<>();

        mutualFunds.parallelStream().forEach(fund -> {
            Map<String, Double> fundValuations = new HashMap<>();
            fundPriceService.findByFund(fund).parallelStream().forEach(val -> fundValuations.put(val.getDate().toString(), val.getPrice()));
            result.add(fundValuations);
        });

        return result;
    }
}
