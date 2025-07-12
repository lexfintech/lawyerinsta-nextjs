// /app/api/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/connectDb';
import { Lawyer } from '@/models/lawyer';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    await connectDb();

    const lawyer = await Lawyer.findById(decoded.id).lean();
    if (!lawyer) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      lawyer: {
        email: lawyer.email,
        firstName: lawyer.first_Name,
        lastName: lawyer.last_Name,
        enrollmentId: lawyer.enrollment_id,
        phone: lawyer.mobile_Number,
        // Include more fields as needed
      },
    });
  } catch (err) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
