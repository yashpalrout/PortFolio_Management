/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import api from '@/lib/api';
import { IPagination } from '@/types';
import { IFundTransaction, IWalletTransaction } from '@/types/transaction';

export default class TransactionService {
	static async purchaseFund(fundId: string, qty: number) {
		try {
			await api.post(`/mutual-fund/${fundId}/transaction/purchase`, {
				qty,
			});
			return true;
		} catch (err) {
			return false;
		}
	}

	static async sellFund(fundId: string, qty: number) {
		try {
			await api.post(`/mutual-fund/${fundId}/transaction/sell`, {
				qty,
			});
			return true;
		} catch (err) {
			return false;
		}
	}

	static async walletTransactions(searchParams: { page: string; limit: string; search: string }) {
		try {
			const { data } = await api.get('/transactions/wallet', {
				params: {
					page: searchParams.page || '1',
					size: searchParams.limit || '20',
					name: searchParams.search,
				},
			});
			return {
				data: data.data as IWalletTransaction[],
				pagination: data.pagination as IPagination,
			};
		} catch (err) {
			return null;
		}
	}

	static async fundTransactions(searchParams: { page: string; limit: string; search: string }) {
		try {
			const { data } = await api.get('/transactions/funds', {
				params: {
					page: searchParams.page || '1',
					size: searchParams.limit || '20',
					name: searchParams.search,
				},
			});
			return {
				data: data.data as IFundTransaction[],
				pagination: data.pagination as IPagination,
			};
		} catch (err) {
			return null;
		}
	}
}
