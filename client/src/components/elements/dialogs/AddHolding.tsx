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
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { useEffect, useState } from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import useDebounce from '@/hooks/useDebounce'; // Import the useDebounce hook
import FundService from '@/services/fund.service';
import StockService from '@/services/stock.service';
import { ITicker } from '@/types/Ticker';

export default function AddHolding({ fund_id }: { fund_id: string }) {
	const placeholders = ['Search for the ticker...', 'Symbol', 'Name', 'Example: AAPL'];

	const { toast } = useToast();
	const [ratio, setRatio] = useState(0);
	const [loading, setLoading] = useState(false);
	const [records, setRecords] = useState<ITicker[]>([]);

	const [selectedStocks, setSelectedStocks] = useState<{
		[key: string]: ITicker | undefined;
	}>({});

	useEffect(() => {
		StockService.allTickers()
			.then(setRecords)
			.finally(() => setLoading(false));
	}, [setLoading]);

	const clearSearch = () => {
		setRecords([]);
	};

	async function handleSave() {
		const resolved = Object.values(selectedStocks)
			.map((stock) => {
				if (!stock) return null;
				return {
					tickerId: stock.tickerId,
					ratio: Number(ratio),
				};
			})
			.filter((val) => val) as { tickerId: number; ratio: number }[];

		const success = await FundService.addToHolding(fund_id, resolved);

		if (success) {
			toast({
				title: 'Holding added successfully',
			});
			clearSearch();
		} else {
			toast({
				title: 'Failed to add Holding',
				variant: 'destructive',
			});
		}

		setSelectedStocks({});
		setRatio(0);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='default' className='w-28'>
					Add Holding
				</Button>
			</DialogTrigger>
			<DialogContent className='w-full sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px]'>
				<DialogHeader>
					<DialogTitle>Add Funds to the Portal</DialogTitle>
				</DialogHeader>

				{/* Conditionally render the table after search is submitted */}
				<div className='mt-6 overflow-x-auto'>
					{loading && <div className='text-center'>Loading...</div>}
					<div className='border border-dashed rounded-lg'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Select</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Symbol</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{records.map((stock, index) => (
									<TableRow key={index}>
										<TableCell>
											<Checkbox
												checked={!!selectedStocks[stock.symbol]}
												onCheckedChange={(checked) => {
													setSelectedStocks((prev) => ({
														...prev,
														[stock.symbol]: checked ? stock : undefined,
													}));
												}}
											/>
										</TableCell>
										<TableCell>{stock.name}</TableCell>
										<TableCell>{stock.symbol}</TableCell>
									</TableRow>
								))}

								{records.length === 0 && (
									<TableRow>
										<TableCell colSpan={3} className='text-center'>
											No records found
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>

				{Object.values(selectedStocks).filter((v) => v).length > 0 && (
					<DialogFooter>
						<Input
							placeholder='Ratio eg 30'
							value={ratio}
							onChange={(e) => setRatio(Number(e.target.value))}
						/>
						<DialogClose>
							<Button disabled={!ratio} onClick={handleSave}>
								Add
							</Button>
						</DialogClose>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
}
