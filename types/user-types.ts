import { Document } from "mongoose";

export interface IClerkUserId extends Document {
  userId: string;
  email: string;
  firstName: string;
  lastName?: string;
  username?: string;
  createdAt: string;
  updatedAt: string;
}
