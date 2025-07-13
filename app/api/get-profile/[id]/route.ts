import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/connectDb';
import { Lawyer } from '@/models/lawyer';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDb();

  const { id } = params; // this is the enrollment_id from URL

  try {
    const lawyer = await Lawyer.findOne({ enrollment_id: id }).select('-password_hash -_id');

    if (!lawyer) {
      return NextResponse.json(
        { message: 'Lawyer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ lawyer }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching lawyer:', error);
    return NextResponse.json(
      { message: 'Server Error', error: error.message },
      { status: 500 }
    );
  }
}
