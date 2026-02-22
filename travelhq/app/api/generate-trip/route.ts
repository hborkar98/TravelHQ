import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { TripInput, GeneratedTrip } from "@/types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const input: TripInput = await req.json();
    const days = getDayCount(input.start_date, input.end_date);

    const prompt = `You are TravelHQ's AI trip planner. Generate a detailed, realistic travel itinerary in JSON format.

Trip Details:
- Destination: ${input.destination}
- Dates: ${input.start_date} to ${input.end_date} (${days} days)
- Budget: ₹${input.budget_inr} INR total
- Group Size: ${input.group_size} people
- Travel Style: ${input.style}
- Interests: ${input.interests.join(", ")}
- Dietary: ${input.dietary || "No restrictions"}
- Notes: ${input.notes || "None"}

Return a JSON object with this EXACT structure (no markdown, pure JSON):
{
  "title": "Trip title",
  "destination": "${input.destination}",
  "summary": "2-3 sentence trip overview",
  "highlights": ["highlight1", "highlight2", "highlight3"],
  "days": [
    {
      "day_number": 1,
      "date": "${input.start_date}",
      "title": "Day theme title",
      "activities": [
        {
          "id": "act-1-1",
          "time": "09:00",
          "title": "Activity name",
          "description": "Detailed description",
          "location": "Specific location name",
          "cost_inr": 500,
          "transport": "Auto-rickshaw",
          "duration_minutes": 90,
          "category": "sightseeing",
          "lat": 18.5204,
          "lng": 73.8567,
          "tips": "Insider tip"
        }
      ],
      "total_cost_inr": 2500
    }
  ],
  "budget_breakdown": [
    {"category": "Accommodation", "amount_inr": 15000, "percentage": 30, "color": "#6366f1"},
    {"category": "Food", "amount_inr": 10000, "percentage": 20, "color": "#f59e0b"},
    {"category": "Transport", "amount_inr": 8000, "percentage": 16, "color": "#10b981"},
    {"category": "Activities", "amount_inr": 12000, "percentage": 24, "color": "#3b82f6"},
    {"category": "Shopping", "amount_inr": 5000, "percentage": 10, "color": "#ec4899"}
  ],
  "total_cost_inr": ${input.budget_inr},
  "tips": ["tip1", "tip2", "tip3"],
  "best_time_to_visit": "Season info",
  "visa_info": "Visa requirements",
  "weather_info": "Expected weather during dates",
  "emergency_contacts": [
    {"name": "Local Police", "number": "100"},
    {"name": "Tourist Helpline", "number": "1800-111-363"}
  ]
}

Include ${days} full days with 5-7 activities each. Keep total costs within ₹${input.budget_inr} budget.`;

    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    let jsonText = content.text.trim();
    // Strip markdown code blocks if present
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const trip: GeneratedTrip = JSON.parse(jsonText);
    return NextResponse.json(trip);
  } catch (err: any) {
    console.error("Trip generation error:", err);
    return NextResponse.json({ error: err.message || "Generation failed" }, { status: 500 });
  }
}

function getDayCount(start: string, end: string): number {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
}
