package com.fil.service;

import com.fil.model.FundManager;
import com.fil.model.MutualFund;
import com.fil.model.User;

public interface FundManagerService {

	FundManager save(User user, MutualFund mf);

}
