package com.fil.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

import com.fil.model.MutualFund;

import lombok.Data;

@Data
public class CreateMutualFund {

	@NotBlank
	private String name;

	@PositiveOrZero
	private double initialTarget;

	@Positive
	private int tokenCount;

	@PositiveOrZero
	private double expenseRatio;

	@PositiveOrZero
	private double exitLoad;

	@PositiveOrZero
	private int exitLoadLimit;

	public MutualFund toMutualFund() {
		MutualFund mFund = new MutualFund(name, initialTarget, tokenCount);
		mFund.setExpenseRatio(expenseRatio);
		mFund.setExitLoad(exitLoad);
		mFund.setExitLoadLimit(exitLoadLimit);
		return mFund;
	}

}
