package com.fil.service;

import com.fil.exceptions.NotFoundException;
import com.fil.model.FavoriteFund;
import com.fil.model.MutualFund;
import com.fil.model.User;

import java.util.List;

public interface FavoriteFundService {

    void save(FavoriteFund favoriteFund);

    void remove(FavoriteFund favoriteFund);

    List<FavoriteFund> findByUser(User user);

    FavoriteFund findByUserAndMutualFund(User user, MutualFund mutualFund) throws NotFoundException;
}
