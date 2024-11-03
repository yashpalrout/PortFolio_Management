package com.fil.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fil.model.User;
import com.fil.model.Wallet;

@Repository
public interface WalletRepo extends JpaRepository<Wallet, Integer> {

	Optional<Wallet> findByUser(User user);
}
