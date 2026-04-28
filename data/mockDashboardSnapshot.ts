import { DashboardSnapshot } from "@/types/dashboard";

export const mockDashboardSnapshot: DashboardSnapshot = {
  role: "admin",

  users: [
    { id: "u1", name: "Aria Quinn", role: "admin", avatar: "AQ" },
    { id: "u2", name: "Karan Mehta", role: "manager", avatar: "KM" },
    { id: "u3", name: "Ria Sharma", role: "support", avatar: "RS" },
    { id: "u4", name: "Jordan Lee", role: "finance", avatar: "JL" },
  ],

  tickets: [
    {
      id: "TKT-4501",
      source: "TicketSauce",
      price: 1800,
      status: "open",
      timestamp: new Date().toISOString(),
      region: "India",
      eventName: "Body Language",
    },
    {
      id: "TKT-4502",
      source: "Vivenue",
      price: 2200,
      status: "resolved",
      timestamp: new Date().toISOString(),
      region: "UK",
      eventName: "Friday Underground",
    },
    {
      id: "TKT-4503",
      source: "Manual",
      price: 1500,
      status: "pending",
      timestamp: new Date().toISOString(),
      region: "US",
      eventName: "Sunday Sundowner",
    },
    {
      id: "TKT-4504",
      source: "TicketSauce",
      price: 2600,
      status: "open",
      timestamp: new Date().toISOString(),
      region: "UAE",
      eventName: "Kampai Presents Body Language",
    },
    {
      id: "TKT-4505",
      source: "Vivenue",
      price: 1900,
      status: "resolved",
      timestamp: new Date().toISOString(),
      region: "Singapore",
      eventName: "Indie Live Session",
    },
  ],

  sales: {
    revenue: 690242,
    profit: 427950,
    conversionRate: 77,
    ticketCount: 1284,
    profitTrend: [18, 22, 26, 31, 28, 35, 41, 46, 44, 49],
    revenueTrend: [28, 31, 30, 36, 42, 48, 53, 58, 56, 62],
  },

  tasks: [
    {
      id: "task-1",
      assignedTo: "Karan Mehta",
      title: "API sync audit",
      progress: 72,
      deadline: "2026-04-29",
    },
    {
      id: "task-2",
      assignedTo: "Aria Quinn",
      title: "Workflow approval",
      progress: 48,
      deadline: "2026-04-30",
    },
    {
      id: "task-3",
      assignedTo: "Ria Sharma",
      title: "Support SLA checks",
      progress: 81,
      deadline: "2026-04-28",
    },
  ],

  chat: [
    {
      id: "c-1",
      sender: "Aria Quinn",
      avatar: "AQ",
      message: "Check TicketSauce API sync.",
      timestamp: new Date().toISOString(),
    },
    {
      id: "c-2",
      sender: "Ria Sharma",
      avatar: "RS",
      message: "Revenue mismatch detected in UK segment.",
      timestamp: new Date().toISOString(),
    },
    {
      id: "c-3",
      sender: "Jordan Lee",
      avatar: "JL",
      message: "Need report ASAP before board review.",
      timestamp: new Date().toISOString(),
    },
  ],

  metrics: [
    {
      id: "m1",
      label: "Server Load",
      value: 94,
      max: 100,
      unit: "%",
      trend: [52, 58, 64, 71, 84, 94],
    },
    {
      id: "m2",
      label: "API Response",
      value: 496,
      max: 500,
      unit: "ms",
      trend: [250, 310, 370, 420, 465, 496],
    },
    {
      id: "m3",
      label: "Ticket Throughput",
      value: 480,
      max: 500,
      unit: "/m",
      trend: [231, 252, 281, 350, 420, 480],
    },
    {
      id: "m4",
      label: "System Temp",
      value: 80,
      max: 80,
      unit: "C",
      trend: [34, 45, 55, 63, 71, 80],
    },
  ],

  liveSales: [
    { time: "12:30 pm", value: 73 },
    { time: "12:31 pm", value: 68 },
    { time: "12:32 pm", value: 63 },
    { time: "12:33 pm", value: 59 },
    { time: "12:34 pm", value: 55 },
    { time: "12:35 pm", value: 49 },
    { time: "12:36 pm", value: 42 },
    { time: "12:37 pm", value: 40 },
    { time: "12:38 pm", value: 38 },
    { time: "12:39 pm", value: 46 },
    { time: "12:40 pm", value: 43 },
    { time: "12:41 pm", value: 36 },
    { time: "12:42 pm", value: 32 },
    { time: "12:43 pm", value: 31 },
    { time: "12:44 pm", value: 38 },
  ],

  hourlySales: [
    { hour: "10:00", tickets: 22 },
    { hour: "11:00", tickets: 31 },
    { hour: "12:00", tickets: 40 },
    { hour: "13:00", tickets: 28 },
    { hour: "14:00", tickets: 52 },
    { hour: "15:00", tickets: 61 },
    { hour: "16:00", tickets: 44 },
    { hour: "17:00", tickets: 73 },
    { hour: "18:00", tickets: 86 },
    { hour: "19:00", tickets: 92 },
    { hour: "20:00", tickets: 77 },
    { hour: "21:00", tickets: 68 },
  ],

  countries: [
    { code: "US", country: "United States", revenue: 64000 },
    { code: "IN", country: "India", revenue: 210000 },
    { code: "UK", country: "United Kingdom", revenue: 185000 },
    { code: "AE", country: "UAE", revenue: 117000 },
    { code: "SG", country: "Singapore", revenue: 98000 },
  ],

  notifications: [
    { id: "n1", title: "TicketSauce sync recovered", time: "2m ago", read: false },
    { id: "n2", title: "New workflow assigned", time: "14m ago", read: false },
    { id: "n3", title: "Finance export completed", time: "28m ago", read: true },
  ],

  feed: [
    {
      id: "f1",
      text: "+1 ticket sold on TicketSauce (India)",
      timestamp: new Date().toISOString(),
    },
    {
      id: "f2",
      text: "District sales reconciliation completed.",
      timestamp: new Date().toISOString(),
    },
    {
      id: "f3",
      text: "Finance report generated successfully.",
      timestamp: new Date().toISOString(),
    },
  ],

  alerts: [
    {
      id: "a1",
      severity: "warning",
      text: "API response time crossed threshold.",
    },
    {
      id: "a2",
      severity: "info",
      text: "All ticketing channels are online.",
    },
  ],
};