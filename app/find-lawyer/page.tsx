'use client';

import { useState } from 'react';
import { Search, MapPin, Star, Crown, Phone, Mail, Award } from 'lucide-react';

// Dummy lawyer data
const lawyerData = {
  criminal: [
    { name: 'Adv. Rajesh Kumar', experience: 15, premium: true, rating: 4.9, cases: 250, phone: '+91 98765 43210', email: 'rajesh@example.com' },
    { name: 'Adv. Priya Sharma', experience: 12, premium: true, rating: 4.8, cases: 180, phone: '+91 98765 43211', email: 'priya@example.com' },
    { name: 'Adv. Vikram Singh', experience: 8, premium: false, rating: 4.6, cases: 120, phone: '+91 98765 43212', email: 'vikram@example.com' },
    { name: 'Adv. Meera Joshi', experience: 10, premium: false, rating: 4.7, cases: 95, phone: '+91 98765 43213', email: 'meera@example.com' },
    { name: 'Adv. Arjun Patel', experience: 20, premium: true, rating: 4.9, cases: 300, phone: '+91 98765 43214', email: 'arjun@example.com' },
  ],
  corporate: [
    { name: 'Adv. Anita Gupta', experience: 18, premium: true, rating: 4.9, cases: 200, phone: '+91 98765 43215', email: 'anita@example.com' },
    { name: 'Adv. Rohit Mehta', experience: 14, premium: true, rating: 4.8, cases: 160, phone: '+91 98765 43216', email: 'rohit@example.com' },
    { name: 'Adv. Kavya Reddy', experience: 9, premium: false, rating: 4.5, cases: 85, phone: '+91 98765 43217', email: 'kavya@example.com' },
    { name: 'Adv. Suresh Nair', experience: 22, premium: true, rating: 5.0, cases: 350, phone: '+91 98765 43218', email: 'suresh@example.com' },
    { name: 'Adv. Deepika Agarwal', experience: 7, premium: false, rating: 4.4, cases: 70, phone: '+91 98765 43219', email: 'deepika@example.com' },
  ],
  art: [
    { name: 'Adv. Ravi Chopra', experience: 12, premium: true, rating: 4.7, cases: 90, phone: '+91 98765 43220', email: 'ravi@example.com' },
    { name: 'Adv. Sonia Kapoor', experience: 8, premium: false, rating: 4.5, cases: 65, phone: '+91 98765 43221', email: 'sonia@example.com' },
    { name: 'Adv. Amit Verma', experience: 15, premium: true, rating: 4.8, cases: 110, phone: '+91 98765 43222', email: 'amit@example.com' },
    { name: 'Adv. Neha Bansal', experience: 6, premium: false, rating: 4.3, cases: 45, phone: '+91 98765 43223', email: 'neha@example.com' },
  ],
  animal: [
    { name: 'Adv. Kiran Desai', experience: 10, premium: true, rating: 4.6, cases: 75, phone: '+91 98765 43224', email: 'kiran@example.com' },
    { name: 'Adv. Manish Jain', experience: 7, premium: false, rating: 4.4, cases: 50, phone: '+91 98765 43225', email: 'manish@example.com' },
    { name: 'Adv. Pooja Malhotra', experience: 13, premium: true, rating: 4.7, cases: 95, phone: '+91 98765 43226', email: 'pooja@example.com' },
    { name: 'Adv. Rahul Saxena', experience: 5, premium: false, rating: 4.2, cases: 35, phone: '+91 98765 43227', email: 'rahul@example.com' },
  ],
  banking: [
    { name: 'Adv. Sunita Rao', experience: 16, premium: true, rating: 4.8, cases: 180, phone: '+91 98765 43228', email: 'sunita@example.com' },
    { name: 'Adv. Ashok Kumar', experience: 19, premium: true, rating: 4.9, cases: 220, phone: '+91 98765 43229', email: 'ashok@example.com' },
    { name: 'Adv. Ritika Sharma', experience: 8, premium: false, rating: 4.5, cases: 80, phone: '+91 98765 43230', email: 'ritika@example.com' },
    { name: 'Adv. Gaurav Mishra', experience: 11, premium: false, rating: 4.6, cases: 100, phone: '+91 98765 43231', email: 'gaurav@example.com' },
  ],
  business: [
    { name: 'Adv. Nisha Agarwal', experience: 14, premium: true, rating: 4.8, cases: 150, phone: '+91 98765 43232', email: 'nisha@example.com' },
    { name: 'Adv. Sanjay Gupta', experience: 17, premium: true, rating: 4.9, cases: 190, phone: '+91 98765 43233', email: 'sanjay@example.com' },
    { name: 'Adv. Preeti Singh', experience: 9, premium: false, rating: 4.4, cases: 85, phone: '+91 98765 43234', email: 'preeti@example.com' },
    { name: 'Adv. Harish Patel', experience: 12, premium: false, rating: 4.6, cases: 110, phone: '+91 98765 43235', email: 'harish@example.com' },
  ],
  cyber: [
    { name: 'Adv. Techno Sharma', experience: 8, premium: true, rating: 4.7, cases: 95, phone: '+91 98765 43236', email: 'techno@example.com' },
    { name: 'Adv. Digital Kumar', experience: 6, premium: false, rating: 4.5, cases: 60, phone: '+91 98765 43237', email: 'digital@example.com' },
    { name: 'Adv. Cyber Gupta', experience: 10, premium: true, rating: 4.8, cases: 120, phone: '+91 98765 43238', email: 'cyber@example.com' },
    { name: 'Adv. Net Patel', experience: 5, premium: false, rating: 4.3, cases: 40, phone: '+91 98765 43239', email: 'net@example.com' },
  ],
};

const cities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
];

const specializations = [
  { value: 'criminal', label: 'Criminal Law' },
  { value: 'corporate', label: 'Corporate Law' },
  { value: 'art', label: 'Art Law' },
  { value: 'animal', label: 'Animal Law' },
  { value: 'banking', label: 'Banking & Finance Law' },
  { value: 'business', label: 'Business Law' },
  { value: 'cyber', label: 'Cyber Law' },
];

export default function FindLawyer() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (selectedSpecialization && lawyerData[selectedSpecialization]) {
      setSearchResults(lawyerData[selectedSpecialization]);
      setHasSearched(true);
    } else {
      setSearchResults([]);
      setHasSearched(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#E6D0B1] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-black mb-6">Find a Lawyer</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Search through 20+ lakh verified lawyers across India. Find the perfect legal professional for your needs.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D6A767] focus:border-transparent appearance-none"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select 
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D6A767] focus:border-transparent appearance-none"
                >
                  <option value="">Select Specialization</option>
                  {specializations.map((spec) => (
                    <option key={spec.value} value={spec.value}>{spec.label}</option>
                  ))}
                </select>
              </div>
              <button 
                onClick={handleSearch}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Search Lawyers</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {hasSearched && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">
                {searchResults.length} Lawyers Found
              </h2>
              <p className="text-gray-600">
                Showing {specializations.find(s => s.value === selectedSpecialization)?.label} specialists
                {selectedCity && ` in ${selectedCity}`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((lawyer, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold text-black">{lawyer.name}</h3>
                        {lawyer.premium && (
                          <Crown className="h-5 w-5 text-[#D6A767]" title="Premium Lawyer" />
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {lawyer.experience} years experience
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{lawyer.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">{lawyer.cases} cases</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <strong>Specialization:</strong> {specializations.find(s => s.value === selectedSpecialization)?.label}
                    </p>
                    {selectedCity && (
                      <p className="text-sm text-gray-600">
                        <strong>Location:</strong> {selectedCity}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <a 
                      href={`tel:${lawyer.phone}`}
                      className="flex-1 bg-[#D6A767] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#C19653] transition-colors flex items-center justify-center space-x-1"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call</span>
                    </a>
                    <a 
                      href={`mailto:${lawyer.email}`}
                      className="flex-1 border border-[#D6A767] text-[#D6A767] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#D6A767] hover:text-white transition-colors flex items-center justify-center space-x-1"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {hasSearched && searchResults.length === 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gray-50 rounded-2xl p-12">
              <h2 className="text-2xl font-bold text-black mb-4">No Lawyers Found</h2>
              <p className="text-gray-600">
                Please select both city and specialization to search for lawyers.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Default Coming Soon Section */}
      {!hasSearched && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gray-50 rounded-2xl p-12">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-[#D6A767] bg-opacity-10 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-12 w-12 text-[#D6A767]" />
                </div>
                <h2 className="text-3xl font-bold text-black">Start Your Search</h2>
                <p className="text-lg text-gray-600">
                  Select your city and the area of legal expertise you need help with to find the perfect lawyer for your case.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-[#D6A767] mx-auto mb-2" />
                    <h3 className="font-semibold">Choose Location</h3>
                    <p className="text-sm text-gray-600">Select your city</p>
                  </div>
                  <div className="text-center">
                    <Award className="h-8 w-8 text-[#D6A767] mx-auto mb-2" />
                    <h3 className="font-semibold">Select Expertise</h3>
                    <p className="text-sm text-gray-600">Choose legal specialization</p>
                  </div>
                  <div className="text-center">
                    <Star className="h-8 w-8 text-[#D6A767] mx-auto mb-2" />
                    <h3 className="font-semibold">Find Best Match</h3>
                    <p className="text-sm text-gray-600">Connect with verified lawyers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}