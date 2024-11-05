import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { IUser } from '@/types/user';

export default async function UserList({ users }: { users: IUser[] }) {
	return (
		<div className=''>
			<Table className='w-full border border-dashed rounded-md'>
				<TableCaption>List of all users</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className=''>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead className=''>Date of Birth</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.userId}>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.phone}</TableCell>
							<TableCell>{user.dob}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
