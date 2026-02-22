"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { BudgetBreakdownItem } from "@/types";
import { formatINR } from "@/lib/utils";

interface Props {
  breakdown: BudgetBreakdownItem[];
  totalBudget: number;
}

export default function BudgetBreakdown({ breakdown, totalBudget }: Props) {
  return (
    <div className="space-y-6">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={breakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="amount_inr">
              {breakdown.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(val: number) => formatINR(val)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {breakdown.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm font-medium text-slate-700">{item.category}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">{item.percentage}%</span>
              <span className="text-sm font-semibold text-slate-800">{formatINR(item.amount_inr)}</span>
            </div>
          </div>
        ))}
        <div className="border-t pt-3 flex justify-between">
          <span className="font-bold text-slate-800">Total Budget</span>
          <span className="font-bold text-blue-700 text-lg">{formatINR(totalBudget)}</span>
        </div>
      </div>
    </div>
  );
}
