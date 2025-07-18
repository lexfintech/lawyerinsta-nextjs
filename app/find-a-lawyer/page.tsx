'use client';

import { useEffect, useState } from 'react';
import { Search, Loader, ArrowUp } from 'lucide-react';
import Select, { SingleValue } from 'react-select';
import LawyerCard from '@/components/LawyerCard';
import { toast } from 'sonner';


// Types
type OptionType = { value: string; label: string };

type LawyerData = {
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

// Specializations
const specializations: OptionType[] = [
  'Admiralty Law',
  'Animal Law',
  'Arbitration Law',
  'Armed Force Law',
  'Art Law',
  'Artificial Intelligence',
  'Asset Management',
  'Aviation Law',
  'Banking Law',
  'Bankruptcy & Insolvency (IBC)',
  'Business Law',
  'Capital Markets',
  'Civil Litigation',
  'Commercial Litigation',
  'Company Law',
  'Competition & Anti-trust law',
  'Constitutional Law',
  'Consumer Law',
  'Contracts',
  'Conveyance',
  'Copyright Law',
  'Corporate secretarial',
  'Criminal Law',
  'Cross Border Transaction',
  'Customs',
  'Cyber Law',
  'Data Privacy & Protection',
  'Debt Recovery',
  'Dispute Resolution',
  'Divorce',
  "Director's Disputes",
  'Domestic & Foreign Investment',
  'Due Diligence',
  'Economic Offences',
  'Electricity Law',
  'Employment Law',
  'Energy Law',
  'Entertainment Law',
  'Environment Law',
  'Equity & Capital Restructuring',
  'Family Law',
  'Fashion Law',
  'Funding Advisory',
  'Gaming Law',
  'Healthcare Law',
  'Human Rights Law',
  'Immigration Law',
].map((label) => ({ value: label, label }));

// Cities
const cities: OptionType[] = [
  'Delhi',
  'Bangalore',
  'Ahmedabad',
  'Chennai',
  'Pune',
  'Kochi',
  'Gurugram'
].map((label) => ({ value: label, label }));

export default function FindLawyer() {
  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<OptionType | null>(null);
  const [searchResults, setSearchResults] = useState<LawyerData[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
const [showBackToTop, setShowBackToTop] = useState(false);
  
useEffect(() => {
  const handleScroll = () => {
    setShowBackToTop(window.scrollY > 300);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  const handleSearch = async () => {
    if (!selectedCity) {
      toast.error('Please select the City.');
      return;
    }

    setIsSearching(true);
    setHasSearched(false);

    try {
      const res = await fetch('/api/find-lawyer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: selectedCity.value,
        }),
      });

      const data = await res.json();
      if (data.data) {
        setSearchResults(data.data);
        setHasSearched(true);
      }
    } catch (err) {
      console.error('Error fetching lawyer data:', err);
      toast.error('Something went wrong');
    } finally {
      setIsSearching(false);
    }
  };

  const sortedLawyers = [...searchResults].sort(
    (a, b) => (b.is_premium ? 1 : 0) - (a.is_premium ? 1 : 0),
  );

  const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  return (
    <div className="min-h-screen">
      <section className="bg-[#E6D0B1] py-10 ">
        <div className="w-[80%] mx-auto px-4 text-center max-w-none">
          <h1 className="text-5xl font-bold text-black mb-6">Find a Lawyer</h1>
          {/* <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Search through 20+ lakh verified lawyers across India.
          </p> */}

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                options={cities}
                value={selectedCity}
                onChange={(option) => setSelectedCity(option)}
                placeholder="Select City"
              />
              {/* <Select
                options={specializations}
                value={selectedSpecialization}
                onChange={(option) => setSelectedSpecialization(option)}
                placeholder="Select Specialization"
              /> */}
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
          <div className="max-w-none w-[90%] mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">
                {searchResults.length} lawyers found in {selectedCity?.label}
              </h2>
              {/* <p className="text-gray-600">
                Showing {selectedSpecialization?.label} specialists
                {selectedCity?.label && ` in ${selectedCity.label}`}
              </p> */}
            </div>
            <div className="flex flex-wrap gap-8 justify-center mb-8">
              {sortedLawyers.map((lawyer, index) => (
                <LawyerCard
                  key={index}
                  lawyer={lawyer}
                  specialization={selectedSpecialization?.label || ''}
                  city={selectedCity?.label || ''}
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
      {showBackToTop && (
  <button
    onClick={scrollToTop}
    className="fixed bottom-8 right-8 p-3 rounded-full bg-[#D6A767] text-white shadow-lg hover:bg-[#C29350] transition-all duration-300 z-50"
  >
    <ArrowUp />
  </button>
)}
    </div>

  );
}
