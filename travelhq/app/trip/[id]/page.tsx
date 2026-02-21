"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, MapPin, Users, DollarSign, Info, Map, Banknote, Image } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ItineraryCard from "@/components/ItineraryCard";
import dynamic from "next/dynamic";
import BudgetBreakdown from "@/components/BudgetBreakdown";
import { ItinerarySkeleton } from "@/components/LoadingSkeletons";
import { getCachedTrip } from "@/lib/ai-pipeline";
import { formatINR, formatDate } from "@/lib/utils";
import type { GeneratedTrip } from "@/types";

const MapViewer = dynamic(() => import("@/components/MapViewer"), { ssr: false });

type TabKey = "overview" | "itinerary" | "map" | "budget" | "media";

const tabs: { key: TabKey; label: string; icon: any }[] = [
  { key: "overview", label: "Overview", icon: Info },
  { key: "itinerary", label: "Itinerary", icon: Calendar },
  { key: "map", label: "Map", icon: Map },
  { key: "budget", label: "Budget", icon: Banknote },
  { key: "media", label: "Media", icon: Image },
];

export default function TripDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<GeneratedTrip | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = getCachedTrip(id);
    if (cached) setTrip(cached);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="p-6"><ItinerarySkeleton /></div>;
  }

  if (!trip) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-700 mb-2">Trip not found</p>
          <p className="text-slate-400">Generate a new trip to see it here.</p>
        </div>
      </div>
    );
  }

  const markers = trip.days.flatMap(d =>
    d.activities.filter(a => a.lat && a.lng).map(a => ({
      lat: a.lat!, lng: a.lng!, title: a.title
    }))
  );

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">{trip.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-blue-100 text-sm">
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {trip.destination}</span>
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {trip.days.length} days</span>
          <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {formatINR(trip.total_cost_inr)}</span>
        </div>
        <p className="mt-3 text-blue-100 max-w-2xl">{trip.summary}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {trip.highlights.map(h => (
            <Badge key={h} className="bg-white/20 text-white border-white/30">{h}</Badge>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="flex overflow-x-auto px-6">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 max-w-4xl mx-auto">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border p-5">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">✈️ Trip Tips</h3>
                <ul className="space-y-2">
                  {trip.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-slate-600 flex gap-2">
                      <span className="text-blue-500 shrink-0">•</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border p-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Best Time</p>
                  <p className="text-sm text-slate-700 mt-1">{trip.best_time_to_visit}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Visa Info</p>
                  <p className="text-sm text-slate-700 mt-1">{trip.visa_info}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Weather</p>
                  <p className="text-sm text-slate-700 mt-1">{trip.weather_info}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border p-5">
              <h3 className="font-bold text-slate-800 mb-3">🆘 Emergency Contacts</h3>
              <div className="grid grid-cols-2 gap-3">
                {trip.emergency_contacts.map((c, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-slate-600">{c.name}</span>
                    <span className="font-mono font-semibold text-red-600">{c.number}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "itinerary" && (
          <div className="space-y-8">
            {trip.days.map((day) => (
              <div key={day.day_number}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    D{day.day_number}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{day.title}</h3>
                    <p className="text-xs text-slate-400">{day.date} · {formatINR(day.total_cost_inr)}</p>
                  </div>
                </div>
                <div className="space-y-3 ml-2 border-l-2 border-blue-100 pl-5">
                  {day.activities.map((activity, i) => (
                    <ItineraryCard key={activity.id} activity={activity} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "map" && (
          <MapViewer markers={markers} className="h-[600px] w-full" />
        )}

        {activeTab === "budget" && (
          <div className="bg-white rounded-2xl border p-6">
            <h3 className="font-bold text-slate-800 text-lg mb-6">Budget Breakdown</h3>
            <BudgetBreakdown breakdown={trip.budget_breakdown} totalBudget={trip.total_cost_inr} />
          </div>
        )}

        {activeTab === "media" && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Image className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="font-bold text-slate-700 text-xl mb-2">AI Media Studio</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              Generate stunning destination visuals, travel reels, and voice narrations with AI. Available in Pro plan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
