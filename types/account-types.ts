import { Document, Types } from "mongoose";

export interface IAccount extends Document {
  accountName: string;
  type: "cash" | "savings" | "wallet";
  currency: Types.ObjectId;
  user: Types.ObjectId;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICurrency extends Document {
  code: string;
  name: string;
  symbol: string;
  createdAt?: Date;
  updatedAt?: Date;
}
