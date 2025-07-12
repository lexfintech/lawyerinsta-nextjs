import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));

  response.cookies.set('auth_token', '', {
    httpOnly: true,
    expires: new Date(0), // Expire immediately
    path: '/',
  });

  return response;
}
