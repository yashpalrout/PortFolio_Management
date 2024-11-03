package com.fil.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.CreationTimestamp;

import com.fil.model.enums.TransactionType;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Data
@ToString
@Entity
public class FundTransaction {

	@Id
	@TableGenerator(name = "fund_transaction_id_generator", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "id_val", initialValue = 101, allocationSize = 0)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "fund_transaction_id_generator")
	private int fundTransactionId;

	@ManyToOne()
	@JoinColumn(name = "fund", nullable = false)
	private MutualFund fund;

	@ManyToOne()
	@JoinColumn(name = "user", nullable = false)
	private User user;

	private int quantity;
	private double amount;
	private double price;
	private TransactionType type;

	@CreationTimestamp
	private LocalDateTime createdAt;

	public FundTransaction(MutualFund fund, User user, int quantity, TransactionType type) {
		super();
		this.fund = fund;
		this.user = user;
		this.quantity = quantity;
		this.price = fund.getTokenPrice();
		this.amount = quantity * this.price;
		this.type = type;
	}

}
