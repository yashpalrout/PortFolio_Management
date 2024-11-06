package com.fil.repo;

import com.fil.model.FundTransaction;
import com.fil.model.MutualFund;
import com.fil.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FundTransactionRepo extends JpaRepository<FundTransaction, Integer> {

    List<FundTransaction> findByFund(MutualFund fund);

    List<FundTransaction> findByFundAndUser(MutualFund fund, User user);

    List<FundTransaction> findByUserOrderByCreatedAtDesc(User user);

}
