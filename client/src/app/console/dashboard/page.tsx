import UserService from '@/services/user.service';
import { IFundManagerOverview, IPortalManagerOverview, IUserOverview } from '@/types/overview';
import { redirect } from 'next/navigation';
import FundManagerDashboard from './_component/FundManagerDashboard';
import { default as PortalManagerDashboard } from './_component/PortalManagerDashboard';
import UserDashboard from './_component/UserDashboard';

export default async function Page() {
	const details = await UserService.userDetails();
	const overviewData = await UserService.overview();
	if (!overviewData || !details) {
		redirect('/auth');
	}

	if (details.role === 'INVESTOR') {
		return <UserDashboard details={overviewData as IUserOverview} />;
	} else if (details.role === 'PORTAL_MANAGER') {
		return <PortalManagerDashboard details={overviewData as IPortalManagerOverview} />;
	} else if (details.role === 'FUND_MANAGER') {
		return <FundManagerDashboard details={overviewData as IFundManagerOverview} />;
	}

	return (
		<div className='text-lg font-medium text-center mt-12'>
			PAGE UNDER DEVELOPMENT PLEASE CONTACT ATUL ✌️✌️✌️
		</div>
	);
}
