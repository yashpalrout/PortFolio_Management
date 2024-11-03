package com.fil.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fil.model.Session;

@Repository
public interface SessionRepo extends JpaRepository<Session, Integer> {

	Optional<Session> findByRefreshToken(String refreshToken);
}
