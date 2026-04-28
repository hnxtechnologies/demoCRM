const express = require("express");

function createSimulationRouter(store, broadcastUpdate) {
  const router = express.Router();

  router.get("/tickets", (_req, res) => {
    return res.json({ ok: true, data: store.getTickets() });
  });

  router.get("/sales", (_req, res) => {
    return res.json({ ok: true, data: store.getSales() });
  });

  router.get("/users", (_req, res) => {
    return res.json({ ok: true, data: store.getUsers() });
  });

  router.get("/chat", (_req, res) => {
    return res.json({ ok: true, data: store.getChat() });
  });

  router.post("/chat", (req, res) => {
    const message = req.body?.message;
    if (!message) return res.status(400).json({ ok: false, message: "message is required" });
    const saved = store.addChatMessage({
      sender: req.body.sender,
      avatar: req.body.avatar,
      message,
    });
    broadcastUpdate();
    return res.json({ ok: true, data: saved });
  });

  router.get("/metrics", (_req, res) => {
    return res.json({ ok: true, data: store.getMetrics() });
  });

  router.post("/simulate-sale", (_req, res) => {
    const result = store.simulateRandomSale();
    broadcastUpdate();
    return res.json({ ok: true, data: result });
  });

  router.post("/reports/export", (_req, res) => {
    const report = store.generateReport();
    return res.json({ ok: true, report });
  });

  router.get("/search-ticket/:ticketId", (req, res) => {
    const ticket = store.searchTicket(req.params.ticketId);
    if (!ticket) {
      return res.status(404).json({ ok: false, message: "Ticket not found." });
    }
    return res.json({ ok: true, ticket });
  });

  router.post("/check-in", (req, res) => {
    const ticketId = req.body?.ticketId;
    if (!ticketId) {
      return res.status(400).json({ ok: false, message: "ticketId is required." });
    }
    const result = store.checkInTicket(ticketId);
    if (!result.ok) {
      return res.status(400).json({ ok: false, message: result.reason });
    }
    broadcastUpdate();
    return res.json({ ok: true, ticket: result.ticket });
  });

  return router;
}

module.exports = { createSimulationRouter };
