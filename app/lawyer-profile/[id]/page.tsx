'use client';

import { useEffect, useState } from 'react';
import { User, Star, Crown, Briefcase, GraduationCap } from 'lucide-react';
import { useParams } from 'next/navigation';

const expertiseOptions = [
  { value: 'Criminal Law', label: 'Criminal Law' },
  { value: 'Corporate Law', label: 'Corporate Law' },
  { value: 'Art Law', label: 'Art Law' },
  { value: 'Animal Law', label: 'Animal Law' },
  { value: 'Banking & Finance Law', label: 'Banking & Finance Law' },
  { value: 'Business Law', label: 'Business Law' },
  { value: 'Cyber Law', label: 'Cyber Law' },
  { value: 'Family Law', label: 'Family Law' },
  { value: 'Property Law', label: 'Property Law' },
  { value: 'Labor Law', label: 'Labor Law' },
];

const getLabel = (options: { value: string; label: string }[], value: string) =>
  options.find((o) => o.value === value)?.label || value;

const calculateExperience = (startYear?: number): number => {
  if (!startYear || isNaN(startYear)) return 0;
  return new Date().getFullYear() - startYear;
};

export default function LawyerProfileView() {
  const params = useParams();
  const enrollmentId = params?.id;
  const [lawyerData, setLawyerData] = useState<any>({});

  useEffect(() => {
    if (!enrollmentId) return;
    fetch(`/api/get-profile/${enrollmentId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.lawyer) setLawyerData(data.lawyer);
      })
      .catch((err) => console.error('Failed to load lawyer data:', err));
  }, [enrollmentId]);

  const displayExpertise =
    lawyerData.area_of_expertise
      ?.map((e: string) => getLabel(expertiseOptions, e))
      .join(', ') || 'Not specified';

  const displayCities = lawyerData.city?.join(', ') || 'Not specified';
  const displayLanguages = lawyerData.languages?.join(', ') || 'Not specified';
  const displayExperience = calculateExperience(lawyerData.practice_start_year);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Banner */}
      <div className="relative h-64 bg-gradient-to-r from-[#3C222F] to-[#D6A767]">
        <img
          src={lawyerData.cover_picture_url || ''}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="relative -mt-20 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-6">
              <img
                src={lawyerData.profile_picture_url || '/default-profile.png'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-black">
                    {lawyerData.first_Name} {lawyerData.last_Name}
                  </h1>
                  {lawyerData.is_premium && (
                    <Crown className="h-6 w-6 text-[#D6A767]" />
                  )}
                </div>
                <div className="flex items-center space-x-4 mb-2 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <div>{lawyerData.cases_completed || 0} cases</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-[#D6A767] flex items-center mb-4 gap-2">
              <User className="text-[#D6A767]" /> Contact Information
            </h2>
            <p className="mb-2">
              <span className="font-semibold">Enrollment Number</span>
              <br />
              {lawyerData.enrollment_id || 'N/A'}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email Address</span>
              <br />
              {lawyerData.email || 'N/A'}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Mobile Number</span>
              <br />
              {lawyerData.mobile_Number || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Full Address</span>
              <br />
              {lawyerData.address || 'N/A'}
            </p>
          </div>

          {/* Professional Details */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-[#D6A767] flex items-center mb-4 gap-2">
              <Briefcase className="text-[#D6A767]" /> Professional Details
            </h2>
            <p className="mb-2">
              <span className="font-semibold">Area of Expertise</span>
              <br />
              <span className="text-gray-800 font-medium">
                {displayExpertise}
              </span>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Practice Start Year</span>
              <br />
              {lawyerData.practice_start_year || 'N/A'}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Years of Experience</span>
              <br />
              {displayExperience} years
            </p>
            <p>
              <span className="font-semibold">Court of Practice</span>
              <br />
              {lawyerData.court_practice || 'N/A'}
            </p>
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-[#D6A767] flex items-center mb-4 gap-2">
              <GraduationCap className="text-[#D6A767]" /> Additional
              Information
            </h2>
            <p className="mb-2">
              <span className="font-semibold">Cities of Practice</span>
              <br />
              {displayCities}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Education</span>
              <br />
              {lawyerData.education || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Languages Spoken</span>
              <br />
              {displayLanguages}
            </p>
          </div>
        </div>

        {/* About Me Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-[#D6A767] mb-2">
            About Me
          </h2>
          <p className="text-gray-700">
            {lawyerData.bio || 'No biography available.'}
          </p>
        </div>
      </div>
    </div>
  );
}
