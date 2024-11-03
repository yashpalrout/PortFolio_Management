package com.fil.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.TableGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Data
@ToString
@Entity
public class FundHolding {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "holding_id_generator")
	@TableGenerator(name = "holding_id_generator", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "id_val", initialValue = 101, allocationSize = 0)
	private int holdingId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "mutualFund", nullable = false)
	@JsonIgnore
	private MutualFund mutualFund;

	@ManyToOne()
	@JoinColumn(name = "ticker", nullable = false)
	private Ticker ticker;

	private double ratio;
	private double allocatedAmount;
	private double quantity;
	private double nav;

	public FundHolding(MutualFund mutualFund, Ticker ticker, double ratio) {
		super();
		this.mutualFund = mutualFund;
		this.ticker = ticker;
		this.ratio = ratio;
		this.allocatedAmount = 0;
		this.quantity = 0;
		this.nav = 0;
	}

}
