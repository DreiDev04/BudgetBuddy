import { INCOME_CATEGORY_NAME, TRANSACTION_TYPE } from "@/helper/constants";
import { Document, Types } from "mongoose";

export type IncomeCategoryNameType = (typeof INCOME_CATEGORY_NAME)[number];
export type TransactionType = (typeof TRANSACTION_TYPE)[number];

export interface IAccountBudget extends Document {
  label: string;
  amount: number;
  transactionType: TransactionType;
  category: IncomeCategoryNameType;
  account?: Types.ObjectId;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAccountBudgetCategory extends Document {
  categoryName: string;
  color: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategoryColor extends Document {
  colorName: string;
  hslValue: string;
  createdAt?: Date;
  updatedAt?: Date;
}
