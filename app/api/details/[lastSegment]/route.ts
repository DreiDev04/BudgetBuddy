import dbConnect from '@/lib/mongodb';
import Budget from '@/models/Budget';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { lastSegment: string } }) {
    try {
        await dbConnect();
        const segment = await Budget.findById(params.lastSegment);

        if(!segment){
            return NextResponse.json({ error: 'Segment not found' }, { status: 404 });
        }

        return NextResponse.json(segment);
    }catch(error:any ){
        return NextResponse.json({ error: 'Error Fetching Name' }, { status: 500 });
    }
}