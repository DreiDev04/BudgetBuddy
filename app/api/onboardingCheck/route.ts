import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserData } from "./action";
import { redirect } from "next/navigation";

export const GET = async (req: NextRequest) => {
  try {
    // const { userId } = await auth();
    const userId = "user_2sHqdLaiBpIyeLFNKOwgTY4rX6w";
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const user = await getUserData(userId);

    const isOnboardingComplete = user?.isOnboardingCompleted;

    if (!isOnboardingComplete) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    return NextResponse.redirect(new URL("/dashboard", req.url));
    // return NextResponse.json({ isOnboardingComplete });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
