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
import { loginSchema } from '@/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Login() {
	const { loading, run } = usePromise();
	const searchParams = useSearchParams();
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function formSubmit(values: z.infer<typeof loginSchema>) {
		const result = await run(AuthService.login(values.email, values.password));

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
				<CardTitle>Login</CardTitle>
				<CardDescription>Sign in to your account to continue using the app.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className='w-full' method='post' onSubmit={form.handleSubmit(formSubmit)}>
						<div className='flex flex-col gap-1 w-full'>
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
								Login
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
