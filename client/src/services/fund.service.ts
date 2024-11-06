/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import api from '@/lib/api';
import { IPagination } from '@/types';
import { IFund } from '@/types/fund';
import { ITicker } from '@/types/Ticker';
import { mutualFundSchema } from '@/validators/fund.validator';
import { z } from 'zod';

export default class FundService {
	static async addMutualFund(details: z.infer<typeof mutualFundSchema>) {
		try {
			const { data } = await api.post('/mutual-fund', {
				name: details.name,
				initialTarget: details.initialTarget,
				tokenCount: details.tokenCount,
				expenseRatio: details.expenseRatio,
				exitLoad: details.exitLoad,
				exitLoadLimit: details.exitLoadLimit,
			});
			return {
				success: true,
				mutualFund: data,
				error: null,
			};
		} catch (err) {
			console.error('Failed to add mutual fund:', err);
			return {
				success: false,
				mutualFund: null,
				error: 'Failed to add mutual fund...',
			};
		}
	}

	static async getFunds(searchParams: { page?: string; limit?: string; search?: string }) {
		try {
			const { data } = await api.get(`/mutual-fund`, {
				params: {
					page: searchParams.page || '1',
					size: searchParams.limit || '20',
					name: searchParams.search,
				},
			});

			return {
				data: data.data as IFund[],
				pagination: data.pagination as IPagination,
			};
		} catch (e: any) {
			console.log(e);
			return null;
		}
	}

	static async getInvestedFunds(searchParams: { page?: string; limit?: string; search?: string }) {
		try {
			const { data } = await api.get(`/mutual-fund/list-invested`, {
				params: {
					page: searchParams.page || '1',
					size: searchParams.limit || '20',
					name: searchParams.search,
				},
			});

			return {
				data: data.data as IFund[],
				pagination: data.pagination as IPagination,
			};
		} catch (e: any) {
			return null;
		}
	}

	static async getFavoriteFunds(searchParams: { page?: string; limit?: string; search?: string }) {
		try {
			const { data } = await api.get(`/mutual-fund/favorite`, {
				params: {
					page: searchParams.page || '1',
					size: searchParams.limit || '20',
					name: searchParams.search,
				},
			});

			return {
				data: data.data as IFund[],
				pagination: data.pagination as IPagination,
			};
		} catch (e: any) {
			return null;
		}
	}

	static async getIPOs(searchParams: { page?: string; limit?: string; search?: string }) {
		try {
			const { data } = await api.get(`/mutual-fund/ipo`, {
				params: {
					page: searchParams.page || '1',
					size: searchParams.limit || '20',
					name: searchParams.search,
				},
			});

			return {
				data: data.data as IFund[],
				pagination: data.pagination as IPagination,
			};
		} catch (e: any) {
			return null;
		}
	}

	static async getFund(fundId: string) {
		try {
			const {
				data: { data },
			} = await api.get(`/mutual-fund/${fundId}`);
			return {
				fund: data.fund as IFund,
				holdings: data.holdings as {
					ticker: ITicker;
					ratio: number;
					nav: number;
					quantity: number;
					allocatedAmount: number;
				}[],
			};
		} catch (e: any) {
			return null;
		}
	}

	static async addToFavorite(fundId: string) {
		try {
			await api.post(`/mutual-fund/${fundId}/add-to-favorite`);
			return true;
		} catch (e: any) {
			return false;
		}
	}

	static async removeFromFavorite(fundId: string) {
		try {
			await api.post(`/mutual-fund/${fundId}/remove-from-favorite`);
			return true;
		} catch (e: any) {
			return false;
		}
	}

	static async isFavorite(fundId: string) {
		try {
			const { data } = await api.get(`/mutual-fund/${fundId}/is-favorite`);
			return data.isFavorite as boolean;
		} catch (e: any) {
			return false;
		}
	}

	static async addToHolding(fundId: string, holdings: { tickerId: number; ratio: number }[]) {
		try {
			await api.post(`/mutual-fund/${fundId}/add-fund-holding`, { holdings });
			return true;
		} catch (err) {
			return false;
		}
	}
}
