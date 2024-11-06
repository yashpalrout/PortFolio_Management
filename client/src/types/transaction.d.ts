import { IFund } from './fund';

export type IWalletTransaction = {
	walletTransactionId: number;
	transactionType: string;
	balanceAtTime: number;
	amount: number;
	reason: string;
	transactionTime: string;
};

export type IFundTransaction = {
	fundTransactionId: number;
	quantity: number;
	amount: number;
	price: number;
	type: string;
	createdAt: string;
	fund: IFund;
};
