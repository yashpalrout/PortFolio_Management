package com.fil.service;

import com.fil.exceptions.NotFoundException;
import com.fil.model.MutualFund;
import com.fil.model.User;

import java.util.List;

public interface MutualFundService {

    MutualFund save(MutualFund mf);

    List<MutualFund> findByManager(User user);

    List<MutualFund> search(String name);

    List<MutualFund> findAll();

    MutualFund findById(int mfId) throws NotFoundException;

    void initiateFund(MutualFund mf);

}
