import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import FundService from '@/services/fund.service';
import AddHolding from '@/components/elements/dialogs/AddHolding';

export default async function Page({
	params: { fund_id },
}: {
	params: {
		fund_id: string;
	};
}) {
	const fundDetails = await FundService.getFund(fund_id);
	console.log("Holding details");
	const fundHoldings = fundDetails?.holdings;
	console.log(fundDetails?.holdings);
	return (
		<div className='border border-dashed rounded-md'>
			<div className='justify-between flex mb-5'>
				<h2 className='text-2xl font-bold'>Holding</h2>
				{/* <div className='flex gap-x-2 gap-y-1 flex-wrap '> */}
					<AddHolding fund_id={fund_id}/>
				{/* </div> */}
			</div>
			<Table className='w-full '>
				<TableCaption>List of all Holdings</TableCaption>
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
	);
}
