package com.fil.util;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.crypto.SecretKey;

import com.fil.config.Environment;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {

	static final int EXPIRATION_TIME;
	static final SecretKey SIGNING_KEY;

	static {
		EXPIRATION_TIME = Integer.parseInt(Environment.getProperty("encoder.expiration_time"));
		byte[] keyBytes = Decoders.BASE64.decode(Environment.getProperty("encoder.signing_key"));
		SIGNING_KEY = Keys.hmacShaKeyFor(keyBytes);
	}

	public static String encode(String subject) {
		LocalDateTime time = LocalDateTime.now().plusSeconds(EXPIRATION_TIME);
		return Jwts.builder().subject(subject).expiration(DateUtil.convertToDate(time)).signWith(SIGNING_KEY).compact();
	}

	public static Optional<String> decode(String encoded) {
		try {
			Jws<Claims> signedClaims = Jwts.parser().verifyWith(SIGNING_KEY).build().parseSignedClaims(encoded);
			String subject = signedClaims.getPayload().getSubject();
			return Optional.of(subject);
		} catch (JwtException e) {
			e.printStackTrace();
			return Optional.empty();
		}

	}

}
