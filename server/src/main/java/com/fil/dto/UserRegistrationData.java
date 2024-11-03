package com.fil.dto;

import java.sql.Date;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fil.model.User;
import com.fil.model.enums.UserRole;

import lombok.Data;

@Data
public class UserRegistrationData {

	@NotBlank
	@Email
	private String email;

	@NotBlank
	private String password;

	@NotBlank
	private String name;

	@NotBlank
	private String phone;

	@NotNull
	private Date dob;

	@NotNull
	private UserRole role;

	public User toUser() {
		User user = new User();
		user.setEmail(email);
		user.setName(name);
		user.setPhone(phone);
		user.setDob(dob);
		user.setRole(role);
		user.setPassword(password);
		return user;
	}

}