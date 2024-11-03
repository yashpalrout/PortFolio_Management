package com.fil.service;

import java.util.List;

import com.fil.exceptions.TransactionNotAllowdedException;
import com.fil.model.FundTransaction;
import com.fil.model.MutualFund;
import com.fil.model.User;

public interface FundTransactionService {

	FundTransaction purchase(MutualFund fund, User user, int qty);

	FundTransaction sell(MutualFund fund, User user, int qty) throws TransactionNotAllowdedException;

	List<FundTransaction> transactionHistory(User user);

}
