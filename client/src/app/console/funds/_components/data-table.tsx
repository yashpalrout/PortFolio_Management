/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableCellLink,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { IFund } from '@/types/fund';
import {
	CaretSortIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

const KEYS = [
	'name',
	'initialTarget',
	'assetSize',
	'assetNav',
	'tokenCount',
	'tokenPrice',
	'expenseRatio',
	'exitLoad',
	'exitLoadLimit',
	'inHand',
	'createdAt',
];

function generateColumns(): ColumnDef<IFund>[] {
	return [
		{
			accessorKey: 'name',
			header: ({ column }) => {
				return (
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Name
						<CaretSortIcon className='ml-2 h-4 w-4' />
					</Button>
				);
			},
			cell: ({ row }) => <div className='px-4'>{row.getValue('name')}</div>,
		},
		{
			accessorKey: 'initialTarget',
			header: ({ column }) => {
				return (
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Initial Target
						<CaretSortIcon className='ml-2 h-4 w-4' />
					</Button>
				);
			},
			cell: ({ row }) => <div className='px-4'>{row.getValue('initialTarget')}</div>,
		},
		{
			accessorKey: 'assetSize',
			header: () => {
				return <Button variant='ghost'>Asset Size</Button>;
			},
			cell: ({ row }) => <div className='px-4'>{row.getValue('assetSize')}</div>,
		},
		{
			accessorKey: 'assetNav',
			header: ({ column }) => {
				return (
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Asset Nav
						<CaretSortIcon className='ml-2 h-4 w-4' />
					</Button>
				);
			},
			cell: ({ row }) => <div className='px-4'>{row.getValue('assetNav')}</div>,
		},
		{
			accessorKey: 'tokenCount',
			header: () => {
				return <Button variant='ghost'>Token Count</Button>;
			},
			cell: ({ row }) => <div className='px-4'>{row.getValue('tokenCount')}</div>,
		},
		{
			accessorKey: 'tokenPrice',
			header: ({ column }) => {
				return (
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Token Price
						<CaretSortIcon className='ml-2 h-4 w-4' />
					</Button>
				);
			},
			cell: ({ row }) => <div className='px-4'>${row.getValue('tokenPrice')}</div>,
		},
		{
			accessorKey: 'expenseRatio',
			header: ({ column }) => {
				return (
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Expense Ratio
						<CaretSortIcon className='ml-2 h-4 w-4' />
					</Button>
				);
			},
			cell: ({ row }) => <div className='px-4'>{row.getValue('expenseRatio')}</div>,
		},
		{
			accessorKey: 'exitLoad',
			header: ({ column }) => {
				return (
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Exit Load
						<CaretSortIcon className='ml-2 h-4 w-4' />
					</Button>
				);
			},
			cell: ({ row }) => <div className='px-4'>{row.getValue('exitLoad')}</div>,
		},
		{
			accessorKey: 'inHand',
			header: ({ column }) => {
				return (
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						In Hand
						<CaretSortIcon className='ml-2 h-4 w-4' />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className='px-4'>{Date.parse(row.getValue('inHand')).toLocaleString()}</div>
			),
		},
	];
}

export function DataTable({
	title,
	records,
	maxRecord,
}: {
	title: string;
	records: IFund[];
	maxRecord: number;
}) {
	const hidden = (KEYS ?? []).reduce((acc, key) => {
		acc[key] = true;
		return acc;
	}, {} as { [key: string]: boolean });

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
		...hidden,
	});
	const searchParams = useSearchParams();
	const router = useRouter();
	const limit = searchParams.get('limit') || '20';
	const maxPage = Math.ceil(maxRecord / parseInt(limit, 10));
	const page = Math.min(parseInt(searchParams.get('page') || '1', 10), maxPage);

	React.useEffect(() => {
		if (parseInt(searchParams.get('page') || '1', 5000) > maxPage) {
			const url = new URL((window as any).location);
			url.searchParams.set('page', maxPage.toString());
			router.replace(url.toString());
		}
	}, [maxPage, router, searchParams]);

	const columns = generateColumns();

	const table = useReactTable({
		data: records,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		getRowId: (row) => row.fundId.toString(),
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			pagination: {
				pageSize: parseInt(limit, 10),
				pageIndex: page - 1,
			},
		},
	});

	function setPage(page: number) {
		const url = new URL((window as any).location);
		url.searchParams.set('page', page.toString());
		router.replace(url.toString());
	}

	return (
		<div className='flex flex-col gap-4 justify-center px-4 py-4'>
			<div className='justify-between flex'>
				<h2 className='text-2xl font-bold'>{title}</h2>
				<div className='flex gap-x-2 gap-y-1 flex-wrap '></div>
			</div>

			<div className='w-full'>
				<div className='flex flex-wrap items-center justify-end px-2 mt-3'>
					<div className='flex items-center space-x-3 lg:space-x-5'>
						<div className='flex items-center space-x-2'>
							<p className='text-sm font-medium'>Rows</p>
							<Select
								value={limit}
								onValueChange={(value) => {
									if (limit !== value) {
										const url = new URL((window as any).location);
										url.searchParams.set('limit', value);
										router.replace(url.toString());
									}
									table.setPageSize(Number(value));
								}}
							>
								<SelectTrigger className='h-8 w-[90px] text-black dark:text-white'>
									<SelectValue placeholder={limit} />
								</SelectTrigger>
								<SelectContent side='top'>
									{[20, 50, 100].map((pageSize) => (
										<SelectItem key={pageSize} value={`${pageSize}`}>
											{pageSize}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className='text-sm font-medium'>
							Page {page} of {maxPage}
						</div>
						<div className='flex items-center space-x-2'>
							<Button
								variant='outline'
								className='hidden h-8 w-8 p-0 lg:flex'
								onClick={() => setPage(1)}
								disabled={page === 1}
							>
								<span className='sr-only'>Go to first page</span>
								<DoubleArrowLeftIcon className='h-4 w-4' />
							</Button>
							<Button
								variant='outline'
								className='h-8 w-8 p-0'
								onClick={() => setPage(page - 1)}
								disabled={page === 1}
							>
								<span className='sr-only'>Go to previous page</span>
								<ChevronLeftIcon className='h-4 w-4' />
							</Button>
							<Button
								variant='outline'
								className='h-8 w-8 p-0'
								onClick={() => setPage(page + 1)}
								disabled={page === maxPage}
							>
								<span className='sr-only'>Go to next page</span>
								<ChevronRightIcon className='h-4 w-4' />
							</Button>
							<Button
								variant='outline'
								className='hidden h-8 w-8 p-0 lg:flex'
								onClick={() => setPage(maxPage)}
								disabled={page === maxPage}
							>
								<span className='sr-only'>Go to last page</span>
								<DoubleArrowRightIcon className='h-4 w-4' />
							</Button>
						</div>
						<div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant='outline' className='ml-auto'>
										Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									{table
										.getAllColumns()
										.filter((column) => column.getCanHide())
										.map((column) => {
											return (
												<DropdownMenuCheckboxItem
													key={column.id}
													className='capitalize'
													checked={column.getIsVisible()}
													onCheckedChange={(value) => column.toggleVisibility(!!value)}
												>
													{column.id.replace(/_/g, ' ')}
												</DropdownMenuCheckboxItem>
											);
										})}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>

				<div className='rounded-md border'>
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(header.column.columnDef.header, header.getContext())}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => {
									const link = `/console/funds/${row.original.fundId}`;
									return (
										<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
											{row.getVisibleCells().map((cell) => (
												<TableCellLink href={link} key={cell.id} className='p-2'>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCellLink>
											))}
										</TableRow>
									);
								})
							) : (
								<TableRow>
									<TableCell colSpan={columns.length} className='h-24 text-center'>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}