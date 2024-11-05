"use client";
import { useState, useEffect } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import {
	Table,
	TableBody,
	TableHeader,
	TableRow,
	TableHead,
	TableCell,
} from "@/components/ui/table";

import useDebounce from "@/hooks/useDebounce"; // Import the useDebounce hook

export default function Page() {
	const placeholders = [
		"Search for the ticker...",
		"Symbol",
		"Name",
		"Industry",
		"Example: AAPL",
	];

	const [showTable, setShowTable] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [stockData, setStockData] = useState([
		// Sample stock data (could later be populated with API data based on `debouncedTerm`)
		{ name: "Apple Inc.", symbol: "AAPL", price: "$150" },
		{ name: "Tesla Inc.", symbol: "TSLA", price: "$250" },
		{ name: "Amazon.com Inc.", symbol: "AMZN", price: "$130" },
	]);

	// Use the useDebounce hook to debounce the searchTerm
	const debouncedTerm = useDebounce(searchTerm, 1000); // 1 second delay

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value); // Trigger debounce on input change
	};

	// Fetch or filter data based on `debouncedTerm`
	useEffect(() => {
		if (debouncedTerm) {
			console.log(`Searching for ${debouncedTerm}`);
			setShowTable(true); // Show table only after the search term is debounced
			// Here you could update `stockData` based on the debounced search term
		} else {
			setShowTable(false); // Hide table if the search term is empty
		}
	}, [debouncedTerm]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Optionally handle submit logic here if necessary
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Add Stock</Button>
			</DialogTrigger>
			<DialogContent className="w-full sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px]">
				<DialogHeader>
					<DialogTitle>Add Stock to the Portal</DialogTitle>
				</DialogHeader>
				<div className="py-4">
					<PlaceholdersAndVanishInput
						placeholders={placeholders}
						onChange={handleChange}
						onSubmit={handleSubmit}
					/>
				</div>

				{/* Conditionally render the table after search is submitted */}
				{showTable && (
					<div className="mt-6 overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Symbol</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{stockData.map((stock, index) => (
									<TableRow key={index}>
										<TableCell>{stock.name}</TableCell>
										<TableCell>{stock.symbol}</TableCell>
										<TableCell>{stock.price}</TableCell>
										<TableCell>
											<Button variant="secondary">Add</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
