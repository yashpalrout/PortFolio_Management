import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from '../Login';
import Register from '../Register';

export function AuthDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' className="bounce">Login</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[450px]'>
				<DialogHeader>
					<DialogTitle>Welcome Back!</DialogTitle>
					<DialogDescription>Sign in to your account to continue using the app.</DialogDescription>
				</DialogHeader>
				<Tabs defaultValue='login' className='w-[400px]'>
					<TabsList className='grid w-full grid-cols-2'>
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
			</DialogContent>
		</Dialog>
	);
}
