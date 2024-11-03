package com.fil.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class InvalidFieldException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9078404130450912255L;

	public InvalidFieldException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public InvalidFieldException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

}
