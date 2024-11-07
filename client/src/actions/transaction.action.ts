'use server';
import TransactionService from '@/services/transaction.service';
import { revalidatePath } from 'next/cache';

export async function purchaseFund(fundId: string, quantity: number) {
	const success = await TransactionService.purchaseFund(fundId, quantity);
	revalidatePath('/console/funds/[fund_id]', 'page');
	return success;
}

export async function sellFund(fundId: string, quantity: number) {
	const success = await TransactionService.sellFund(fundId, quantity);
	revalidatePath('/console/funds/[fund_id]', 'page');
	return success;
}
