export type ITicker = {
	tickerId: number;
	name: string;
	symbol: string;
	sector: string;
	available: number;
};

export type OHLC = {
	date: string;
	open: number;
	high: number;
	low: number;
	close: number;
};
