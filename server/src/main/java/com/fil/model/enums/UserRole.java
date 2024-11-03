package com.fil.model.enums;

public enum UserRole {
	INVESTOR("INVESTOR"), FUND_MANAGER("FUND_MANAGER"), PORTAL_MANAGER("PORTAL_MANAGER");

	public final String label;

	UserRole(String label) {
		this.label = label;

	}

}
