/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'; // This is a client component 👈🏽
import { OHLC } from '@/types/ticker';
import { useEffect, useRef } from 'react';

const OhlcChart = ({ title, data }: { title: string; data: OHLC[] }) => {
	const ref = useRef(true);

	useEffect(() => {
		if (!ref.current) return;
		ref.current = false;
		console.log('hello every one');
		const anychart = (window as any).anychart;
		anychart.onDocumentReady(function () {
			// load csv data

			const table = anychart.data.table('date');
			table.addData(data);
			const mapping = table.mapAs({ open: 'open', high: 'high', low: 'low', close: 'close' });

			const chart = anychart.stock();
			const plot = chart.plot(0);
			// create an ohlc series and bind it to the mapped data
			plot.ohlc(mapping);
			// set the date/time range displayed by default
			chart.selectRange('2021-03-01', '2023-08-20');
			// set the chart title
			chart.title(`${title} OHLC Chart`);
			// set the container id for the chart
			chart.container('container');
			// initiate the chart drawing
			chart.draw();
		});
	}, [data, title]);

	return (
		<>
			<div id='container' className='h-[30vw] w-[30vw]'></div>
		</>
	);
};

export default OhlcChart;
