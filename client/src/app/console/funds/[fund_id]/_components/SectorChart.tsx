'use client';

import * as React from 'react';
import { Label, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartStyle,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { getRandomColor } from '@/lib/utils';
import { ITicker } from '@/types/Ticker';

export const description = 'Sector wise asset allocation';

export default function SectorChart({
	holdings,
}: {
	holdings: {
		ticker: ITicker;
		ratio: number;
		nav: number;
		quantity: number;
		allocatedAmount: number;
	}[];
}) {
	const id = 'pie-interactive';

	const data = React.useMemo(() => {
		return Object.values(
			holdings.reduce((acc, holding) => {
				const { sector } = holding.ticker;
				const ratio = holding.ratio;

				if (!acc[sector]) {
					acc[sector] = {
						sector,
						ratio,
						fill: getRandomColor(),
					};
				} else {
					acc[sector].ratio += ratio;
				}

				return acc;
			}, {} as Record<string, { sector: string; ratio: number; fill: string }>)
		);
	}, [holdings]);

	const chartConfig = data.reduce(
		(acc, { sector, fill }) => {
			acc[sector] = {
				label: sector,
				color: fill,
			};
			return acc;
		},
		{} as {
			[key: string]: {
				label: string;
				color?: string;
			};
		}
	) satisfies ChartConfig;

	const [active, setActive] = React.useState(data[0].sector);

	const activeIndex = data.findIndex((item) => item.sector === active);

	const tickers = React.useMemo(() => data.map((item) => item.sector), [data]);

	return (
		<Card data-chart={id} className='flex flex-col'>
			<ChartStyle id={id} config={chartConfig} />
			<CardHeader className='flex-row items-start space-y-0 pb-0'>
				<div className='grid gap-1'>
					<CardTitle>Sector Allocations</CardTitle>
				</div>
				<Select value={active} onValueChange={setActive}>
					<SelectTrigger
						className='ml-auto h-7 w-fit rounded-lg pl-2.5'
						aria-label='Select a value'
					>
						<SelectValue placeholder='Select ticker' />
					</SelectTrigger>
					<SelectContent align='end' className='rounded-xl'>
						{tickers.map((key) => {
							const config = chartConfig[key as keyof typeof chartConfig];

							if (!config) {
								return null;
							}

							return (
								<SelectItem key={key} value={key} className='rounded-lg [&_span]:flex'>
									<div className='flex items-center gap-2 text-xs'>
										<span
											className='flex h-3 w-3 shrink-0 rounded-sm'
											style={{
												backgroundColor: `var(--color-${key})`,
											}}
										/>
										{config?.label}
									</div>
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className='flex flex-1 justify-center pb-0'>
				<ChartContainer
					id={id}
					config={chartConfig}
					className='mx-auto aspect-square w-full max-w-[300px]'
				>
					<PieChart>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Pie
							data={data}
							dataKey='ratio'
							nameKey='sector'
							innerRadius={60}
							strokeWidth={5}
							activeIndex={activeIndex}
							activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
								<g>
									<Sector {...props} outerRadius={outerRadius + 10} />
									<Sector
										{...props}
										outerRadius={outerRadius + 25}
										innerRadius={outerRadius + 12}
									/>
								</g>
							)}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor='middle'
												dominantBaseline='middle'
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className='fill-foreground text-3xl font-bold'
												>
													{data[activeIndex].ratio.toFixed(2)}%
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className='fill-muted-foreground'
												>
													Sectors
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
