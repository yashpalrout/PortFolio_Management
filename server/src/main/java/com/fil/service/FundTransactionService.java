package com.fil.service;

import com.fil.exceptions.TransactionNotAllowdedException;
import com.fil.model.FundTransaction;
import com.fil.model.MutualFund;
import com.fil.model.User;

import java.util.List;

public interface FundTransactionService {

    FundTransaction purchase(MutualFund fund, User user, int qty);

    FundTransaction sell(MutualFund fund, User user, int qty) throws TransactionNotAllowdedException;

    List<FundTransaction> transactionHistory();

    List<FundTransaction> transactionHistory(User user);

    long investedUsersCount();

}
