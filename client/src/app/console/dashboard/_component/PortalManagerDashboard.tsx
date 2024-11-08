import { IPortalManagerOverview } from '@/types/overview';
import { FundComparison } from './FundComparison';

export default async function PortalManagerDashboard({
	details,
}: {
	details: IPortalManagerOverview;
}) {
	// const wallet_balance = await UserService.walletBalance();
	return (
		<div className='flex flex-col gap-3'>
			<div className='flex flex-col gap-6'>
				<div className='flex flex-row gap-6'>
					<FinancialCard title={'Total Asset'} nav={details.totalAsset} />
					<FinancialCard title={'Total NAV'} nav={details.totalNav} />
				</div>
				<div className='flex flex-row gap-6'>
					<CountCard title={'No. of Listed'} value={details.listed} />
					<CountCard title={'No. of IPO'} value={details.ipo} />
					<CountCard title={'No. of Non Listed'} value={details.nonListed} />
				</div>
				<div className='flex flex-row gap-6'>
					<CountCard title={'No. of Investors'} value={details.users} />
					<CountCard title={'Valuable Investors'} value={details.usersInvested} />
				</div>
			</div>

			{details.top5Comparison && details.top5Comparison.length > 0 && (
				<FundComparison details={details.top5Comparison} />
			)}

			{/* <UserValuationChart data={details.userValuations} /> */}
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

export function CountCard({ title, value }: { value: number; title: string }) {
	return (
		<div className='border w-72 h-28 rounded-lg p-4'>
			<div className='flex flex-col gap-2'>
				<div className='flex justify-between'>
					<div className='text-lg font-semibold text-gray-600 dark:text-gray-400'>{title}</div>
					<div className='font-bold text-lg'></div>
				</div>
				<div className='text-2xl font-bold text-primary'>{value.toLocaleString()}</div>
			</div>
		</div>
	);
}
