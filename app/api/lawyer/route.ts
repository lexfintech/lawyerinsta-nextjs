import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/connectDb';
import { Lawyer } from '@/models/lawyer';
import { verifyToken } from '../../lib/verifyToken';
import { JwtPayload } from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  await connectDb();

  const token = req.cookies.get('auth_token')?.value;
  const decoded = token ? verifyToken(token) : null;

  if (!decoded || typeof decoded === 'string' || !('enrollment_id' in decoded)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const enrollmentId = (decoded as JwtPayload).enrollment_id;

  try {
    const lawyer = await Lawyer.findOne({ enrollment_id: enrollmentId }).select('-password_hash -_id -profile_overview -state_id -city_id -createdAt -updatedAt -__v');

    if (!lawyer) {
      return NextResponse.json({ message: 'Lawyer not found' }, { status: 404 });
    }

    return NextResponse.json({ data: lawyer }, { status: 200 });
  } catch (error) {
    console.error('Error fetching lawyer:', error);
    return NextResponse.json(
      { message: 'Failed to fetch lawyer', error },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  await connectDb();

  const token = req.cookies.get('token')?.value;
  const decoded = token ? verifyToken(token) : null;

  if (!decoded || typeof decoded === 'string' || !('enrollment_id' in decoded)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const enrollmentId = (decoded as JwtPayload).enrollment_id;

  try {
    const updateData = await req.json();

    const updatedLawyer = await Lawyer.findOneAndUpdate(
      { enrollment_id: enrollmentId },
      updateData,
      { new: true }
    );

    if (!updatedLawyer) {
      return NextResponse.json({ message: 'Lawyer not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Lawyer updated successfully', data: updatedLawyer },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating lawyer:', error);
    return NextResponse.json(
      { message: 'Failed to update lawyer', error },
      { status: 500 }
    );
  }
}
