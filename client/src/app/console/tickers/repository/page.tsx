import AddStock from '@/components/elements/dialogs/AddStock';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import StockService from '@/services/stock.service';

export default async function Page() {
	const tickers = await StockService.allTickers();

	return (
		<div className='px-4 pb-4'>
			<div className='justify-between flex'>
				<h2 className='text-2xl font-bold'>Tickers</h2>
				<div className='flex gap-x-2 gap-y-1 flex-wrap '>
					<AddStock />
				</div>
			</div>

			<div className='border border-dashed rounded-md mt-4'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-1/2'>Name</TableHead>
							<TableHead>Symbol</TableHead>
							<TableHead>Sector</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tickers.map((ticker) => (
							<TableRow key={ticker.tickerId}>
								<TableCell className='font-medium'>{ticker.name}</TableCell>
								<TableCell>{ticker.symbol}</TableCell>
								<TableCell>{ticker.sector}</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={3} className='text-center font-bold'>
								Total {tickers.length} Records Found
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</div>
	);
}
