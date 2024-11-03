package com.fil.service.impl;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fil.exceptions.TransactionNotAllowdedException;
import com.fil.model.FundTransaction;
import com.fil.model.MutualFund;
import com.fil.model.User;
import com.fil.model.enums.TransactionType;
import com.fil.repo.FundTransactionRepo;
import com.fil.service.FundTransactionService;
import com.fil.service.WalletService;

@Service
@Transactional
public class FundTransactionServiceImpl implements FundTransactionService {

	@Autowired
	WalletService walletService;

	@Autowired
	FundTransactionRepo transactionRepo;

	@Override
	public FundTransaction purchase(MutualFund fund, User user, int qty) {
		FundTransaction fundTransaction = new FundTransaction(fund, user, qty, TransactionType.BUY);
		transactionRepo.save(fundTransaction);
		walletService.deductBalance(user, fundTransaction.getAmount(),
				"Fund Purchase :" + fund.getName() + " @" + fund.getTokenPrice());

		return fundTransaction;
	}

	@Override
	public FundTransaction sell(MutualFund fund, User user, int qty) throws TransactionNotAllowdedException {
		List<FundTransaction> transactions = transactionRepo.findByFundAndUser(fund, user);

		Optional<Integer> optMaxAllowded = transactions.stream()
				.map(t -> t.getType() == TransactionType.BUY ? t.getQuantity() : (-1 * t.getQuantity()))
				.reduce((a, b) -> a + b);


		if (optMaxAllowded.isEmpty()) {
			throw new TransactionNotAllowdedException();
		}

		int maxAllowded = optMaxAllowded.get();

		if (maxAllowded < qty) {
			throw new TransactionNotAllowdedException();
		}

		FundTransaction fundTransaction = new FundTransaction(fund, user, qty, TransactionType.SELL);
		transactionRepo.save(fundTransaction);
		walletService.deductBalance(user, fundTransaction.getAmount(),
				"Fund Sell :" + fund.getName() + " @" + fund.getTokenPrice());

		return fundTransaction;
	}

	@Override
	public List<FundTransaction> transactionHistory(User user) {
		return transactionRepo.findByUser(user);
	}

}
