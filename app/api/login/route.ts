import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '../../lib/connectDb';
import { Lawyer } from '../../models/lawyer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const { enrollment_id, email, password } = await req.json();

  if ((!enrollment_id && !email) || !password) {
    return NextResponse.json(
      { message: 'Either enrollment ID or email, and password are required.' },
      { status: 400 },
    );
  }

  try {
    await connectDb();

    const orFilters = [];
    if (enrollment_id) orFilters.push({ enrollment_id });
    if (email) orFilters.push({ email });

    const lawyer = await Lawyer.findOne({ $or: orFilters });

    if (!lawyer) {
      return NextResponse.json(
        { message: 'Invalid credentials.' },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, lawyer.password_hash);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials.' },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      {
        id: lawyer._id,
        email: lawyer.email,
        enrollment_id: lawyer.enrollment_id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' },
    );

    const response = NextResponse.json(
      { message: 'Login successful'},
      { status: 200 },
    );

    // Set the JWT in a secure HTTP-only cookie
    response.headers.set(
      'Set-Cookie',
      serialize('auth_token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24,
      }),
    );

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Server error. Please try again later.' },
      { status: 500 },
    );
  }
}
