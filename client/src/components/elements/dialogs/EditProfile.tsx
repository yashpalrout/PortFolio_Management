import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
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
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import usePromise from '@/hooks/usePromise';
import UserService from '@/services/user.service';
import { IUser } from '@/types/user';
import { userDetailsSchema } from '@/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function EditProfile({ children, user }: { children: React.ReactNode; user: IUser }) {
	const { loading, run } = usePromise();
	const { toast } = useToast();

	const form = useForm({
		resolver: zodResolver(userDetailsSchema),
		defaultValues: user,
	});

	async function formSubmit(values: z.infer<typeof userDetailsSchema>) {
		await run(UserService.update(values)).catch(() => {
			toast({
				title: 'Unable to update profile',
				description: 'An error occurred while updating your profile. Please try again.',
				variant: 'destructive',
				action: (
					<ToastAction altText='Try again' onClick={() => formSubmit(values)}>
						Try again
					</ToastAction>
				),
			});
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className='w-full'>{children}</div>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you&apos;re done.
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
									name='name'
									render={({ field }) => (
										<FormItem className='space-y-0 flex-1 max-w-md'>
											<FormLabel className='text-primary'>Name</FormLabel>
											<FormControl>
												<Input placeholder='eg. John Doe' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='phone'
									render={({ field }) => (
										<FormItem className='space-y-0 flex-1 max-w-md'>
											<FormLabel className='text-primary'>Phone</FormLabel>
											<FormControl>
												<Input type='tel' placeholder='eg. 9199XXXXXXXX99' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='dob'
									render={({ field }) => (
										<FormItem className='space-y-0 flex-1 max-w-md'>
											<FormLabel className='text-primary'>Date of Birth</FormLabel>
											<FormControl>
												<Input type='date' placeholder='eg. 2000-01-01' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type='submit' className='w-full mt-2' disabled={loading}>
									{loading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
									Save
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
