'use client';
import { useUser } from '@/components/context/user-details';
import { Button } from '@/components/ui/button';
import { IFund } from '@/types/fund';

export default function ActionPanel({ fund }: { fund: IFund }) {
	const { profile } = useUser();
	return (
		<div className='w-96 p-4 bg-sidebar-accent rounded-md'>
			{profile?.role === 'FUND_MANAGER' ? (
				fund.status === 'NOT_LISTED' ? (
					<Button className='w-full'>Release IPO</Button>
				) : fund.status === 'IPO' ? (
					<div className='flex gap-3'>
						<a className='w-full' href={`/console/funds/${fund.fundId}/holdings`}>
							<Button className='w-full'>Manage Holdings</Button>
						</a>
						<Button className='w-full'>Create Listing</Button>
					</div>
				) : (
					<div>Status : {fund.status} & No Actions to perform.</div>
				)
			) : profile?.role === 'INVESTOR' ? (
				<div className='flex gap-3'>
					<Button className='w-full'>Buy</Button>
					<Button variant={'destructive'} className='w-full'>
						Sell
					</Button>
				</div>
			) : (
				<div>Status : {fund.status} & No Actions to perform.</div>
			)}
		</div>
	);
}
