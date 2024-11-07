"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-card-corousel";

export function AppleCardsCarouselDemo() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full py-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-500 font-sans">
                Explore Our Mutual Fund Investment Platform
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

const DummyContent = ({ content, imageSrc, altText }) => {
    return (
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                <span className="font-bold text-neutral-700 dark:text-neutral-200">{content.title}</span>{" "}
                {content.description}
            </p>
            <Image
                src={imageSrc}
                alt={altText}
                height={500}
                width={500}
                className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
        </div>
    );
};

const data = [
    {
        category: "Ease of Use",
        title: "Effortless Investment Management",
        src: "/gif1.gif",
        content: (
            <DummyContent
                content={{
                    title: "Ease of Use",
                    description:
                        "Seamlessly manage your investments with our user-friendly portal. Access, track, and analyze your mutual fund portfolio with just a few clicks.",
                }}
                imageSrc="/desc1.jpg"
                altText="Ease of Use"
            />
        ),
    },
    {
        category: "Interactive Graphs",
        title: "Visualize Your Investment Trends",
        src: "/gif2.gif",
        content: (
            <DummyContent
                content={{
                    title: "Interactive Graphs",
                    description:
                        "Visualize your investment trends with dynamic charts and graphs, making it easier to understand fund performance over time.",
                }}
                imageSrc="/desc2.png"
                altText="Interactive Graphs"
            />
        ),
    },
    {
        category: "OHLC Data Visualization",
        title: "Detailed OHLC Data",
        src: "/gif3.gif",
        content: (
            <DummyContent
                content={{
                    title: "OHLC Data Visualization",
                    description:
                        "Access detailed OHLC data for each mutual fund to make informed decisions with real-time insights on open, high, low, and close values.",
                }}
                imageSrc="/desc3.jpg"
                altText="OHLC Data Visualization"
            />
        ),
    },
    {
        category: "Comprehensive Analytics",
        title: "In-Depth Performance Analytics",
        src: "/gif1.gif",
        content: (
            <DummyContent
                content={{
                    title: "Comprehensive Analytics",
                    description:
                        "Get detailed analytics and reports on fund performance, risk levels, and asset allocation to enhance your investment strategy.",
                }}
                imageSrc="/desc4.jpg"
                altText="Comprehensive Analytics"
            />
        ),
    },
];

export default AppleCardsCarouselDemo;
