import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/connectDb';
import { Lawyer } from '@/models/lawyer';

export async function POST(req: NextRequest) {
  await connectDb();

  try {
    // Parse JSON body
    const body = await req.json();
    const { city, area_of_expertise } = body;

    // Validate
    if (!city || !area_of_expertise) {
      return NextResponse.json(
        { message: 'City and area of expertise are required.' },
        { status: 400 }
      );
    }

    // Find lawyers matching city and area of expertise
      const lawyers = await Lawyer.find({
      city: { $in: [city] },
      area_of_expertise: { $in: [area_of_expertise] }
    }).select('-password_hash'); // exclude password_hash


    return NextResponse.json(
      { message: 'Lawyers fetched successfully!', data: lawyers },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    return NextResponse.json(
      { message: 'Failed to fetch lawyers', error },
      { status: 500 }
    );
  }
}
