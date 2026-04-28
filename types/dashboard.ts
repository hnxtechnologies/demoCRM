export type Role = "admin" | "manager" | "support" | "finance";

export type User = {
  id: string;
  name: string;
  role: Role;
  avatar: string;
};

export type Ticket = {
  id: string;
  source: "TicketSauce" | "Vivenue" | "Manual";
  price: number;
  status: "open" | "resolved" | "pending";
  timestamp: string;
  region: "US" | "India" | "UK" | "UAE" | "Singapore";
  eventName: string;
};

export type SalesMetrics = {
  revenue: number;
  profit: number;
  conversionRate: number;
  ticketCount: number;
  profitTrend: number[];
  revenueTrend: number[];
};

export type Task = {
  id: string;
  assignedTo: string;
  title: string;
  progress: number;
  deadline: string;
};

export type ChatMessage = {
  id: string;
  sender: string;
  avatar: string;
  message: string;
  timestamp: string;
};

export type MetricNode = {
  id: string;
  label: string;
  value: number;
  max: number;
  unit: string;
  trend: number[];
};

export type CountrySales = {
  code: string;
  country: string;
  revenue: number;
};

export type DashboardSnapshot = {
  role: Role;
  users: User[];
  tickets: Ticket[];
  sales: SalesMetrics;
  tasks: Task[];
  chat: ChatMessage[];
  metrics: MetricNode[];
  liveSales: Array<{ time: string; value: number }>;
  hourlySales: Array<{ hour: string; tickets: number }>;
  countries: CountrySales[];
  notifications: Array<{ id: string; title: string; time: string; read: boolean }>;
  feed: Array<{ id: string; text: string; timestamp: string }>;
  alerts: Array<{ id: string; severity: "info" | "warning" | "critical"; text: string }>;
};

// Legacy aliases retained for compatibility with existing demo components.
export type AlertItem = { id: string; severity: "medium" | "high" | "critical"; message: string };
export type FeedItem = { id: string; message: string; source: string; timestamp: string };
export type PlatformBreakdown = { platform: string; revenue: number; percentage: number };
export type EventStatus = "On Track" | "Low" | "Selling Fast" | "Almost Sold Out";
export type EventData = {
  id: string;
  name: string;
  capacity: number;
  sold: number;
  basePrice: number;
  revenue: number;
  date: string;
  status: EventStatus;
};
