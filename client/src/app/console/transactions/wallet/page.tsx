import TransactionService from '@/services/transaction.service';
import { notFound } from 'next/navigation';
import { DataTable } from './_components/data-table';

export default async function Page({
	searchParams,
}: {
	searchParams: {
		page: string;
		limit: string;
		search: string;
	};
}) {
	const data = await TransactionService.walletTransactions(searchParams);

	if (!data) {
		notFound();
	}
	const {
		data: records,
		pagination: { total },
	} = data;

	return (
		<div className='w-full relative'>
			<DataTable title={'Wallet Transactions'} records={records} maxRecord={total} />
		</div>
	);
}
