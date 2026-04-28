"use client";

import { motion } from "framer-motion";
import { EventData } from "@/types/dashboard";
import { formatCurrency, formatNumber } from "@/lib/format";

const statusStyles: Record<EventData["status"], string> = {
  "On Track": "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
  Low: "text-amber-300 bg-amber-500/10 border-amber-500/30",
  "Selling Fast": "text-purple-300 bg-purple-500/10 border-purple-500/30",
  "Almost Sold Out": "text-pink-300 bg-pink-500/10 border-pink-500/30",
};

export function EventCard({ event }: { event: EventData }) {
  const progress = Math.min(100, (event.sold / event.capacity) * 100);

  return (
    <motion.article
      layout
      className="rounded-2xl border border-white/10 bg-[#11121A] p-5 shadow-xl shadow-black/20"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{event.name}</h3>
          <p className="text-sm text-zinc-400">{new Date(event.date).toDateString()}</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs ${statusStyles[event.status]}`}>{event.status}</span>
      </div>

      <div className="mb-2 flex items-center justify-between text-sm text-zinc-300">
        <span>
          {formatNumber(event.sold)} / {formatNumber(event.capacity)} tickets
        </span>
        <span>{progress.toFixed(0)}%</span>
      </div>

      <div className="mb-4 h-2 rounded-full bg-zinc-800">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        />
      </div>

      <p className="text-sm text-zinc-400">Revenue</p>
      <p className="text-xl font-semibold text-white">{formatCurrency(event.revenue)}</p>
    </motion.article>
  );
}
