import { IAccount } from "@/types/account-types";
import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const AccountSchema = new Schema<IAccount>(
  {
    accountName: { type: String, required: true },
    type: { type: String, required: true, default: "Cash" },
    currency: { type: String, required: true, default: "USD" },
    budgetLimit: { type: Number, required: true, default: 0 }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Account = models.Account || model<IAccount>("Account", AccountSchema);

export default Account;
