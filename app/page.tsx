"use client";

import { useRouter } from "next/navigation";
import { Role } from "@/types/dashboard";

const roles: { id: Role; label: string; description: string }[] = [
  { id: "admin", label: "Admin", description: "Manage APIs, users, workflows, and full dashboard access." },
  { id: "manager", label: "Manager", description: "View analytics, assign tasks, and monitor performance." },
  { id: "support", label: "Support Agent", description: "Chat operations and ticket monitoring console." },
  { id: "finance", label: "Finance", description: "Revenue analytics, reports, and exports." },
];

export default function HomePage() {
  const router = useRouter();

  const handleSelectRole = (role: Role) => {
    localStorage.setItem("crm-role", role);
    router.push(`/dashboard?role=${role}`);
  };

  return (
    <main className="min-h-screen bg-[#0B0B0F] p-6 text-zinc-100 md:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-purple-500/10 p-8 shadow-2xl shadow-black/40">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-emerald-300">Unified Ticketing CRM</p>
          <h1 className="text-3xl font-bold text-white md:text-5xl">Live Venue Command Center</h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Production-style demo with real-time sales aggregation, platform analytics, and role-based cockpit views.
          </p>
        </div>

        <h2 className="mb-4 text-lg font-semibold text-zinc-200">Select role to continue</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleSelectRole(role.id)}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#17192A]/90 to-[#12131A] p-6 text-left transition-all hover:-translate-y-0.5 hover:border-violet-400/40 hover:shadow-lg hover:shadow-violet-500/20"
            >
              <p className="text-xl font-semibold text-white">{role.label}</p>
              <p className="mt-2 text-sm text-zinc-400">{role.description}</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
