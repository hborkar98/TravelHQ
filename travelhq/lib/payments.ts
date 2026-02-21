import type { PricingPlan, PricingTier } from "@/types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price_inr: 0,
    price_usd: 0,
    trips_per_month: 2,
    features: [
      "2 AI trips per month",
      "Basic itinerary",
      "Standard map view",
      "PDF export",
    ],
  },
  {
    id: "wanderer",
    name: "Wanderer",
    price_inr: 799,
    price_usd: 10,
    trips_per_month: 15,
    popular: true,
    features: [
      "15 AI trips per month",
      "Full itinerary + budget",
      "Interactive Mapbox maps",
      "AI media previews",
      "Live trip tracker",
      "Voice narration",
      "Offline bundle",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price_inr: 2499,
    price_usd: 30,
    trips_per_month: "unlimited",
    features: [
      "Unlimited AI trips",
      "All Wanderer features",
      "AI travel reel (15–60s)",
      "Post-trip journal AI",
      "Group collaboration",
      "Priority AI generation",
      "Custom voice cloning",
      "API access",
    ],
  },
];

export function getPlan(tier: PricingTier): PricingPlan {
  return PRICING_PLANS.find((p) => p.id === tier) ?? PRICING_PLANS[0];
}

// Razorpay (India)
export async function createRazorpayOrder(planId: PricingTier) {
  const res = await fetch("/api/payments/razorpay/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId }),
  });
  if (!res.ok) throw new Error("Failed to create Razorpay order");
  return res.json();
}

// Stripe (Global)
export async function createStripeCheckout(planId: PricingTier) {
  const res = await fetch("/api/payments/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId }),
  });
  if (!res.ok) throw new Error("Failed to create Stripe checkout");
  const { url } = await res.json();
  window.location.href = url;
}
