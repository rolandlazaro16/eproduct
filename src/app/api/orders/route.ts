import { NextResponse } from 'next/server';
import dbConnect from '@/backend/mongodb';
import Order from '@/backend/models/Order';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { productName, price } = body;

    if (!productName || !price) {
      return NextResponse.json(
        { error: 'Product name and price are required' },
        { status: 400 }
      );
    }

    const newOrder = await Order.create({
      productName,
      price,
    });

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error: any) {
    console.error('Order creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create order', details: error.message },
      { status: 500 }
    );
  }
}
