"use client";

import { AlertTriangle } from "lucide-react";
import { AlertItem } from "@/types/dashboard";

const alertStyle: Record<AlertItem["severity"], string> = {
  medium: "border-yellow-500/30 bg-yellow-500/10 text-yellow-200",
  high: "border-purple-500/30 bg-purple-500/10 text-purple-200",
  critical: "border-pink-500/30 bg-pink-500/10 text-pink-200",
};

export function AlertsPanel({ alerts }: { alerts: AlertItem[] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#11121A] p-5">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-pink-400" />
        <h3 className="text-lg font-semibold text-white">Alerts</h3>
      </div>
      <div className="space-y-2">
        {alerts.length === 0 && <p className="text-sm text-zinc-400">No active alerts.</p>}
        {alerts.map((alert) => (
          <div key={alert.id} className={`rounded-lg border px-3 py-2 text-sm ${alertStyle[alert.severity]}`}>
            {alert.message}
          </div>
        ))}
      </div>
    </section>
  );
}
