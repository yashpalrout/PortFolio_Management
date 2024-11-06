'use client';
import { updateFundStatus } from '@/actions/fund.action';
import { useUser } from '@/components/context/user-details';
import AddFundManager from '@/components/elements/dialogs/AddFundManager';
import { BuyQuantity } from '@/components/elements/dialogs/BuyQuantity';
import { SellQuantity } from '@/components/elements/dialogs/SellQuantity';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { IFund } from '@/types/fund';

export default function ActionPanel({ fund }: { fund: IFund }) {
	const { profile } = useUser();
	const { toast } = useToast();

	async function handleUpdateFundStatus(status: 'NOT_LISTED' | 'IPO' | 'LISTED') {
		const toastId = toast({
			title: 'Updating...',
			duration: 600000,
		});
		const success = await updateFundStatus(fund.fundId.toString(), status);
		toastId.dismiss();
		if (success) {
			toast({
				title: 'Fund status updated successfully.',
				variant: 'success',
			});
		} else {
			toast({
				title: 'Failed to update fund status.',
				variant: 'destructive',
			});
		}
	}

	return (
		<div className='w-96 p-4 bg-sidebar-accent rounded-md'>
			{profile?.role === 'FUND_MANAGER' ? (
				<div className='flex flex-col gap-3'>
					<AddFundManager fund_id={fund.fundId.toString()} />
					{fund.status === 'NOT_LISTED' ? (
						<div className='flex gap-3'>
							<a className='w-full' href={`/console/funds/${fund.fundId}/holdings`}>
								<Button className='w-full'>Manage Holdings</Button>
							</a>
							<Button className='w-full' onClick={() => handleUpdateFundStatus('IPO')}>
								Release IPO
							</Button>
						</div>
					) : fund.status === 'IPO' ? (
						<div className='flex gap-3'>
							<Button
								className='w-full'
								variant={'success'}
								disabled={fund.assetSize < fund.initialTarget}
								onClick={() => handleUpdateFundStatus('LISTED')}
							>
								Create Listing
							</Button>
						</div>
					) : null}
				</div>
			) : profile?.role === 'INVESTOR' ? (
				<div>
					{fund.status === 'NOT_LISTED' ? null : fund.status === 'IPO' ? (
						<div className='flex gap-3'>
							<BuyQuantity fund={fund}>
								<Button variant='success' className='w-full'>
									Buy
								</Button>
							</BuyQuantity>
						</div>
					) : (
						<div className='flex gap-3'>
							<BuyQuantity fund={fund}>
								<Button variant='success' className='w-full'>
									Buy
								</Button>
							</BuyQuantity>
							<SellQuantity fund={fund}>
								<Button variant={'destructive'} className='w-full'>
									Sell
								</Button>
							</SellQuantity>
						</div>
					)}
				</div>
			) : (
				<div>Status : {fund.status} & No Actions to perform.</div>
			)}
		</div>
	);
}
