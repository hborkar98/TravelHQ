import Link from "next/link";
import { Sparkles, Map, Mic, CreditCard, Star, ArrowRight, Compass, Zap, Shield, Clock, Users } from "lucide-react";

const features = [
  { icon: Sparkles,   title: "AI Itinerary Generator",  desc: "Claude crafts day-by-day plans with activities, costs, and local tips in seconds.", accent: "#f5b642" },
  { icon: Map,        title: "Live Interactive Maps",    desc: "Mapbox-powered maps with routes, waypoints, and offline GPX downloads.",             accent: "#4ade80" },
  { icon: Mic,        title: "Voice Audio Guides",       desc: "ElevenLabs narration for every destination — like having a personal tour guide.",    accent: "#60a5fa" },
  { icon: Compass,    title: "Live Trip Tracker",        desc: "Real-time expense tracking and group collaboration during your journey.",             accent: "#f472b6" },
  { icon: Zap,        title: "AI Media Studio",          desc: "Generate stunning destination visuals and travel reels with Runway AI.",              accent: "#a78bfa" },
  { icon: CreditCard, title: "Smart Budget Optimizer",   desc: "INR-friendly budget breakdowns with personalised savings suggestions.",              accent: "#34d399" },
];

const destinations = [
  { name: "Bali",      country: "Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=500&fit=crop" },
  { name: "Santorini", country: "Greece",    img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=500&fit=crop" },
  { name: "Kyoto",     country: "Japan",     img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=500&fit=crop" },
  { name: "Ladakh",    country: "India",     img: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=400&h=500&fit=crop" },
];

const testimonials = [
  { name: "Priya Sharma",  role: "Solo Traveler", quote: "Planned my entire Europe trip in 5 minutes. Absolutely mind-blowing!", avatar: "PS", trips: 12 },
  { name: "Rahul Mehta",   role: "Family Trips",  quote: "The budget breakdown saved us ₹15,000 compared to a travel agent.",    avatar: "RM", trips: 8  },
  { name: "Ananya Kapoor", role: "Backpacker",    quote: "The offline mode was a lifesaver in remote areas of Ladakh.",          avatar: "AK", trips: 24 },
];

const stats = [
  { value: "50K+",  label: "Trips Planned"   },
  { value: "120+",  label: "Countries"        },
  { value: "4.9★",  label: "User Rating"      },
  { value: "< 30s", label: "Trip Generated"   },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", transition: "background 0.3s ease" }}>

      {/* ── Sticky Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-10 py-4"
        style={{ background: "var(--nav-bg)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)", transition: "background 0.3s ease" }}>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-2xl"
            style={{ background: "linear-gradient(135deg, #f5b642 0%, #e8960a 100%)", boxShadow: "0 4px 16px rgba(245,182,66,0.4)" }}>
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 border-2 border-black" />
          </div>
          <div className="leading-none">
            <span className="text-xl font-bold block" style={{ fontFamily: "Playfair Display, serif", color: "var(--text-primary)" }}>
              TravelHQ
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              ✦ AI Travel Planner
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {[["Features", "#features"], ["Destinations", "#destinations"], ["Pricing", "/pricing"]].map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "var(--text-secondary)" }}>{label}</a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="hidden sm:block text-sm font-medium px-4 py-2 rounded-xl transition-all hover:opacity-80"
            style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
            Sign In
          </Link>
          <Link href="/new-trip"
            className="text-sm font-bold px-5 py-2.5 rounded-xl text-black transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #f5b642, #e8960a)", boxShadow: "0 4px 16px rgba(245,182,66,0.35)" }}>
            Start Free ✈️
          </Link>
        </div>
      </nav>

      {/* ── HERO ── Full screen travel photo */}
      <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ minHeight: "100svh" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop&q=90"
          alt="Beautiful travel destination"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0.95) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.35) 100%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 animate-fade-up-1"
            style={{ background: "rgba(245,182,66,0.18)", border: "1px solid rgba(245,182,66,0.45)", color: "#f5b642", backdropFilter: "blur(8px)" }}>
            <Sparkles className="w-3 h-3" /> Powered by Claude AI · Free to start
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-5 animate-fade-up-2"
            style={{ fontFamily: "Playfair Display, serif", textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>
            Your Next Adventure<br />
            <span className="gold-shimmer">Starts Here</span>
          </h1>

          <p className="text-base sm:text-xl text-white/75 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-up-3"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
            AI-powered trip planning with full itineraries, interactive maps, budget tracking, and live guidance — all in one beautiful platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10 animate-fade-up-4">
            <Link href="/new-trip"
              className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-2xl text-black text-base transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #f5b642, #e8960a)", boxShadow: "0 8px 32px rgba(245,182,66,0.5)" }}>
              Plan My Trip Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-2xl text-white text-base transition-all hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}>
              View Dashboard
            </Link>
          </div>

          {/* Social proof */}
          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl animate-fade-up-4"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="flex -space-x-1.5">
              {["🧑🏽","👩🏻","🧔🏾","👩🏼","🧑🏿"].map((e, i) => (
                <span key={i} className="w-7 h-7 rounded-full border border-black/20 bg-stone-700 flex items-center justify-center text-sm">{e}</span>
              ))}
            </div>
            <span className="text-white/75 text-xs font-medium">50,000+ trips planned worldwide</span>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3" style={{ color: "#f5b642", fill: "#f5b642" }} />)}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-60">
          <span className="text-white/50 text-[10px] font-medium tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "Playfair Display, serif", color: "var(--accent)" }}>{value}</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Destinations ── */}
      <section id="destinations" className="px-4 sm:px-6 py-16 sm:py-24 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>✦ Popular Destinations</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
            Where will you go next?
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {destinations.map(({ name, country, img }) => (
            <Link key={name} href="/new-trip"
              className="group relative rounded-2xl overflow-hidden block"
              style={{ aspectRatio: "3/4" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }} />
              <div className="absolute bottom-3 left-3">
                <p className="text-white font-bold text-sm md:text-base" style={{ fontFamily: "Playfair Display, serif" }}>{name}</p>
                <p className="text-white/55 text-xs">{country}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-bold px-3 py-1.5 rounded-xl text-black"
                  style={{ background: "linear-gradient(135deg, #f5b642, #e8960a)", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
                  Plan Trip →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ background: "var(--bg-secondary)" }} className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>✦ Features</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>Everything for perfect travel</h2>
            <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>One platform to plan, track, and relive every journey</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, title, desc, accent }) => (
              <div key={title} className="glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${accent}15`, border: `1px solid ${accent}25` }}>
                  <Icon className="w-5 h-5" style={{ color: accent }} />
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust ── */}
      <section className="px-4 sm:px-6 py-14 max-w-4xl mx-auto grid grid-cols-3 gap-6">
        {[
          { icon: Shield, title: "Secure & Private",   desc: "Your travel data is encrypted and never sold"   },
          { icon: Clock,  title: "Plan in 30 Seconds", desc: "AI generates full itineraries instantly"         },
          { icon: Users,  title: "Group Ready",        desc: "Collaborate and share trips with your crew"      },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="text-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}>
              <Icon className="w-5 h-5" style={{ color: "var(--accent)" }} />
            </div>
            <p className="text-xs font-bold mb-1" style={{ color: "var(--text-primary)" }}>{title}</p>
            <p className="text-[10px] leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
          </div>
        ))}
      </section>

      {/* ── Testimonials ── */}
      <section style={{ background: "var(--bg-secondary)" }} className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>✦ Testimonials</p>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Loved by travelers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.name} className="glass rounded-2xl p-5">
                <div className="flex justify-between mb-3">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3" style={{ color: "var(--accent)", fill: "var(--accent)" }} />)}
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--accent-bg)", color: "var(--accent)" }}>
                    {t.trips} trips
                  </span>
                </div>
                <p className="text-sm italic mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>"{t.quote}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))" }}>{t.avatar}</div>
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

      {/* ── Final CTA ── */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-24 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=600&fit=crop&q=80"
          alt="Travel" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.78)" }} />
        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Ready to travel smarter?
          </h2>
          <p className="text-white/55 mb-8 text-sm">Join 50,000+ travelers using AI to plan perfect trips.</p>
          <Link href="/new-trip"
            className="inline-flex items-center gap-2 font-bold px-10 py-4 rounded-2xl text-black transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #f5b642, #e8960a)", boxShadow: "0 8px 32px rgba(245,182,66,0.5)" }}>
            Start Planning for Free <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-white/25 text-xs mt-4">No credit card required · 3 free trips/month</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #f5b642, #e8960a)" }}>
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>
            <span className="font-bold" style={{ fontFamily: "Playfair Display, serif", color: "var(--text-primary)" }}>TravelHQ</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-5">
            {[["Features", "#features"], ["Pricing", "/pricing"], ["Dashboard", "/dashboard"], ["New Trip", "/new-trip"]].map(([label, href]) => (
              <a key={label} href={href} className="text-xs transition-opacity hover:opacity-70" style={{ color: "var(--text-muted)" }}>{label}</a>
            ))}
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>© 2025 TravelHQ · Built with ❤️ and Claude AI</p>
        </div>
      </footer>
    </div>
  );
}
