"use client";

import { motion } from "framer-motion";
import { PlatformBreakdown } from "@/types/dashboard";
import { formatCurrency } from "@/lib/format";

const colors = [
  "from-emerald-400 to-emerald-500",
  "from-violet-400 to-violet-600",
  "from-cyan-400 to-cyan-500",
  "from-pink-400 to-pink-500",
];

export function PlatformChart({ data }: { data: PlatformBreakdown[] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#11121A] p-5">
      <h3 className="mb-4 text-lg font-semibold text-white">Platform Breakdown</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.platform}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-zinc-200">{item.platform}</span>
              <span className="text-zinc-400">
                {item.percentage.toFixed(1)}% · {formatCurrency(item.revenue)}
              </span>
            </div>
            <div className="h-2 rounded-full bg-zinc-800">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${colors[index % colors.length]}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(4, item.percentage)}%` }}
                transition={{ duration: 0.45 }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
