package com.fil.model;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
public class StockData {
	@SerializedName("Symbol")
	private String symbol;
	@SerializedName("AssetType")
	private String assetType;
	@SerializedName("Name")
	private String name;
	@SerializedName("Description")
	private String description;
	@SerializedName("CIK")
	private String cik;
	@SerializedName("Exchange")
	private String exchange;
	@SerializedName("Currency")
	private String currency;
	@SerializedName("Country")
	private String country;
	@SerializedName("Sector")
	private String sector;
	@SerializedName("Industry")
	private String industry;
	@SerializedName("Address")
	private String address;
	@SerializedName("OfficialSite")
	private String officialSite;
	@SerializedName("FiscalYearEnd")
	private String fiscalYearEnd;
	@SerializedName("LatestQuarter")
	private String latestQuarter;
	@SerializedName("MarketCapitalization")
	private String marketCapitalization;
	@SerializedName("EBITDA")
	private String ebitda;
	@SerializedName("PERatio")
	private String peRatio;
	@SerializedName("PEGRatio")
	private String pegRatio;
	@SerializedName("BookValue")
	private String bookValue;
	@SerializedName("DividendPerShare")
	private String dividendPerShare;
	@SerializedName("DividendYield")
	private String dividendYield;
	@SerializedName("EPS")
	private String eps;
	@SerializedName("RevenuePerShareTtm")
	private String revenuePerShareTtm;
	@SerializedName("ProfitMargin")
	private String profitMargin;
	@SerializedName("OperatingMarginTtm")
	private String operatingMarginTtm;
	@SerializedName("ReturnOnAssetsTtm")
	private String returnOnAssetsTtm;
	@SerializedName("ReturnOnEquityTtm")
	private String returnOnEquityTtm;
	@SerializedName("RevenueTtm")
	private String revenueTtm;
	@SerializedName("GrossProfitTtm")
	private String grossProfitTtm;
	@SerializedName("DilutedEpsTtm")
	private String dilutedEpsTtm;
	@SerializedName("QuarterlyEarningsGrowthYoy")
	private String quarterlyEarningsGrowthYoy;
	@SerializedName("QuarterlyRevenueGrowthYoy")
	private String quarterlyRevenueGrowthYoy;
	@SerializedName("AnalystTargetPrice")
	private String analystTargetPrice;
	@SerializedName("AnalystRatingStrongBuy")
	private String analystRatingStrongBuy;
	@SerializedName("AnalystRatingBuy")
	private String analystRatingBuy;
	@SerializedName("AnalystRatingHold")
	private String analystRatingHold;
	@SerializedName("AnalystRatingSell")
	private String analystRatingSell;
	@SerializedName("AnalystRatingStrongSell")
	private String analystRatingStrongSell;
	@SerializedName("TrailingPe")
	private String trailingPe;
	@SerializedName("ForwardPe")
	private String forwardPe;
	@SerializedName("PriceToSalesRatioTtm")
	private String priceToSalesRatioTtm;
	@SerializedName("PriceToBookRatio")
	private String priceToBookRatio;
	@SerializedName("EVToRevenue")
	private String evToRevenue;
	@SerializedName("EVToEBITDA")
	private String evToEbitda;
	@SerializedName("Beta")
	private String beta;
	@SerializedName("_52WeekHigh")
	private String _52WeekHigh;
	@SerializedName("_52WeekLow")
	private String _52WeekLow;
	@SerializedName("_50DayMovingAverage")
	private String _50DayMovingAverage;
	@SerializedName("_200DayMovingAverage")
	private String _200DayMovingAverage;
	@SerializedName("SharesOutstanding")
	private String sharesOutstanding;
	@SerializedName("DividendDate")
	private String dividendDate;
	@SerializedName("ExDividendDate")
	private String exDividendDate;

	public static StockData fromJson(String json) {
		Gson gson = new Gson();
		return gson.fromJson(json, StockData.class);
	}

}
