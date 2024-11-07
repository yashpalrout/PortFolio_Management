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
import { useEffect, useState } from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { useUser } from '@/components/context/user-details';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import FundService from '@/services/fund.service';
import UserService from '@/services/user.service';
import { IUser } from '@/types/user';
import { useRouter } from 'next/navigation';

export default function AddFundManager({ fund_id }: { fund_id: string }) {
	const { toast } = useToast();
	const [loading, setLoading] = useState(true);
	const [records, setRecords] = useState<IUser[]>([]);
	const router = useRouter();
	const { profile } = useUser();

	const [selected, setSelected] = useState<{
		[key: string]: IUser | undefined;
	}>({
		[profile?.userId ?? '']: profile,
	});

	useEffect(() => {
		UserService.allUsers()
			.then((users) => setRecords(users?.filter((user) => user.role === 'FUND_MANAGER') ?? []))
			.finally(() => setLoading(false));
	}, [setLoading]);

	async function handleSave() {
		const resolved = Object.values(selected).map((user) => {
			if (!user) return true;
			return FundService.addManager(fund_id, user.userId);
		});

		const success = resolved.every(Boolean);

		if (success) {
			toast({
				title: 'Managers added successfully.',
				variant: 'success',
			});
			router.refresh();
		} else {
			toast({
				title: 'Failed to add managers.',
				variant: 'destructive',
			});
		}

		setSelected({});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='default'>Add Fund Manager</Button>
			</DialogTrigger>
			<DialogContent className='w-full sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px]'>
				<DialogHeader>
					<DialogTitle>Add Manager to the Fund</DialogTitle>
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
									<TableHead>Email</TableHead>
									<TableHead>Phone</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{records.map((user, index) => (
									<TableRow key={index}>
										<TableCell>
											<Checkbox
												checked={!!selected[user.userId]}
												onCheckedChange={(checked) => {
													setSelected((prev) => ({
														...prev,
														[user.userId]: checked ? user : undefined,
													}));
												}}
											/>
										</TableCell>
										<TableCell>{user.name}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.phone}</TableCell>
									</TableRow>
								))}

								{records.length === 0 && (
									<TableRow>
										<TableCell colSpan={4} className='text-center'>
											No records found
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>

				{Object.values(selected).filter((v) => v).length > 0 && (
					<DialogFooter>
						<DialogClose>
							<Button onClick={handleSave}>Add</Button>
						</DialogClose>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
}
