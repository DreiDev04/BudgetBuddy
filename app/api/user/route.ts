import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    const { userId } = params;

    // Mock user data
    const user = { userId, name: "John Doe", email: "johndoe@example.com" };

    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
