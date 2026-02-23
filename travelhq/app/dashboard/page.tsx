"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, MapPin, Calendar, IndianRupee, Plane, TrendingUp, Clock } from "lucide-react";

const DEMO_TRIPS = [
  {
    id: "1",
    title: "Goa Beach Getaway",
    destination: "Goa, India",
    start_date: "2025-03-15",
    end_date: "2025-03-22",
    budget_inr: 45000,
    status: "planning",
    cover_image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop",
    days: 7,
  },
  {
    id: "2",
    title: "Europe Backpacking",
    destination: "Paris · Amsterdam · Prague",
    start_date: "2025-06-01",
    end_date: "2025-06-21",
    budget_inr: 180000,
    status: "confirmed",
    cover_image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop",
    days: 21,
  },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  planning:  { label: "Planning",  color: "#f5b642", bg: "rgba(245,182,66,0.12)" },
  confirmed: { label: "Confirmed", color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
  active:    { label: "Active",    color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  completed: { label: "Done",      color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
};

function formatINR(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}
function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [trips] = useState(DEMO_TRIPS);
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading your trips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", transition: "background 0.3s ease" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">

        {/* Header */}
        <div className="animate-fade-up-1 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>
              ✦ Welcome back
            </p>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
              My Trips
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              Plan, explore, and relive your adventures
            </p>
          </div>
          <Link href="/new-trip"
            className="hidden md:flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl text-black transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", boxShadow: "0 4px 20px var(--accent-bg)" }}>
            <PlusCircle className="w-4 h-4" /> New Trip
          </Link>
        </div>

        {/* Stats */}
        <div className="animate-fade-up-2 grid grid-cols-3 gap-3 md:gap-4">
          {[
            { label: "Total Trips",    value: trips.length, icon: Plane,        accent: "var(--accent)" },
            { label: "Countries",      value: "4",          icon: MapPin,       accent: "#4ade80" },
            { label: "Total Budget",   value: "₹2.3L",      icon: IndianRupee,  accent: "#a78bfa" },
          ].map(({ label, value, icon: Icon, accent }) => (
            <div key={label} className="glass rounded-2xl p-3 md:p-5 flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
                <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: accent }} />
              </div>
              <div className="text-center md:text-left">
                <p className="text-lg md:text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{value}</p>
                <p className="text-[10px] md:text-xs leading-tight" style={{ color: "var(--text-muted)" }}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trips Grid */}
        <div className="animate-fade-up-3">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Your Journeys</h2>
            <span className="text-xs px-2.5 py-1 rounded-full"
              style={{ background: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}>
              {trips.length} trips
            </span>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
            {trips.map((trip) => {
              const status = statusConfig[trip.status] ?? statusConfig.planning;
              return (
                <Link key={trip.id} href={`/trip/${trip.id}`}
                  className="group block glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-40 md:h-44 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={trip.cover_image} alt={trip.destination}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
                    <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: status.bg, color: status.color, border: `1px solid ${status.color}30` }}>
                      {status.label}
                    </span>
                    <span className="absolute bottom-3 left-3 text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(0,0,0,0.5)", color: "#fff", backdropFilter: "blur(4px)" }}>
                      <Clock className="w-2.5 h-2.5 inline mr-1" />{trip.days} days
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm md:text-base mb-1" style={{ color: "var(--text-primary)" }}>
                      {trip.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
                      <MapPin className="w-3 h-3 shrink-0" style={{ color: "var(--accent)" }} />
                      {trip.destination}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                        <Calendar className="w-3 h-3" />
                        {formatDate(trip.start_date)} → {formatDate(trip.end_date)}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-lg"
                        style={{ background: "var(--accent-bg)", color: "var(--accent)" }}>
                        {formatINR(trip.budget_inr)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Add new trip */}
            <Link href="/new-trip"
              className="group flex flex-col items-center justify-center rounded-2xl min-h-[220px] transition-all duration-300 hover:-translate-y-1 border-2 border-dashed p-6 text-center"
              style={{ borderColor: "var(--accent-border)", background: "var(--accent-bg)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all group-hover:scale-110 glass-gold">
                <PlusCircle className="w-6 h-6" style={{ color: "var(--accent)" }} />
              </div>
              <p className="font-semibold text-sm mb-1" style={{ color: "var(--accent)" }}>Plan a New Trip</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>AI builds your full itinerary in seconds</p>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="animate-fade-up-4 grid grid-cols-2 gap-3 pb-4">
          {[
            { href: "/new-trip", icon: TrendingUp, label: "AI Trip Generator", sub: "Plan in seconds",  accent: "var(--accent)" },
            { href: "/pricing",  icon: Plane,      label: "Upgrade to Pro",     sub: "Unlimited trips", accent: "#a78bfa" },
          ].map(({ href, icon: Icon, label, sub, accent }) => (
            <Link key={href} href={href} className="glass rounded-2xl p-4 flex items-center gap-3 transition-all group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${accent}15` }}>
                <Icon className="w-4 h-4" style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{label}</p>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{sub}</p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
