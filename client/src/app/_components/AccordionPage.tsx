// app/auth/_component/AccordionPage.tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export default function AccordionPage() {
    return (
        <div className="flex w-full h-full">
            {/* Accordion Component - Takes up 50% */}
            <Accordion type="single" collapsible className="w-2/3"> {/* 50% Width */}
                {/* Accordion Item 1: Investment Options */}
                <AccordionItem value="investmentOptions">
                    <AccordionTrigger>Investment Options</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex items-center gap-8">
                            {/* Text Content */}
                            <div className="flex-1">
                                <p className="text-gray-700 mb-2">
                                    Our platform offers a diverse selection of investment options tailored to fit various risk appetites and financial goals.
                                </p>
                                <ul className="list-disc list-inside text-gray-700 mb-2">
                                    <li><strong>Mutual Funds</strong> - Professionally managed portfolios of stocks, bonds, and other assets.</li>
                                    <li><strong>Exchange-Traded Funds (ETFs)</strong> - Flexible investments traded on major stock exchanges.</li>
                                    <li><strong>Fixed Deposits</strong> - Secure investment options with guaranteed returns over time.</li>
                                    <li><strong>Stocks & Bonds</strong> - Direct investments in individual companies or government-backed securities.</li>
                                </ul>
                                <p className="text-gray-600">
                                    Explore these options and customize your portfolio to maximize your returns while aligning with your personal financial strategy.
                                </p>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Accordion Item 2: Benefits of Investing with Us */}
                <AccordionItem value="investmentBenefits">
                    <AccordionTrigger>Benefits of Investing with Us</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex items-center gap-8">
                            {/* Text Content */}
                            <div className="flex-1">
                                <p className="text-gray-700 mb-2">
                                    Investing with our platform provides unique advantages designed to support your financial growth and security.
                                </p>
                                <ul className="list-disc list-inside text-gray-700 mb-2">
                                    <li><strong>Diverse Portfolio</strong> - Access a wide array of investment choices that suit your risk tolerance and objectives.</li>
                                    <li><strong>Expert Management</strong> - Our seasoned professionals ensure your investments are handled with precision and care.</li>
                                    <li><strong>Real-Time Analytics</strong> - Track your investment performance with real-time data and detailed insights.</li>
                                    <li><strong>Personalized Recommendations</strong> - Receive tailored advice based on your financial goals and market trends.</li>
                                    <li><strong>24/7 Customer Support</strong> - Reach our dedicated support team anytime for guidance and assistance.</li>
                                </ul>
                                <p className="text-gray-600">
                                    We are committed to providing a seamless investment experience that empowers you to make informed decisions with confidence.
                                </p>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Accordion Item 3: How to Get Started */}
                <AccordionItem value="howToGetStarted">
                    <AccordionTrigger>How to Get Started</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex items-center gap-8">
                            {/* Text Content */}
                            <div className="flex-1">
                                <p className="text-gray-700 mb-2">
                                    Getting started with us is easy. Follow these simple steps to begin your investment journey:
                                </p>
                                <ol className="list-decimal list-inside text-gray-700 mb-2">
                                    <li><strong>Sign Up</strong> - Create an account to get access to our platform and investment options.</li>
                                    <li><strong>Complete Your Profile</strong> - Fill out your financial goals and preferences to receive personalized recommendations.</li>
                                    <li><strong>Fund Your Account</strong> - Choose a funding method and deposit money into your account.</li>
                                    <li><strong>Select Your Investments</strong> - Browse and choose the best investment options that fit your risk profile.</li>
                                    <li><strong>Start Investing</strong> - Begin investing and track your portfolio’s performance in real-time.</li>
                                </ol>
                                <p className="text-gray-600">
                                    We make the process simple, secure, and user-friendly to help you get started on your investment journey today.
                                </p>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* GIF next to the Accordion - Takes up 40% with 10% gap */}
            <div className="w-2/5 ml-20"> {/* 40% Width + 10% gap */}
                <img
                    src="fmimg.png" // Replace with your actual gif path
                    alt="Investment Animation"
                    className="w-full h-full object-contain rounded-md bounce"  // Use object-contain to fit the image fully
                />
            </div>
        </div>
    );
}
