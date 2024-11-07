import { Metadata } from 'next';
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
	return (
		<Suspense fallback={<LoadingPage />}>
			<div className='w-full h-full flex justify-center'>{children}</div>
		</Suspense>
	);
}
