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
import { useToast } from '@/hooks/use-toast';
import usePromise from '@/hooks/usePromise';
import UserService from '@/services/user.service';
import { passwordSchema } from '@/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
export function ChangePassword({ children }: { children: React.ReactNode }) {
	const { loading, run } = usePromise();
	const { toast } = useToast();

	const form = useForm({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			new_password: '',
			old_password: '',
		},
	});

	async function formSubmit(values: z.infer<typeof passwordSchema>) {
		await run(UserService.changePassword(values)).catch(() => {
			toast({
				title: 'Unable to change password',
				description: 'Your current password is incorrect. Please try again.',
				variant: 'destructive',
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
					<DialogTitle>Change password</DialogTitle>
					<DialogDescription>
						Create a new password for your account. Make sure it&apos;s secure.
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
									name='old_password'
									render={({ field }) => (
										<FormItem className='space-y-0 flex-1 max-w-md'>
											<FormLabel className='text-primary'>Current Password</FormLabel>
											<FormControl>
												<Input type='password' placeholder='xxxxxxxx' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='new_password'
									render={({ field }) => (
										<FormItem className='space-y-0 flex-1 max-w-md'>
											<FormLabel className='text-primary'>New Password</FormLabel>
											<FormControl>
												<Input type='password' placeholder='xxxxxxxx' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type='submit' className='w-full mt-2' disabled={loading}>
									{loading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
									Change password
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
