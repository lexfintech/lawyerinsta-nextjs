import { Scale, Target, Users, Award, Shield, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-black mb-6">
            About LawyerInsta
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bridging the gap between justice seekers and legal professionals
            across India
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-black">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                LawyerInsta was created with one simple goal: make qualified
                legal help accessible, transparent, and instantaneous for every
                citizen of India. With more than 20 lakh verified lawyer
                profiles, cutting-edge search technology, and a user-first
                approach, we bridge the gap between people seeking justice and
                the legal professionals who can deliver it.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that access to quality legal representation should
                not be a privilege but a fundamental right available to all
                Indians, regardless of their location or background.
              </p>
            </div>
            <div className="bg-[#D6A767] bg-opacity-10 p-8 rounded-2xl">
              <Scale className="h-16 w-16 text-[#D6A767] mb-6" />
              <h3 className="text-2xl font-bold text-black mb-4">
                Justice for All
              </h3>
              <p className="text-gray-700">
                Making legal services accessible, transparent, and affordable
                for every Indian citizen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Target className="h-12 w-12 text-[#D6A767] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-4">
                Transparency
              </h3>
              <p className="text-gray-600">
                Clear pricing, honest reviews, and transparent lawyer profiles
                to help you make informed decisions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Shield className="h-12 w-12 text-[#D6A767] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-4">Trust</h3>
              <p className="text-gray-600">
                Every lawyer on our platform is verified and vetted to ensure
                you get quality legal representation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Users className="h-12 w-12 text-[#D6A767] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-4">
                Accessibility
              </h3>
              <p className="text-gray-600">
                Making legal help available to everyone, everywhere in India, at
                any time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Award className="h-12 w-12 text-[#D6A767] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-4">Excellence</h3>
              <p className="text-gray-600">
                Connecting you with top-rated lawyers who deliver exceptional
                legal services.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Heart className="h-12 w-12 text-[#D6A767] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-4">Empathy</h3>
              <p className="text-gray-600">
                Understanding that legal issues are personal and providing
                compassionate support.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Scale className="h-12 w-12 text-[#D6A767] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-4">Justice</h3>
              <p className="text-gray-600">
                Committed to ensuring fair access to legal representation for
                all Indians.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-gold py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-white text-opacity-90">
              Numbers that reflect our commitment to justice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">20L+</div>
              <div className="text-white text-opacity-90">Verified Lawyers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">1M+</div>
              <div className="text-white text-opacity-90">Cases Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">100+</div>
              <div className="text-white text-opacity-90">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">4.8★</div>
              <div className="text-white text-opacity-90">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
