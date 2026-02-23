"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, Map, Sparkles, CreditCard, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { href: "/dashboard",    label: "Dashboard", icon: LayoutDashboard },
  { href: "/new-trip",     label: "New Trip",  icon: PlusCircle },
  { href: "/live/demo",    label: "Live Trip", icon: Map },
  { href: "/media-studio", label: "AI Studio", icon: Sparkles },
  { href: "/pricing",      label: "Pricing",   icon: CreditCard },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Icon mark */}
      <div className="relative w-10 h-10 flex items-center justify-center rounded-2xl shrink-0 transition-transform group-hover:scale-105"
        style={{ background: "linear-gradient(135deg, #f5b642 0%, #e8960a 100%)", boxShadow: "0 4px 16px rgba(245,182,66,0.4)" }}>
        {/* Airplane SVG */}
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
        {/* Live dot */}
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2"
          style={{ borderColor: "var(--bg-secondary)" }} />
      </div>
      <div className="leading-none">
        <span className="text-lg font-bold block" style={{ fontFamily: "Playfair Display, serif", color: "var(--text-primary)" }}>
          TravelHQ
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          ✦ AI Planner
        </span>
      </div>
    </Link>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} aria-label="Toggle theme"
      className="flex items-center gap-2 w-full px-3 py-2 rounded-xl transition-all text-xs font-medium"
      style={{ color: "var(--text-secondary)", background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}>
      {theme === "dark"
        ? <><Sun  className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} /> Switch to Light</>
        : <><Moon className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} /> Switch to Dark</>
      }
    </button>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex w-60 flex-col min-h-screen"
        style={{ background: "var(--bg-secondary)", borderRight: "1px solid var(--border)", transition: "background 0.3s ease" }}>

        <div className="px-5 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
          <Logo />
        </div>

        <nav className="flex-1 px-3 py-5 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link key={href} href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={active
                  ? { background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", color: "#000", boxShadow: "0 4px 15px var(--accent-bg)" }
                  : { color: "var(--text-secondary)" }
                }
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "var(--surface-hover)"; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = ""; }}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 space-y-2" style={{ borderTop: "1px solid var(--border)" }}>
          <ThemeToggle />
          <div className="rounded-xl p-3.5 glass-gold">
            <p className="text-xs font-semibold" style={{ color: "var(--accent)" }}>✦ Free Plan</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>3 trips/month remaining</p>
            <Link href="/pricing"
              className="mt-2 block text-center text-xs font-bold py-1.5 rounded-lg text-black"
              style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))" }}>
              Upgrade to Pro →
            </Link>
          </div>
        </div>
      </aside>

      {/* ── Mobile Top Header ── */}
      <MobileHeader />

      {/* ── Mobile Bottom Nav ── */}
      <MobileNav pathname={pathname} />
    </>
  );
}

function MobileHeader() {
  const { theme, toggle } = useTheme();
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
      style={{ background: "var(--nav-bg)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)", transition: "background 0.3s ease" }}>
      <Logo />
      <div className="flex items-center gap-2">
        <button onClick={toggle} aria-label="Toggle theme"
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
          style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}>
          {theme === "dark"
            ? <Sun  className="w-4 h-4" style={{ color: "var(--accent)" }} />
            : <Moon className="w-4 h-4" style={{ color: "var(--accent)" }} />
          }
        </button>
        <Link href="/new-trip"
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-black"
          style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))" }}>
          <PlusCircle className="w-3.5 h-3.5" /> New Trip
        </Link>
      </div>
    </header>
  );
}

function MobileNav({ pathname }: { pathname: string }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-1 py-2"
      style={{ background: "var(--nav-bg)", backdropFilter: "blur(16px)", borderTop: "1px solid var(--border)", transition: "background 0.3s ease" }}>
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link key={href} href={href}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-0"
            style={{ color: active ? "var(--accent)" : "var(--text-muted)" }}>
            <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.8} />
            <span className="text-[9px] font-medium truncate">{label}</span>
            {active && <span className="w-1 h-1 rounded-full" style={{ background: "var(--accent)" }} />}
          </Link>
        );
      })}
    </nav>
  );
}
