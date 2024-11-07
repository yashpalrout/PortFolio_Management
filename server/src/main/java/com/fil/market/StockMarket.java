package com.fil.market;

import com.fil.dto.OHLC;
import com.fil.exceptions.NotFoundException;
import com.fil.model.StockData;
import com.fil.model.Ticker;

import java.util.List;
import java.util.Map;

public interface StockMarket {

    List<Ticker> search(String query);

    StockData getStockData(String symbol) throws NotFoundException;

    String lastRefreshed(String symbol) throws NotFoundException;

    Map<String, OHLC> getDailyOHLC(String symbol) throws NotFoundException;

    Map<String, OHLC> getWeeklyOHLC(String symbol) throws NotFoundException;

    Map<String, OHLC> getMonthlyOHLC(String symbol) throws NotFoundException;

}
