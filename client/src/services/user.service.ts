/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '@/lib/api';
import { IUser } from '@/types/user';
import { passwordSchema, registerSchema, userDetailsSchema } from '@/validators/auth.validator';
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
			const { data } = await api.post(`/user/add-user`, {
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

	static async update(details: z.infer<typeof userDetailsSchema>) {
		try {
			await api.put(`/user/details`, {
				name: details.name,
				dob: details.dob,
				phone: details.phone,
			});
		} catch (err) {
			throw new Error('Unable to update user details');
		}
	}

	static async changePassword(password: z.infer<typeof passwordSchema>) {
		try {
			await api.patch(`/user/details`, {
				old_password: password.old_password,
				new_password: password.new_password,
			});
		} catch (err) {
			throw new Error('Unable to update user details');
		}
	}
}
