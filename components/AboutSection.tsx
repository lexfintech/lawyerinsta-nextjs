import Link from 'next/link';
import { ArrowRight, Scale, Target, Users } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-black">About Us</h2>
              <div className="w-20 h-1 bg-[#D6A767]"></div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              LawyerInsta was created with one simple goal: make qualified legal
              help accessible, transparent, and instantaneous for every citizen
              of India. With more than 20 lakh verified lawyer profiles,
              cutting-edge search technology, and a user-first approach, we
              bridge the gap between people seeking justice and the legal
              professionals who can deliver it.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center space-x-2 text-[#D6A767] hover:text-[#C19653] font-semibold transition-colors group"
            >
              <span>Read More</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Content - Features */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-[#D6A767] bg-opacity-10 p-3 rounded-lg">
                  <Scale className="h-8 w-8 text-[#D6A767]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Legal Excellence
                  </h3>
                  <p className="text-gray-600">
                    Connect with top-rated lawyers across all legal
                    specializations in India.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-[#D6A767] bg-opacity-10 p-3 rounded-lg">
                  <Target className="h-8 w-8 text-[#D6A767]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Transparent Process
                  </h3>
                  <p className="text-gray-600">
                    Clear pricing, verified reviews, and transparent lawyer
                    profiles.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-[#D6A767] bg-opacity-10 p-3 rounded-lg">
                  <Users className="h-8 w-8 text-[#D6A767]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    User-First Approach
                  </h3>
                  <p className="text-gray-600">
                    Designed with users in mind, making legal help accessible to
                    everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
