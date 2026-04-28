"use client";

import { motion } from "framer-motion";
import { CountrySales } from "@/types/dashboard";
import { formatCurrency } from "@/lib/format";

export function GlobalSalesMap({ countries }: { countries: CountrySales[] }) {
  const max = Math.max(...countries.map((item) => item.revenue), 1);

  return (
    <section className="rounded-2xl border border-white/10 bg-[#161a28]/80 p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-300">Global Sales View</h3>
      <div className="relative h-52 rounded-xl border border-white/10 bg-gradient-to-br from-[#1d2338] to-[#111522] p-3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_80%_65%,rgba(168,85,247,0.18),transparent_35%)]" />
        <div className="relative grid h-full grid-cols-3 gap-2">
          {countries.map((country) => (
            <motion.button
              key={country.code}
              whileHover={{ scale: 1.02 }}
              className="rounded-lg border border-white/10 bg-black/25 p-2 text-left"
              title={`${country.country} · ${formatCurrency(country.revenue)}`}
            >
              <p className="text-xs text-zinc-300">{country.country}</p>
              <div className="mt-2 h-1.5 rounded-full bg-zinc-800">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${(country.revenue / max) * 100}%` }} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <div className="mt-3 space-y-1 text-sm text-zinc-300">
        {countries.slice(0, 3).map((item) => (
          <p key={`${item.code}-legend`}>
            {item.code}: {formatCurrency(item.revenue)}
          </p>
        ))}
      </div>
    </section>
  );
}
