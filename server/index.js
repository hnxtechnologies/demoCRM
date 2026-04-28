const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { registerDashboardSocket } = require("../sockets/dashboard.socket");
const { createSimulationRouter } = require("../routes/simulate");
const store = require("./data/store");
const { seedDemoData } = require("./data/seed");

const PORT = 4000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
seedDemoData();

function broadcastUpdate() {
  io.sockets.sockets.forEach((socket) => {
    const role = String(socket.handshake.query.role || "admin");
    socket.emit("dashboard:snapshot", store.getSnapshot(role));
  });
}

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "ticketing-crm-simulator" });
});

app.use("/api", createSimulationRouter(store, broadcastUpdate));

registerDashboardSocket(io, store);

setInterval(() => {
  const result = store.simulateRandomSale();
  if (result) {
    broadcastUpdate();
  }
}, 7000);

server.listen(PORT, () => {
  console.log(`Socket server running on http://localhost:${PORT}`);
});
