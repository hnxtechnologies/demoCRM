"use client";

import { motion } from "framer-motion";
import { BarChart3, Bell, ChartNoAxesColumn, Cog, Layers, Radio, Ticket, Users2, Workflow } from "lucide-react";
import { Role } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const items = [
  { id: "dash", label: "Dashboards", icon: Layers },
  { id: "insight", label: "Insights", icon: BarChart3 },
  { id: "sources", label: "Ticket Sources", icon: Ticket },
  { id: "sales", label: "Sales Analytics", icon: ChartNoAxesColumn },
  { id: "roles", label: "Users / Roles", icon: Users2 },
  { id: "flow", label: "Workflows", icon: Workflow },
  { id: "notif", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Cog },
];

const visibleByRole: Record<Role, string[]> = {
  admin: items.map((item) => item.id),
  manager: ["dash", "insight", "sales", "roles", "flow", "notif"],
  support: ["dash", "sources", "notif"],
  finance: ["dash", "insight", "sales", "notif"],
};

export function Sidebar({ collapsed, role }: { collapsed: boolean; role: Role }) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen border-r border-white/10 bg-[#111420]/90 px-3 py-5 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-[86px]" : "w-[260px]"
      )}
    >
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-bold text-black">
          HX
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-semibold text-zinc-100">HNX CRM</p>
            <p className="text-xs text-zinc-400">Unified Command Center</p>
          </div>
        )}
      </div>

      <div className="space-y-1">
        {items
          .filter((item) => visibleByRole[role].includes(item.id))
          .map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                whileHover={{ x: 3 }}
                key={item.id}
                className="flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-zinc-300 hover:border-cyan-400/20 hover:bg-white/5 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </motion.button>
            );
          })}
      </div>

      <div className="mt-6 rounded-xl border border-violet-500/30 bg-violet-500/10 p-3 text-xs text-violet-100">
        <Radio className="mb-2 h-4 w-4 text-violet-300" />
        {!collapsed ? "Live websocket sync active." : "Live"}
      </div>
    </aside>
  );
}
