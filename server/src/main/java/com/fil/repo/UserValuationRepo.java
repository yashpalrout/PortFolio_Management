package com.fil.repo;

import com.fil.model.User;
import com.fil.model.UserValuation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserValuationRepo extends JpaRepository<UserValuation, Integer> {
    List<UserValuation> findByUser(User user);
}
