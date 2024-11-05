'use server';

import AuthService from '@/services/auth.service';
import UserService from '@/services/user.service';
import { loginSchema, registerSchema } from '@/validators/auth.validator';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function register(details: z.infer<typeof registerSchema>) {
	const res = await AuthService.register(details);

	if (res.authenticated) {
		return [true, null] as [true, null];
	} else {
		return [false, res.error] as [false, string];
	}
}

export async function login(details: z.infer<typeof loginSchema>) {
	const res = await AuthService.login(details.email, details.password);

	if (res.authenticated) {
		return [true, null] as [true, null];
	} else {
		return [false, res.error] as [false, string];
	}
}

export async function logout() {
	const res = await AuthService.logout();

	if (res) {
		revalidatePath('/');
		return [true, null] as [true, null];
	} else {
		return [false, 'Failed to logout...'] as [false, string];
	}
}

export async function userDetails() {
	const res = await UserService.userDetails();
	return res;
}
