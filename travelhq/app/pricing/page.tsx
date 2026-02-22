"use client";
import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/month",
    features: ["3 AI trips per month", "Basic itinerary", "Map view", "Budget calculator"],
    cta: "Get Started Free",
    popular: false,
    plan: null,
  },
  {
    name: "Wanderer",
    price: "₹799",
    period: "/month",
    features: ["15 AI trips per month", "Full AI itinerary", "Live tracking", "Budget optimizer", "Offline downloads", "Audio guides"],
    cta: "Start Wandering",
    popular: true,
    plan: "wanderer",
  },
  {
    name: "Pro",
    price: "₹2,499",
    period: "/month",
    features: ["Unlimited trips", "Everything in Wanderer", "AI Media Studio", "Voice cloning", "Travel reels", "PDF export", "Priority support", "Group collaboration"],
    cta: "Go Pro",
    popular: false,
    plan: "pro",
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleCheckout = async (plan: string) => {
    setLoading(plan);
    setMessage("");
    try {
      const res = await fetch("/api/payments/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      setMessage(`✅ Order created! Connect Razorpay SDK to complete checkout. Order ID: ${data.order_id}`);
    } catch {
      setMessage("❌ Payment setup failed. Add RAZORPAY keys to .env.local");
    }
    setLoading(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-3">Simple, Honest Pricing</h1>
        <p className="text-slate-500 text-lg">Start free. Upgrade when you're ready to explore more.</p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800 text-center">
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-6 space-y-5 relative bg-white ${
              plan.popular ? "border-blue-500 shadow-lg shadow-blue-100" : "border-slate-200"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Most Popular
                </span>
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-slate-800">{plan.name}</h2>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                <span className="text-slate-400">{plan.period}</span>
              </div>
            </div>
            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => plan.plan && handleCheckout(plan.plan)}
              variant={plan.popular ? "default" : "outline"}
              className="w-full"
              disabled={loading === plan.plan || !plan.plan}
            >
              {loading === plan.plan ? "Processing..." : plan.cta}
            </Button>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-slate-400 mt-8">
        Payments powered by Razorpay · Secure · INR billing · Cancel anytime
      </p>
    </div>
  );
}
