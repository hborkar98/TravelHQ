import Link from "next/link";
import { Sparkles, Map, Mic, CreditCard, Star, ArrowRight, Globe, Compass, Zap } from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI Itinerary Generator",  desc: "Claude crafts day-by-day plans with activities, costs, and tips in seconds.",    accent: "#f5b642" },
  { icon: Map,      title: "Live Interactive Maps",    desc: "Mapbox-powered maps with routes, pins, and offline GPX downloads.",               accent: "#4ade80" },
  { icon: Mic,      title: "Voice Audio Guides",       desc: "ElevenLabs narration for every destination — like a personal tour guide.",        accent: "#60a5fa" },
  { icon: Globe,    title: "Live Trip Tracker",        desc: "Real-time expense tracking and group collaboration during travel.",               accent: "#f472b6" },
  { icon: Zap,      title: "AI Media Studio",          desc: "Generate destination visuals and reels with Runway AI.",                          accent: "#a78bfa" },
  { icon: CreditCard, title: "Smart Budget Optimizer", desc: "INR-friendly budget breakdowns with savings suggestions.",                        accent: "#34d399" },
];

const testimonials = [
  { name: "Priya S.",   role: "Solo Traveler", quote: "Planned my entire Europe trip in 5 minutes. Mind-blowing!", avatar: "PS" },
  { name: "Rahul M.",   role: "Family Trip",   quote: "The budget breakdown saved us ₹15,000 compared to a travel agent.", avatar: "RM" },
  { name: "Ananya K.",  role: "Backpacker",    quote: "The offline mode was a lifesaver in remote areas of Ladakh.", avatar: "AK" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", transition: "background 0.3s ease" }}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4"
        style={{ background: "var(--nav-bg)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", transition: "background 0.3s ease" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))" }}>
            <Compass className="w-4 h-4 text-black" />
          </div>
          <span className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>TravelHQ</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm font-medium hidden sm:block transition-colors"
            style={{ color: "var(--text-secondary)" }}>
            Dashboard
          </Link>
          <Link href="/new-trip"
            className="text-sm font-semibold px-4 py-2 rounded-xl text-black transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", boxShadow: "0 4px 15px var(--accent-bg)" }}>
            Start Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 px-4 sm:px-6">
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--accent-bg) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
            style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", color: "var(--accent)" }}>
            <Sparkles className="w-3 h-3" /> Powered by Claude AI · 3 free trips/month
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6"
            style={{ color: "var(--text-primary)" }}>
            Travel the world<br />
            <span className="gold-shimmer">planned by AI</span>
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}>
            TravelHQ turns your destination into a fully personalized trip — itinerary, maps, budget, audio guides, and live tracking in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/new-trip"
              className="inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-xl text-black transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", boxShadow: "0 8px 30px var(--accent-bg)" }}>
              Generate Your Trip Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/dashboard"
              className="inline-flex items-center justify-center gap-2 font-medium px-8 py-3.5 rounded-xl transition-all glass"
              style={{ color: "var(--text-secondary)" }}>
              View Dashboard
            </Link>
          </div>
          <p className="text-xs mt-6" style={{ color: "var(--text-muted)" }}>
            No credit card required · Trusted by 10,000+ travelers
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>✦ Features</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
            Everything for perfect travel
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc, accent }) => (
            <div key={title} className="glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${accent}15`, border: `1px solid ${accent}25` }}>
                <Icon className="w-5 h-5" style={{ color: accent }} />
              </div>
              <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>{title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 py-16 sm:py-24" style={{ background: "var(--surface)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>✦ Testimonials</p>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              Loved by travelers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.name} className="glass rounded-2xl p-5">
                <div className="flex mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5" style={{ color: "var(--accent)", fill: "var(--accent)" }} />)}
                </div>
                <p className="text-sm italic mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>"{t.quote}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-black"
                    style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Ready to travel smarter?
        </h2>
        <p className="mb-8 text-sm" style={{ color: "var(--text-secondary)" }}>
          Join thousands of travelers using AI to plan perfect trips.
        </p>
        <Link href="/new-trip"
          className="inline-flex items-center gap-2 font-bold px-10 py-4 rounded-xl text-black transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", boxShadow: "0 8px 30px var(--accent-bg)" }}>
          Start Planning for Free <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="py-8 text-center text-xs" style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}>
        © 2025 TravelHQ · Built with ❤️ and Claude AI
      </footer>
    </div>
  );
}
