function registerDashboardSocket(io, store) {
  io.on("connection", (socket) => {
    const role = String(socket.handshake.query.role || "admin");
    socket.emit("dashboard:snapshot", store.getSnapshot(role));

    socket.on("dashboard:requestSnapshot", (incomingRole) => {
      socket.emit("dashboard:snapshot", store.getSnapshot(String(incomingRole || role)));
    });

    socket.on("chat:send", (payload) => {
      if (!payload?.message) return;
      store.addChatMessage(payload);
      io.emit("dashboard:snapshot", store.getSnapshot(role));
    });

    socket.on("dashboard:simulateSale", () => {
      store.simulateRandomSale();
      io.emit("dashboard:snapshot", store.getSnapshot(role));
    });
  });
}

module.exports = { registerDashboardSocket };
