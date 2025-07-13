'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { toast, Toaster } from 'sonner';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!enrollmentId.trim() || !password.trim()) {
      toast.error('All fields are required');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enrollment_id: enrollmentId.trim(),
          password: password.trim(),
        }),
        redirect: 'follow', // follow redirect to /profile
      });

      console.log(response)

      // If server redirected to /profile, this won't return JSON
      if (response.ok) {
        toast.success('Login successful! Redirecting...');
        router.push('/profile');
        return;
      }

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black">Login</h2>
          <p className="mt-2 text-gray-600">Sign in to your lawyer account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="enrollment-id"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enrollment ID
              </label>
              <input
                id="enrollment-id"
                name="enrollment-id"
                type="text"
                value={enrollmentId}
                onChange={(e) => setEnrollmentId(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D6A767] focus:border-transparent"
                placeholder="Enter your enrollment ID"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D6A767] focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#D6A767] border-gray-300 rounded focus:ring-[#D6A767]"
                />
                <span className="ml-2">Remember me</span>
              </label>

              <Link
                href="/forgot-password"
                className="text-sm text-[#D6A767] hover:text-[#C19653]"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-[#D6A767] hover:text-[#C19653] font-semibold"
              >
                Register as a Lawyer
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          className:
            'bg-white text-gray-900 border border-gray-300 rounded-lg shadow-lg',
          duration: 3000,
        }}
      />
    </div>
  );
}
