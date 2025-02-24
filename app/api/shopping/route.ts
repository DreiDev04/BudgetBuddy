import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { IShoppingList } from "@/types/shoppingList-types";
import ShoppingList from "@/models/ShoppingList";


export const GET = async (req: NextRequest) => {
    try {
        const userId = "user_2sHqdLaiBpIyeLFNKOwgTY4rX6w";
        await dbConnect();

        const dbUser = await User.findOne({ clerkId: userId });

        if (!dbUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const shoppingList = await ShoppingList.find({
            user: dbUser._id,
        });

        if (!shoppingList) {
            return NextResponse.json({ error: "Shopping list not found" }, { status: 404 });
        }

        return NextResponse.json(shoppingList as IShoppingList[], { status: 200 });
    } catch (error) {
        console.error("Error fetching shopping list:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const userId = "user_2sHqdLaiBpIyeLFNKOwgTY4rX6w";
        await dbConnect();

        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            console.log("User not found");
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const newItem = new ShoppingList({
            ...body,
            user: user._id,
        });

        await newItem.save();

        return NextResponse.json({ message: "Item added successfully", item: newItem }, { status: 201 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
