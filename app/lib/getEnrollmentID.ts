import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export function getEnrollmentIdFromToken() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.decode(token) as { enrollment_id?: string };
    return decoded?.enrollment_id ?? null;
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
}
