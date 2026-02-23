"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg)" }}>
      <Sidebar />
      <main
        className="flex-1 overflow-auto"
        style={isHomePage
          ? {}  // Homepage: no padding, sidebar is just a floating drawer
          : { paddingTop: "0", paddingBottom: "0" }
        }
      >
        {/* Inner pages need space for mobile top/bottom bars */}
        <div className={isHomePage ? "" : "pt-14 pb-20 md:pt-0 md:pb-0"}>
          {children}
        </div>
      </main>
    </div>
  );
}
