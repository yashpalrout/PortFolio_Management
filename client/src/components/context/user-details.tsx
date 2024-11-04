'use client';

import { IUser } from '@/types/user';
import * as React from 'react';

const DEFAULT_VALUES = {
	userId: 0,
	name: '',
	email: '',
	phone: '',
	dob: '',
	role: 'INVESTOR' as IUser['role'],
};

const UserContext = React.createContext<{
	profile: IUser;
	setProfile: (details: Partial<IUser>) => void;
}>({
	profile: DEFAULT_VALUES,
	setProfile: () => {},
});

export function UserProvider({ children, data }: { children: React.ReactNode; data: IUser }) {
	const [user, setUser] = React.useState<IUser>(DEFAULT_VALUES);

	const setProfile = (details: Partial<IUser>) => {
		setUser((prev) => {
			return {
				...prev,
				...details,
			};
		});
	};

	React.useEffect(() => {
		setUser(data);
	}, [data]);

	return (
		<UserContext.Provider
			value={{
				profile: user,
				setProfile,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export const useUser = () => React.useContext(UserContext);
