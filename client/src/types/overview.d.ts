import { IFund } from './fund';

export type IUserOverview = {
	nav: number;
	userValuations: { [key: string]: number };
	top5Funds: IFund[];
};

export type IManagerOverview = {
	nav: number;
	userValuations: { [key: string]: number };
	top5Funds: IFund[];
};
