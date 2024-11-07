import { AuthDialog } from '@/components/elements/dialogs/AuthDialog';
import AuthService from '@/services/auth.service';
import Link from 'next/link';
import AccordionPage from './_components/AccordionPage';
import { BackgroundLinesDemo } from './_components/BackgroundLine';
import { AppleCardsCarouselDemo } from './_components/CorouselPage';
import Footer from './_components/Footer';

export default async function Home() {
	const isAuthenticated = await AuthService.isAuthenticated();

	return (
		<div className='min-h-screen flex flex-col bg-black text-white'>
			{/* Navbar Section */}
			{/* <CustomNavbar /> */}

			<main className='flex-grow flex flex-col items-center gap-12 p-8 pb-20 sm:p-20'>
				{/* Background Animation */}
				<BackgroundLinesDemo />

				{/* Auth Check */}
				<div className='absolute bottom-[10%] left-1/2 transform -translate-x-1/2 flex flex-col gap-6 items-center w-full'>
					{!isAuthenticated ? (
						<AuthDialog />
					) : (
						<Link
							href='/console/dashboard'
							className='px-6 py-3 bg-neutral-800 text-neutral-50 font-medium rounded-md hover:bg-neutral-900 transition bounce'
						>
							Continue to Dashboard
						</Link>
					)}
				</div>

				{/* Accordion Section */}
				<AccordionPage />

				{/* Apple Cards Carousel Section */}
				<AppleCardsCarouselDemo />
			</main>

			{/* Footer Section */}
			<Footer />
		</div>
	);
}
