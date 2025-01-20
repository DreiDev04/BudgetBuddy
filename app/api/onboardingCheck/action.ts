"use server";

import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";
import { IClerkUser } from "@/types/user-types";

export async function getUserData(_userId: string) {
  try {
    await dbConnect();
    const user = await User.findOne({ userId: _userId });

    if (!user) {
      throw new Error("Error: User not found");
    }

    return user as IClerkUser;
  } catch (error) {
    console.error(error);
  }
}
