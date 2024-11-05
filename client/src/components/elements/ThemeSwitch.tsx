'use client';
import { useTheme } from 'next-themes';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

export default function ThemeSwitch() {
	const theme = useTheme();
	const handleChange = (checked: boolean) => {
		theme.setTheme(checked ? 'dark' : 'light');
	};

	return (
		<div className='flex items-center space-x-2'>
			<Label htmlFor='theme'>Dark Mode</Label>
			<Switch
				id='theme'
				checked={theme.theme === 'dark'}
				onCheckedChange={handleChange}
			/>
		</div>
	);
}
