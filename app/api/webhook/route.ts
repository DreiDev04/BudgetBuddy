import { WebhookEvent } from "@clerk/clerk-sdk-node"; 
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body: WebhookEvent = await req.json();
    const clerkUserId = body.data.id;  

    if (!clerkUserId) {
      return NextResponse.json(
        { error: "Missing required field: clerkUserId" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      const createUser = await User.create({
        clerkUserId,
        role: "user",
      });

      return NextResponse.json(
        { message: "User created successfully", user: createUser },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "User already exists", user },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
