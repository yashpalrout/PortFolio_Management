package com.fil.service.impl;

import com.fil.exceptions.NotFoundException;
import com.fil.model.FavoriteFund;
import com.fil.model.MutualFund;
import com.fil.model.User;
import com.fil.repo.FavoriteFundRepo;
import com.fil.service.FavoriteFundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteFundServiceImpl implements FavoriteFundService {

    @Autowired
    FavoriteFundRepo favoriteFundRepo;

    @Override
    public void save(FavoriteFund favoriteFund) {
        favoriteFundRepo.save(favoriteFund);
    }

    @Override
    public void remove(FavoriteFund favoriteFund) {
        favoriteFundRepo.delete(favoriteFund);
    }

    @Override
    public List<FavoriteFund> findByUser(User user) {
        return favoriteFundRepo.findByUser(user);
    }

    @Override
    public FavoriteFund findByUserAndMutualFund(User user, MutualFund mutualFund) {
        return favoriteFundRepo.findByUserAndMutualFund(user, mutualFund).orElseThrow(NotFoundException::new);
    }
}
