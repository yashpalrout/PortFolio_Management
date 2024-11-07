'use server';
import FundService from '@/services/fund.service';
import { revalidatePath } from 'next/cache';

export async function addToHolding(
	fundId: string,
	holdings: { tickerId: number; ratio: number }[]
) {
	const success = await FundService.addToHolding(fundId, holdings);
	revalidatePath('/funds/[fund_id]/holdings', 'page');
	return success;
}

export async function updateFundStatus(fundId: string, status: 'NOT_LISTED' | 'IPO' | 'LISTED') {
	const success = await FundService.updateStatus(fundId, status);
	revalidatePath('/console/funds/[fund_id]', 'page');
	return success;
}
