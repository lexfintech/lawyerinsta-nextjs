import Link from 'next/link';
import { UserPlus, TrendingUp, Shield, Award } from 'lucide-react';

export default function LawyerRegistrationSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-black">
                Are You a Lawyer?
              </h2>
              <h3 className="text-2xl text-[#D6A767] font-semibold">
                Join India's Leading Legal Directory
              </h3>
              <div className="w-20 h-1 bg-[#D6A767]"></div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Create your free professional profile, reach more clients, and
              grow your practice with LawyerInsta. Join thousands of successful
              lawyers who trust our platform.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-[#D6A767] bg-opacity-10 p-2 rounded-full">
                  <UserPlus className="h-5 w-5 text-[#D6A767]" />
                </div>
                <span className="text-gray-700">
                  Free professional profile creation
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-[#D6A767] bg-opacity-10 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-[#D6A767]" />
                </div>
                <span className="text-gray-700">
                  Reach more potential clients
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-[#D6A767] bg-opacity-10 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-[#D6A767]" />
                </div>
                <span className="text-gray-700">
                  Verified and trusted platform
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-[#D6A767] bg-opacity-10 p-2 rounded-full">
                  <Award className="h-5 w-5 text-[#D6A767]" />
                </div>
                <span className="text-gray-700">
                  Build your professional reputation
                </span>
              </div>
            </div>

            <Link href="/signup" className="btn-primary inline-block">
              Register Now
            </Link>
          </div>

          {/* Right Content - Stats */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-black">
              Join Our Success Story
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-[#D6A767] mb-2">
                  20L+
                </div>
                <div className="text-sm text-gray-600">Registered Lawyers</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-[#D6A767] mb-2">
                  1M+
                </div>
                <div className="text-sm text-gray-600">Client Connections</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-[#D6A767] mb-2">
                  100+
                </div>
                <div className="text-sm text-gray-600">Cities Covered</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-[#D6A767] mb-2">
                  4.8★
                </div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-[#D6A767] bg-opacity-10 rounded-lg">
              <p className="text-center text-gray-700 text-sm">
                <strong>Special Offer:</strong> Register now and get 3 months of
                premium listing for free!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
