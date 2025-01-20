// models/User.ts
import { Schema, model, models } from "mongoose";
import { IClerkUser } from "@/types/user-types";

const UserSchema = new Schema<IClerkUser>(
  {
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String },
    isOnboardingCompleted: { type: Boolean, default: false },
    budget: { type: Schema.Types.ObjectId, ref: "Budget" },
    goal: { type: Schema.Types.ObjectId, ref: "Goal" },
    shoppingList: { type: Schema.Types.ObjectId, ref: "ShoppingList" },
  },
  { timestamps: true }
);

const User = models.User || model<IClerkUser>("User", UserSchema);

export { User };
