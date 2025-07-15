'use client';

import { useState } from 'react';
import { Search, Loader } from 'lucide-react';
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
  'Banking law',
  'Bankruptcy & Insolvency (IBC)',
  'Business Law',
  'Capital Markets',
  'Civil litigation',
  'Commercial litigation',
  'Company law',
  'Competition & Anti-trust law',
  'Constitutional Law',
  'Consumer law',
  'Contracts',
  'Conveyance',
  'Copyright law',
  'Corporate secretarial',
  'Criminal law',
  'Cross Border Transaction',
  'Customs',
  'Cyber law',
  'Data Privacy & Protection',
  'Debt Recovery',
  'Dispute Resolution',
  'Divorce',
  "Director's disputes",
  'Domestic & Foreign Investment',
  'Due Diligience',
  'Economic offences',
  'Electricity law',
  'Employment law',
  'Energy law',
  'Entertainment law',
  'Enviornment law',
  'Equity & Capital restructuring',
  'Family law',
  'Fashion law',
  'Funding Advisory',
  'Gaming law',
  'Healthcare law',
  'Human RIghts law',
  'Immigration law',
].map((label) => ({ value: label, label }));

// Cities
const cities: OptionType[] = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Hyderabad',
  'Ahmedabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Jaipur',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Thane',
  'Bhopal',
  'Visakhapatnam',
  'Patna',
  'Vadodara',
  'Ghaziabad',
  'Ludhiana',
  'Agra',
  'Nashik',
  'Faridabad',
  'Meerut',
  'Rajkot',
  'Kalyan-Dombivli',
  'Vasai-Virar',
  'Varanasi',
  'Srinagar',
  'Aurangabad',
  'Dhanbad',
  'Amritsar',
  'Navi Mumbai',
  'Allahabad (Prayagraj)',
  'Ranchi',
  'Howrah',
  'Coimbatore',
  'Jabalpur',
  'Gwalior',
  'Vijayawada',
  'Jodhpur',
  'Madurai',
  'Raipur',
  'Kota',
  'Guwahati',
  'Chandigarh',
  'Solapur',
  'Hubli-Dharwad',
  'Bareilly',
  'Mysuru',
  'Tiruchirappalli',
  'Moradabad',
  'Tiruppur',
  'Salem',
  'Bhilai',
  'Guntur',
  'Bhiwandi',
  'Saharanpur',
  'Gorakhpur',
  'Bikaner',
  'Amravati',
  'Noida',
  'Jamshedpur',
  'Bhilwara',
  'Warangal',
  'Cuttack',
  'Firozabad',
  'Udaipur',
  'Ajmer',
  'Bilaspur',
  'Panipat',
  'Aizawl',
  'Silchar',
  'Puducherry',
  'Shimla',
  'Itanagar',
  'Shillong',
  'Kohima',
  'Gangtok',
  'Imphal',
  'Agartala',
  'Dehradun',
  'Muzaffarpur',
  'Haridwar',
  'Mathura',
  'Aligarh',
  'Satna',
  'Rewa',
  'Nanded',
  'Latur',
  'Erode',
  'Tirunelveli',
  'Karimnagar',
  'Nizamabad',
  'Kolhapur',
  'Ichalkaranji',
  'Davangere',
  'Ujjain',
  'Jhansi',
  'Tumkur',
  'Mangalore',
  'Bellary',
  'Ratlam',
  'Kakinada',
].map((label) => ({ value: label, label }));

export default function FindLawyer() {
  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<OptionType | null>(null);
  const [searchResults, setSearchResults] = useState<LawyerData[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: selectedCity.value,
          area_of_expertise: selectedSpecialization.value,
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

  return (
    <div className="min-h-screen">
      <section className="bg-[#E6D0B1] py-20 sticky top-0 z-10">
        <div className="w-[80%] mx-auto px-4 text-center max-w-none">
          <h1 className="text-5xl font-bold text-black mb-6">Find a Lawyer</h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Search through 20+ lakh verified lawyers across India.
          </p>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                options={cities}
                value={selectedCity}
                onChange={(option) => setSelectedCity(option)}
                placeholder="Select City"
              />
              <Select
                options={specializations}
                value={selectedSpecialization}
                onChange={(option) => setSelectedSpecialization(option)}
                placeholder="Select Specialization"
              />
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
                Showing {selectedSpecialization?.label} specialists
                {selectedCity?.label && ` in ${selectedCity.label}`}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
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
    </div>
  );
}
