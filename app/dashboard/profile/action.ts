"use server";

import { auth } from "@/auth";
import { FormValues } from "./UpdateProfile";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function updateProfile(values: FormValues) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { name, email } = values;

  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { name, email },
    { new: true }
  );

  if (!user) {
    throw new Error("User not found");
  }

  revalidatePath("/dashboard/profile");
}
