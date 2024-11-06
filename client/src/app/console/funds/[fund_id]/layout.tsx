import UserService from '@/services/user.service';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import LoadingPage from './loading';

export const metadata: Metadata = {
	title: 'Fund Details • Investment Portfolio',
};

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [userDetails, wallet_balance] = await Promise.all([
		UserService.userDetails(),
		UserService.walletBalance(),
	]);

	if (!userDetails) {
		redirect('/auth');
	}

	return (
		<Suspense fallback={<LoadingPage />}>
			<div className='w-full h-full flex justify-center'>{children}</div>
		</Suspense>
	);
}
