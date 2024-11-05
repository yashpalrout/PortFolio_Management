import { AuthDialog } from '@/components/elements/dialogs/AuthDialog';
import AuthService from '@/services/auth.service';
import Link from 'next/link';

export default async function Home() {
	const isAuthenticated = await AuthService.isAuthenticated();

	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
				<div className='flex gap-4 items-center flex-col sm:flex-row'>
					{!isAuthenticated ? (
						<AuthDialog />
					) : (
						<Link href='/console/dashboard'> Continue to Dashboard</Link>
					)}
				</div>
			</main>
		</div>
	);
}
