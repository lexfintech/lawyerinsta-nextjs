'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'LawyerInsta helped me find an excellent property lawyer within hours. The process was smooth and transparent. Highly recommended!',
    case: 'Property Dispute'
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    text: 'Found the perfect criminal lawyer for my case. The platform is user-friendly and all lawyers are verified. Great service!',
    case: 'Criminal Defense'
  },
  {
    name: 'Anita Patel',
    location: 'Bangalore',
    rating: 5,
    text: 'Excellent platform for finding family lawyers. The lawyer I connected with was professional and helped resolve my case quickly.',
    case: 'Family Law'
  },
  {
    name: 'Vikram Singh',
    location: 'Chennai',
    rating: 5,
    text: 'LawyerInsta made it easy to find a corporate lawyer for my startup. The verification process gives confidence in the platform.',
    case: 'Corporate Law'
  },
  {
    name: 'Meera Joshi',
    location: 'Pune',
    rating: 5,
    text: 'Quick and efficient service. Found a great divorce lawyer who handled my case with care and professionalism.',
    case: 'Divorce Case'
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-gold py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-xl text-white text-opacity-90 max-w-3xl mx-auto">
            Thousands of satisfied clients have found their perfect legal representation through LawyerInsta.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center space-y-6">
              {/* Stars */}
              <div className="flex justify-center space-x-1">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-[#D6A767] fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl text-gray-700 leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Client Info */}
              <div className="space-y-2">
                <div className="text-lg font-semibold text-black">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-gray-600">
                  {testimonials[currentIndex].location} • {testimonials[currentIndex].case}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronLeft className="h-6 w-6 text-[#D6A767]" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronRight className="h-6 w-6 text-[#D6A767]" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}