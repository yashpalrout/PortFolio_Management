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
import StockService from '@/services/stock.service';
import { ITicker } from '@/types/ticker';

export default function AddStock() {
	const placeholders = ['Search for the ticker...', 'Symbol', 'Name', 'Example: AAPL'];

	const { toast } = useToast();
	const [sector, setSector] = useState('');
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [records, setRecords] = useState<ITicker[]>([]);

	const [selectedStocks, setSelectedStocks] = useState<{
		[key: string]: ITicker | undefined;
	}>({});

	// Use the useDebounce hook to debounce the searchTerm
	const debouncedTerm = useDebounce(searchTerm, 1000); // 1 second delay

	// Fetch or filter data based on `debouncedTerm`
	useEffect(() => {
		if (debouncedTerm) {
			setLoading(true);
			StockService.search(debouncedTerm)
				.then(setRecords)
				.finally(() => setLoading(false));
		} else {
			setRecords([]);
		}
	}, [debouncedTerm, setLoading]);

	const clearSearch = () => {
		setSearchTerm('');
		setRecords([]);
	};

	async function handleSave() {
		const resolved = await Promise.all(
			Object.values(selectedStocks).map(async (stock) => {
				if (!stock) return true;
				return await StockService.addToInventory({
					symbol: stock.symbol,
					name: stock.name,
					sector,
				});
			})
		);

		if (resolved.every(Boolean)) {
			toast({
				title: 'Stocks added successfully',
			});
			clearSearch();
		} else {
			toast({
				title: 'Failed to add stocks',
				variant: 'destructive',
			});
		}

		setSelectedStocks({});
		setSector('');
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='default' className='w-28'>
					Add Stock
				</Button>
			</DialogTrigger>
			<DialogContent className='w-full sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px]'>
				<DialogHeader>
					<DialogTitle>Add Stock to the Portal</DialogTitle>
				</DialogHeader>
				<div className='py-4'>
					<PlaceholdersAndVanishInput
						placeholders={placeholders}
						onChange={setSearchTerm}
						onSubmit={clearSearch}
					/>
				</div>

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

				{Object.keys(selectedStocks).length > 0 && (
					<DialogFooter>
						<Input
							placeholder='Sector eg. Medical'
							value={sector}
							onChange={(e) => setSector(e.target.value)}
						/>
						<DialogClose>
							<Button disabled={!sector} onClick={handleSave}>
								Add
							</Button>
						</DialogClose>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
}
