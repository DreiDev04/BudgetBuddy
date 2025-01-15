import mongoose, { Schema } from "mongoose";
import { IClerkUserId } from "@/types/user-types";

const UserSchema: Schema = new Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

export const User = mongoose.model<IClerkUserId>("User", UserSchema);
