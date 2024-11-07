export interface IUserOverview {
	nav: number;
	userValuations: { [key: string]: number };
	top5Funds: Top5Fund[];
}

export interface Top5Fund {
	fundId: number;
	name: string;
	initialTarget: number;
	assetSize: number;
	assetNav: number;
	tokenCount: number;
	tokenPrice: number;
	expenseRatio: number;
	exitLoad: number;
	exitLoadLimit: number;
	inHand: number;
	status: string;
	createdAt: Date;
}
