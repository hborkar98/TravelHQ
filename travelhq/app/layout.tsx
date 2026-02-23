import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "TravelHQ — AI Travel Planner",
  description: "Plan your perfect trip with AI. Itinerary, maps, budget, media & live tracking — all in one platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          {/* pt-14 = space for mobile top header, pb-20 = space for mobile bottom nav */}
          <main className="flex-1 overflow-auto pt-14 pb-20 md:pt-0 md:pb-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
