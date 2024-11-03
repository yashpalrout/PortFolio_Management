package com.fil.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fil.model.FundHolding;
import com.fil.model.MutualFund;
import com.fil.repo.FundHoldingRepo;
import com.fil.service.FundHoldingService;

@Service
public class FundHoldingServiceImpl implements FundHoldingService {

	@Autowired
	FundHoldingRepo fundHoldingRepo;

	@Override
	public void saveAll(List<FundHolding> holdings) {
		fundHoldingRepo.saveAllAndFlush(holdings);

	}

	@Override
	public List<FundHolding> findByMutualFund(MutualFund fund) {
		return fundHoldingRepo.findByMutualFund(fund);
	}

}
