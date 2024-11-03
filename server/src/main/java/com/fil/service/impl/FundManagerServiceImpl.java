package com.fil.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fil.model.FundManager;
import com.fil.model.MutualFund;
import com.fil.model.User;
import com.fil.repo.FundManagerRepo;
import com.fil.service.FundManagerService;

@Service
public class FundManagerServiceImpl implements FundManagerService {

	@Autowired
	FundManagerRepo fundManagerRepo;

	@Override
	public FundManager save(User user, MutualFund mf) {
		FundManager fundManager = new FundManager(mf, user);
		fundManagerRepo.save(fundManager);
		return fundManager;
	}

}
