import FundService from '@/services/fund.service';
import { notFound } from 'next/navigation';
import { CreateFundButton } from '../_components/buttons';
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
		<div className='w-full relative'>
			<div className='flex justify-end top-0 right-0 absolute '>
				<CreateFundButton />
			</div>
			<DataTable title={'Mutual Funds'} records={data.data} maxRecord={data.pagination.total} />
		</div>
	);
}
