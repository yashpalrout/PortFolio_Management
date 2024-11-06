/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '@/lib/api';
import { z } from 'zod';
import { mutualFundSchema } from '@/validators/mutualfund.validator';

export default class MutualFundService {
    /**
     * Adds a new mutual fund
     * @param details - Details of the mutual fund conforming to mutualFundSchema
     * @returns An object with success status, mutualFund data, or an error message
     */
    static async addMutualFund(details: z.infer<typeof mutualFundSchema>) {
        try {
            const { data } = await api.post('/mutual-fund', {
                name: details.name,
                initialTarget: details.initialTarget,
                tokenCount: details.tokenCount,
                expenseRatio: details.expenseRatio,
                exitLoad: details.exitLoad,
                exitLoadLimit: details.exitLoadLimit,
            });
            return {
                success: true,
                mutualFund: data,
                error: null,
            };
        } catch (err) {
            console.error('Failed to add mutual fund:', err);
            return {
                success: false,
                mutualFund: null,
                error: 'Failed to add mutual fund...',
            };
        }
    }

    // Get details of a mutual fund by ID
    static async getMutualFundById(id: string) {
        try {
            const { data } = await api.get(`/mutual-fund/${id}`);
            return {
                success: true,
                mutualFund: data,
                error: null,
            };
        } catch (err) {
            return {
                success: false,
                mutualFund: null,
                error: 'Failed to retrieve mutual fund details...',
            };
        }
    }

    // Get all mutual funds
    static async allFunds() {
        try {
            const { data } = await api.get(`/mutual-fund`);
            return data;
        } catch (err) {
            return [];
        }
    }
}
