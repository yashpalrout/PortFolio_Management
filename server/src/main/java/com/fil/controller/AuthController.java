package com.fil.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fil.dto.LoginData;
import com.fil.dto.UserRegistrationData;
import com.fil.exceptions.AlreadyExistsException;
import com.fil.exceptions.NotFoundException;
import com.fil.model.Session;
import com.fil.model.User;
import com.fil.service.SessionService;
import com.fil.service.UserService;
import com.fil.service.WalletService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	private UserService userService;

	@Autowired
	private WalletService walletService;
	@Autowired
	private SessionService sessionService;

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody UserRegistrationData data) throws AlreadyExistsException {
		User user = data.toUser();
		userService.register(user);
		walletService.create(user);
		Session session = sessionService.createSession(user);

		Map<String, Object> response = new HashMap<>();
		response.put("success", true);
		response.put("message", "User saved succesfully");
		response.put("data", user);
		response.put("auth_token", session.getAccessToken());
		response.put("refresh_token", session.getRefreshToken());
		return ResponseEntity.status(HttpStatus.CREATED).body(response);

	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginData data) throws NotFoundException {
		User user = userService.login(data.toUser());
		Session session = sessionService.createSession(user);

		Map<String, Object> response = new HashMap<>();
		response.put("success", true);
		response.put("message", "User logged in");
		response.put("data", user);
		response.put("auth_token", session.getAccessToken());
		response.put("refresh_token", session.getRefreshToken());
		return ResponseEntity.status(HttpStatus.OK).body(response);

	}

}