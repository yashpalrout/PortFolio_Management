'use client';
import { useToast } from '@/hooks/use-toast';
import { FaShare } from 'react-icons/fa';

export default function AddToFavorite({ link }: { link: string }) {
	const { toast } = useToast();
	function copyToClipboard() {
		navigator.clipboard.writeText(link);
		toast({
			title: 'Link copied to clipboard',
			variant: 'success',
			duration: 3000,
		});
	}

	return (
		<div
			className='rounded-full bg-sidebar-accent w-10 h-10 flex justify-center items-center cursor-pointer'
			onClick={copyToClipboard}
		>
			<FaShare />
		</div>
	);
}
