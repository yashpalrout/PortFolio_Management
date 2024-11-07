package com.fil.service;

import com.fil.exceptions.AlreadyExistsException;
import com.fil.exceptions.NotFoundException;
import com.fil.model.User;
import com.fil.model.Wallet;
import com.fil.model.WalletTransaction;

import java.util.List;

public interface WalletService {

    public Wallet create(User user) throws AlreadyExistsException;

    public Wallet findByUser(User user) throws NotFoundException;

    public void addBalance(User user, double amount);

    public void addBalance(User user, double amount, String reason);

    public void deductBalance(User user, double amount);

    public void deductBalance(User user, double amount, String reason);

    public List<WalletTransaction> transactionHistory();

    public List<WalletTransaction> transactionHistory(User user);

}
