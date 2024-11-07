import { IFund } from './fund';

export interface IUserOverview {
	nav: number;
	userValuations: { [key: string]: number };
	top5Funds: IFund[];
}
