package com.fil.market;

import java.util.List;
import java.util.Map;

import com.fil.model.OHLC;
import com.fil.model.StockData;
import com.fil.model.Ticker;

public interface StockMarket {

	List<Ticker> search(String query);

	StockData getStockData(String symbol);

	Map<String, OHLC> getDailyOHLC(String symbol);

	Map<String, OHLC> getWeeklyOHLC(String symbol);

	Map<String, OHLC> getMonthlyOHLC(String symbol);

}
