import { Schema, model, models } from "mongoose";

const ticketSchema = new Schema(
  {
    source: { type: String, enum: ["TicketSauce", "Vivenue", "Manual"], required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["open", "resolved", "pending"], required: true },
    timestamp: { type: Date, required: true },
    region: { type: String, enum: ["US", "India", "UK", "UAE", "Singapore"], required: true },
    eventName: { type: String, required: true },
  },
  { timestamps: true }
);

export const TicketModel = models.Ticket || model("Ticket", ticketSchema);
