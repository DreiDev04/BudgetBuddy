import dbConnect from "@/lib/mongodb";
import User from "@/models/User"; // Your Mongoose User model
import { z } from "zod";
import { NextResponse } from "next/server";

// Schema for PATCH request validation
const updateProfileSchema = z.object({
  id: z.string().nonempty("User ID is required."),
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
});

// GET handler
export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const user = await User.findById(id).select("name email");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH handler
export async function PATCH(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { id, name, email } = updateProfileSchema.parse(body);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", errors: error.errors }, {
        status: 400,
      });
    }

    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
