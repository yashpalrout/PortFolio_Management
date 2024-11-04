import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string({
			message: 'Email is required',
		})
		.email('Invalid email address'),
	password: z
		.string({
			message: 'Password is required',
		})
		.min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
	email: z
		.string({
			message: 'Email is required',
		})
		.email('Invalid email address'),
	password: z
		.string({
			message: 'Password is required',
		})
		.min(8, 'Password must be at least 8 characters'),
	name: z
		.string({
			message: 'Name is required',
		})
		.min(3, 'Name must be at least 3 characters'),
	phone: z.string().min(10, {
		message: 'Phone number must be at least 10 characters',
	}),
	dob: z
		.string()
		.min(10, 'Date of birth is required')
		.refine((dob: string) => {
			const date = new Date(dob);
			return date instanceof Date && !isNaN(date.getTime());
		}, 'Invalid date of birth'),
	role: z.enum(['INVESTOR', 'FUND_MANAGER', 'PORTAL_MANAGER']),
});

export const userDetailsSchema = z.object({
	name: z
		.string({
			message: 'Name is required',
		})
		.min(3, 'Name must be at least 3 characters'),
	phone: z.string().min(10, {
		message: 'Phone number must be at least 10 characters',
	}),
	dob: z
		.string()
		.min(10, 'Date of birth is required')
		.refine((dob: string) => {
			const date = new Date(dob);
			return date instanceof Date && !isNaN(date.getTime());
		}, 'Invalid date of birth'),
	role: z.enum(['INVESTOR', 'FUND_MANAGER', 'PORTAL_MANAGER']),
});

export const passwordSchema = z.object({
	old_password: z
		.string({
			message: 'Password is required',
		})
		.min(8, 'Password must be at least 8 characters'),
	new_password: z
		.string({
			message: 'Password is required',
		})
		.min(8, 'Password must be at least 8 characters'),
});
