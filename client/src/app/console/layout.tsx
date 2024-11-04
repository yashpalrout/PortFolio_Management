import { UserProvider } from '@/components/context/user-details';
import UserService from '@/services/user.service';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import LoadingPage from './loading';

export const metadata: Metadata = {
	title: 'Dashboard • Investment Portfolio',
};

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [userDetails] = await Promise.all([UserService.userDetails()]);

	// if (!userDetails) {
	// 	redirect('/auth');
	// }

	return (
		<Suspense fallback={<LoadingPage />}>
			<main className='w-full h-full '>
				<UserProvider data={userDetails!}>{children}</UserProvider>
			</main>
		</Suspense>
	);
}
