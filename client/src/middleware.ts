import type { NextRequest } from 'next/server';
import UserService from './services/user.service';

// const Paths = {
// 	Dashboard: '/console',
// };

export async function middleware(request: NextRequest) {
	const isAuthenticated = await UserService.userDetails();

	const pathname = request.nextUrl.pathname;
	const roleBasedPath = '/console';

	if (pathname.startsWith('/auth')) {
		if (isAuthenticated) {
			const callback = request.nextUrl.searchParams.get('callback');
			return Response.redirect(
				new URL(callback || `${roleBasedPath}/console/dashboard`, request.url)
			);
		} else {
			return;
		}
	}

	if (pathname.startsWith(roleBasedPath)) {
		if (!isAuthenticated) {
			return Response.redirect(new URL(`/auth?callback=${pathname}`, request.url));
		}
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
