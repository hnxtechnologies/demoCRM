"use client";

import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import { FeedItem } from "@/types/dashboard";
import { formatTime } from "@/lib/format";

export function LiveFeed({ feed }: { feed: FeedItem[] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#11121A] p-5">
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-4 w-4 text-emerald-400" />
        <h3 className="text-lg font-semibold text-white">Live Activity</h3>
      </div>
      <div className="space-y-2">
        {feed.length === 0 && <p className="text-sm text-zinc-400">Waiting for activity...</p>}
        {feed.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-lg border border-white/5 bg-zinc-900/70 px-3 py-2"
          >
            <p className="text-sm text-zinc-200">{item.message}</p>
            <p className="text-xs text-zinc-500">{formatTime(item.timestamp)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
