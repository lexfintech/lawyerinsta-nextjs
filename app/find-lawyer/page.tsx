'use client';

import { useState } from 'react';
import { Search, MapPin, Star, Crown, Phone, Mail, Award } from 'lucide-react';

// Type definitions
type Lawyer = {
  first_Name: string;
  last_Name: string;
  experience: number;
  is_premium: boolean;
  cases_completed: number;
  mobile_Number: string;
  email: string;
};

type Specialization =
  | 'Criminal Law'
  | 'Corporate Law'
  | 'Art Law'
  | 'Animal Law'
  | 'Banking & Finance Law'
  | 'Business Law'
  | 'Cyber Law';

type LawyerData = {
  [K in Specialization]: Lawyer[];
};


const cities = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Hyderabad',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Kanpur',
  'Nagpur',
];

const specializations: { value: Specialization; label: string }[] = [
  { value: 'Criminal Law', label: 'Criminal Law' },
  { value: 'Corporate Law', label: 'Corporate Law' },
  { value: 'Art Law', label: 'Art Law' },
  { value: 'Animal Law', label: 'Animal Law' },
  { value: 'Banking & Finance Law', label: 'Banking & Finance Law' },
  { value: 'Business Law', label: 'Business Law' },
  { value: 'Cyber Law', label: 'Cyber Law' },
];

export default function FindLawyer() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [searchResults, setSearchResults] = useState<Lawyer[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [lawyerData, setLawyerData] = useState<LawyerData>({
    'Criminal Law': [],
    'Corporate Law': [],
    'Art Law': [],
    'Animal Law': [],
    'Banking & Finance Law': [],
    'Business Law': [],
    'Cyber Law': [],
  });

  const handleSearch = () => {
    if (
      selectedSpecialization &&
      lawyerData[selectedSpecialization as Specialization]
    ) {
      const response  = fetch('/api/find-lawyer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: selectedCity,
          area_of_expertise: selectedSpecialization,
        }),
      });
      response
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            console.log(data.data);
            setLawyerData((prev) => ({
              ...prev,
              [selectedSpecialization]: data.data,
            }));
            setSearchResults(data.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching lawyer data:', error);
        });
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
            Search through 20+ lakh verified lawyers across India. Find the
            perfect legal professional for your needs.
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
                    <option key={city} value={city}>
                      {city}
                    </option>
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
                    <option key={spec.value} value={spec.value}>
                      {spec.label}
                    </option>
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
                Showing{' '}
                {
                  specializations.find(
                    (s) => s.value === selectedSpecialization,
                  )?.label
                }{' '}
                specialists
                {selectedCity && ` in ${selectedCity}`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((lawyer, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold text-black">
                          {lawyer.first_Name} {lawyer.last_Name}
                        </h3>
                        {lawyer.is_premium && (
                          <Crown className="h-5 w-5 text-[#D6A767]" />
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {lawyer.experience} years experience
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {lawyer.cases_completed} cases
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <strong>Specialization:</strong>{' '}
                      {
                        specializations.find(
                          (s) => s.value === selectedSpecialization,
                        )?.label
                      }
                    </p>
                    {selectedCity && (
                      <p className="text-sm text-gray-600">
                        <strong>Location:</strong> {selectedCity}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <a
                      href={`tel:${lawyer.mobile_Number}`}
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
              <h2 className="text-2xl font-bold text-black mb-4">
                No Lawyers Found
              </h2>
              <p className="text-gray-600">
                Please select both city and specialization to search for
                lawyers.
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
                <h2 className="text-3xl font-bold text-black">
                  Start Your Search
                </h2>
                <p className="text-lg text-gray-600">
                  Select your city and the area of legal expertise you need help
                  with to find the perfect lawyer for your case.
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
                    <p className="text-sm text-gray-600">
                      Choose legal specialization
                    </p>
                  </div>
                  <div className="text-center">
                    <Star className="h-8 w-8 text-[#D6A767] mx-auto mb-2" />
                    <h3 className="font-semibold">Find Best Match</h3>
                    <p className="text-sm text-gray-600">
                      Connect with verified lawyers
                    </p>
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
