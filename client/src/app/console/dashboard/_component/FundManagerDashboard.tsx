import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { IFund } from '@/types/fund';
import { IUserOverview } from '@/types/overview';

export default async function FundManagerDashboard({ details }: { details: IUserOverview }) {
	// const wallet_balance = await UserService.walletBalance();
	console.log(details);
	return (
		<div className='flex flex-col gap-3'>
			<div className='flex gap-12'>
				<div className='flex flex-col gap-6'>
					{/* <FinancialCard title={'Total Investments'} nav={details.nav} />
					<FinancialCard title={'Wallet Balance'} nav={wallet_balance} /> */}
				</div>
				{/* <Top5Funds funds={details.top5Funds} /> */}
			</div>

			{/* <UserValuationChart data={details.userValuations} /> */}
		</div>
	);
}

export function Top5Funds({ funds }: { funds: IFund[] }) {
	return (
		<div className='w-full'>
			<h2 className='text-2xl font-semibold text-gray-600 dark:text-gray-400'>Top 5 Funds</h2>
			<div className='border rounded-md'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead className='text-right'>Asset Size</TableHead>
							<TableHead className='text-right'>Asset Nav</TableHead>
							<TableHead className='text-right'>Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{funds.map((fund) => (
							<TableRow key={fund.fundId}>
								<TableCell className='font-medium'>{fund.name}</TableCell>
								<TableCell className='text-right'>${fund.assetSize}</TableCell>
								<TableCell className='text-right'>${fund.assetNav}</TableCell>
								<TableCell className='text-right'>${fund.tokenPrice}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

export function FinancialCard({ title, nav }: { nav: number; title: string }) {
	return (
		<div className='border w-72 h-28 rounded-lg p-4'>
			<div className='flex flex-col gap-2'>
				<div className='flex justify-between'>
					<div className='text-lg font-semibold text-gray-600 dark:text-gray-400'>{title}</div>
					<div className='font-bold text-lg'>$</div>
				</div>
				<div className='text-2xl font-bold text-primary'>${nav.toLocaleString()}</div>
			</div>
		</div>
	);
}
