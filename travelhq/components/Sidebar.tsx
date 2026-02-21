"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, PlusCircle, Map, Sparkles, Mic, CreditCard, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/new-trip", label: "New Trip", icon: PlusCircle },
  { href: "/live/demo", label: "Live Trip", icon: Map },
  { href: "/media-studio", label: "AI Studio", icon: Sparkles },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col shadow-sm min-h-screen">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2">
          <Globe className="w-7 h-7 text-blue-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TravelHQ
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">AI Travel Planner</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname === href || pathname.startsWith(href + "/")
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-3 border border-blue-100">
          <p className="text-xs font-semibold text-blue-800">🚀 Free Plan</p>
          <p className="text-xs text-blue-600 mt-0.5">3 trips/month</p>
          <Link href="/pricing" className="text-xs text-blue-700 font-medium underline mt-1 block">
            Upgrade to Pro →
          </Link>
        </div>
      </div>
    </aside>
  );
}
