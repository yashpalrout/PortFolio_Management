package com.fil.interceptor;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.fil.exceptions.NotFoundException;
import com.fil.model.Session;
import com.fil.model.User;
import com.fil.service.SessionService;
import com.fil.util.JwtUtil;

@Component
public class UserAuthInterceptor implements HandlerInterceptor {

	@Autowired
	private SessionService sessionService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		String token = request.getHeader("Authorization");
		if (token == null) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return false;
		}
		if (!token.startsWith("Bearer") || token.length() < 7) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return false;
		}

		token = token.substring(7);
		if (!isValidToken(token)) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return false;
		}

		try {
			User user = getUserFromToken(token);
			request.setAttribute("user", user);
			return true;
		} catch (Exception e) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return false;
		}
	}

	private boolean isValidToken(String token) {
		return JwtUtil.decode(token).isPresent();
	}

	private User getUserFromToken(String token) throws NotFoundException {
		Optional<String> session_id = JwtUtil.decode(token);
		if (session_id.isEmpty()) {
			throw new NotFoundException();
		}
		Session session = sessionService.findById(Integer.parseInt(session_id.get()));
		return session.getUser();

	}
}