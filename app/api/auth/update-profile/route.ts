import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    const { id } = await req.json();

    await dbConnect();

    const user = await
      User.findOne({ id }, { password: 0 });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user });
  }
  catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}


export async function PATCH(req: Request) {
  try {
    const { id, name, birthdate, gender } = await req.json();

    // if (!email) {
    //   return NextResponse.json({ error: "Email is required." }, { status: 400 });
    // }

    // console.log("Received request data:", { email, name, birthdate, gender });

    await dbConnect();

    const existingUser = await User.findOne({ id });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const updatedBirthdate = birthdate ? new Date(birthdate) : undefined;

    const updateFields: Record<string, any> = {
      name,
      gender,
    };

    if (updatedBirthdate) {
      updateFields.birthdate = updatedBirthdate;
    }

    const updatedUser = await User.findOneAndUpdate(
      { id },
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
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await dbConnect();

    const existingUser = await User.findOne({ id });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const deletedUser = await User.findOneAndDelete({ id });

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    console.log("Deleted user document:", deletedUser);

    return NextResponse.json({
      message: "Profile deleted successfully.",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting profile:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
