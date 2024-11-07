package com.fil.service.impl;

import com.fil.model.User;
import com.fil.model.UserValuation;
import com.fil.repo.UserValuationRepo;
import com.fil.service.UserValuationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserValuationServiceImpl implements UserValuationService {

    @Autowired
    private UserValuationRepo userValuationRepo;


    @Override
    public List<UserValuation> findByUser(User user) {
        return userValuationRepo.findByUser(user);
    }

    @Override
    public void save(UserValuation valuation) {
        userValuationRepo.save(valuation);
    }

    @Override
    public void saveAll(List<UserValuation> valuations) {
        userValuationRepo.saveAll(valuations);
    }
}
