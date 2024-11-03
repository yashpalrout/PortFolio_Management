package com.fil.interceptor;

import com.fil.interfaces.TextHasher;
import com.fil.util.PasswordHasher;

public class UserHibernateInterceptor {

	private TextHasher hasher = new PasswordHasher();

	public boolean intercept(Object[] state, String[] propertyNames) {
		for (int i = 0; i < propertyNames.length; i++) {
			if ("password".equals(propertyNames[i])) {
				String plainPassword = (String) state[i];
				String hashedPassword = hasher.hash(plainPassword);
				state[i] = hashedPassword;
				return true;
			}
		}
		return false;
	}
}
