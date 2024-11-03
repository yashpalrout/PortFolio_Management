package com.fil.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fil.model.FundTransaction;
import com.fil.model.MutualFund;
import com.fil.model.User;

@Repository
public interface FundTransactionRepo extends JpaRepository<FundTransaction, Integer> {

	List<FundTransaction> findByFund(MutualFund fund);

	List<FundTransaction> findByFundAndUser(MutualFund fund, User user);

	List<FundTransaction> findByUser(User user);

}
