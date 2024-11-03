package com.fil.service;

import java.util.List;

import com.fil.model.FundHolding;
import com.fil.model.MutualFund;

public interface FundHoldingService {

	void saveAll(List<FundHolding> mf);

	List<FundHolding> findByMutualFund(MutualFund fund);
}
