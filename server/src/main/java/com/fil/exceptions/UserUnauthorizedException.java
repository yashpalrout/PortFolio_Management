package com.fil.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class UserUnauthorizedException extends RuntimeException {

	/**
	 *
	 */
	@Serial
	private static final long serialVersionUID = -9078324130450912255L;

	public UserUnauthorizedException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserUnauthorizedException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

}
