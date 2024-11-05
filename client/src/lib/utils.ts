import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(fullName: string) {
	return fullName
		.replaceAll(/[^a-zA-Z ]/g, '')
		.split(' ')
		.map((name) => name.charAt(0))
		.join('')
		.toUpperCase();
}