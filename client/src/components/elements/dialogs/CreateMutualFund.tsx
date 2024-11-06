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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import usePromise from '@/hooks/usePromise';
import FundService from '@/services/fund.service';
import { mutualFundSchema } from '@/validators/fund.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function CreateMutualFund() {
	const { toast } = useToast();

	const form = useForm({
		resolver: zodResolver(mutualFundSchema),
		defaultValues: {
			name: '',
			initialTarget: '',
			tokenCount: '',
			expenseRatio: '',
			exitLoad: '',
			exitLoadLimit: '',
		},
	});

	async function formSubmit(values: z.infer<typeof mutualFundSchema>) {
		const response = await FundService.addMutualFund(values);

		if (response) {
			toast({
				title: 'Mutual fund added successfully',
				description: 'The mutual fund has been added to your account.',
				variant: 'success',
			});
			form.reset();
		} else {
			toast({
				title: 'Failed to add mutual fund',
				description: 'An error occurred while adding the mutual fund.',
				variant: 'destructive',
			});
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='default'>Create Mutual Fund</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle>Create Mutual Fund</DialogTitle>
				</DialogHeader>
				<div className='py-4 space-y-4'>
					<Form {...form}>
						<form className='space-y-2' onSubmit={form.handleSubmit(formSubmit)}>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Fund Name</FormLabel>
										<FormControl>
											<Input placeholder='Growth Fund' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='initialTarget'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Initial Target</FormLabel>
										<FormControl>
											<Input type='number' placeholder='1000000.00' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='tokenCount'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Token Count</FormLabel>
										<FormControl>
											<Input type='number' placeholder='1000' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='expenseRatio'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Expense Ratio</FormLabel>
										<FormControl>
											<Input type='number' placeholder='0.75' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='exitLoad'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Exit Load</FormLabel>
										<FormControl>
											<Input type='number' placeholder='1.5' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='exitLoadLimit'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Exit Load Limit (days)</FormLabel>
										<FormControl>
											<Input type='number' placeholder='365' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter>
								<DialogClose asChild>
									<Button type='submit'>Add Mutual Fund</Button>
								</DialogClose>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
