"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Plus, IndianRupee, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatINR } from "@/lib/utils";

const MapViewer = dynamic(() => import("@/components/MapViewer"), { ssr: false });

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  time: string;
}

const CATEGORIES = ["Food", "Transport", "Activity", "Shopping", "Hotel", "Other"];

export default function LiveTripPage() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", title: "Breakfast at Café", amount: 450, category: "Food", time: "08:30" },
    { id: "2", title: "Auto to Beach", amount: 120, category: "Transport", time: "10:00" },
  ]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);

  const addExpense = () => {
    if (!title || !amount) return;
    setExpenses(prev => [...prev, {
      id: Date.now().toString(),
      title, amount: parseFloat(amount), category,
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    }]);
    setTitle(""); setAmount("");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left: Map */}
      <div className="flex-1">
        <MapViewer className="h-full w-full rounded-none" />
      </div>

      {/* Right: Live Panel */}
      <div className="w-80 bg-white border-l flex flex-col">
        <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <h2 className="font-bold text-lg">🟢 Live Trip</h2>
          <p className="text-sm text-green-100">Tracking active</p>
          <div className="mt-2">
            <p className="text-xs text-green-100">Total Spent Today</p>
            <p className="text-2xl font-bold">{formatINR(totalSpent)}</p>
          </div>
        </div>

        {/* Add Expense */}
        <div className="p-4 border-b space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase">Add Expense</p>
          <Input placeholder="What did you spend on?" value={title} onChange={e => setTitle(e.target.value)} className="text-sm" />
          <div className="flex gap-2">
            <Input placeholder="₹ Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} className="text-sm" />
            <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded-md px-2 text-sm">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <Button onClick={addExpense} className="w-full gap-2" size="sm">
            <Plus className="w-4 h-4" /> Add
          </Button>
        </div>

        {/* Expense List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {expenses.map(e => (
            <div key={e.id} className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
              <div>
                <p className="text-sm font-medium text-slate-700">{e.title}</p>
                <p className="text-xs text-slate-400">{e.category} · {e.time}</p>
              </div>
              <span className="text-sm font-bold text-slate-800">{formatINR(e.amount)}</span>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <Button variant="outline" className="w-full gap-2" size="sm">
            <Camera className="w-4 h-4" /> Upload Photo
          </Button>
        </div>
      </div>
    </div>
  );
}
