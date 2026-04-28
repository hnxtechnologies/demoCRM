"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Bug, Download, Menu, Mic, Paperclip, Send, ShieldCheck } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { GlobalSalesMap } from "@/components/dashboard/GlobalSalesMap";
import { DashboardSnapshot, Role, Ticket } from "@/types/dashboard";
import { formatCurrency, formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { mockDashboardSnapshot } from "@/data/mockDashboardSnapshot";

const VALID_ROLES: Role[] = ["admin", "manager", "support", "finance"];

type LookupState = {
  ticket: Ticket | null;
  message: string;
  state: "idle" | "ok" | "error";
};

export default function DashboardPage() {
  const router = useRouter();

  const [role] = useState<Role>(() => {
    if (typeof window === "undefined") return "admin";

    const raw = new URLSearchParams(window.location.search).get("role") as Role | null;
    const stored = localStorage.getItem("crm-role") as Role | null;
    const selectedRole = raw || stored || "admin";

    return VALID_ROLES.includes(selectedRole) ? selectedRole : "admin";
  });

  const [snapshot, setSnapshot] = useState<DashboardSnapshot>({
    ...mockDashboardSnapshot,
    role,
  });

  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [isDark, setDark] = useState(true);
  const [liveUpdate, setLiveUpdate] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [ticketQuery, setTicketQuery] = useState("");
  const [lookup, setLookup] = useState<LookupState>({
    ticket: null,
    message: "",
    state: "idle",
  });

  const filteredTickets = useMemo(() => {
    if (!search.trim()) return snapshot.tickets.slice(0, 8);

    return snapshot.tickets.filter(
      (ticket) =>
        ticket.id.toLowerCase().includes(search.toLowerCase()) ||
        ticket.source.toLowerCase().includes(search.toLowerCase()) ||
        ticket.region.toLowerCase().includes(search.toLowerCase())
    );
  }, [snapshot, search]);

  const sendChat = () => {
    if (!chatInput.trim()) return;

    const localMessage = {
      id: `local-${Date.now()}`,
      sender: "Karan",
      avatar: "KM",
      message: chatInput,
      timestamp: new Date().toISOString(),
    };

    setSnapshot((prev) => ({
      ...prev,
      chat: [...prev.chat, localMessage],
    }));

    setChatInput("");
  };

  const simulateSale = () => {
    const newTicket: Ticket = {
      id: `TKT-${Math.floor(5000 + Math.random() * 9000)}`,
      source: ["TicketSauce", "Vivenue", "Manual"][Math.floor(Math.random() * 3)] as Ticket["source"],
      price: 900 + Math.floor(Math.random() * 1600),
      status: ["open", "resolved", "pending"][Math.floor(Math.random() * 3)] as Ticket["status"],
      timestamp: new Date().toISOString(),
      region: ["US", "India", "UK", "UAE", "Singapore"][Math.floor(Math.random() * 5)] as Ticket["region"],
      eventName: ["Body Language", "Friday Underground", "Sunday Sundowner"][Math.floor(Math.random() * 3)],
    };

    setSnapshot((prev) => {
      const nextLiveSales = [
        ...prev.liveSales.slice(1),
        {
          time: new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          value: Math.max(20, Math.min(90, prev.liveSales[prev.liveSales.length - 1].value + Math.floor(Math.random() * 14) - 6)),
        },
      ];

      return {
        ...prev,
        liveSales: liveUpdate ? nextLiveSales : prev.liveSales,
        hourlySales: prev.hourlySales.map((item, index) =>
          index === prev.hourlySales.length - 1 ? { ...item, tickets: item.tickets + 1 } : item
        ),
        tickets: [newTicket, ...prev.tickets],
        sales: {
          ...prev.sales,
          revenue: prev.sales.revenue + newTicket.price,
          profit: prev.sales.profit + Math.round(newTicket.price * 0.62),
          ticketCount: prev.sales.ticketCount + 1,
        },
        feed: [
          {
            id: `feed-${Date.now()}`,
            text: `+1 ticket sold on ${newTicket.source} (${newTicket.region})`,
            timestamp: new Date().toISOString(),
          },
          ...prev.feed,
        ],
        notifications: [
          {
            id: `notify-${Date.now()}`,
            title: `${newTicket.id} created via ${newTicket.source}`,
            time: "just now",
            read: false,
          },
          ...prev.notifications,
        ],
      };
    });
  };

  const exportReport = () => {
    window.print();
  };

  const searchTicket = () => {
    if (!ticketQuery.trim()) return;

    const localTicket =
      snapshot.tickets.find((ticket) => ticket.id.toLowerCase() === ticketQuery.trim().toLowerCase()) || null;

    if (localTicket) {
      setLookup({
        ticket: localTicket,
        message: "Ticket found",
        state: "ok",
      });
      return;
    }

    setLookup({
      ticket: null,
      message: "Ticket not found",
      state: "error",
    });
  };

  const checkIn = () => {
    if (!lookup.ticket) return;

    setLookup({
      ...lookup,
      state: "ok",
      message: `${lookup.ticket.id} checked-in.`,
    });
  };

  const canSeeFinance = role === "finance" || role === "admin";
  const canSeeOperations = role !== "finance";
  const canSeeChat = role === "support" || role === "admin" || role === "manager";

  return (
    <main
      className={cn(
        "min-h-screen transition-colors",
        isDark ? "bg-[#0c101a] text-zinc-100" : "bg-zinc-100 text-zinc-900"
      )}
    >
      <Sidebar collapsed={collapsed} role={role} />

      <div className={cn("transition-all duration-300", collapsed ? "ml-[86px]" : "ml-[260px]")}>
        <div className="p-5">
          <TopNavbar
            search={search}
            setSearch={setSearch}
            isDark={isDark}
            setDark={setDark}
            notifications={snapshot.notifications}
            onLogout={() => {
              localStorage.removeItem("crm-role");
              router.push("/");
            }}
          />

          <button
            onClick={() => setCollapsed((value) => !value)}
            className="mb-4 rounded-lg border border-white/10 bg-white/5 p-2"
          >
            <Menu className="h-4 w-4" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
                <div className="rounded-2xl border border-white/10 bg-[#161a28]/80 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
                      Control Center
                    </h2>

                    <label className="inline-flex items-center gap-2 text-xs text-zinc-300">
                      <input
                        checked={liveUpdate}
                        onChange={(event) => setLiveUpdate(event.target.checked)}
                        type="checkbox"
                      />
                      Live Update
                    </label>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={snapshot.liveSales}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.7} />
                            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>

                        <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                        <XAxis dataKey="time" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                        <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#8b5cf6"
                          fillOpacity={1}
                          fill="url(#colorSales)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-3">
                  <RevenueHeader
                    revenue={snapshot.sales.revenue}
                    profit={snapshot.sales.profit}
                    revenueTrend={snapshot.sales.revenueTrend}
                    profitTrend={snapshot.sales.profitTrend}
                  />

                  <TaskCard tasks={snapshot.tasks} />

                  <div className="flex gap-2">
                    <button
                      onClick={exportReport}
                      className="flex-1 rounded-lg bg-zinc-800 px-3 py-2 text-sm hover:bg-zinc-700"
                    >
                      <Download className="mr-1 inline h-3 w-3" />
                      Export PDF
                    </button>

                    <button className="flex-1 rounded-lg bg-violet-600 px-3 py-2 text-sm hover:bg-violet-500">
                      <Bug className="mr-1 inline h-3 w-3" />
                      Report Bug
                    </button>
                  </div>
                </div>
              </section>

              {canSeeOperations && (
                <section className="grid gap-3 md:grid-cols-4">
                  {snapshot.metrics.map((metric) => (
                    <MetricCard
                      key={metric.id}
                      label={metric.label}
                      value={`${metric.value}${metric.unit}`}
                      percent={(metric.value / metric.max) * 100}
                      trend={metric.trend}
                    />
                  ))}
                </section>
              )}

              <section className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
                {canSeeChat ? (
                  <div className="rounded-2xl border border-white/10 bg-[#161a28]/80 p-4">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
                      Team Chat
                    </h3>

                    <div className="mb-3 h-64 space-y-2 overflow-y-auto pr-2">
                      {snapshot.chat.map((message) => (
                        <div key={message.id} className="rounded-lg border border-white/10 bg-black/20 p-2 text-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-500/40 text-xs">
                                {message.avatar}
                              </span>
                              <span>{message.sender}</span>
                            </div>

                            <span className="text-xs text-zinc-500">{formatTime(message.timestamp)}</span>
                          </div>

                          <p className="mt-1 text-zinc-300">{message.message}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-2">
                      <Paperclip className="h-4 w-4 text-zinc-400" />
                      <Mic className="h-4 w-4 text-zinc-400" />

                      <input
                        value={chatInput}
                        onChange={(event) => setChatInput(event.target.value)}
                        placeholder="Type your update..."
                        className="w-full bg-transparent text-sm outline-none"
                      />

                      <button onClick={sendChat} className="rounded-md bg-cyan-500 p-2 text-black">
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-[#161a28]/80 p-4">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
                      Revenue Feed
                    </h3>

                    <div className="space-y-2">
                      {snapshot.feed.slice(0, 10).map((item) => (
                        <div key={item.id} className="rounded-lg border border-white/10 bg-black/20 p-2 text-sm">
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <GlobalSalesMap countries={snapshot.countries} />
              </section>

              <section className="rounded-2xl border border-white/10 bg-[#161a28]/80 p-4">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Subscriptions Hourly
                </h3>

                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={snapshot.hourlySales}>
                      <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="hour" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                      <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="tickets" radius={[4, 4, 0, 0]} fill="#22d3ee" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>

              <section className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
                <div className="rounded-2xl border border-white/10 bg-[#161a28]/80 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
                      Ticket Monitoring
                    </h3>

                    <button onClick={simulateSale} className="rounded-md bg-violet-600 px-3 py-1 text-xs">
                      Simulate Ticket Sale
                    </button>
                  </div>

                  <div className="space-y-2">
                    {filteredTickets.slice(0, 7).map((ticket) => (
                      <div
                        key={ticket.id}
                        className="grid grid-cols-[1fr_auto_auto_auto] gap-2 rounded-lg border border-white/10 bg-black/20 p-2 text-sm"
                      >
                        <span>{ticket.id}</span>
                        <span>{ticket.source}</span>
                        <span>{ticket.region}</span>
                        <span>{formatCurrency(ticket.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#161a28]/80 p-4">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
                    Support Check-In
                  </h3>

                  <div className="flex gap-2">
                    <input
                      value={ticketQuery}
                      onChange={(event) => setTicketQuery(event.target.value)}
                      placeholder="Enter ticket ID"
                      className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none"
                    />

                    <button onClick={searchTicket} className="rounded-lg bg-cyan-500 px-3 text-black">
                      Find
                    </button>
                  </div>

                  {!!lookup.message && (
                    <p className={cn("mt-2 text-sm", lookup.state === "error" ? "text-red-300" : "text-emerald-300")}>
                      {lookup.message}
                    </p>
                  )}

                  {lookup.ticket && (
                    <div className="mt-3 rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
                      <p>{lookup.ticket.id}</p>
                      <p>{lookup.ticket.eventName}</p>

                      <button onClick={checkIn} className="mt-2 rounded-lg bg-violet-600 px-3 py-1">
                        <ShieldCheck className="mr-1 inline h-3 w-3" />
                        Check-In
                      </button>
                    </div>
                  )}
                </div>
              </section>

              {canSeeFinance && (
                <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                    Finance Insights
                  </h3>

                  <div className="mt-3 grid gap-3 md:grid-cols-3">
                    <FinanceStat title="Revenue Today" value={formatCurrency(snapshot.sales.revenue)} />
                    <FinanceStat title="Profit Today" value={formatCurrency(snapshot.sales.profit)} />
                    <FinanceStat title="Conversion" value={`${snapshot.sales.conversionRate}%`} />
                  </div>
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

function RevenueHeader({
  revenue,
  profit,
  revenueTrend,
  profitTrend,
}: {
  revenue: number;
  profit: number;
  revenueTrend: number[];
  profitTrend: number[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <MiniCard title="Revenue Today" value={formatCurrency(revenue)} data={revenueTrend} color="#22d3ee" />
      <MiniCard title="Profit Today" value={formatCurrency(profit)} data={profitTrend} color="#a855f7" />
    </div>
  );
}

function MiniCard({ title, value, data, color }: { title: string; value: string; data: number[]; color: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#161a28]/80 p-3">
      <p className="text-xs text-zinc-400">{title}</p>
      <p className="mb-1 text-lg font-semibold">{value}</p>

      <div className="h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.map((item, index) => ({ index, value: item }))}>
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function MetricCard({ label, value, percent, trend }: { label: string; value: string; percent: number; trend: number[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#161a28]/80 p-3">
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="mb-1 text-lg font-semibold">{value}</p>

      <div className="mb-2 h-1.5 rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
          style={{ width: `${Math.min(100, percent)}%` }}
        />
      </div>

      <div className="h-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend.map((item, index) => ({ index, value: item }))}>
            <Line dataKey="value" stroke="#818cf8" dot={false} strokeWidth={1.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TaskCard({ tasks }: { tasks: DashboardSnapshot["tasks"] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#161a28]/80 p-3">
      <p className="mb-2 text-xs text-zinc-400">My Tasks</p>

      {tasks.map((task) => (
        <div key={task.id} className="mb-2">
          <div className="flex justify-between text-xs">
            <span>{task.title}</span>
            <span>{task.progress}%</span>
          </div>

          <div className="h-1.5 rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function FinanceStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border border-emerald-400/20 bg-black/20 p-3">
      <p className="text-xs text-emerald-200">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}