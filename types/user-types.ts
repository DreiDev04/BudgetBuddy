import { Types, Document } from "mongoose";

export interface IClerkUser extends Document {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  isOnboardingCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
