'use client';
import FundService from '@/services/fund.service';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function AddToFavorite({ fundId }: { fundId: string }) {
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		FundService.isFavorite(fundId).then((isFavorite) => {
			setIsFavorite(isFavorite);
		});
	}, [fundId]);

	function toggleFavorite() {
		const promise = isFavorite
			? FundService.removeFromFavorite(fundId)
			: FundService.addToFavorite(fundId);

		promise.then((success) => {
			if (success) {
				setIsFavorite(!isFavorite);
			}
		});
	}

	return (
		<div
			className='rounded-full bg-sidebar-accent w-10 h-10 flex justify-center items-center cursor-pointer'
			onClick={toggleFavorite}
		>
			{isFavorite ? <FaHeart className='w-5 h-5' /> : <FaRegHeart className='w-5 h-5' />}
		</div>
	);
}
