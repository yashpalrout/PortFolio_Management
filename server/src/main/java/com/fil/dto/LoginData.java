package com.fil.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fil.model.User;

import lombok.Data;

@Data
public class LoginData {

	@NotBlank
	@Email
	private String email;

	@NotBlank
	private String password;

	public User toUser() {
		User user = new User();
		user.setEmail(email);
		user.setPassword(password);
		return user;
	}
}
