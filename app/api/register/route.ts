import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '../../lib/connectDb';
import { Lawyer } from '../../models/lawyer'; // Assuming Lawyer model is correctly defined
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token generation
import { serialize } from 'cookie'; // For sending token in cookie format

const SALT_ROUNDS = 10;
// It's crucial to store your JWT secret in an environment variable (e.g., .env.local)
// and never hardcode it in your application.
// Example: JWT_SECRET="your_very_secret_key_here"
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key'; // Fallback for development, but use env var in production

export async function POST(req: NextRequest) {
  await connectDb(); // Ensure database connection is established

  try {
    const body = await req.json();

    const {
      enrollment_id,
      first_Name,
      last_Name,
      email,
      password_hash,
      mobile_Number,
      city, // Assuming 'city' is an array of strings or similar
    } = body;

    // Validate required fields
    if (
      !enrollment_id ||
      !first_Name ||
      !last_Name ||
      !email ||
      !password_hash ||
      !mobile_Number ||
      !Array.isArray(city) ||
      city.length === 0
    ) {
      return NextResponse.json(
        { message: 'Missing required fields or invalid city format' },
        { status: 400 },
      );
    }

    // Check if email, mobile_Number, or enrollment_id already exist
    // Check for existing email
    const existingLawyerByEmail = await Lawyer.findOne({ email });
    if (existingLawyerByEmail) {
      return NextResponse.json(
        { message: 'Lawyer with this email already exists.' },
        { status: 409 }, // 409 Conflict
      );
    }

    // Check for existing mobile number
    const existingLawyerByMobile = await Lawyer.findOne({ mobile_Number });
    if (existingLawyerByMobile) {
      return NextResponse.json(
        { message: 'Lawyer with this mobile number already exists.' },
        { status: 409 }, // 409 Conflict
      );
    }

    // Check for existing enrollment ID
    const existingLawyerByEnrollment = await Lawyer.findOne({ enrollment_id });
    if (existingLawyerByEnrollment) {
      return NextResponse.json(
        { message: 'Lawyer with this enrollment ID already exists.' },
        { status: 409 }, // 409 Conflict
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password_hash, SALT_ROUNDS);

    // Replace plain text password with hashed one in the body
    body.password_hash = hashedPassword;

    //  Create new lawyer
    const newLawyer = await Lawyer.create(body);

    // Generate a JWT token for the newly registered lawyer
    const token = jwt.sign(
      {
        id: newLawyer._id, // Use the lawyer's database ID
        email: newLawyer.email,
        enrollment_id: newLawyer.enrollment_id,
      },
      JWT_SECRET,
      { expiresIn: '1d' }, // Token expires in 1 day
    );

    //Return success response with lawyer data and the token

    const response = NextResponse.json(
      { message: 'registering successful' },
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
    console.error('Error registering lawyer:', error);
    // Provide a more specific error message if possible, or a generic one
    return NextResponse.json(
      { message: 'Failed to register lawyer', error: (error as Error).message }, // Cast error to Error to access message
      { status: 500 },
    );
  }
}
