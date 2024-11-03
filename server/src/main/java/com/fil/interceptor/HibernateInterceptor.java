package com.fil.interceptor;

import java.io.Serializable;

import org.hibernate.EmptyInterceptor;
import org.hibernate.type.Type;

import com.fil.model.User;

public class HibernateInterceptor extends EmptyInterceptor {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7154563100830797493L;
	private static UserHibernateInterceptor userInterceptor = new UserHibernateInterceptor();

	@Override
	public boolean onSave(Object entity, Serializable id, Object[] state, String[] propertyNames, Type[] types) {
		if (entity instanceof User) {
			return userInterceptor.intercept(state, propertyNames);
		}
		return super.onSave(entity, id, state, propertyNames, types);
	}

	@Override
	public boolean onFlushDirty(Object entity, Serializable id, Object[] currentState, Object[] previousState,
			String[] propertyNames, Type[] types) {
		if (entity instanceof User) {
			return userInterceptor.intercept(currentState, propertyNames);
		}
		return super.onFlushDirty(entity, id, currentState, previousState, propertyNames, types);
	}

}
