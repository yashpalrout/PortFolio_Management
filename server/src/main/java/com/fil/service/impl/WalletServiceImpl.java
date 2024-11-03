package com.fil.service.impl;

import javax.transaction.Transactional;

import com.fil.exceptions.InsufficientBalanceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fil.exceptions.AlreadyExistsException;
import com.fil.exceptions.NotFoundException;
import com.fil.model.User;
import com.fil.model.Wallet;
import com.fil.model.WalletTransaction;
import com.fil.model.enums.WalletTransactionType;
import com.fil.repo.UserRepo;
import com.fil.repo.WalletRepo;
import com.fil.repo.WalletTransactionRepo;
import com.fil.service.WalletService;

@Service
@Transactional
public class WalletServiceImpl implements WalletService {
	@Autowired
	UserRepo userRepo;

	@Autowired
	WalletRepo walletRepo;

	@Autowired
	WalletTransactionRepo transactionRepo;

	@Override
	public Wallet create(User user) throws AlreadyExistsException {
		Wallet wallet = new Wallet(user);
		walletRepo.save(wallet);
		return wallet;
	}

	@Override
	public Wallet findByUser(User user) throws NotFoundException {
		return walletRepo.findByUser(user).orElseThrow(() -> new NotFoundException());
	}

	@Override
	public void addBalance(User user, double amount) {
		addBalance(user, amount, null);
	}

	@Override
	public void addBalance(User user, double amount, String reason) {
		Wallet wallet = findByUser(user);
		wallet.credit(amount);
		WalletTransaction walletTransaction = new WalletTransaction(wallet, WalletTransactionType.CREDIT, amount,
				reason);

		transactionRepo.save(walletTransaction);
		walletRepo.save(wallet);
	}

	@Override
	public void deductBalance(User user, double amount) {
		deductBalance(user, amount, null);

	}

	@Override
	public void deductBalance(User user, double amount, String reason) {
		Wallet wallet = findByUser(user);
		if(wallet.getBalance() < amount) {
			throw  new InsufficientBalanceException();
		}
		wallet.debit(amount);
		WalletTransaction walletTransaction = new WalletTransaction(wallet, WalletTransactionType.DEBIT, amount,
				reason);

		transactionRepo.save(walletTransaction);
		walletRepo.save(wallet);

	}

}
