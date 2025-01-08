import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function PATCH(req: Request) {
  try {
    const { email, name, birthdate, gender } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    console.log("Received request data:", { email, name, birthdate, gender });

    await dbConnect();

    const updatedBirthdate = birthdate ? new Date(birthdate) : undefined;

    const updateFields: Record<string, any> = {
      name,
      gender,
    };

    if (updatedBirthdate) {
      updateFields.birthdate = updatedBirthdate;
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    console.log("Updated user document:", updatedUser);

    return NextResponse.json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
