package com.fil.repo;

import com.fil.model.User;
import com.fil.model.Wallet;
import com.fil.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletTransactionRepo extends JpaRepository<WalletTransaction, Integer> {

    List<WalletTransaction> findByWallet(Wallet wallet);

    @Query("select wt from WalletTransaction wt where wt.wallet.user = :user order by wt.transactionTime desc")
    List<WalletTransaction> findByUser(User user);
}
