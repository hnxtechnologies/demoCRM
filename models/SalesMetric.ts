import { Schema, model, models } from "mongoose";

const salesMetricSchema = new Schema(
  {
    revenue: { type: Number, required: true },
    profit: { type: Number, required: true },
    conversionRate: { type: Number, required: true },
    ticketCount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const SalesMetricModel = models.SalesMetric || model("SalesMetric", salesMetricSchema);
