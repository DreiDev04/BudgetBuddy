import { Schema, model, models, Types } from "mongoose";
import { IAccount } from "@/types/account-types";
import { ACCOUNT_TYPE, CURRENCY_CODE } from "@/helper/constants";

const AccountSchema = new Schema<IAccount>(
  {
    accountName: { type: String, required: true },
    type: { type: String, enum: ACCOUNT_TYPE, required: true },
    currency: { type: String, enum: CURRENCY_CODE, required: true },
    user: { type: Schema.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
    accountBudgets: [{ type: Types.ObjectId, ref: "AccountBudget" }], // Add this line
  },
  { timestamps: true }
);

const Account = models.Account || model<IAccount>("Account", AccountSchema);

export { Account };
