package com.fil.service.impl;

import com.fil.dto.OHLC;
import com.fil.exceptions.InitialisationFailedException;
import com.fil.exceptions.NotFoundException;
import com.fil.market.StockMarket;
import com.fil.model.FundHolding;
import com.fil.model.FundManager;
import com.fil.model.MutualFund;
import com.fil.model.User;
import com.fil.repo.FundHoldingRepo;
import com.fil.repo.FundManagerRepo;
import com.fil.repo.MutualFundRepo;
import com.fil.service.MutualFundService;
import com.fil.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

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
        return byManager.stream().map(fm -> fm.getMutualFund()).toList();
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
        return mutualFundRepo.findById(mfId).orElseThrow(() -> new NotFoundException());
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

}
