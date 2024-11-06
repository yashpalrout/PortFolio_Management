import AddToFavorite from '@/components/elements/buttons/AddToFavorite';
import Share from '@/components/elements/buttons/Share';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { SERVER_URL } from '@/lib/consts';
import FundService from '@/services/fund.service';
import { notFound } from 'next/navigation';
import SectorChart from './_components/SectorChart';

export default async function Page({
	params: { fund_id },
}: {
	params: {
		fund_id: string;
	};
}) {
	const details = await FundService.getFund(fund_id);

	if (!details) {
		notFound();
	}

	const total_holdings = details.holdings?.reduce((acc, curr) => acc + curr.ratio, 0) ?? 0;

	return (
		<div className='w-full md:w-[80%]'>
			<div className='flex justify-between items-center'>
				<div className='font-bold text-2xl'>{details.fund.name}</div>
				<div className='flex gap-3 justify-between items-center'>
					<AddToFavorite fundId={fund_id} />
					<Share link={`${SERVER_URL}/console/funds/${fund_id}`} />
				</div>
			</div>

			<Separator />

			<div className='flex gap-16  mt-8'>
				<div className='flex-1'>
					<AssetCard title='NAV: (Today)' value={'$' + details.fund.assetNav} />
					<AssetCard title='Token Price:' value={'$' + details.fund.tokenPrice} />
				</div>
				<Separator orientation='vertical' className='h-24 w-[1px]' />
				<div className='flex-1'>
					<AssetCard title='Asset Size:' value={'$' + details.fund.assetSize} />
					<AssetCard title='Expense Ratio:' value={details.fund.expenseRatio.toString()} />
				</div>
			</div>

			{details.holdings.length > 0 && (
				<>
					<h3 className='font-semibold text-lg mt-8'>Holdings ({details.holdings.length})</h3>

					<div className='border rounded-md mt-4'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className='w-1/2'>Name</TableHead>
									<TableHead>Sector</TableHead>
									<TableHead className='text-right'>Assets</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{details.holdings.map((row, index) => (
									<TableRow key={index}>
										<TableCell className='font-medium'>{row.ticker.name}</TableCell>
										<TableCell>{row.ticker.sector}</TableCell>
										<TableCell className='text-right'>{row.ratio}%</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TableCell colSpan={2}>Total</TableCell>
									<TableCell className='text-right'>{total_holdings}%</TableCell>
								</TableRow>
							</TableFooter>
						</Table>
					</div>

					<h3 className='font-semibold text-lg mt-8'>Sector Allocations</h3>

					<SectorChart holdings={details.holdings} />
				</>
			)}
		</div>
	);
}

function AssetCard({ title, value }: { title: string; value: string }) {
	return (
		<div className='flex-1'>
			<div className='flex items-center justify-between py-4'>
				<span className='text-muted-foreground'>{title}</span>
				<span className='font-medium'>{value}</span>
			</div>
		</div>
	);
}
