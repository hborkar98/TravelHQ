import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Stripe integration placeholder - add Stripe SDK in production
    const { plan } = await req.json();
    const prices: Record<string, number> = { wanderer: 1099, pro: 3299 };
    const amount = prices[plan];
    if (!amount) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

    return NextResponse.json({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?success=true`,
      message: "Connect Stripe SDK for live payments",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
