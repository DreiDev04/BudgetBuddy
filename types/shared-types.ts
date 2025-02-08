import { Types } from "mongoose";

// types/shared-types.ts
export interface IColor {
  name: string;
  hex: string;
}

export interface ICategory {
  name: string;
  user: Types.ObjectId;
}
