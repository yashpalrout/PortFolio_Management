package com.fil.interfaces;

public interface TextHasher {

	public String hash(String plainText);

	public boolean verifyHash(String plainText, String encodedText);

}
