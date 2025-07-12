import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '../../lib/connectDb';
import { Lawyer } from '../../models/lawyer';
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10;

export async function POST(req: NextRequest) {
  await connectDb();

  try {
    const body = await req.json();

    const {
      enrollment_id,
      first_Name,
      last_Name,
      email,
      password_hash,
      mobile_Number,
      city
    } = body;

    // Validate required fields
    if (
      !enrollment_id ||
      !first_Name ||
      !last_Name ||
      !email ||
      !password_hash ||
      !mobile_Number ||
      !city
    ) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password_hash, SALT_ROUNDS);

    // Replace plain text password with hashed one
    body.password_hash = hashedPassword;

    // Create new lawyer
    const newLawyer = await Lawyer.create(body);

    return NextResponse.json(
      { message: 'Lawyer registered successfully!', data: newLawyer },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering lawyer:', error);
    return NextResponse.json(
      { message: 'Failed to register lawyer', error },
      { status: 500 }
    );
  }
}
