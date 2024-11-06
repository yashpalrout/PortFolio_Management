export default function Page({
	params: { fund_id },
}: {
	params: {
		fund_id: string;
	};
}) {
	return <div>FUND Holding :{fund_id}</div>;
}
