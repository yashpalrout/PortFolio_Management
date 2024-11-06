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
