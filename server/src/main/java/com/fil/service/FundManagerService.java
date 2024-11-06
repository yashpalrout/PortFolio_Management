package com.fil.service;

import com.fil.model.FundManager;
import com.fil.model.MutualFund;
import com.fil.model.User;

import java.util.List;

public interface FundManagerService {

    FundManager save(User user, MutualFund mf);

    List<FundManager> listFundManagers(MutualFund mf);

}
