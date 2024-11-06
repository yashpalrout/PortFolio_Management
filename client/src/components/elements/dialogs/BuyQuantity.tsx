import { purchaseFund } from '@/actions/transaction.action';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
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
import { IFund } from '@/types/fund';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
export function BuyQuantity({ children, fund }: { children: React.ReactNode; fund: IFund }) {
	const { loading, run } = usePromise();
	const { toast } = useToast();

	const form = useForm({
		resolver: zodResolver(
			z.object({
				quantity: z.number().positive('Quantity must be a positive number'),
			})
		),
		defaultValues: {
			quantity: 0,
		},
	});

	const totalAmount = form.watch('quantity') * fund.tokenPrice;

	async function formSubmit(values: { quantity: number }) {
		await run(purchaseFund(fund.fundId.toString(), values.quantity)).then((res) => {
			if (res) {
				toast({
					title: 'Fund purchased successfully',
					description: 'You have successfully purchased the fund.',
					variant: 'success',
				});
				form.reset();
			} else {
				toast({
					title: 'Failed to purchase fund',
					description: 'Failed to purchase the fund. Please try again.',
					variant: 'destructive',
				});
				form.reset();
			}
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className='w-full'>{children}</div>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Purchase fund</DialogTitle>
					<DialogDescription>
						Purchase {fund.name} at ${fund.tokenPrice} per token.
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<Form {...form}>
						<form
							className='w-full space-y-2'
							method='post'
							onSubmit={form.handleSubmit(formSubmit)}
						>
							<div className='flex flex-col gap-1 w-full'>
								<FormField
									control={form.control}
									name='quantity'
									render={({ field }) => (
										<FormItem className='space-y-0 flex-1 max-w-md'>
											<FormLabel className='text-primary'>Quantity</FormLabel>
											<FormControl>
												<Input
													type='number'
													placeholder='100'
													value={field.value}
													onChange={(e) => field.onChange(Number(e.target.value))}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<DialogFooter>
									<DialogClose asChild>
										<Button
											type='submit'
											className='w-full mt-2'
											disabled={loading || totalAmount <= 0}
										>
											{loading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
											Pay ${totalAmount}
										</Button>
									</DialogClose>
								</DialogFooter>
							</div>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
