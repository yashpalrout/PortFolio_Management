package com.fil.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class InsufficientBalanceException extends RuntimeException {

	/**
	 *
	 */
	@Serial
	private static final long serialVersionUID = -9078404130450912255L;

	public InsufficientBalanceException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public InsufficientBalanceException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

}
