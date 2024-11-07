import UserService from '@/services/user.service';
import { IUserOverview } from '@/types/overview';
import UserDashboard from './_component/UserDashboard';

export default async function Page() {
	const overviewData = await UserService.overview();
	const details = (await UserService.userDetails())!;

	if (details.role === 'INVESTOR') {
		return <UserDashboard details={overviewData as IUserOverview} />;
	}
	return <>{JSON.stringify(overviewData)}</>;
}
