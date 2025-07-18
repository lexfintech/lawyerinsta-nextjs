'use client';

import { useEffect, useState } from 'react';
import { User, Star, Crown, Briefcase, GraduationCap, Edit3, Save, X, VideoIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import Profile from  '../../../public/assets/images/profile.png';
import Cover from '../../../public/assets/images/cover.png';
import Image from 'next/image';
import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';


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

const calculateExperience = (startYear?: number): number | undefined=> {
  if (!startYear || isNaN(startYear)) return 0;
  const currentYear = new Date().getFullYear();
  if (startYear > currentYear) return 0; 
  if (startYear < currentYear) return currentYear - startYear; 
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

  const displayExpertise =
    lawyerData.area_of_expertise
      ?.map((e: string) => getLabel(expertiseOptions, e))
      .join(', ') || 'Not specified';

  const displayCities = lawyerData.city?.join(', ') || 'Not specified';
  const displayLanguages = lawyerData.languages?.join(', ') || 'Not specified';

  const displayedPracticeStartYear = getYearFromEnrollment(
    lawyerData.enrollment_id,
  );

  const displayExperience = calculateExperience(displayedPracticeStartYear);

  return (
    
      <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 bg-gradient-to-r from-[#3C222F] to-[#D6A767]">
        <Image
          src={
            lawyerData.cover_picture_url || Cover
          }
          alt="Cover Image"
          width={1920}
          height={256}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Image
                  src={
                    lawyerData.profile_picture_url || Profile
                  }
                  alt="Profile Image"
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-black">
                      {lawyerData.first_Name} {lawyerData.last_Name}
                    </h1>
                  {lawyerData.is_premium && (
                    <Crown className="h-6 w-6 text-[#D6A767]" />
                  )}
                </div>
                <div className="flex flex-col items-start space-x-4 mb-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    {/* <Star className="h-5 w-5 text-yellow-400 fill-current" />
                     <div>{lawyerData.cases_completed} cases</div> */}
                    <span className='card-label'>{displayExpertise.split(',').slice(0, 3).join(', ')}</span>
                  </div>
                  {/* <div className='flex items-center space-x-1'>
                    <LinkedInLogoIcon className="h-5 w-5 text-[#0077B5] cursor-pointer" />
                    <InstagramLogoIcon className="h-5 w-5 text-[#E1306C] cursor-pointer" />
                    <TwitterLogoIcon className="h-5 w-5 text-[#1DA1F2] cursor-pointer" />
                  </div> */}
                </div>
              </div>
              <div className="flex-shrink-0">
                
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 px-4">
  {/* Top Row: About Me & Intro Video */}
  {lawyerData.is_premium ? (<div className="lg:col-span-3 flex flex-col lg:flex-row gap-6">
    {/* About Me - 65% */}
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full lg:w-[60%] flex flex-col justify-between">
      <h2 className="card-title">About Me</h2>
      <div className="mt-1 h-full">
        
          <p className="text-gray-700 leading-relaxed h-full">
            {lawyerData.bio || 'No bio available.'}
          </p>
      </div>
    </div>

    {/* Intro Video - 35% */}
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full lg:w-[40%] flex flex-col justify-between text-center">
      <h2 className="card-title text-xl font-semibold">
        <VideoIcon className="inline-block mr-2" /> Introduction Video
      </h2>
      <iframe
        className="w-full h-[200px] md:h-[200px] lg:h-[200px] rounded-md mt-4"
        src="https://www.youtube.com/embed/YanmpP6e69I"
        title="Dr Moksha Kalyanram Abhiramula | Specialised in Corporate, Tax, IPR, ADR, M &amp; A | TEDx Speaker"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  </div>) : (
    ""
  )}

  {/* Bottom Row: Three Cards */}
  <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
    <h2 className="card-title">
      <User /> Contact Information
    </h2>
     <div>
              <h3 className="card-label">Enrollment Number</h3>

                <p className="card-value">{lawyerData.enrollment_id}</p>
            </div>
            <div>
              <h3 className="card-label">Email Address</h3>
                <p className="card-value">{lawyerData.email}</p>
            </div>
            <div>
              <h3 className="card-label">Mobile Number</h3>
                <p className="card-value">{lawyerData.mobile_Number}</p>
            </div>
            <div>
              <h3 className="card-label">Office Address</h3>
                <p className="card-value">{lawyerData.address}</p>
            </div>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
    <h2 className="card-title">
      <Briefcase /> Professional Details
    </h2>
    <div>
              <h3 className="card-label">Other Practice Areas</h3>
                <p className="card-value font-semibold text-[#D6A767]">
                  {displayExpertise}
                </p>
            </div>
            <div>
              <h3 className="card-label">Practice Start Year</h3>
              <p className="card-value bg-gray-100 rounded-md p-2">
                { displayedPracticeStartYear || 'N/A'}
              </p>
            </div>
            <div>
              <h3 className="card-label">Years of Experience</h3>
              <p className="card-value bg-gray-100 rounded-md p-2">
                {displayExperience} years
              </p>
            </div>
            <div>
              <h3 className="card-label">Cop registered bar association</h3>
                <p className="card-value">{lawyerData.court_practice}</p>
            </div>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
    <h2 className="card-title">
      <GraduationCap /> Additional Information
    </h2>
     <div>
              <h3 className="card-label">Cities of Practice</h3>
                <p className="card-value">{displayCities}</p>
            </div>
            <div>
              <h3 className="card-label">Education</h3>
                <p className="card-value">{lawyerData.education}</p>
            </div>
            <div>
              <h3 className="card-label">Languages Known</h3>
                <p className="card-value">{displayLanguages}</p>
            </div>
  </div>
</div>



      </div>
      <style jsx global>{`
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1rem;
          background-color: #d6a767;
          color: white;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .btn-primary:hover {
          background-color: #c19653;
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1rem;
          background-color: #6b7280;
          color: white;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .btn-secondary:hover {
          background-color: #4b5563;
        }
        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: black;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .card-title svg {
          color: #d6a767;
        }
        .card-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: #4b5563;
          margin-bottom: 0.25rem;
        }
        .card-value {
          font-size: 1rem;
          color: #1f2937;
          min-height: 24px;
        }
        .input-field {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          transition:
            border-color 0.2s,
            box-shadow 0.2s;
        }
        .input-field:focus {
          outline: none;
          border-color: #d6a767;
          box-shadow: 0 0 0 2px rgba(214, 167, 103, 0.3);
        }
      `}</style>
    </div>



  );
}

