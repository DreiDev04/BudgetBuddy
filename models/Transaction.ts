import { ITransaction } from "@/types/transaction-types";
import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema<ITransaction>(
  {
    account: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "expense"], required: true }, // Ensures only valid types
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    description: { type: String },
  },
  { timestamps: true }
);

const Transaction = models.Transaction || model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
