package com.fil.util;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Component;

import com.fil.config.Environment;
import com.fil.interfaces.TextHasher;

@Component
public class PasswordHasher implements TextHasher {

	static final int SALT_ROUND;
	static {
		SALT_ROUND = Integer.parseInt(Environment.getProperty("encoder.salt_round"));
	}

	@Override
	public String hash(String plainText) {
		String salt = BCrypt.gensalt();
		return BCrypt.hashpw(plainText, salt);
	}

	@Override
	public boolean verifyHash(String plainText, String encodedText) {
		return BCrypt.checkpw(plainText, encodedText);
	}

}
