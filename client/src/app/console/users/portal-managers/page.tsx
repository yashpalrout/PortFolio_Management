import UserService from '@/services/user.service';
import { notFound } from 'next/navigation';
import AddPortalManager from '../_components/AddPortalManager';
import UserList from '../_components/UsersList';

export default async function Page() {
	const users = await UserService.allUsers();

	if (!users) {
		notFound();
	}
	const filteredUsers = users.filter((user) => user.role == 'PORTAL_MANAGER');
	return (
		<div className='px-4 pb-4'>
			<div className='justify-between flex'>
				<h2 className='text-2xl font-bold'>Portal Managers</h2>
				<div className='flex gap-x-2 gap-y-1 flex-wrap '>
					<AddPortalManager />
				</div>
			</div>
			<UserList users={filteredUsers} />
		</div>
	);
}
