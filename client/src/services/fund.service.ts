/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import api from '@/lib/api';
import { IPagination } from '@/types';
import { IFund } from '@/types/fund';

export default class FundService {
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
			console.error(e.response);
			return null;
		}
	}
}
