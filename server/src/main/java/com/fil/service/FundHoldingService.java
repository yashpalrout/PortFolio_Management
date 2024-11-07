package com.fil.service;

import com.fil.model.FundHolding;
import com.fil.model.MutualFund;

import java.util.List;

public interface FundHoldingService {

    List<FundHolding> findAll();

    List<FundHolding> findAllListed();

    void saveAll(List<FundHolding> mf);

    List<FundHolding> findByMutualFund(MutualFund fund);
}
