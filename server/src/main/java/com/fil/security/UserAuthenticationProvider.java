package com.fil.security;

import com.fil.dto.LoginData;
import com.fil.exceptions.NotFoundException;
import com.fil.model.Session;
import com.fil.model.User;
import com.fil.service.SessionService;
import com.fil.service.UserService;
import com.fil.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.Optional;

import static com.fil.util.Const.AUTH_COOKIE;
import static com.fil.util.Const.REFRESH_COOKIE;

@Component
public class UserAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserService userService;

    @Autowired
    private SessionService sessionService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        User user = null;
        Session session = null;
        try {
            if (authentication instanceof UsernamePasswordAuthenticationToken) {
                // authentication by username and password
                LoginData data = new LoginData((String) authentication.getPrincipal(),
                        (String) authentication.getCredentials());
                user = userService.login(data.toUser());
            } else if (authentication instanceof PreAuthenticatedAuthenticationToken) {
                // authentication by cookie
                String tokenType = (String) authentication.getPrincipal();
                String token = (String) authentication.getCredentials();

                if (tokenType.equals(AUTH_COOKIE)) {
                    Optional<String> decoded = JwtUtil.decode(token);
                    if (decoded.isPresent()) {
                        session = sessionService.findById(Integer.parseInt(decoded.get()));
                        user = session.getUser();
                    }
                } else if (tokenType.equals(REFRESH_COOKIE)) {
                    session = sessionService.findByRefreshToken(token);
                    user = session.getUser();
                }

            }

            if (user == null) {
                throw new NotFoundException();
            }

            return new UsernamePasswordAuthenticationToken(user, session.getAccessToken());
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return true;
    }
}