import { IBudget } from "@/types/budget-types";
import mongoose, { Schema, Model } from "mongoose";

const UserSchema: Schema<IBudget> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    color: {
      type: Array,
      required: true,
    },
    currency: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    expenses: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Budget: Model<IBudget> = mongoose.models.Budget || mongoose.model<IBudget>("Budget", UserSchema);

export default Budget;