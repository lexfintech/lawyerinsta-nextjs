import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/connectDb';
import { Lawyer } from '@/models/lawyer';

export async function POST(req: NextRequest) {
  await connectDb();

  try {
    // Parse JSON body
    const body = await req.json();
    const { city } = body;

    // Validate
    if (!city ) {
      return NextResponse.json(
        { message: 'City is required.' },
        { status: 400 },
      );
    }

    // Find lawyers matching city and area of expertise

    const lawyers = await Lawyer.find({
      city: { $in: [city] },
    }).select('-password_hash'); // exclude password_hash

    return NextResponse.json(
      { message: 'Lawyers fetched successfully!', data: lawyers },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    return NextResponse.json(
      { message: 'Failed to fetch lawyers', error },
      { status: 500 },
    );
  }
}
