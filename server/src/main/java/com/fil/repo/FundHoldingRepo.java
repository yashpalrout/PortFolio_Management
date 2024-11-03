package com.fil.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fil.model.FundHolding;
import com.fil.model.MutualFund;

@Repository
public interface FundHoldingRepo extends JpaRepository<FundHolding, Integer> {

	List<FundHolding> findByMutualFund(MutualFund fund);

}
