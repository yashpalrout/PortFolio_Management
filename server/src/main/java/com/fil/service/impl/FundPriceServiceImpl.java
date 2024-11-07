package com.fil.service.impl;

import com.fil.model.FundPrice;
import com.fil.model.MutualFund;
import com.fil.repo.FundPriceRepo;
import com.fil.service.FundPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class FundPriceServiceImpl implements FundPriceService {

    @Autowired
    private FundPriceRepo fundPriceRepo;

    @Override
    public List<FundPrice> findByFund(MutualFund fund) {
        return fundPriceRepo.findByMutualFund(fund);
    }

    @Override
    public void save(FundPrice fundPrice) {
        fundPriceRepo.save(fundPrice);
    }

    @Override
    public void saveAll(List<FundPrice> prices) {
        fundPriceRepo.saveAll(prices);
    }
}
