import { Metadata } from 'next';
import { Suspense } from 'react';
import LoadingPage from './loading';

export const metadata: Metadata = {
	title: 'Auth • Investment Portfolio',
};

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Suspense fallback={<LoadingPage />}>
			<div className='w-screen h-screen flex justify-center items-center'>{children}</div>
		</Suspense>
	);
}
