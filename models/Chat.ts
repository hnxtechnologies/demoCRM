import { Schema, model, models } from "mongoose";

const chatSchema = new Schema(
  {
    sender: { type: String, required: true },
    avatar: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, required: true },
  },
  { timestamps: true }
);

export const ChatModel = models.Chat || model("Chat", chatSchema);
