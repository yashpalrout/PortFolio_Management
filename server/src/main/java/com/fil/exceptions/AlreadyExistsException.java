package com.fil.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class AlreadyExistsException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9078404130450912255L;

	public AlreadyExistsException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AlreadyExistsException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

}
