'use client';

import { Crown, Star, Phone, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation'; // ✅ Use next/navigation for app directory

type Lawyer = {
  mobile_Number: number;
  first_Name: string;
  last_Name: string;
  is_premium?: boolean;
  experience: number;
  cases_completed: number;
  area_of_expertise: string;
  email: string;
  profile_picture_url?: string;
  practice_start_year: number;
  enrollment_id: string;
};

type Props = {
  lawyer: Lawyer;
  specialization?: string;
  city?: string;
};

export default function LawyerCard({ lawyer, specialization, city }: Props) {
  const router = useRouter();

  const calculateExperience = (startYear: number) =>
    new Date().getFullYear() - startYear;

  const handleShowProfile = () => {
    router.push(`/lawyer-profile/${lawyer.enrollment_id}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col w-full max-w-[460px] cursor-pointer">
      <div className="flex justify-between mb-4 gap-4">
        {/* Profile Image + Info */}
        <div className="flex gap-4 items-start">
          <img
            src={lawyer.profile_picture_url || '/default-profile.png'}
            alt="Lawyer"
            className="w-16 h-16 rounded-full object-cover border"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-black truncate">
                {lawyer.first_Name} {lawyer.last_Name}
              </h3>
              {lawyer.is_premium && (
                <Crown className="h-5 w-5 text-[#D6A767]" />
              )}
            </div>
            <p className="text-sm text-gray-600">
              {calculateExperience(lawyer.practice_start_year)} years experience
            </p>
          </div>
        </div>

        {/* Rating & Cases */}
        <div className="text-right flex flex-col items-end justify-start">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <p className="text-xs text-gray-500">
              {lawyer.cases_completed} cases
            </p>
          </div>
        </div>
      </div>

      {/* Expertise & City */}
      <div className="text-sm text-gray-600 mb-4 space-y-1">
        <p>
          <span className="font-semibold">Specialization:</span>{' '}
          {specialization || lawyer.area_of_expertise || 'N/A'}
        </p>
        <p>
          <span className="font-semibold">Location:</span> {city || 'N/A'}
        </p>
      </div>

      {/* Contact Actions */}
      <div
        className="flex space-x-2 mt-auto pt-2"
        onClick={(e) => e.stopPropagation()} // ⛔ Prevent routing from button clicks
      >
        <button
          onClick={handleShowProfile}
          className="flex-1 bg-[#D6A767]  text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#C19653] transition-colors flex items-center justify-center space-x-1 "
        >
          <span>View Profile</span>
        </button>
      </div>
    </div>
  );
}
