import { UserProvider } from '@/components/context/user-details';
import { AppSidebar } from '@/components/elements/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
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
	const [userDetails, wallet_balance] = await Promise.all([
		UserService.userDetails(),
		UserService.walletBalance(),
	]);

	if (!userDetails) {
		redirect('/auth');
	}

	return (
		<Suspense fallback={<LoadingPage />}>
			<main className='w-full h-full '>
				<UserProvider data={userDetails!}>
					<SidebarProvider>
						<AppSidebar user={userDetails} wallet_balance={wallet_balance} />
						<div>
							<SidebarTrigger />
							{children}
						</div>
					</SidebarProvider>
				</UserProvider>
			</main>
		</Suspense>
	);
}
