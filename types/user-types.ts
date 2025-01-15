import { Document } from "mongoose";

export interface IClerkUserId extends Document {
  clerkUserId: string;
  role: string;
}
