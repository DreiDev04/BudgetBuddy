import dbConnect from '@/lib/mongodb';
import Budget from '@/models/Budget';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { budgetId: string } }) {
  try {
    await dbConnect();
    const budget = await Budget.findById(params.budgetId);

    if (!budget) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    return NextResponse.json(budget, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching budget' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { budgetId: string } }) {
  try {
    await dbConnect();
    const { budgetLimit } = await req.json();
    const updatedBudget = await Budget.findByIdAndUpdate(
      params.budgetId,
      { budgetLimit },
      { new: true, runValidators: true }
    );
    if (!updatedBudget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }
    return NextResponse.json(updatedBudget, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating budget" }, { status: 500 });
  }
}
