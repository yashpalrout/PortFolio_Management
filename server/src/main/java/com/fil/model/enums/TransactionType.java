package com.fil.model.enums;

public enum TransactionType {
	BUY("BUY"), SELL("SELL");

	public final String label;

	TransactionType(String label) {
		this.label = label;

	}

}
