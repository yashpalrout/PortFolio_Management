package com.fil.model;

import java.math.BigInteger;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
public class OHLC {
	private double open, high, low, close;
	private BigInteger volume;

}
