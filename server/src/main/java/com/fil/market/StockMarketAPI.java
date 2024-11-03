package com.fil.market;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import com.fil.config.Environment;
import com.fil.model.OHLC;
import com.fil.model.StockData;
import com.fil.model.Ticker;

@Component
public class StockMarketAPI implements StockMarket {

	private static final String API_KEY;

	static {
		API_KEY = Environment.getProperty("alphavantage.apikey");
	}

	@Override
	public List<Ticker> search(String query) {
		List<Ticker> list = new ArrayList<Ticker>();
		try {

			String searchURL = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + query + "&apikey="
					+ API_KEY;
			URL url = new URL(searchURL);
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("GET");

			JSONObject jsonObject = getResponseObject(connection);

			JSONArray bestMatches = jsonObject.getJSONArray("bestMatches");

			for (int i = 0; i < bestMatches.length(); i++) {
				JSONObject stockInfo = bestMatches.getJSONObject(i);
				String symbol = stockInfo.getString("1. symbol");
				String name = stockInfo.getString("2. name");
				list.add(new Ticker(name, symbol));

			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return list;
	}

	@Override
	public StockData getStockData(String query) {
		try {
			String searchURL = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + query + "&apikey="
					+ API_KEY;

			URL url = new URL(searchURL);
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("GET");

			String response = getResponseString(connection);

			return StockData.fromJson(response);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Map<String, OHLC> getDailyOHLC(String symbol) {
		return getOHLC(symbol, "TIME_SERIES_DAILY", "Time Series (Daily)");
	}

	@Override
	public Map<String, OHLC> getWeeklyOHLC(String symbol) {
		return getOHLC(symbol, "TIME_SERIES_WEEKLY", "Weekly Time Series");
	}

	@Override
	public Map<String, OHLC> getMonthlyOHLC(String symbol) {
		return getOHLC(symbol, "TIME_SERIES_MONTHLY", "Monthly Time Series");
	}

	public Map<String, OHLC> getOHLC(String symbol, String timeFunction, String timeSeriesKey) {
		Map<String, OHLC> map = new HashMap<String, OHLC>();
		try {

			String searchURL = "https://www.alphavantage.co/query?function=" + timeFunction + "&symbol=" + symbol
					+ "&apikey=" + API_KEY;
			URL url = new URL(searchURL);
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("GET");

			JSONObject jsonObject = getResponseObject(connection);

			JSONObject timeSeries = jsonObject.getJSONObject(timeSeriesKey);

			for (String key : timeSeries.keySet()) {

				JSONObject ohclObj = timeSeries.getJSONObject(key);
				map.put(key,
						new OHLC(ohclObj.getDouble("1. open"), ohclObj.getDouble("2. high"),
								ohclObj.getDouble("3. low"), ohclObj.getDouble("4. close"),
								ohclObj.getBigInteger("5. volume")));
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return map;

	}

	private static String getResponseString(HttpURLConnection connection) {
		try {
			int responseCode = connection.getResponseCode();
			if (responseCode != HttpURLConnection.HTTP_OK) {
				return null;
			}
			BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String inputLine;
			StringBuilder response = new StringBuilder();

			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			in.close();

			return response.toString();
		} catch (Exception e) {
			return null;
		}
	}

	private static JSONObject getResponseObject(HttpURLConnection connection) {
		try {
			String response = getResponseString(connection);
			JSONObject jsonObject = new JSONObject(response.toString());
			return jsonObject;
		} catch (Exception e) {
			return null;
		}
	}

}
