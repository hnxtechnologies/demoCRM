import { Schema, model, models } from "mongoose";

const taskSchema = new Schema(
  {
    assignedTo: { type: String, required: true },
    title: { type: String, required: true },
    progress: { type: Number, required: true },
    deadline: { type: Date, required: true },
  },
  { timestamps: true }
);

export const TaskModel = models.Task || model("Task", taskSchema);
