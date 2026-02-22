import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Trip, Expense } from "@/types";

interface TripStore {
  trips: Trip[];
  currentTrip: Trip | null;
  expenses: Expense[];
  setTrips: (trips: Trip[]) => void;
  setCurrentTrip: (trip: Trip | null) => void;
  addExpense: (expense: Expense) => void;
  setExpenses: (expenses: Expense[]) => void;
}

export const useTripStore = create<TripStore>()(
  persist(
    (set) => ({
      trips: [],
      currentTrip: null,
      expenses: [],
      setTrips: (trips) => set({ trips }),
      setCurrentTrip: (trip) => set({ currentTrip: trip }),
      addExpense: (expense) =>
        set((state) => ({ expenses: [...state.expenses, expense] })),
      setExpenses: (expenses) => set({ expenses }),
    }),
    { name: "travelhq-store" }
  )
);
