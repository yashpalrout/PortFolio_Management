package com.fil.service;

import com.fil.model.User;
import com.fil.model.UserValuation;

import java.util.List;

public interface UserValuationService {

    List<UserValuation> findByUser(User user);

    void save(UserValuation valuation);

    void saveAll(List<UserValuation> valuations);

}
