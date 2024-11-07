"use client";

import React from "react";
import Link from "next/link";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

export default async function Home() {
	const isAuthenticated = await AuthService.isAuthenticated();

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<div className="flex gap-4 items-center flex-col sm:flex-row">
					{!isAuthenticated ? (
						<AuthDialog />
					) : (
						<Link href="/console/dashboard">
							<span>Continue to Dashboard</span>
						</Link>
					)}
				</div>

				<section className="w-full max-w-md">
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1">
							<AccordionTrigger>Why Invest With Us?</AccordionTrigger>
							<AccordionContent>
								<p>
									We offer a wide range of carefully selected mutual funds and investment portfolios to help you achieve
									your financial goals.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>Our Services</AccordionTrigger>
							<AccordionContent>
								<p>
									Our platform provides personalized investment options, real-time market insights, and secure asset
									management.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</section>

				<section className="w-full max-w-md mt-8">
					<HoverCard>
						<HoverCardTrigger>
							<span className="underline cursor-pointer">What Sets Us Apart?</span>
						</HoverCardTrigger>
						<HoverCardContent>
							<p>
								Our portal is designed with both experienced investors and newcomers in mind, combining robust analytics
								with an easy-to-use interface.
							</p>
						</HoverCardContent>
					</HoverCard>
				</section>
			</main>
		</div>
	);
}
