import Login from '@/components/elements/Login';
import Register from '@/components/elements/Register';
import UserService from '@/services/user.service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { redirect } from 'next/navigation';

export default async function Page({
	searchParams,
}: {
	searchParams: {
		callback: string;
	};
}) {
	const userDetails = await UserService.userDetails();

	if (userDetails) {
		redirect(searchParams.callback || '/console');
	} else {
		console.log('AUTH PAGE');
	}

	return (
		<Tabs defaultValue='login' className='w-[400px]'>
			<TabsList className='grid w-full grid-cols-2 mb-2 border border-dashed p-2 rounded-md'>
				<TabsTrigger value='login'>Login</TabsTrigger>
				<TabsTrigger value='register'>Register</TabsTrigger>
			</TabsList>
			<TabsContent value='login'>
				<Login />
			</TabsContent>
			<TabsContent value='register'>
				<Register />
			</TabsContent>
		</Tabs>
	);
}
