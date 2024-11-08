'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import usePromise from '@/hooks/usePromise';
import AuthService from '@/services/auth.service';
import { registerSchema } from '@/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type RegisterRole = z.infer<typeof registerSchema>['role'];

export default function Register({
	preventDefault,
	onSubmit,
}: {
	preventDefault?: boolean;
	onSubmit?: (values: z.infer<typeof registerSchema>) => void;
}) {
	const { loading, run } = usePromise();
	const searchParams = useSearchParams();
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
			phone: '',
			dob: '',
			role: 'INVESTOR' as RegisterRole,
		},
	});

	async function formSubmit(values: z.infer<typeof registerSchema>) {
		if (preventDefault) {
			if (onSubmit) {
				onSubmit(values);
			}
			return;
		}
		const result = await run(AuthService.register(values));

		if (result.authenticated) {
			if (searchParams.get('callback')) {
				router.push(searchParams.get('callback') ?? '/');
			} else {
				router.push('/console/dashboard');
			}
		} else {
			form.setError('email', { message: result.error ?? '' });
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Register</CardTitle>
				<CardDescription>Provide your details to create an account.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className='w-full space-y-2' method='post' onSubmit={form.handleSubmit(formSubmit)}>
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
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem className='space-y-0 flex-1 max-w-md'>
										<FormLabel className='text-primary'>Email</FormLabel>
										<FormControl>
											<Input placeholder='eg. abc@xyz.com' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem className='space-y-0 flex-1 max-w-md'>
										<FormLabel className='text-primary'>Password</FormLabel>
										<FormControl>
											<Input type='password' placeholder='xxxxxxxx' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type='submit' className='w-full mt-2' disabled={loading}>
								{loading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
								Register
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
