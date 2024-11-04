/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export default function usePromise() {
	const [loading, setLoading] = useState<boolean>(false);

	async function run<T>(promise: Promise<T>): Promise<T> {
		setLoading(true);
		return promise
			.then((result) => {
				setLoading(false);
				return result;
			})
			.catch((e) => {
				setLoading(false);
				return Promise.reject(e instanceof Error ? e.message : 'An unknown error occurred');
			});
	}

	return { loading, run };
}
