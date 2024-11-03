package com.fil.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Data
@ToString
@Entity
public class TickerTransaction {

	@Id
	@TableGenerator(name = "ticker_transaction_id_generator", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "id_val", initialValue = 101, allocationSize = 0)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "ticker_transaction_id_generator")
	private int tickerTransactionId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ticker", nullable = false)
	private Ticker ticker;

	private double amount;
	private double price;
	private double quantity;

	@CreationTimestamp
	private LocalDateTime createdAt;

	public TickerTransaction(Ticker ticker, double price, double quantity) {
		super();
		this.ticker = ticker;
		this.amount = price * quantity;
		this.price = price;
		this.quantity = quantity;
	}

}
