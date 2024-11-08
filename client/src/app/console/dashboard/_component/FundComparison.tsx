/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { IPortalManagerOverview } from '@/types/overview';

const chartConfig = {
	fund_1: {
		label: 'Fund 1',
		color: 'hsl(var(--chart-1))',
	},
	fund_2: {
		label: 'Fund 2',
		color: 'hsl(var(--chart-2))',
	},
	fund_3: {
		label: 'Fund 3',
		color: 'hsl(var(--chart-3))',
	},
	fund_4: {
		label: 'Fund 4',
		color: 'hsl(var(--chart-4))',
	},
	fund_5: {
		label: 'Fund 5',
		color: 'hsl(var(--chart-5))',
	},
} satisfies ChartConfig;

export function FundComparison({ details }: { details: IPortalManagerOverview['top5Comparison'] }) {
	const top5Comparison = Object.keys(details[0]).map((key) => {
		return {
			key,
			...details
				.map((item) => item[key])
				.reduce((acc, item, index) => {
					acc[`fund_${index + 1}`] = item;
					return acc;
				}, {} as any),
		};
	});

	if (details.length === 0) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Top 5 Performing Funds</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={top5Comparison}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='key'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						{details.map((_, index) => {
							return (
								<Line
									dataKey={`fund_${index + 1}`}
									type='monotone'
									stroke={chartConfig[`fund_${index + 1}`].color}
									strokeWidth={2}
									dot={false}
									key={index}
								/>
							);
						})}
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
