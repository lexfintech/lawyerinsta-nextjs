import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/connectDb';
import { Lawyer } from '@/models/lawyer';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectDb();

  const { id } = params;

  try {
    const lawyer = await Lawyer.findOne({ enrollment_id: id }).select(
      '-password_hash',
    );

    if (!lawyer) {
      return NextResponse.json(
        { message: 'Lawyer not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ lawyer }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching lawyer:', error);
    return NextResponse.json(
      { message: 'Server Error', error: error.message },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectDb();

  const { id } = params;

  try {
    const body = await request.json();

    // Exclude restricted fields from being updated
    const { enrollment_id, password_hash, ...updatableFields } = body;

    const updatedLawyer = await Lawyer.findOneAndUpdate(
      { enrollment_id: id },
      { $set: updatableFields },
      { new: true, runValidators: true },
    ).select('-password_hash');

    if (!updatedLawyer) {
      return NextResponse.json(
        { message: 'Lawyer not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Lawyer details updated successfully', lawyer: updatedLawyer },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error updating lawyer:', error);
    return NextResponse.json(
      { message: 'Server Error', error: error.message },
      { status: 500 },
    );
  }
}
