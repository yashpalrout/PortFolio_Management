/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '@/lib/api';
import { ITicker, OHLC } from '@/types/Ticker';

export default class StockService {
	static async search(searchTerm: string) {
		try {
			const { data } = await api.get(`/stock`, {
				params: {
					search: searchTerm,
				},
			});
			return data.data as ITicker[];
		} catch (err) {
			return [];
		}
	}

	static async addToInventory(stock: { symbol: string; name: string; sector: string }) {
		try {
			await api.post(`/stock/add-to-inventory`, stock);
			return true;
		} catch (err) {
			return false;
		}
	}

	static async allTickers() {
		try {
			const { data } = await api.get(`/stock/tickers`);
			return data.data as ITicker[];
		} catch (err) {
			return [];
		}
	}

	static async getOhlcData(ticker_id: string) {
		try {
			const { data } = await api.get(`/stock/tickers/${ticker_id}/ohlc`);
			return data.data as OHLC[];
		} catch (err) {
			return [];
		}
	}
}
