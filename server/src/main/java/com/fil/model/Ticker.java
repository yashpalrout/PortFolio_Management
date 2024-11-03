package com.fil.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Data
@ToString
@Entity
public class Ticker {

	@Id
	@TableGenerator(name = "ticker_id_generator", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "id_val", initialValue = 101, allocationSize = 0)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "ticker_id_generator")
	private int tickerId;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false, unique = true)
	private String symbol;

	private String sector;

	@ColumnDefault("0")
	private int available;

	@CreationTimestamp
	private LocalDateTime createdAt;

	public Ticker(String name, String symbol, String sector) {
		super();
		this.name = name;
		this.symbol = symbol;
		this.sector = sector;
		this.available = 0;
	}

	public Ticker(String name, String symbol, String sector, int available) {
		super();
		this.name = name;
		this.symbol = symbol;
		this.sector = sector;
		this.available = available;
	}

	public Ticker(String name, String symbol) {
		super();
		this.name = name;
		this.symbol = symbol;
	}

}
