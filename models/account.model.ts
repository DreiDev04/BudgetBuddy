import { Schema, model, models, Types } from "mongoose";
import { IAccount } from "@/types/account-types";

const AccountSchema = new Schema<IAccount>(
  {
    accountName: { type: String, required: true },
    type: { type: String, enum: ["cash", "savings", "wallet"], required: true },
    currency: { type: Schema.ObjectId, ref: "Currency" },
    user: { type: Schema.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Account = models.Account || model<IAccount>("Account", AccountSchema);

export { Account };
