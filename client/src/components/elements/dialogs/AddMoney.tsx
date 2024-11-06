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
import UserService from '@/services/user.service';
import { addMoneySchema } from '@/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
export function AddMoney({ children }: { children: React.ReactNode }) {
	const { loading, run } = usePromise();
	const { toast } = useToast();

	const form = useForm({
		resolver: zodResolver(addMoneySchema),
		defaultValues: {
			amount: '0',
		},
	});

	async function formSubmit(values: z.infer<typeof addMoneySchema>) {
		await run(UserService.addBalance(Number(values.amount))).then((res) => {
			if (res) {
				toast({
					title: 'Money added successfully',
					description: 'Your account balance has been updated.',
					variant: 'success',
				});
			} else {
				toast({
					title: 'Unable to add money',
					description: 'An error occurred while adding money to your account.',
					variant: 'destructive',
				});
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
					<DialogTitle>Add Money</DialogTitle>
					<DialogDescription>
						Add money to your account to start investing in funds.
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
									name='amount'
									render={({ field }) => (
										<FormItem className='space-y-0 flex-1 max-w-md'>
											<FormLabel className='text-primary'>Amount</FormLabel>
											<FormControl>
												<Input type='number' placeholder='10000' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<DialogFooter>
									<DialogClose asChild>
										<Button type='submit' className='w-full mt-2' disabled={loading}>
											{loading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
											Continue
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
