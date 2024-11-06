export default function Page({
	params: { fund_id },
}: {
	params: {
		fund_id: string;
	};
}) {
	return <div>FUND DETAILS :{fund_id}</div>;
}
