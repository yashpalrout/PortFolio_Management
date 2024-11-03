package com.fil.config;

import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

public class Environment {

	private static Properties properties = new Properties();

	static {
		FileReader reader = null;
		try {
			reader = new FileReader("src/main/resources/application.properties");
			properties.load(reader);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public static String getProperty(String key) {
		return properties.getProperty(key);
	}
}
