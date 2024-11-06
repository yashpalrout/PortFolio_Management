import AddHolding from '@/components/elements/dialogs/AddHolding';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import FundService from '@/services/fund.service';
import { notFound } from 'next/navigation';

export default async function Page({
	params: { fund_id },
}: {
	params: {
		fund_id: string;
	};
}) {
	const fundDetails = await FundService.getFund(fund_id);

	if (!fundDetails) {
		notFound();
	}
	const fundHoldings = fundDetails.holdings;
	return (
		<div className='w-full pb-4 px-4'>
			<div className='justify-between flex mb-5'>
				<h2 className='text-2xl font-bold'>Holding</h2>
				{/* <div className='flex gap-x-2 gap-y-1 flex-wrap '> */}
				<AddHolding fund_id={fund_id} />
				{/* </div> */}
			</div>
			<div className='border border-dashed rounded-md'>
				<Table className='w-full '>
					<TableHeader>
						<TableRow>
							<TableHead className=''>Ticker</TableHead>
							<TableHead>Symbol</TableHead>
							<TableHead>Sector</TableHead>
							<TableHead className=''>Ratio(%)</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{fundHoldings?.map((holding) => (
							<TableRow key={holding.ticker.tickerId}>
								<TableCell>{holding.ticker.name}</TableCell>
								<TableCell>{holding.ticker.symbol}</TableCell>
								<TableCell>{holding.ticker.sector}</TableCell>
								<TableCell>{holding.ratio}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
