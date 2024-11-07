package com.fil.service;

import com.fil.model.FundPrice;
import com.fil.model.MutualFund;

import java.util.List;

public interface FundPriceService {

    List<FundPrice> findByFund(MutualFund fund);

    void save(FundPrice fundPrice);

    void saveAll(List<FundPrice> prices);

}
