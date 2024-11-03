package com.fil.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fil.model.FundManager;
import com.fil.model.User;

@Repository
public interface FundManagerRepo extends JpaRepository<FundManager, Integer> {

	List<FundManager> findByManager(User manager);

}
