export type IUser = {
	userId: number;
	name: string;
	email: string;
	phone: string;
	dob: string;
	role: 'INVESTOR' | 'FUND_MANAGER' | 'PORTAL_MANAGER';
};
