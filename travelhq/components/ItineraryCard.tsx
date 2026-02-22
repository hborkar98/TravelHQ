"use client";
import { Clock, MapPin, IndianRupee, Bus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Activity } from "@/types";
import { cn, formatINR } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  sightseeing: "bg-blue-100 text-blue-700",
  food: "bg-amber-100 text-amber-700",
  transport: "bg-slate-100 text-slate-700",
  accommodation: "bg-purple-100 text-purple-700",
  activity: "bg-green-100 text-green-700",
  rest: "bg-pink-100 text-pink-700",
};

interface ItineraryCardProps {
  activity: Activity;
  index: number;
  provided?: any;
}

export default function ItineraryCard({ activity, index, provided }: ItineraryCardProps) {
  return (
    <div
      ref={provided?.innerRef}
      {...(provided?.draggableProps || {})}
      {...(provided?.dragHandleProps || {})}
      className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all group cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-slate-800 text-sm">{activity.title}</h4>
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium shrink-0", categoryColors[activity.category] || "bg-slate-100 text-slate-700")}>
              {activity.category}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{activity.description}</p>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3 h-3" /> {activity.time} ({activity.duration_minutes}m)
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="w-3 h-3" /> {activity.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Bus className="w-3 h-3" /> {activity.transport}
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-green-700">
              <IndianRupee className="w-3 h-3" /> {formatINR(activity.cost_inr)}
            </span>
          </div>
          {activity.tips && (
            <p className="text-xs text-amber-600 mt-2 bg-amber-50 rounded px-2 py-1">
              💡 {activity.tips}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
