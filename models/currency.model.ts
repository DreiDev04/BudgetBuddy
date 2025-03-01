import { Schema, model, models } from "mongoose";
import { ICurrency } from "@/types/account-types";

const CurrencySchema = new Schema<ICurrency>(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    symbol: { type: String, required: true },
  },
  { timestamps: true }
);

const Currency = models.Currency || model<ICurrency>("Currency", CurrencySchema);

export { Currency };
