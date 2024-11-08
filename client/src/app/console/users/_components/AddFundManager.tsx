'use client';
import Register from '@/components/elements/Register';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import UserService from '@/services/user.service';
import { registerSchema } from '@/validators/auth.validator';
import { z } from 'zod';
export default function AddFundManager() {
	const { toast } = useToast();
	async function onSubmit(details: z.infer<typeof registerSchema>) {
		const result = await UserService.addUser({
			...details,
			role: 'FUND_MANAGER',
		});

		if (result) {
			toast({
				title: 'Fund Manager added successfully',
				variant: 'success',
			});
		} else {
			toast({
				title: 'Failed to add Fund Manager',
				variant: 'destructive',
			});
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='default' className='bounce'>
					Add Fund Manager
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[450px]'>
				<DialogHeader>
					<DialogTitle>Add Fund Manager!</DialogTitle>
					<DialogDescription>Provide fund manager details.</DialogDescription>
				</DialogHeader>
				<Register preventDefault onSubmit={onSubmit} />
			</DialogContent>
		</Dialog>
	);
}
