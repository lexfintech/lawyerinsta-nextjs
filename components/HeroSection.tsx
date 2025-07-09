import Link from 'next/link';
import { Search, Shield, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-[#E6D0B1] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
              India's Largest & Most{' '}
              <span className="text-[#D6A767]">Trusted</span>{' '}
              Lawyer Directory
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Making qualified legal help accessible, transparent, and instantaneous 
              for every citizen of India. Connect with verified lawyers instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/find-lawyer" className="btn-primary text-center">
                Find a Lawyer
              </Link>
              <Link href="/register-lawyer" className="btn-outline text-center">
                Register as Lawyer
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#D6A767]">20L+</div>
                <div className="text-sm text-gray-600">Verified Lawyers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#D6A767]">50K+</div>
                <div className="text-sm text-gray-600">Cases Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#D6A767]">100+</div>
                <div className="text-sm text-gray-600">Cities Covered</div>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Search className="h-8 w-8 text-[#D6A767]" />
                  <div>
                    <h3 className="font-semibold">Find Expert Lawyers</h3>
                    <p className="text-sm text-gray-600">Search by location, specialization</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Shield className="h-8 w-8 text-[#D6A767]" />
                  <div>
                    <h3 className="font-semibold">Verified Profiles</h3>
                    <p className="text-sm text-gray-600">All lawyers are verified & trusted</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Users className="h-8 w-8 text-[#D6A767]" />
                  <div>
                    <h3 className="font-semibold">Connect Instantly</h3>
                    <p className="text-sm text-gray-600">Direct contact with lawyers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}