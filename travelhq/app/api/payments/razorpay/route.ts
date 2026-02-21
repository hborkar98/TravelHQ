import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PLANS = {
  wanderer: { amount: 79900, name: "Wanderer Plan" }, // ₹799
  pro: { amount: 249900, name: "Pro Plan" },           // ₹2,499
};

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();
    const planData = PLANS[plan as keyof typeof PLANS];
    if (!planData) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

    // In production, use Razorpay SDK to create an order
    const orderId = `order_${crypto.randomBytes(10).toString("hex")}`;
    return NextResponse.json({
      order_id: orderId,
      amount: planData.amount,
      currency: "INR",
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      name: "TravelHQ",
      description: planData.name,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
