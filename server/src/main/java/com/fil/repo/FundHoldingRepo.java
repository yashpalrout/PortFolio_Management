package com.fil.repo;

import com.fil.model.FundHolding;
import com.fil.model.MutualFund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FundHoldingRepo extends JpaRepository<FundHolding, Integer> {

    List<FundHolding> findByMutualFund(MutualFund fund);

    @Query("select fh from FundHolding fh where fh.mutualFund.status = 2")
    List<FundHolding> findAllListed();

}
