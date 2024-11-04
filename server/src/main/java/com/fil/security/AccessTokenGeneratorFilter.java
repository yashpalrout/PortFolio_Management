package com.fil.security;

import com.fil.model.Session;
import com.fil.service.SessionService;
import com.fil.util.ResponseUtil;
import org.springframework.http.ResponseCookie;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.stream.Stream;

import static com.fil.util.Const.AUTH_COOKIE;
import static com.fil.util.Const.REFRESH_COOKIE;

public class AccessTokenGeneratorFilter extends OncePerRequestFilter {
    private final SessionService sessionService; // Declare the session service

    public AccessTokenGeneratorFilter(SessionService sessionService) {
        this.sessionService = sessionService; // Initialize the session service
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {


        Optional<Cookie> refreshAuth = Stream.of(Optional.ofNullable(request.getCookies()).orElse(new Cookie[0]))
                .filter(cookie -> REFRESH_COOKIE.equals(cookie.getName()))
                .findFirst();
        if (refreshAuth.isPresent()) {
            try {
                Session session = sessionService.findByRefreshToken(refreshAuth.get().getValue());
                ResponseCookie authCookie = ResponseUtil.createAuthCookie(AUTH_COOKIE, session.getAccessToken(), (int) Duration.of(1, ChronoUnit.MINUTES).toSeconds());
                response.addCookie(ResponseUtil.cookieFrom(authCookie));
            } catch (Exception ignored) {
            }

        }
        filterChain.doFilter(request, response);

    }

}