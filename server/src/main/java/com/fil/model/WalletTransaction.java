package com.fil.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.TableGenerator;

import com.fil.model.enums.WalletTransactionType;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Data
@ToString
@Entity
public class WalletTransaction {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "wallet_transaction_id_generator")
	@TableGenerator(name = "wallet_transaction_id_generator", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "id_val", initialValue = 101, allocationSize = 0)
	private int walletTransactionId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wallet", nullable = false)
	private Wallet wallet;

	private WalletTransactionType transactionType;

	private double balanceAtTime;
	private double amount;
	private String reason;

	public WalletTransaction(Wallet wallet, WalletTransactionType transactionType, double amount) {
		super();
		this.wallet = wallet;
		this.transactionType = transactionType;
		this.balanceAtTime = wallet.getBalance();
		this.amount = amount;
	}

	public WalletTransaction(Wallet wallet, WalletTransactionType transactionType, double amount, String reason) {
		super();
		this.wallet = wallet;
		this.transactionType = transactionType;
		this.balanceAtTime = wallet.getBalance();
		this.reason = reason != null ? reason : "";
		this.amount = amount;
	}

}
