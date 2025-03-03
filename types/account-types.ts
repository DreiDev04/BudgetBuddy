import { Document, Types } from "mongoose";
import { ACCOUNT_TYPE, CURRENCY_CODE } from "@/helper/constants";


export type CurrencyType = (typeof CURRENCY_CODE)[number];
export type AccountType = (typeof ACCOUNT_TYPE)[number]; ;


export interface IAccount extends Document {
  accountName: string;
  type: AccountType;
  currency: CurrencyType;
  user: Types.ObjectId;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  accountBudgets: Types.ObjectId[];
}

export interface ICurrency extends Document {
  code: string;
  name: string;
  symbol: string;
  createdAt?: Date;
  updatedAt?: Date;
}
