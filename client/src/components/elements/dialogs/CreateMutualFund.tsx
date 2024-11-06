'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

import { useToast } from '@/hooks/use-toast';
import FundService from '@/services/fund.service';

export default function CreateMutualFund() {
	const { toast } = useToast();
	const [name, setName] = useState('');
	const [initialTarget, setInitialTarget] = useState<number | ''>('');
	const [tokenCount, setTokenCount] = useState<number | ''>('');
	const [expenseRatio, setExpenseRatio] = useState<number | ''>('');
	const [exitLoad, setExitLoad] = useState<number | ''>('');
	const [exitLoadLimit, setExitLoadLimit] = useState<number | ''>('');

	async function handleSave() {
		if (!name || !initialTarget || !tokenCount || !expenseRatio || !exitLoad || !exitLoadLimit) {
			toast({
				title: 'Please fill in all fields',
				variant: 'destructive',
			});
			return;
		}

		const response = await FundService.addMutualFund({
			name,
			initialTarget,
			tokenCount,
			expenseRatio,
			exitLoad,
			exitLoadLimit,
		});

		if (response) {
			toast({
				title: 'Mutual fund added successfully',
			});
			clearForm();
		} else {
			toast({
				title: 'Failed to add mutual fund',
				variant: 'destructive',
			});
		}
	}

	const clearForm = () => {
		setName('');
		setInitialTarget('');
		setTokenCount('');
		setExpenseRatio('');
		setExitLoad('');
		setExitLoadLimit('');
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='default'>Create Mutual Fund</Button>
			</DialogTrigger>
			<DialogContent className='w-full sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px]'>
				<DialogHeader>
					<DialogTitle>Create Mutual Fund</DialogTitle>
				</DialogHeader>
				<div className='py-4 space-y-4'>
					<Input
						placeholder='Fund Name (e.g., Growth Fund)'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						type='number'
						placeholder='Initial Target (e.g., 1000000.00)'
						value={initialTarget}
						onChange={(e) => setInitialTarget(parseFloat(e.target.value))}
					/>
					<Input
						type='number'
						placeholder='Token Count (e.g., 1000)'
						value={tokenCount}
						onChange={(e) => setTokenCount(parseInt(e.target.value))}
					/>
					<Input
						type='number'
						placeholder='Expense Ratio (e.g., 0.75)'
						value={expenseRatio}
						onChange={(e) => setExpenseRatio(parseFloat(e.target.value))}
					/>
					<Input
						type='number'
						placeholder='Exit Load (e.g., 1.5)'
						value={exitLoad}
						onChange={(e) => setExitLoad(parseFloat(e.target.value))}
					/>
					<Input
						type='number'
						placeholder='Exit Load Limit (days, e.g., 365)'
						value={exitLoadLimit}
						onChange={(e) => setExitLoadLimit(parseInt(e.target.value))}
					/>
				</div>
				<DialogFooter>
					<DialogClose>
						<Button
							onClick={handleSave}
							disabled={
								!name ||
								!initialTarget ||
								!tokenCount ||
								!expenseRatio ||
								!exitLoad ||
								!exitLoadLimit
							}
						>
							Add
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
