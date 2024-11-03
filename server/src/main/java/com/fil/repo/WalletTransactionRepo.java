package com.fil.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fil.model.Wallet;
import com.fil.model.WalletTransaction;

@Repository
public interface WalletTransactionRepo extends JpaRepository<WalletTransaction, Integer> {

	List<WalletTransaction> findByWallet(Wallet wallet);
}
