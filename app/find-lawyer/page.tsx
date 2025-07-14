'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Award, Loader } from 'lucide-react';
import LawyerCard from '@/components/LawyerCard';
import { toast } from 'sonner';

type Lawyerdata = {
  enrollment_id: string;
  first_Name: string;
  last_Name: string;
  experience: number;
  is_premium: boolean;
  cases_completed: number;
  mobile_Number: number;
  email: string;
  area_of_expertise: string;
  city: string;
  profile_picture_url?: string;
  cover_picture_url?: string;
  rating: number;
  totalCases: number;
  successRate: number;
  address?: string;
  languages?: string[];
  practice_start_year: number;
};

type Specialization =
  | 'Criminal Law'
  | 'Corporate Law'
  | 'Art Law'
  | 'Animal Law'
  | 'Banking & Finance Law'
  | 'Business Law'
  | 'Cyber Law';

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
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [specSuggestions, setSpecSuggestions] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Lawyerdata[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setCitySuggestions(
      selectedCity
        ? cities.filter((c) =>
            c.toLowerCase().includes(selectedCity.toLowerCase()),
          )
        : [],
    );
  }, [selectedCity]);

  useEffect(() => {
    setSpecSuggestions(
      selectedSpecialization
        ? specializations
            .filter((s) =>
              s.label
                .toLowerCase()
                .includes(selectedSpecialization.toLowerCase()),
            )
            .map((s) => s.label)
        : [],
    );
  }, [selectedSpecialization]);

  const handleSearch = async () => {
    if (!selectedCity || !selectedSpecialization) {
      toast.error('Please enter both City and Specialization');
      return;
    }

    setIsSearching(true);
    setHasSearched(false);

    try {
      const res = await fetch('/api/find-lawyer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: selectedCity,
          area_of_expertise: selectedSpecialization,
        }),
      });

      const data = await res.json();
      if (data.data) {
        setSearchResults(data.data);
        setHasSearched(true);
      }
    } catch (err) {
      console.error('Error fetching lawyer data:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const sortedLawyers = [...searchResults].sort((a, b) => {
    return (b.is_premium ? 1 : 0) - (a.is_premium ? 1 : 0);
  });

  return (
    <div className="min-h-screen">
      <section className="bg-[#E6D0B1] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-black mb-6">Find a Lawyer</h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Search through 20+ lakh verified lawyers across India.
          </p>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  placeholder="Enter City"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D6A767]"
                />
                {citySuggestions.length > 0 && (
                  <ul className="absolute z-10 bg-white border rounded shadow w-full mt-1 max-h-40 overflow-y-auto">
                    {citySuggestions.map((city, idx) => (
                      <li
                        key={idx}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSelectedCity(city);
                          setCitySuggestions([]);
                        }}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="relative">
                <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  placeholder="Enter Specialization"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D6A767]"
                />
                {specSuggestions.length > 0 && (
                  <ul className="absolute z-10 bg-white border rounded shadow w-full mt-1 max-h-40 overflow-y-auto">
                    {specSuggestions.map((spec, idx) => (
                      <li
                        key={idx}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSelectedSpecialization(spec);
                          setSpecSuggestions([]);
                        }}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>
                )}
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

      {isSearching && (
        <section className="flex justify-center py-20">
          <Loader className="h-10 w-10 text-[#D6A767] animate-spin" />
        </section>
      )}

      {hasSearched && !isSearching && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">
                {searchResults.length} Lawyers Found
              </h2>
              <p className="text-gray-600">
                Showing {selectedSpecialization} specialists
                {selectedCity && ` in ${selectedCity}`}
              </p>
            </div>
            <div className="flex flex-wrap gap-6 justify-center mb-8">
              {sortedLawyers.map((lawyer, index) => (
                <LawyerCard
                  key={index}
                  lawyer={lawyer}
                  specialization={selectedSpecialization}
                  city={selectedCity}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {hasSearched && searchResults.length === 0 && !isSearching && (
        <section className="py-20 bg-white text-center">
          <div className="bg-gray-50 rounded-2xl p-12 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-black mb-4">
              No Lawyers Found
            </h2>
            <p className="text-gray-600">
              Please refine your search criteria and try again.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
