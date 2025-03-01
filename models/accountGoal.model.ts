import { Schema, model, models, Types } from "mongoose";
import { IAccountGoal } from "@/types/goal-types";

const AccountGoalSchema = new Schema<IAccountGoal>(
  {
    goalName: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    savedAmount: { type: Number, default: 0 },
    deadline: { type: Date },
    isCompleted: { type: Boolean, default: false },
    account: { type: Schema.ObjectId, ref: "Account", required: true },
  },
  { timestamps: true }
);

const AccountGoal = models.AccountGoal || model<IAccountGoal>("AccountGoal", AccountGoalSchema);

export { AccountGoal };
