package com.fil.service;

import java.util.List;

import com.fil.exceptions.NotFoundException;
import com.fil.model.MutualFund;
import com.fil.model.User;

public interface MutualFundService {

	MutualFund save(MutualFund mf);

	List<MutualFund> findByManager(User user);

	List<MutualFund> search(String name);

	List<MutualFund> findAll();

	MutualFund findById(int mfId) throws NotFoundException;

	void initiateFund(MutualFund mf);

}
