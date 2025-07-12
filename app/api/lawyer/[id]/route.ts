import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/connectDb';
import { Lawyer } from '@/models/lawyer';
import jwt from 'jsonwebtoken';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDb();

  const { id } = params;

  try {
    const lawyer = await Lawyer.findOne({ enrollment_id: id }).select('-password_hash');

    if (!lawyer) {
      return NextResponse.json({ message: 'Lawyer not found' }, { status: 404 });
    }

    return NextResponse.json({ lawyer }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching lawyer:', error);
    return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
  }
}



export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDb();

  const { id } = params;

  // Check for Authorization header
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { message: 'Unauthorized: No token provided' },
      { status: 401 }
    );
  }

  // Extract token
  const token = authHeader.split(' ')[1];

  try {
    //  Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    //  Proceed with update if token is valid
    const body = await request.json();

    // Exclude restricted fields
    const { enrollment_id, password_hash, ...updatableFields } = body;

    const updatedLawyer = await Lawyer.findOneAndUpdate(
      { enrollment_id: id },
      { $set: updatableFields },
      { new: true, runValidators: true }
    ).select('-password_hash');

    if (!updatedLawyer) {
      return NextResponse.json({ message: 'Lawyer not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Lawyer details updated successfully', lawyer: updatedLawyer },
      { status: 200 }
    );

  } catch (error: any) {
    //  If token invalid/expired
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    console.error('Error updating lawyer:', error);
    return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
  }
}

