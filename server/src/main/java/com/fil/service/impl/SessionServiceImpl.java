package com.fil.service.impl;

import com.fil.exceptions.NotFoundException;
import com.fil.model.Session;
import com.fil.model.User;
import com.fil.repo.SessionRepo;
import com.fil.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class SessionServiceImpl implements SessionService {
    @Autowired
    SessionRepo sessionRepo;

    @Override
    public Session createSession(User user) {
        Session session = new Session(user);
        sessionRepo.save(session);
        return session;
    }

    @Override
    public Session findById(int sessionId) throws NotFoundException {
        return sessionRepo.findById(sessionId).orElseThrow(NotFoundException::new);
    }

    @Override
    public Session findByRefreshToken(String refreshToken) throws NotFoundException {
        return sessionRepo.findByRefreshToken(refreshToken).orElseThrow(NotFoundException::new);
    }

    @Override
    public void removeSession(Session session) throws NotFoundException {
        sessionRepo.delete(session);
    }
}
