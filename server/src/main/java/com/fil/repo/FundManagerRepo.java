package com.fil.repo;

import com.fil.model.FundManager;
import com.fil.model.MutualFund;
import com.fil.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FundManagerRepo extends JpaRepository<FundManager, Integer> {

    List<FundManager> findByManager(User manager);

    List<FundManager> findByMutualFund(MutualFund mutualFund);

}
