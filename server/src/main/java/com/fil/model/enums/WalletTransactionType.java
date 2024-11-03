package com.fil.model.enums;

public enum WalletTransactionType {
	CREDIT("CREDIT"), DEBIT("DEBIT");

	public final String label;

	WalletTransactionType(String label) {
		this.label = label;

	}

}
