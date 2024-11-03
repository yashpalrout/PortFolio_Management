package com.fil.service;

import com.fil.exceptions.NotFoundException;
import com.fil.model.Session;
import com.fil.model.User;

public interface SessionService {

    public Session createSession(User user);

    public Session findById(int sessionId) throws NotFoundException;

    public Session findByRefreshToken(String refreshToken) throws NotFoundException;

    public void removeSession(Session session) throws NotFoundException;

}
