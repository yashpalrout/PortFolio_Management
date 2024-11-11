import { IFund } from './fund';

export type IUserOverview = {
	nav: number;
	userValuations: { [key: string]: number };
	top5Funds: IFund[];
};

export interface IPortalManagerOverview {
	totalAsset: number;
	listed: number;
	top5Comparison: { [key: string]: number }[];
	totalNav: number;
	ipo: number;
	usersInvested: number;
	users: number;
	nonListed: number;
}

export interface IFundManagerOverview {
	totalAsset: number;
	listed: number;
	top5Comparison: { [key: string]: number }[];
	totalNav: number;
	ipo: number;
	nonListed: number;
}

export type IManagerOverview = {
	nav: number;
	userValuations: { [key: string]: number };
	top5Funds: IFund[];
};
