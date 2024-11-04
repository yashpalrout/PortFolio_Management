/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '@/lib/api';
import { IUser } from '@/types/user';
import { passwordSchema, registerSchema, userDetailsSchema } from '@/validators/auth.validator';
import axios from 'axios';
import { z } from 'zod';

export default class AuthService {
	static async isAuthenticated() {
		try {
			const { data } = await api.get('/auth/validate', {
				headers: {
					'Cache-Control': 'no-cache',
					Pragma: 'no-cache',
					Expires: '0',
				},
				withCredentials: true,
			});
			return true;
		} catch (err) {
			return false;
		}
	}

	static async login(email: string, password: string) {
		try {
			const { data } = await api.post(`/auth/login`, {
				email,
				password,
			});
			return {
				authenticated: true,
				user: data.user as IUser,
				error: null,
			};
		} catch (err: unknown) {
			return {
				authenticated: false,
				user: null,
				error: 'Invalid email or password...',
			};
		}
	}

	static async logout() {
		try {
			await api.post(`/auth/logout`);
			return true;
		} catch (err) {
			return false;
		}
	}

	static async register(details: z.infer<typeof registerSchema>) {
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
