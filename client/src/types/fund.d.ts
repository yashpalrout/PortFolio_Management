export type IFund = {
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
};
