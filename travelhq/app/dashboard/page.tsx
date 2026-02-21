"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, MapPin, Calendar, IndianRupee, Plane } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DashboardSkeleton } from "@/components/LoadingSkeletons";
import { formatINR, formatDate } from "@/lib/utils";

const DEMO_TRIPS = [
  {
    id: "1",
    title: "Goa Beach Getaway",
    destination: "Goa, India",
    start_date: "2025-03-15",
    end_date: "2025-03-22",
    budget_inr: 45000,
    status: "planning",
    cover_image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=250&fit=crop",
  },
  {
    id: "2",
    title: "Europe Backpacking",
    destination: "Paris, Amsterdam, Prague",
    start_date: "2025-06-01",
    end_date: "2025-06-21",
    budget_inr: 180000,
    status: "planning",
    cover_image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=250&fit=crop",
  },
];

const statusColors: Record<string, string> = {
  planning: "secondary",
  confirmed: "success",
  active: "default",
  completed: "outline",
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [trips] = useState(DEMO_TRIPS);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Trips ✈️</h1>
          <p className="text-slate-500 mt-1">Plan, explore, and relive your adventures</p>
        </div>
        <Link
          href="/new-trip"
          className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm"
        >
          <PlusCircle className="w-4 h-4" /> New Trip
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Trips", value: trips.length, icon: Plane, color: "text-blue-600" },
          { label: "Countries Visited", value: "4", icon: MapPin, color: "text-green-600" },
          { label: "Total Spent", value: "₹2.3L", icon: IndianRupee, color: "text-purple-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trips Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Your Trips</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {trips.map((trip) => (
            <Link key={trip.id} href={`/trip/${trip.id}`} className="group">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5">
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={trip.cover_image}
                    alt={trip.destination}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge variant={statusColors[trip.status] as any} className="absolute top-3 right-3 capitalize">
                    {trip.status}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-800 mb-1">{trip.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-slate-500 mb-2">
                    <MapPin className="w-3 h-3" /> {trip.destination}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(trip.start_date)} → {formatDate(trip.end_date)}
                    </span>
                    <span className="font-semibold text-green-700">{formatINR(trip.budget_inr)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Add new trip card */}
          <Link href="/new-trip">
            <div className="bg-white rounded-2xl border-2 border-dashed border-blue-200 h-full min-h-[220px] flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer p-6">
              <PlusCircle className="w-10 h-10 text-blue-400 mb-3" />
              <p className="font-semibold text-blue-600">Plan a New Trip</p>
              <p className="text-xs text-slate-400 mt-1 text-center">AI generates your full itinerary in seconds</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
