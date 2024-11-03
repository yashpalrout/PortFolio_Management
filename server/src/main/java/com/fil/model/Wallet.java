package com.fil.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Data
@ToString
@Entity
public class Wallet {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "wallet_id_generator")
	@TableGenerator(name = "wallet_id_generator", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "id_val", initialValue = 101, allocationSize = 0)
	private int walletId;

	@ManyToOne()
	@JoinColumn(name = "user", nullable = false)
	private User user;

	@ColumnDefault("10000.0")
	private double balance;

	public Wallet(User user) {
		super();
		this.user = user;
		this.balance = 10000;
	}

	public Wallet(User user, double balance) {
		super();
		this.user = user;
		this.balance = balance;
	}

	public void credit(double amount) {
		this.balance += amount;
	}

	public void debit(double amount) {
		this.balance -= amount;
	}

}
