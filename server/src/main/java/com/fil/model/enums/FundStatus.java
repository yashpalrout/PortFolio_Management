package com.fil.model.enums;

public enum FundStatus {
	NOT_LISTED("NOT_LISTED"), IPO("IPO"), LISTED("LISTED");

	public final String label;

	FundStatus(String label) {
		this.label = label;

	}

}
