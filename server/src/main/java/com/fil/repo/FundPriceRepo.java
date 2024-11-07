package com.fil.repo;

import com.fil.model.FundPrice;
import com.fil.model.MutualFund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FundPriceRepo extends JpaRepository<FundPrice, Integer> {

    List<FundPrice> findByMutualFund(MutualFund fund);


}
