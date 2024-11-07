package com.fil.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.math.BigInteger;

@Data
@AllArgsConstructor
@ToString
public class OHLC {
    private String date;
    private double open, high, low, close;
    private BigInteger volume;


    public double calculateProfit() {
        return (close - open) / open;
    }

}
