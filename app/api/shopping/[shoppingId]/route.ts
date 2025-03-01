import dbConnect from '@/lib/mongodb';
import ShoppingList from '@/models/ShoppingList';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { shoppingId: string } }) {
  try {
    await dbConnect();

    const deletedItem = await ShoppingList.findByIdAndDelete(params.shoppingId);

    if (!deletedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json({ error: "Error deleting item" }, { status: 500 });
  }
}
