"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { TripInputSchema, type TripInput } from "@/types";
import { generateFullTrip, cacheTrip } from "@/lib/ai-pipeline";

const INTERESTS = ["History", "Food", "Nature", "Adventure", "Art", "Shopping", "Nightlife", "Beaches", "Mountains", "Temples", "Photography", "Trekking"];

export default function NewTripPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState("");
  const [progress, setProgress] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<TripInput>({
    resolver: zodResolver(TripInputSchema),
    defaultValues: { group_size: 2, budget_inr: 50000, style: "comfort", interests: [] },
  });

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const onSubmit = async (data: TripInput) => {
    if (selectedInterests.length === 0) {
      setError("Please select at least one interest.");
      return;
    }
    setError("");
    setIsGenerating(true);
    const fullData = { ...data, interests: selectedInterests };

    try {
      const trip = await generateFullTrip(fullData, (s, p) => {
        setStep(s);
        setProgress(p);
      });

      const tripId = `trip-${Date.now()}`;
      cacheTrip(tripId, trip);
      router.push(`/trip/${tripId}`);
    } catch (err: any) {
      setError(err.message || "Failed to generate trip. Please try again.");
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-10 h-10 text-blue-600 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Generating Your Trip...</h2>
          <p className="text-slate-500 text-sm">{step}</p>
          <Progress value={progress} className="h-3" />
          <p className="text-xs text-slate-400">{progress}% complete</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Plane className="w-8 h-8 text-blue-600" /> Plan a New Trip
        </h1>
        <p className="text-slate-500 mt-2">Tell us about your dream trip and AI will craft the perfect itinerary.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        {error && (
          <div className="bg-red-50 text-red-700 border border-red-100 rounded-lg p-3 text-sm">{error}</div>
        )}

        <div className="space-y-2">
          <Label htmlFor="destination">🌍 Destination</Label>
          <Input id="destination" placeholder="e.g. Bali, Goa, Paris, Rajasthan..." {...register("destination")} />
          {errors.destination && <p className="text-red-500 text-xs">{errors.destination.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start_date">📅 Start Date</Label>
            <Input id="start_date" type="date" {...register("start_date")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end_date">📅 End Date</Label>
            <Input id="end_date" type="date" {...register("end_date")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budget_inr">💰 Total Budget (₹)</Label>
            <Input id="budget_inr" type="number" min="5000" {...register("budget_inr", { valueAsNumber: true })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="group_size">👥 Group Size</Label>
            <Input id="group_size" type="number" min="1" max="50" {...register("group_size", { valueAsNumber: true })} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>🎭 Travel Style</Label>
          <Select {...register("style")}>
            <option value="budget">🎒 Budget Backpacker</option>
            <option value="comfort">🏨 Comfort</option>
            <option value="luxury">💎 Luxury</option>
            <option value="family">👨‍👩‍👧 Family</option>
            <option value="romantic">💑 Romantic</option>
            <option value="backpacker">🌐 Backpacker</option>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>🎯 Interests (select all that apply)</Label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  selectedInterests.includes(interest)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dietary">🥗 Dietary Preferences (optional)</Label>
          <Input id="dietary" placeholder="e.g. Vegetarian, Vegan, Halal..." {...register("dietary")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">📝 Special Notes (optional)</Label>
          <Textarea id="notes" placeholder="Any specific requests, mobility needs, or must-do experiences..." {...register("notes")} />
        </div>

        <Button type="submit" size="lg" className="w-full gap-2 text-base">
          <Sparkles className="w-5 h-5" /> Generate My AI Trip Plan
        </Button>
        <p className="text-xs text-slate-400 text-center">Takes 15–30 seconds · Powered by Claude AI</p>
      </form>
    </div>
  );
}
