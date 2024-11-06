'use client';
import { useUser } from '@/components/context/user-details';
import CreateMutualFund from '@/components/elements/dialogs/CreateMutualFund';

export function CreateFundButton() {
	const { profile } = useUser();

	if (!profile || profile.role !== 'FUND_MANAGER') {
		return null;
	}

	return <CreateMutualFund />;
}
