package com.fil.service;

import com.fil.exceptions.NotFoundException;
import com.fil.model.MutualFund;
import com.fil.model.User;

import java.util.List;
import java.util.Map;

public interface MutualFundService {

    MutualFund save(MutualFund mf);

    void saveAll(List<MutualFund> list);

    List<MutualFund> findByManager(User user);

    List<MutualFund> search(String name);

    List<MutualFund> findAll();

    MutualFund findById(int mfId) throws NotFoundException;

    void initiateFund(MutualFund mf);

    double userNav(User user);

    List<MutualFund> top5Funds(User user);

    List<MutualFund> top5Funds();

    double calculateTotalAsset(User user);

    double calculateTotalNav(User user);

    long totalListed(User user);

    long totalNonListed(User user);

    long totalIPO(User user);

    List<Map<String, Double>> top5Performing(User user);


}
