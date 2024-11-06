import { z } from 'zod';

export const mutualFundSchema = z.object({
    name: z
        .string({
            message: 'Name is required',
        })
        .min(3, 'Name must be at least 3 characters')
        .max(100, 'Name cannot exceed 100 characters'), // New max length

    initialTarget: z
        .number({
            required_error: 'Initial target is required',
        })
        .min(0, 'Initial target must be a positive number')
        .max(1_000_000_000, 'Initial target is too high'), // New max value as example

    tokenCount: z
        .number({
            required_error: 'Token count is required',
        })
        .int('Token count must be an integer')
        .min(1, 'Token count must be at least 1'),

    expenseRatio: z
        .number({
            required_error: 'Expense ratio is required',
        })
        .min(0, 'Expense ratio must be a non-negative number')
        .max(100, 'Expense ratio cannot exceed 100%')
        .refine((val) => Number.isInteger(val * 100), 'Expense ratio must have at most 2 decimal places'), // Precision check

    exitLoad: z
        .number({
            required_error: 'Exit load is required',
        })
        .min(0, 'Exit load must be a non-negative number')
        .max(100, 'Exit load cannot exceed 100%')
        .refine((val) => Number.isInteger(val * 100), 'Exit load must have at most 2 decimal places'), // Precision check

    exitLoadLimit: z
        .number({
            required_error: 'Exit load limit is required',
        })
        .int('Exit load limit must be an integer')
        .min(1, 'Exit load limit must be at least 1 day'),
});
