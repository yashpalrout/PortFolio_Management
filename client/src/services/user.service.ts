/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '@/lib/api';
import { IUser } from '@/types/user';
import { registerSchema } from '@/validators/auth.validator';
import axios from 'axios';
import { z } from 'zod';

export default class UserService {
	static async userDetails() {
		try {
			const { data } = await api.get(`/user/details`);
			return data.user as IUser;
		} catch (err) {
			return null;
		}
	}

	static async walletBalance() {
		try {
			const { data } = await api.get(`/user/wallet-balance`);
			return data.balance as number;
		} catch (err) {
			return 0;
		}
	}

	static async addBalance(amount: number) {
		try {
			await api.post(`/user/add-balance`, {
				amount,
			});
			return true;
		} catch (err) {
			return false;
		}
	}

	static async addUser(details: z.infer<typeof registerSchema>) {
		try {
			const { data } = await api.post(`/auth/register`, {
				email: details.email,
				password: details.password,
				name: details.name,
				dob: details.dob,
				phone: details.phone,
			});
			return {
				authenticated: true,
				user: data.user as IUser,
				error: null,
			};
		} catch (err) {
			if (axios.isAxiosError(err)) {
				if (err.response?.status === 409) {
					return {
						authenticated: false,
						user: null,
						error: 'User already exists...',
					};
				}
			}
			return {
				authenticated: true,
				user: null,
				error: 'An error occurred...',
			};
		}
	}
}
