package com.fil.repo;

import com.fil.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SessionRepo extends JpaRepository<Session, Integer> {

    Optional<Session> findByRefreshToken(String refreshToken);
}