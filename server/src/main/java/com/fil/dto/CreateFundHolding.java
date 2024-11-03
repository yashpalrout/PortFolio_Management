package com.fil.dto;

import java.util.List;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class CreateFundHolding {

	@Data
	public static class Holding {

		private int tickerId;
		private double ratio;
	}

	@NotEmpty
	private List<Holding> holdings;

}
