import type { TripInput, GeneratedTrip, Activity, TripDay, BudgetBreakdownItem } from "@/types";

export async function generateFullTrip(
  input: TripInput,
  onStep: (step: string, progress: number) => void
): Promise<GeneratedTrip> {
  onStep("🔍 Researching destination & visa requirements...", 10);

  const response = await fetch("/api/generate-trip", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Failed to generate trip");
  }

  onStep("🧠 Claude is crafting your personalized itinerary...", 40);
  await delay(800);
  onStep("💰 Optimizing budget breakdown...", 65);
  await delay(600);
  onStep("🗺️ Generating map routes & waypoints...", 80);
  await delay(400);
  onStep("✅ Trip ready!", 100);

  return response.json();
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Offline cache
export function cacheTrip(id: string, data: GeneratedTrip) {
  try {
    localStorage.setItem(`trip-cache-${id}`, JSON.stringify(data));
  } catch {}
}

export function getCachedTrip(id: string): GeneratedTrip | null {
  try {
    const raw = localStorage.getItem(`trip-cache-${id}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
