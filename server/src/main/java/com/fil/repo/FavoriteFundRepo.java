package com.fil.repo;

import com.fil.model.FavoriteFund;
import com.fil.model.MutualFund;
import com.fil.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteFundRepo extends JpaRepository<FavoriteFund, Integer> {

    List<FavoriteFund> findByUser(User user);

    Optional<FavoriteFund> findByUserAndMutualFund(User user, MutualFund mutualFund);
}
