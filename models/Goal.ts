import { IGoal } from "@/types/goal-types";
import mongoose, { Schema, Model } from "mongoose";

const UserSchema: Schema<IGoal> = new Schema(
  {},
  {
    timestamps: true,
  }
);

const Goal: Model<IGoal> =
  mongoose.models.Goal || mongoose.model<IGoal>("Goal", UserSchema);

export default Goal;
