package com.fil.util;

import com.fil.model.Session;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;

import javax.servlet.http.Cookie;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.List;

public class ResponseUtil {

    public static Cookie cookieFrom(ResponseCookie responseCookie) {
        Cookie cookie = new Cookie(responseCookie.getName(), responseCookie.getValue());
        cookie.setPath(responseCookie.getPath());
        cookie.setHttpOnly(responseCookie.isHttpOnly());
        cookie.setSecure(responseCookie.isSecure());
        cookie.setMaxAge((int) responseCookie.getMaxAge().toSeconds());
        return cookie;
    }

    public static ResponseCookie createAuthCookie(String type, String value, int duration) {
        return ResponseCookie.from(type, value)
                .httpOnly(true)
                .secure(false)
                .maxAge(duration)
                .path("/").build();
    }

    public static HttpHeaders createAuthHeaders(Session session) {
        ResponseCookie authCookie = ResponseUtil.createAuthCookie(Const.AUTH_COOKIE, session.getAccessToken(), (int) Duration.of(1, ChronoUnit.MINUTES).toSeconds());
        ResponseCookie refreshCookie = ResponseUtil.createAuthCookie(Const.REFRESH_COOKIE, session.getRefreshToken(), (int) Duration.of(30, ChronoUnit.DAYS).toSeconds());

        HttpHeaders headers = new HttpHeaders();
        headers.addAll(HttpHeaders.SET_COOKIE, List.of(authCookie.toString(), refreshCookie.toString()));
        return headers;
    }

    public static HttpHeaders clearCookies() {
        ResponseCookie authCookie = ResponseUtil.createAuthCookie(Const.AUTH_COOKIE, null, 1);
        ResponseCookie refreshCookie = ResponseUtil.createAuthCookie(Const.REFRESH_COOKIE, null, 1);

        HttpHeaders headers = new HttpHeaders();
        headers.addAll(HttpHeaders.SET_COOKIE, List.of(authCookie.toString(), refreshCookie.toString()));
        return headers;
    }


}
