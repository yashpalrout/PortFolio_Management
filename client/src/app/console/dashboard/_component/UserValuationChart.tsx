'use client';

import { GitCommitVertical } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { IUserOverview } from '@/types/overview';

export function UserValuationChart({ data }: { data: IUserOverview['userValuations'] }) {
	const chartData = Object.entries(data)
		.map(([date, value]) => ({
			label: date,
			value: isNaN(value) ? 0 : value,
		}))
		.sort((a, b) => new Date(a.label).getTime() - new Date(b.label).getTime());

	const chartConfig = {
		label: {
			label: 'Date',
			color: 'hsl(var(--chart-1))',
		},
	} satisfies ChartConfig;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Financial</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={true} />
						<XAxis
							dataKey='label'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => new Date(value).toLocaleDateString().substring(0, 5)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<Line
							dataKey='value'
							type='natural'
							stroke='hsl(var(--chart-3))'
							strokeWidth={2}
							dot={({ cx, cy, payload }) => {
								const r = 24;
								return (
									<GitCommitVertical
										key={payload.label}
										x={cx - r / 2}
										y={cy - r / 2}
										width={r}
										height={r}
										fill='hsl(var(--chart-1))'
										stroke='hsl(var(--chart-1))'
									/>
								);
							}}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
