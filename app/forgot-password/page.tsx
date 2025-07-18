'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Scale, ArrowLeft, Send } from 'lucide-react';

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const isEmail = identifier.includes('@');
  const placeholderText = 'Enter your email or enrollment ID';

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="h-8 w-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-black mb-4">
              Check Your Email
            </h2>

            <p className="text-gray-600 mb-6">
              We've sent password reset instructions to{' '}
              {isEmail
                ? 'your email address'
                : 'the email associated with your enrollment ID'}
              .
            </p>

            <p className="text-sm text-gray-500 mb-8">
              Didn't receive the email? Check your spam folder or try again.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setIdentifier('');
                }}
                className="w-full btn-outline"
              >
                Try Again
              </button>

              <Link
                href="/login"
                className="block w-full btn-primary text-center"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black">Forgot Password?</h2>
          <p className="mt-2 text-gray-600">
            Enter your Email or Enrollment ID and we'll send you reset
            instructions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address or Enrollment ID
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D6A767] focus:border-transparent"
                  placeholder={placeholderText}
                />
              </div>
              {identifier && (
                <p className="mt-2 text-sm text-gray-500">
                  {isEmail
                    ? "We'll send reset instructions to this email address"
                    : "We'll send reset instructions to the email associated with this enrollment ID"}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !identifier.trim()}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Reset Instructions</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 text-[#D6A767] hover:text-[#C19653] font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Login</span>
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
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
    </div>
  );
}
