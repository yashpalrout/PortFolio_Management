import React from "react";
import { BackgroundLines } from "@/components/ui/background-line";

export function BackgroundLinesDemo() {
    return (
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 py-8 md:py-20 relative">
            {/* Container div to position content in the upper half */}
            <div className="flex flex-col items-center justify-center mt-[-20vh] md:mt-[-15vh]">
                <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-6 font-bold tracking-tight">
                    mInvest : FIL, <br /> Financial Investment Leaders.
                </h2>
                <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
                    Get the best investment advice from our experts, including financial analysts, market strategists, and portfolio managers, totally free.
                </p>
            </div>
        </BackgroundLines>
    );
}
