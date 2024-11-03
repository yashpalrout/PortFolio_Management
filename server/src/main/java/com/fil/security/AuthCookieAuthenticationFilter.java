package com.fil.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import java.util.stream.Stream;

import static com.fil.util.Const.AUTH_COOKIE;
import static com.fil.util.Const.REFRESH_COOKIE;

public class AuthCookieAuthenticationFilter extends OncePerRequestFilter {


    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        Optional<Cookie> cookieAuth = Stream.of(Optional.ofNullable(httpServletRequest.getCookies()).orElse(new Cookie[0]))
                .filter(cookie -> AUTH_COOKIE.equals(cookie.getName()))
                .findFirst();


        if (cookieAuth.isPresent()) {
            SecurityContextHolder.getContext().setAuthentication(
                    new PreAuthenticatedAuthenticationToken(AUTH_COOKIE, cookieAuth.get().getValue()));
        } else {
            Optional<Cookie> refreshAuth = Stream.of(Optional.ofNullable(httpServletRequest.getCookies()).orElse(new Cookie[0]))
                    .filter(cookie -> REFRESH_COOKIE.equals(cookie.getName()))
                    .findFirst();
            if (refreshAuth.isPresent()) {
                SecurityContextHolder.getContext().setAuthentication(
                        new PreAuthenticatedAuthenticationToken(REFRESH_COOKIE, refreshAuth.get().getValue()));

            }
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}