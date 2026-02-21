"use client";
import { Film, BookOpen, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PostTripPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Post-Trip Studio 🎬</h1>
        <p className="text-slate-500 mt-1">Relive your adventure with AI-generated memories</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {[
          { icon: Film, title: "AI Travel Reel", desc: "15-60 second auto-generated video of your trip", color: "bg-purple-50 text-purple-600", action: "Generate Reel" },
          { icon: BookOpen, title: "AI Travel Journal", desc: "Beautiful narrative of your experiences", color: "bg-blue-50 text-blue-600", action: "Write Journal" },
          { icon: Star, title: "Trip Highlights", desc: "Top moments, stats, and memories dashboard", color: "bg-amber-50 text-amber-600", action: "View Highlights" },
          { icon: Download, title: "PDF Trip Report", desc: "Professional downloadable trip summary", color: "bg-green-50 text-green-600", action: "Export PDF" },
        ].map(({ icon: Icon, title, desc, color, action }) => (
          <div key={title} className="bg-white rounded-2xl border p-6 space-y-4">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{title}</h3>
              <p className="text-sm text-slate-500 mt-1">{desc}</p>
            </div>
            <Button variant="outline" className="w-full">{action}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
