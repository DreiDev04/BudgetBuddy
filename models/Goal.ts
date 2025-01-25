// models/Goal.ts
import { Schema, model, models } from "mongoose";
import { IGoal } from "@/types/goal-types";

const GoalSchema = new Schema<IGoal>(
  {
    title: { type: String, required: true },
    target: { type: String, required: true },
    progress: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Goal = models.Goal || model<IGoal>("Goal", GoalSchema);

export default Goal;
