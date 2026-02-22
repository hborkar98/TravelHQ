import Link from "next/link";
import { Globe, Sparkles, Map, Mic, CreditCard, Star, ArrowRight, Check } from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI Itinerary Generator", desc: "Claude crafts day-by-day plans with activities, costs, and tips in seconds." },
  { icon: Map, title: "Live Interactive Maps", desc: "Mapbox-powered maps with routes, pins, and offline GPX downloads." },
  { icon: Mic, title: "Voice Audio Guides", desc: "ElevenLabs narration for every destination — like a personal tour guide." },
  { icon: Globe, title: "Live Trip Tracker", desc: "Real-time expense tracking and group collaboration during travel." },
  { icon: Star, title: "AI Media Studio", desc: "Generate destination visuals and reels with Runway AI." },
  { icon: CreditCard, title: "Smart Budget Optimizer", desc: "INR-friendly budget breakdowns with savings suggestions." },
];

const testimonials = [
  { name: "Priya S.", role: "Solo Traveler", quote: "Planned my entire Europe trip in 5 minutes. Mind-blowing!" },
  { name: "Rahul M.", role: "Family Trip", quote: "The budget breakdown saved us ₹15,000 compared to a travel agent." },
  { name: "Ananya K.", role: "Backpacker", quote: "The offline mode was a lifesaver in remote areas of Ladakh." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" /> Powered by Claude AI
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Plan Any Trip <br />
            <span className="text-yellow-300">in Seconds</span> ✈️
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            TravelHQ turns your travel idea into a fully personalized trip — itinerary, maps, budget, audio guides, and live tracking — all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/new-trip" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              Generate Your Trip Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur font-semibold px-8 py-4 rounded-xl hover:bg-white/30 transition-all">
              View Dashboard
            </Link>
          </div>
          <p className="text-sm text-blue-200 mt-6">No credit card required · 3 free trips/month</p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Everything You Need for Perfect Travel</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
              <p className="text-sm text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Loved by Travelers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-slate-600 text-sm italic mb-4">"{t.quote}"</p>
                <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                <p className="text-xs text-slate-400">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Ready to Travel Smarter?</h2>
        <p className="text-slate-500 mb-8">Join thousands of travelers using AI to plan perfect trips.</p>
        <Link href="/new-trip" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all">
          Start Planning for Free <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="border-t py-8 text-center text-sm text-slate-400">
        © 2025 TravelHQ · Built with ❤️ and Claude AI
      </footer>
    </div>
  );
}
