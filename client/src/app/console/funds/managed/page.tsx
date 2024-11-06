import CreateMutualFund from '@/components/elements/dialogs/CreateMutualFund';
import FundService from '@/services/fund.service';
import { notFound } from 'next/navigation';
import { DataTable } from '../_components/data-table';

export default async function Page({
	searchParams,
}: {
	searchParams: {
		page: string;
		limit: string;
		search: string;
	};
}) {
	const data = await FundService.getManagedByMe(searchParams);

	if (!data) {
		notFound();
	}

	return (
		<>
			<div className='flex justify-end -mt-8 mx-6'>
				<CreateMutualFund />
			</div>
			<DataTable title={'Mutual Funds'} records={data.data} maxRecord={data.pagination.total} />
		</>
	);
}
