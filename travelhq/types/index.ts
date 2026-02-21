import { z } from "zod";

export const TripStyleSchema = z.enum(["budget", "comfort", "luxury", "backpacker", "family", "romantic"]);
export const TripStatusSchema = z.enum(["planning", "confirmed", "active", "completed", "cancelled"]);

export const TripInputSchema = z.object({
  destination: z.string().min(2, "Destination required"),
  start_date: z.string().min(1, "Start date required"),
  end_date: z.string().min(1, "End date required"),
  budget_inr: z.number().min(1000, "Minimum budget ₹1,000"),
  group_size: z.number().min(1).max(50),
  style: TripStyleSchema,
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  dietary: z.string().optional(),
  notes: z.string().optional(),
});

export type TripInput = z.infer<typeof TripInputSchema>;

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  cost_inr: number;
  transport: string;
  duration_minutes: number;
  category: "sightseeing" | "food" | "transport" | "accommodation" | "activity" | "rest";
  lat?: number;
  lng?: number;
  tips?: string;
}

export interface TripDay {
  id: string;
  trip_id: string;
  day_number: number;
  date: string;
  title: string;
  activities: Activity[];
  total_cost_inr: number;
}

export interface Trip {
  id: string;
  user_id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  budget_inr: number;
  actual_spend_inr: number;
  group_size: number;
  style: string;
  status: string;
  cover_image?: string;
  days: TripDay[];
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: string;
  trip_id: string;
  user_id: string;
  title: string;
  amount_inr: number;
  category: string;
  date: string;
  receipt_url?: string;
  created_at: string;
}

export interface MediaAsset {
  id: string;
  trip_id: string;
  url: string;
  type: "image" | "video" | "audio";
  ai_generated: boolean;
  prompt?: string;
  created_at: string;
}

export interface BudgetBreakdownItem {
  category: string;
  amount_inr: number;
  percentage: number;
  color: string;
}

export interface GeneratedTrip {
  title: string;
  destination: string;
  summary: string;
  highlights: string[];
  days: TripDay[];
  budget_breakdown: BudgetBreakdownItem[];
  total_cost_inr: number;
  tips: string[];
  best_time_to_visit: string;
  visa_info: string;
  weather_info: string;
  emergency_contacts: { name: string; number: string }[];
}
