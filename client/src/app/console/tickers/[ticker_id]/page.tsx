import OhlcChart from '@/components/elements/OhlcChart';
import StockService from '@/services/stock.service';

export default async function Page({
	params,
}: {
	params: {
		ticker_id: string;
	};
}) {
	const ohlcData = await StockService.getOhlcData(params.ticker_id);

	return (
		<>
			<OhlcChart title='' data={ohlcData} />
		</>
	);
}
