# Unified Ticketing CRM Dashboard - Project Demo Guide

## 1) Project Overview

`Unified Ticketing CRM Dashboard` is a production-style SaaS control center for live music venues.  
It consolidates ticketing operations across multiple sources into one dark-premium analytics dashboard with realtime updates, role-based views, team communication, and operational monitoring.

Core business goal:
- Centralize ticket sales and operations from multiple platforms
- Give each team (Admin, Manager, Support, Finance) a focused workspace
- Surface live KPIs, system health, and action items in one command center

---

## 2) Tech Stack

### Frontend
- `Next.js` (App Router)
- `TypeScript`
- `Tailwind CSS`
- `Framer Motion`
- `Recharts`
- `Socket.IO Client`
- `Radix UI` (dropdown + switch primitives)

### Backend
- `Node.js` + `Express`
- `Socket.IO` (realtime server)
- In-memory simulation engine for live demo

### Data / Schema Layer
- `Mongoose` schemas included for production-ready data modeling:
  - `User`
  - `Ticket`
  - `Task`
  - `Chat`
  - `SalesMetric`

---

## 3) Key Product Features

- Premium dark admin UI inspired by SmartAdmin style
- Fixed collapsible sidebar + top navbar + card-based dashboard
- Realtime ticket sale simulation (auto + manual)
- Live charts:
  - Sales trend (area chart)
  - Hourly subscription/ticket chart (bar chart)
  - KPI mini trends and metric sparklines
- Team chat panel with preloaded and live messages
- Global region sales panel with revenue highlights
- Ticket search + gate check-in flow
- Duplicate check-in prevention
- Notification center
- Skeleton loading states
- Export PDF (demo via print flow)
- Bug report CTA

---

## 4) RBAC (Role-Based Access Control)

Roles implemented:

1. `Admin`
- Full platform visibility
- APIs, users, workflows, full analytics
- Access to all core dashboard modules

2. `Manager`
- Operational and analytics visibility
- Task monitoring and performance tracking

3. `Support Agent`
- Team chat + ticket monitoring + check-in workflows
- Operational ticket-focused access

4. `Finance`
- Revenue/profit/conversion focused views
- Financial insight modules and report actions

---

## 5) UI Layout Walkthrough (What to Show in Demo)

### A) Sidebar (left)
- Product branding: `Demo CRM`
- Navigation modules:
  - Dashboards
  - Insights
  - Ticket Sources
  - Sales Analytics
  - Users / Roles
  - Workflows
  - Notifications
  - Settings
- Role-aware visibility + collapse/expand behavior

### B) Top Navbar
- Universal search: `Search for anything...`
- Notification dropdown
- Theme toggle
- User avatar menu (sign out)

### C) Control Center
- Live sales graph with `Live Update` toggle
- Revenue Today + Profit Today cards with mini trend visuals
- Tasks progress widget
- Action buttons:
  - Export PDF
  - Report Bug

### D) System Metrics Strip
- Server Load
- API Response
- Ticket Throughput
- System Temperature

### E) Team Chat + Global Sales
- Realtime chat feed and message composer
- Regional sales panel with country-level revenue highlights

### F) Subscription / Sales Chart
- Hourly ticket/subscription bars with animated rendering

### G) Ticket Monitoring + Check-In
- Search ticket by ID
- Check-in action
- Duplicate check-in prevention

---

## 6) Realtime Behavior

Realtime engine behavior:
- Auto simulation every ~7 seconds
- Manual simulation via `Simulate Ticket Sale`
- Snapshot pushed to connected dashboard clients through Socket.IO
- Live updates include:
  - sales metrics
  - feed/notifications
  - chart points
  - system metrics
  - ticket rows
  - alerts

---

## 7) API Endpoints (Simulated Integration Layer)

Base URL: `http://localhost:4000`

- `GET /health`
- `GET /api/tickets`
- `GET /api/sales`
- `GET /api/users`
- `GET /api/chat`
- `POST /api/chat`
- `GET /api/metrics`
- `POST /api/simulate-sale`
- `POST /api/reports/export`
- `GET /api/search-ticket/:ticketId`
- `POST /api/check-in`

---

## 8) Project Structure

```text
app/
  page.tsx                    # Role selector login screen
  dashboard/page.tsx          # Main SmartAdmin-style dashboard
  layout.tsx
  globals.css

components/dashboard/
  Sidebar.tsx
  TopNavbar.tsx
  GlobalSalesMap.tsx
  SkeletonPanel.tsx

server/
  index.js                    # Express + Socket server bootstrap
  data/
    store.js                  # Core in-memory data engine
    seed.js                   # Demo seeding

routes/
  simulate.js                 # REST API routes

sockets/
  dashboard.socket.js         # Socket handlers

models/
  User.ts
  Ticket.ts
  Task.ts
  Chat.ts
  SalesMetric.ts

types/
  dashboard.ts                # Shared TS contracts

lib/
  db.ts                       # Mongo connection helper
  format.ts
  utils.ts
```

---

## 9) How to Run

From project root:

```bash
npm install
npm run dev
```

App URLs:
- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:4000/health`

---

## 10) Suggested Client Demo Script (3-5 Minutes)

1. **Open role selector** and explain RBAC quickly.  
2. **Login as Admin**:
- show Control Center + live graph
- click `Simulate Ticket Sale`
- show immediate updates in charts and ticket feed
3. **Open notifications + search bar** to show operator productivity features.  
4. **Show system metrics strip** and explain operational reliability monitoring.  
5. **Show Team Chat** and send a message live.  
6. **Show Global Sales panel** and call out country revenue split.  
7. **Show ticket monitoring + check-in flow** (search and check-in, then duplicate check).  
8. **Switch to Finance role** and show financial view focus.  
9. **Close with architecture**:
- Next.js frontend + Express + Socket.IO realtime + scalable Mongoose schemas.

---

## 11) Production Readiness Notes

Already included:
- modular architecture
- typed contracts
- realtime pub/sub style updates
- role-based rendering
- API abstraction
- schema layer for DB migration path

Recommended next steps for full production:
- JWT auth + permission middleware
- persistent Mongo storage + repository layer
- audit logging
- observability (APM, tracing, alerting)
- test suite (unit + integration + e2e)
- CI/CD and containerization

---

## 12) One-Line Pitch

`Demo CRM` is a premium realtime command center that unifies ticketing operations, sales intelligence, and cross-team workflows in one scalable SaaS dashboard.
