'use client';

import { Crown, Star, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // ✅ Use next/navigation for app directory
import Profile from '../public/assets/images/profile.png'; // Default profile image

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
  city?: any;
};

export default function LawyerCard({ lawyer, specialization, city }: Props) {
  const router = useRouter();

  const getYearFromEnrollment = (
    id: string | undefined,
  ): number | undefined => {
    if (!id || id.length < 4) return undefined;
    const potentialYear = id.slice(-4);
    if (!isNaN(Number(potentialYear))) {
      const year = parseInt(potentialYear, 10);
      if (year > 1950 && year <= new Date().getFullYear()) return year;
    }
    return undefined;
  };

  const calculateExperience = (startYear?: number): number => {
    if (!startYear || isNaN(startYear)) return 0;

    const currentYear = new Date().getFullYear();

    if (startYear > currentYear) return 0;

    return currentYear - startYear; // Handles all valid cases, including when startYear === currentYear
  };

  const displayedPracticeStartYear = getYearFromEnrollment(
    lawyer.enrollment_id,
  );

  const displayExperience = calculateExperience(displayedPracticeStartYear);

  console.log(lawyer.area_of_expertise, typeof lawyer.area_of_expertise);

  const handleShowProfile = () => {
    router.push(`/lawyer-profile/${lawyer.enrollment_id}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col w-full max-w-[460px] cursor-pointer">
      <div className="flex justify-between mb-4 gap-4 max-w-fit">
        {/* Profile Image + Info */}
        <div className="flex gap-4 items-start">
          <Image
            src={lawyer.profile_picture_url || Profile}
            alt="Lawyer"
            className="w-16 h-16 rounded-full object-cover border"
            width={64}
            height={64}
          />
          <div>
            <div className="flex items-center gap-2 max-w-[180px] md:max-w-[280px]">
              <h3 className="text-lg font-semibold text-black truncate overflow-hidden whitespace-nowrap">
                {`${lawyer.first_Name} ${lawyer?.last_Name}`}
              </h3>
              {lawyer.is_premium && (
                <Crown className="h-5 w-5 text-[#D6A767]" />
              )}
            </div>
            {lawyer.is_premium ? (
              <p className="text-sm text-gray-600">
                {lawyer.practice_start_year}+ Years Experience
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                {`${displayExperience} Years Experience` || 'N/A'}
              </p>
            )}
          </div>
        </div>

        {/* Rating & Cases */}
        <div className="text-right flex flex-col items-end justify-start">
          <div className="flex items-center space-x-1"></div>
        </div>
      </div>

      {/* Expertise & City */}
      <div className="text-sm text-gray-600 mb-4 space-y-1">
        <p>
          <span className="font-semibold">Specialization:</span>{' '}
          {lawyer.area_of_expertise[0] || 'N/A'}
        </p>
        <p>
          <span className="font-semibold">Location:</span> {city || 'N/A'}
        </p>
      </div>

      {/* Contact Actions */}
      {lawyer.is_premium ? (
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
      ) : (
        ''
      )}
    </div>
  );
}
