package com.fil.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fil.model.Ticker;

@Repository
public interface TickerRepo extends JpaRepository<Ticker, Integer> {

	List<Ticker> findByNameLike(String name);

	Optional<Ticker> findBySymbol(String symbol);

}
