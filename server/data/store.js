const sources = ["TicketSauce", "Vivenue", "Manual"];
const regions = ["US", "India", "UK", "UAE", "Singapore"];

const state = {
  users: [
    { id: "u1", name: "Aria Quinn", role: "admin", avatar: "AQ" },
    { id: "u2", name: "Karan Mehta", role: "manager", avatar: "KM" },
    { id: "u3", name: "Ria Sharma", role: "support", avatar: "RS" },
    { id: "u4", name: "Jordan Lee", role: "finance", avatar: "JL" },
  ],
  tickets: [],
  tasks: [
    { id: "task-1", assignedTo: "Karan Mehta", title: "API sync audit", progress: 72, deadline: "2026-04-29" },
    { id: "task-2", assignedTo: "Aria Quinn", title: "Workflow approval", progress: 48, deadline: "2026-04-30" },
    { id: "task-3", assignedTo: "Ria Sharma", title: "Support SLA checks", progress: 81, deadline: "2026-04-28" },
  ],
  chat: [
    { id: "c-1", sender: "Aria Quinn", avatar: "AQ", message: "Check TicketSauce API sync", timestamp: new Date().toISOString() },
    { id: "c-2", sender: "Ria Sharma", avatar: "RS", message: "Revenue mismatch detected in UK segment.", timestamp: new Date().toISOString() },
    { id: "c-3", sender: "Jordan Lee", avatar: "JL", message: "Need report ASAP before board review.", timestamp: new Date().toISOString() },
  ],
  metrics: [
    { id: "m1", label: "Server Load", value: 71, max: 100, unit: "%", trend: [52, 58, 64, 61, 70, 71] },
    { id: "m2", label: "API Response", value: 230, max: 500, unit: "ms", trend: [250, 243, 238, 234, 231, 230] },
    { id: "m3", label: "Ticket Throughput", value: 312, max: 500, unit: "/m", trend: [231, 252, 281, 300, 306, 312] },
    { id: "m4", label: "System Temp", value: 36, max: 80, unit: "C", trend: [34, 35, 35, 36, 36, 36] },
  ],
  liveSales: [
    { time: "10:00", value: 38 },
    { time: "10:05", value: 43 },
    { time: "10:10", value: 40 },
    { time: "10:15", value: 52 },
    { time: "10:20", value: 56 },
    { time: "10:25", value: 49 },
    { time: "10:30", value: 59 },
    { time: "10:35", value: 61 },
  ],
  hourlySales: Array.from({ length: 12 }, (_, idx) => ({
    hour: `${String(idx + 10).padStart(2, "0")}:00`,
    tickets: 20 + Math.floor(Math.random() * 32),
  })),
  countries: [
    { code: "US", country: "United States", revenue: 64000 },
    { code: "IN", country: "India", revenue: 21000 },
    { code: "UK", country: "United Kingdom", revenue: 18500 },
    { code: "AE", country: "UAE", revenue: 11700 },
    { code: "SG", country: "Singapore", revenue: 9800 },
  ],
  notifications: [
    { id: "n1", title: "TicketSauce sync recovered", time: "2m ago", read: false },
    { id: "n2", title: "New workflow assigned", time: "14m ago", read: false },
    { id: "n3", title: "Finance export completed", time: "28m ago", read: true },
  ],
  feed: [],
  alerts: [],
  checkedInTickets: new Set(),
  sales: {
    revenue: 0,
    profit: 0,
    conversionRate: 4.8,
    ticketCount: 0,
    profitTrend: [10, 14, 19, 16, 22, 26, 24, 28],
    revenueTrend: [18, 21, 20, 26, 31, 35, 33, 37],
  },
};

let ticketCounter = 4500;

function seedTickets() {
  for (let i = 0; i < 300; i += 1) {
    createTicket(Math.floor(Math.random() * 1200) + 700, "seed");
  }
}

function updateSalesSummary() {
  const revenue = state.tickets.reduce((sum, ticket) => sum + ticket.price, 0);
  state.sales.revenue = revenue;
  state.sales.profit = Math.round(revenue * 0.62);
  state.sales.ticketCount = state.tickets.length;
}

function recalculateAlerts() {
  const apiMetric = state.metrics.find((metric) => metric.label === "API Response");
  const serverMetric = state.metrics.find((metric) => metric.label === "Server Load");
  const warning = [];
  if (apiMetric && apiMetric.value > 320) {
    warning.push({ id: "a-api", severity: "warning", text: "API response time crossed 320ms threshold." });
  }
  if (serverMetric && serverMetric.value > 82) {
    warning.push({ id: "a-load", severity: "critical", text: "Server load is above 82%, autoscale recommended." });
  }
  if (state.sales.conversionRate < 3.9) {
    warning.push({ id: "a-conv", severity: "warning", text: "Conversion rate dropped below 4%." });
  }
  if (warning.length === 0) {
    warning.push({ id: "a-ok", severity: "info", text: "All systems healthy. No blocking incidents." });
  }
  state.alerts = warning;
}

function createTicket(price, sourceType = "auto") {
  ticketCounter += 1;
  const source = sources[Math.floor(Math.random() * sources.length)];
  const region = regions[Math.floor(Math.random() * regions.length)];
  const statusOptions = ["open", "resolved", "pending"];
  const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
  const ticket = {
    id: `TKT-${ticketCounter}`,
    source,
    price,
    status,
    timestamp: new Date().toISOString(),
    region,
    eventName: ["Body Language", "Friday Underground", "Sunday Sundowner"][Math.floor(Math.random() * 3)],
  };
  state.tickets.unshift(ticket);
  state.tickets = state.tickets.slice(0, 400);
  state.feed.unshift({
    id: `f-${Date.now()}-${Math.random()}`,
    text: `+1 ticket sold on ${source} (${region})`,
    timestamp: new Date().toISOString(),
  });
  state.feed = state.feed.slice(0, 20);
  if (sourceType !== "seed") {
    state.notifications.unshift({
      id: `n-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: `${ticket.id} created via ${source}`,
      time: "just now",
      read: false,
    });
    state.notifications = state.notifications.slice(0, 12);
  }
  updateSalesSummary();
  recalculateAlerts();
  return ticket;
}

function simulateRandomSale() {
  const ticket = createTicket(900 + Math.floor(Math.random() * 1600));
  const last = state.liveSales[state.liveSales.length - 1];
  const nextValue = Math.max(20, Math.min(90, last.value + Math.floor(Math.random() * 14) - 6));
  state.liveSales.push({ time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }), value: nextValue });
  state.liveSales = state.liveSales.slice(-18);

  state.hourlySales = state.hourlySales.map((item, index) => ({
    ...item,
    tickets: index === state.hourlySales.length - 1 ? item.tickets + 1 : item.tickets,
  }));

  state.metrics = state.metrics.map((metric) => {
    const delta = Math.floor(Math.random() * 8) - 3;
    const nextValue = Math.max(1, Math.min(metric.max, metric.value + delta));
    return {
      ...metric,
      value: nextValue,
      trend: [...metric.trend.slice(-5), nextValue],
    };
  });

  state.sales.conversionRate = Number((state.sales.conversionRate + (Math.random() * 0.22 - 0.08)).toFixed(2));

  return ticket;
}

function searchTicket(ticketId) {
  return state.tickets.find((ticket) => ticket.id.toLowerCase() === ticketId.toLowerCase()) || null;
}

function checkInTicket(ticketId) {
  const ticket = searchTicket(ticketId);
  if (!ticket) return { ok: false, reason: "Ticket not found." };
  if (state.checkedInTickets.has(ticket.id)) return { ok: false, reason: "Duplicate check-in blocked." };
  state.checkedInTickets.add(ticket.id);
  state.feed.unshift({
    id: `f-check-${Date.now()}`,
    text: `${ticket.id} checked-in at gate`,
    timestamp: new Date().toISOString(),
  });
  return { ok: true, ticket };
}

function addChatMessage(payload) {
  const message = {
    id: `c-${Date.now()}`,
    sender: payload.sender || "Agent",
    avatar: payload.avatar || "AG",
    message: payload.message || "Update sent",
    timestamp: new Date().toISOString(),
  };
  state.chat.push(message);
  state.chat = state.chat.slice(-30);
  return message;
}

function getSnapshot(role = "admin") {
  return {
    role,
    users: state.users,
    tickets: role === "support" ? state.tickets.filter((ticket) => ticket.status !== "resolved").slice(0, 80) : state.tickets.slice(0, 120),
    sales: state.sales,
    tasks: role === "support" ? state.tasks.slice(0, 1) : state.tasks,
    chat: state.chat,
    metrics: state.metrics,
    liveSales: state.liveSales,
    hourlySales: state.hourlySales,
    countries: state.countries,
    notifications: state.notifications,
    feed: state.feed,
    alerts: state.alerts,
  };
}

function generateReport() {
  return {
    generatedAt: new Date().toISOString(),
    title: "Revenue and Conversion Summary",
    rows: [
      { key: "Revenue", value: state.sales.revenue },
      { key: "Profit", value: state.sales.profit },
      { key: "Conversion", value: `${state.sales.conversionRate}%` },
      { key: "Tickets", value: state.sales.ticketCount },
    ],
  };
}

seedTickets();
updateSalesSummary();
recalculateAlerts();

module.exports = {
  getSnapshot,
  simulateRandomSale,
  searchTicket,
  checkInTicket,
  addChatMessage,
  generateReport,
  getTickets: () => state.tickets,
  getSales: () => state.sales,
  getUsers: () => state.users,
  getChat: () => state.chat,
  getMetrics: () => state.metrics,
};
