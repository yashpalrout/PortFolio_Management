// app/auth/_component/HoverCardPage.tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';


export default function HoverCardPage() {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <button className="text-blue-500 underline hover:text-blue-700">
                    Why Choose Our Platform?
                </button>
            </HoverCardTrigger>
            <HoverCardContent className="bg-white p-4 rounded shadow-lg">
                <p className="text-gray-800">
                    With advanced analytics, professional fund management, and a secure interface, our platform
                    provides a seamless investment experience.
                </p>
            </HoverCardContent>
        </HoverCard>
    );
}
