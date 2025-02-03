import { IAccount } from "@/types/account-types";
import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const AccountSchema = new Schema<IAccount>(
  {
    accountName: { type: String, required: true },
    type: { type: String, required: true },
    initialValue: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Account = models.Account || model<IAccount>("Account", AccountSchema);

export default Account;