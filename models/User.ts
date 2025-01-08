import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  // birthdate?: Date;
  // gender?: "Female" | "Male" | "Other";
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"] 
    },
    password: { 
      type: String, 
      required: true,
      minlength: [6, "Password must be at least 6 characters long"] 
    },
    // birthdate: { type: Date }, // Optional
    // gender: { type: String, enum: ["Female", "Male", "Other"] }, 
  },
  {
    timestamps: true, 
  }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
