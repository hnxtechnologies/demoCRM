import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ["admin", "manager", "support", "finance"], required: true },
    avatar: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = models.User || model("User", userSchema);
