package com.fil.dto;

import javax.validation.constraints.NotBlank;

import com.fil.model.Ticker;

import lombok.Data;

@Data
public class AddToInventory {

	@NotBlank
	private String symbol;

	@NotBlank
	private String name;

	@NotBlank
	private String sector;

	public Ticker toTicker() {
		return new Ticker(name, symbol, sector);
	}

}
