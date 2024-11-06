package com.fil.service.impl;

import com.fil.exceptions.TransactionNotAllowdedException;
import com.fil.model.FundHolding;
import com.fil.model.MutualFund;
import com.fil.repo.FundHoldingRepo;
import com.fil.service.FundHoldingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FundHoldingServiceImpl implements FundHoldingService {

    @Autowired
    FundHoldingRepo fundHoldingRepo;

    @Override
    public void saveAll(List<FundHolding> holdings) {
        Optional<Double> optCurrRatio = fundHoldingRepo.findByMutualFund(holdings.get(0).getMutualFund()).stream().map(FundHolding::getRatio).reduce(Double::sum);
        Optional<Double> newRatio = holdings.stream().map(FundHolding::getRatio).reduce(Double::sum);

        if (optCurrRatio.isPresent() && newRatio.isPresent()) {
            if (optCurrRatio.get() + newRatio.get() > 100) {
                throw new TransactionNotAllowdedException();
            }
        }

        fundHoldingRepo.saveAllAndFlush(holdings);

    }

    @Override
    public List<FundHolding> findByMutualFund(MutualFund fund) {
        return fundHoldingRepo.findByMutualFund(fund);
    }

}
