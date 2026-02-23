import { NextRequest, NextResponse } from "next/server";
import type { TripInput, GeneratedTrip } from "@/types";

function getDayCount(start: string, end: string): number {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
}

export async function POST(req: NextRequest) {
  try {
    const input: TripInput = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
    }

    const days = getDayCount(input.start_date, input.end_date);

    const prompt = `You are TravelHQ's expert AI trip planner. Generate a detailed, realistic travel itinerary in pure JSON format.

Trip Details:
- Destination: ${input.destination}
- Dates: ${input.start_date} to ${input.end_date} (${days} days)
- Budget: ₹${input.budget_inr} INR total
- Group Size: ${input.group_size} people
- Travel Style: ${input.style}
- Interests: ${input.interests.join(", ")}
- Dietary: ${input.dietary || "No restrictions"}
- Notes: ${input.notes || "None"}

Return ONLY a valid JSON object with this EXACT structure — no markdown, no code blocks, no explanation, just raw JSON:
{
  "title": "Creative trip title",
  "destination": "${input.destination}",
  "summary": "2-3 sentence trip overview highlighting the experience",
  "highlights": ["highlight1", "highlight2", "highlight3", "highlight4"],
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
          "description": "Detailed 2-3 sentence description of this activity",
          "location": "Specific place name",
          "cost_inr": 500,
          "transport": "Auto-rickshaw",
          "duration_minutes": 90,
          "category": "sightseeing",
          "lat": 15.2993,
          "lng": 74.1240,
          "tips": "One useful insider tip"
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
  "tips": ["Practical tip 1", "Practical tip 2", "Practical tip 3", "Practical tip 4"],
  "best_time_to_visit": "Best season and months to visit",
  "visa_info": "Visa requirements for Indian travelers",
  "weather_info": "Expected weather during the travel dates",
  "emergency_contacts": [
    {"name": "Local Police", "number": "100"},
    {"name": "Tourist Helpline", "number": "1800-111-363"},
    {"name": "Ambulance", "number": "108"}
  ]
}

Generate ${days} complete days with 5-6 activities per day. Use real place names, accurate GPS coordinates, and realistic INR costs. Keep total spending within ₹${input.budget_inr}.`;

    // Call Gemini 1.5 Flash (free tier: 15 requests/min, 1500/day)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const msg = err?.error?.message || `Gemini error ${response.status}`;
      return NextResponse.json({ error: msg }, { status: response.status });
    }

    const geminiData = await response.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json({ error: "No response from Gemini" }, { status: 500 });
    }

    // Strip markdown fences if Gemini adds them anyway
    let jsonText = rawText.trim();
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const trip: GeneratedTrip = JSON.parse(jsonText);
    return NextResponse.json(trip);

  } catch (err: any) {
    console.error("Trip generation error:", err);
    return NextResponse.json(
      { error: err.message || "Trip generation failed" },
      { status: 500 }
    );
  }
}
