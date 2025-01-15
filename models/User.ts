import mongoose, { Schema } from "mongoose";
import { IClerkUserId } from "@/types/user-types";

const UserSchema: Schema = new Schema({
  clerkUserId: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: "user" },
});

export const User = mongoose.model<IClerkUserId>("User", UserSchema);
