"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, MapPin, Calendar, IndianRupee, Users } from "lucide-react";
import { cacheTrip } from "@/lib/ai-pipeline";

const INTERESTS = [
  "History", "Food", "Nature", "Adventure", "Art",
  "Shopping", "Nightlife", "Beaches", "Mountains", "Temples", "Photography", "Trekking"
];

const STYLES = [
  { value: "budget",     label: "🎒 Budget Backpacker" },
  { value: "comfort",    label: "🏨 Comfort" },
  { value: "luxury",     label: "💎 Luxury" },
  { value: "family",     label: "👨‍👩‍👧 Family" },
  { value: "romantic",   label: "💑 Romantic" },
  { value: "backpacker", label: "🌐 Backpacker" },
];

const PROGRESS_STEPS = [
  { label: "🔍 Researching destination...",             pct: 15 },
  { label: "🧠 Claude is crafting your itinerary...",  pct: 40 },
  { label: "💰 Optimizing budget breakdown...",         pct: 65 },
  { label: "🗺️ Mapping routes & waypoints...",         pct: 85 },
  { label: "✅ Trip ready! Redirecting...",             pct: 100 },
];

export default function NewTripPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    destination: "",
    start_date:  "",
    end_date:    "",
    budget_inr:  50000,
    group_size:  2,
    style:       "comfort",
    dietary:     "",
    notes:       "",
  });
  const [interests,    setInterests]    = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [stepIdx,      setStepIdx]      = useState(0);
  const [error,        setError]        = useState("");

  const toggle = (i: string) =>
    setInterests(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);

  const set = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  const inputStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    fontFamily: "DM Sans, sans-serif",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.destination.trim())        return setError("Please enter a destination.");
    if (!form.start_date)                return setError("Please select a start date.");
    if (!form.end_date)                  return setError("Please select an end date.");
    if (form.end_date < form.start_date) return setError("End date must be after start date.");
    if (interests.length === 0)          return setError("Please select at least one interest.");

    setIsGenerating(true);
    setStepIdx(0);

    // Animate progress steps while API runs
    let idx = 0;
    const interval = setInterval(() => {
      idx += 1;
      if (idx < PROGRESS_STEPS.length - 1) {
        setStepIdx(idx);
      } else {
        clearInterval(interval);
      }
    }, 5000);

    try {
      const res = await fetch("/api/generate-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, interests }),
      });

      // Read body ONCE
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || `Error ${res.status}`);
      }

      clearInterval(interval);
      setStepIdx(PROGRESS_STEPS.length - 1);

      // Save to cache using the shared helper
      const tripId = `trip-${Date.now()}`;
      cacheTrip(tripId, data);

      // Small delay so user sees "Trip ready!" before redirect
      setTimeout(() => router.push(`/trip/${tripId}`), 800);

    } catch (err: any) {
      clearInterval(interval);
      setIsGenerating(false);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  // ── Loading screen ──
  if (isGenerating) {
    const step = PROGRESS_STEPS[stepIdx];
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "var(--bg)" }}>
        <div className="max-w-sm w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
            style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}>
            <Sparkles className="w-10 h-10 animate-pulse" style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              Crafting Your Trip...
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{step.label}</p>
          </div>
          <div className="w-full rounded-full h-2.5" style={{ background: "var(--surface)" }}>
            <div className="h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${step.pct}%`, background: "linear-gradient(90deg, var(--accent), var(--accent-dark))" }} />
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {step.pct}% complete · Powered by Claude AI
          </p>
        </div>
      </div>
    );
  }

  // ── Form ──
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", transition: "background 0.3s ease" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 md:py-10">

        <div className="mb-8 animate-fade-up-1">
          <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>
            ✦ AI Trip Generator
          </p>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
            Plan a New Trip
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Tell us your dream — Claude AI builds the perfect itinerary in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-up-2">

          {error && (
            <div className="rounded-xl px-4 py-3 text-sm"
              style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
              ⚠️ {error}
            </div>
          )}

          {/* Destination */}
          <div className="glass rounded-2xl p-5 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5"
              style={{ color: "var(--accent)" }}>
              <MapPin className="w-3.5 h-3.5" /> Destination
            </label>
            <input value={form.destination} onChange={e => set("destination", e.target.value)}
              placeholder="e.g. Goa, Bali, Paris, Rajasthan..."
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all" style={inputStyle}
              onFocus={e => (e.target.style.borderColor = "var(--accent)")}
              onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
          </div>

          {/* Dates */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <label className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5"
              style={{ color: "var(--accent)" }}>
              <Calendar className="w-3.5 h-3.5" /> Travel Dates
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[["start_date","Start Date"],["end_date","End Date"]].map(([key, lbl]) => (
                <div key={key}>
                  <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{lbl}</p>
                  <input type="date" value={(form as any)[key]}
                    onChange={e => set(key, e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
                </div>
              ))}
            </div>
          </div>

          {/* Budget + Group */}
          <div className="glass rounded-2xl p-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 mb-2"
                  style={{ color: "var(--accent)" }}>
                  <IndianRupee className="w-3.5 h-3.5" /> Budget (₹)
                </label>
                <input type="number" min="5000" value={form.budget_inr}
                  onChange={e => set("budget_inr", Number(e.target.value))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all" style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 mb-2"
                  style={{ color: "var(--accent)" }}>
                  <Users className="w-3.5 h-3.5" /> Group Size
                </label>
                <input type="number" min="1" max="50" value={form.group_size}
                  onChange={e => set("group_size", Number(e.target.value))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all" style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
              </div>
            </div>
          </div>

          {/* Travel Style */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              🎭 Travel Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {STYLES.map(s => (
                <button key={s.value} type="button" onClick={() => set("style", s.value)}
                  className="px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
                  style={form.style === s.value
                    ? { background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", color: "#000" }
                    : { ...inputStyle, border: "1px solid var(--border)" }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              🎯 Interests{" "}
              <span className="normal-case font-normal" style={{ color: "var(--text-muted)" }}>
                (select all that apply)
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(i => (
                <button key={i} type="button" onClick={() => toggle(i)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={interests.includes(i)
                    ? { background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", color: "#000" }
                    : { ...inputStyle, border: "1px solid var(--border)" }}>
                  {i}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary + Notes */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest block mb-1.5"
                style={{ color: "var(--accent)" }}>
                🥗 Dietary{" "}
                <span className="normal-case font-normal" style={{ color: "var(--text-muted)" }}>(optional)</span>
              </label>
              <input value={form.dietary} onChange={e => set("dietary", e.target.value)}
                placeholder="e.g. Vegetarian, Vegan, Halal..."
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest block mb-1.5"
                style={{ color: "var(--accent)" }}>
                📝 Notes{" "}
                <span className="normal-case font-normal" style={{ color: "var(--text-muted)" }}>(optional)</span>
              </label>
              <textarea value={form.notes} onChange={e => set("notes", e.target.value)}
                placeholder="Any special requests, mobility needs, or must-do experiences..."
                rows={3} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none transition-all"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
            </div>
          </div>

          {/* Submit */}
          <button type="submit"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-bold text-black transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", boxShadow: "0 8px 30px var(--accent-bg)" }}>
            <Sparkles className="w-5 h-5" /> Generate My AI Trip Plan
          </button>
          <p className="text-xs text-center pb-6" style={{ color: "var(--text-muted)" }}>
            Takes 15–30 seconds · Powered by Claude AI
          </p>

        </form>
      </div>
    </div>
  );
}
