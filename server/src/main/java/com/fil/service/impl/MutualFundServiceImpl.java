package com.fil.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fil.exceptions.InitialisationFailedException;
import com.fil.exceptions.NotFoundException;
import com.fil.market.StockMarket;
import com.fil.model.FundHolding;
import com.fil.model.FundManager;
import com.fil.model.MutualFund;
import com.fil.model.OHLC;
import com.fil.model.User;
import com.fil.repo.FundHoldingRepo;
import com.fil.repo.FundManagerRepo;
import com.fil.repo.MutualFundRepo;
import com.fil.service.MutualFundService;

@Service
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

		for (FundHolding holding : holdings) {
			double amount = mf.getAssetSize() * holding.getRatio();
			Map<String, OHLC> dailyOHLC = stockMarket.getDailyOHLC(holding.getTicker().getSymbol());
			LocalDate date = LocalDate.now();
			OHLC todayOhlc = null;
			int iter = 0;
			for (iter = 0; iter < 10 && todayOhlc == null; iter++) {
				todayOhlc = dailyOHLC.getOrDefault(date.toString(), null);
				date.minusDays(1);
			}
			if (todayOhlc == null) {
				throw new InitialisationFailedException();
			}

			double price = iter == 1 ? todayOhlc.getOpen() : todayOhlc.getClose();

			holding.setAllocatedAmount(amount);
			holding.setQuantity(amount / price);
			holding.setNav(amount);
		}

		fundHoldingRepo.saveAll(holdings);
		mutualFundRepo.save(mf);

	}

}
