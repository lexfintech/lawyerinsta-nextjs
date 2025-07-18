'use client';

import { useEffect, useState, useRef } from 'react';
import {
  User,
  Edit3,
  Save,
  X,
  Camera,
  Crown,
  Briefcase,
  GraduationCap,
  VideoIcon,
} from 'lucide-react';
import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';


import Image from 'next/image';

// --- DATA LISTS ---
const availableLanguages = [
  'English',
  'Spanish',
  'Hindi',
  'Telugu',
  'French',
  'German',
  'Mandarin Chinese',
  'Arabic',
  'Bengali',
  'Russian',
  'Portuguese',
  'Japanese',
];

const availableCities = [
  'Delhi',
  'Bangalore',
  'Ahmedabad',
  'Chennai',
  'Pune',
  'Kochi',
  'Gurguram'
];

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

// --- TYPE DEFINITION ---
type LawyerData = {
  cases_completed?: number;
  court_practice?: string;
  first_Name?: string;
  last_Name?: string;
  email?: string;
  mobile_Number?: string;
  city?: string[];
  address?: string;
  profile_picture_url?: string;
  cover_picture_url?: string;
  area_of_expertise?: string[];
  is_premium?: boolean;
  rating?: number;
  totalCases?: number;
  successRate?: number;
  enrollment_id?: string;
  practice_start_year?: number;
  experience?: number;
  education?: string;
  languages?: string[];
  bio?: string;
};

// --- REUSABLE AUTOCOMPLETE COMPONENT ---
const AutocompleteMultiSelect = ({
  options,
  selected,
  onSelect,
  onRemove,
  placeholder = 'Type to search...',
}: {
  options: { value: string; label: string }[];
  selected: string[];
  onSelect: (value: string) => void;
  onRemove: (value: string) => void;
  placeholder?: string;
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = query
    ? options.filter(
        (option) =>
          option.label.toLowerCase().includes(query.toLowerCase()) &&
          !selected.includes(option.value),
      )
    : [];

  const handleSelect = (value: string) => {
    onSelect(value);
    setQuery('');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  const getLabel = (value: string) =>
    options.find((o) => o.value === value)?.label || value;

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md min-h-[42px] items-center">
        {(selected || []).map((value) => (
          <div
            key={value}
            className="bg-[#D6A767] text-white flex items-center gap-1.5 px-2 py-1 rounded-full text-sm"
          >
            <span>{getLabel(value)}</span>
            <button
              type="button"
              onClick={() => onRemove(value)}
              className="hover:bg-black/20 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={!selected || selected.length === 0 ? placeholder : ''}
          className="flex-grow bg-transparent focus:outline-none p-1"
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- MAIN LAWYER PROFILE COMPONENT ---
export default function LawyerProfile() {
  const [lawyerData, setLawyerData] = useState<LawyerData>({
    court_practice: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<LawyerData>({ court_practice: '' });

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


  const handleEdit = () => {
    const convertToArray = (fieldData: any): string[] =>
      Array.isArray(fieldData)
        ? fieldData
        : fieldData
          ? String(fieldData)
              .split(',')
              .map((item) => item.trim())
          : [];

    setEditData({
      ...lawyerData,
      languages: convertToArray(lawyerData.languages),
      city: convertToArray(lawyerData.city),
      area_of_expertise: convertToArray(lawyerData.area_of_expertise),
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    const derivedStartYear = getYearFromEnrollment(editData.enrollment_id);
    const calculatedExperience = calculateExperience(derivedStartYear);

    const finalData = {
      ...editData,
      practice_start_year: derivedStartYear,
      experience: calculatedExperience,
    };

    setLawyerData(finalData);

    const response = fetch('/api/lawyer', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData),
    });

    response
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setLawyerData(data.data);
      })
      .catch((error) => console.error('Error updating lawyer data:', error));

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(lawyerData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddItem = (field: keyof LawyerData, value: string) => {
    setEditData((prev) => {
      const currentItems = (prev[field] as string[]) || [];
      if (!currentItems.includes(value)) {
        return { ...prev, [field]: [...currentItems, value] };
      }
      return prev;
    });
  };

  const handleRemoveItem = (field: keyof LawyerData, value: string) => {
    setEditData((prev) => {
      const currentItems = (prev[field] as string[]) || [];
      return {
        ...prev,
        [field]: currentItems.filter((item) => item !== value),
      };
    });
  };

  const handleImageUpload = (type: 'profile' | 'cover') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          if (type === 'profile') {
            setEditData((prev) => ({ ...prev, profile_picture_url: imageUrl }));
          } else {
            setEditData((prev) => ({ ...prev, cover_picture_url: imageUrl }));
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  useEffect(() => {
    const response = fetch('/api/lawyer', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    response
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setLawyerData(data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching lawyer data:', error);
      });
  }, []);

  useEffect(() => {
    if (isEditing) {
      const derivedYear = getYearFromEnrollment(editData.enrollment_id);
      const calculatedExp = calculateExperience(derivedYear);
      if (
        derivedYear !== editData.practice_start_year ||
        calculatedExp !== editData.experience
      ) {
        setEditData((prev) => ({
          ...prev,
          practice_start_year: derivedYear,
          experience: calculatedExp,
        }));
      }
    }
  }, [editData.enrollment_id, isEditing]);

  const languageOptions = availableLanguages.map((l) => ({
    value: l,
    label: l,
  }));
  const cityOptions = availableCities.map((c) => ({ value: c, label: c }));
  const getLabel = (
    options: { value: string; label: string }[],
    value: string,
  ) => options.find((o) => o.value === value)?.label || value;

  const displayExpertise =
    lawyerData.area_of_expertise
      ?.map((e) => getLabel(expertiseOptions, e))
      .join(', ') || 'Not specified';
  const displayCities = lawyerData.city?.join(', ') || 'Not specified';
  const displayLanguages = lawyerData.languages?.join(', ') || 'Not specified';
  const displayedPracticeStartYear = getYearFromEnrollment(
    lawyerData.enrollment_id,
  );
  const displayExperience = calculateExperience(displayedPracticeStartYear);

    const slideshowImages = [
    '/assets/images/slide1.jpg',
    '/assets/images/slide2.jpg',
    '/assets/images/slide3.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 bg-gradient-to-r from-[#3C222F] to-[#D6A767]">
      
          <img
          src={
            isEditing
              ? editData.cover_picture_url
              : lawyerData.cover_picture_url 
          }
          alt="Cover"
          className="w-full h-full object-cover"
        />

        {isEditing && (
          <button
            onClick={() => handleImageUpload('cover')}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
          >
            <Camera className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                 <img
                  src={
                    isEditing
                      ? editData.profile_picture_url
                      : lawyerData.profile_picture_url 
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <button
                    onClick={() => handleImageUpload('profile')}
                    className="absolute bottom-2 right-2 bg-[#D6A767] text-white p-2 rounded-full hover:bg-[#C19653]"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {isEditing ? (
                    <div className="flex space-x-2 flex-wrap">
                      <input
                        value={editData.first_Name || ''}
                        onChange={(e) =>
                          handleInputChange('first_Name', e.target.value)
                        }
                        className="text-2xl font-bold border-b-2 border-gray-300 focus:border-[#D6A767] focus:outline-none bg-transparent"
                        placeholder="First Name"
                      />
                      <input
                        value={editData.last_Name || ''}
                        onChange={(e) =>
                          handleInputChange('last_Name', e.target.value)
                        }
                        className="text-2xl font-bold border-b-2 border-gray-300 focus:border-[#D6A767] focus:outline-none bg-transparent"
                        placeholder="Last Name"
                      />
                    </div>
                  ) : (
                    <h1 className="text-3xl font-bold text-black">
                      {lawyerData.first_Name} {lawyerData.last_Name}
                    </h1>
                  )}
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
                {isEditing ? (
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="btn-primary">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </button>
                    <button onClick={handleCancel} className="btn-secondary">
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button onClick={handleEdit} className="btn-primary">
                    <Edit3 className="h-4 w-4 mr-1" />
                    Update Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 px-4">
        <div className='lg:col-span-3'>
                <div className="bg-white rounded-2xl shadow-lg p-6 w-full lg:w-[100%] flex flex-col justify-between">
      <h2 className="card-title">About Me</h2>
      <div className="mt-1 h-full">
        {isEditing ? (
         <>
           <textarea
            name="bio"
            value={editData.bio || ''}
            onChange={(e) =>
              handleInputChange(e.target.name, e.target.value)
            }
            className="input-field w-full h-[90%] resize-none"
            rows={5}
            placeholder="Write a brief bio about yourself..."
            maxLength={500}
          />
          <p className="text-sm text-gray-500 mt-2">
  {editData.bio?.length || 0}/500 characters
</p>
         </>
        ) : (
          <p className="text-gray-700 leading-relaxed h-full">
            {lawyerData.bio || "No bio available..."}
          </p>
        )}
      </div>
    </div>
        </div>
  {/* Top Row: About Me & Intro Video */}
   {lawyerData.is_premium ? (
            <div className="lg:col-span-3 flex flex-col lg:flex-row gap-6">
              {/* About Me - 65% */}
              <div className="relative w-full h-64 overflow-hidden rounded-xl">
                <Image
                  src={slideshowImages[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  layout="fill"
                  objectFit="fit"
                  className="transition-opacity duration-700 ease-in-out"
                />

                {/* Navigation Buttons */}
                <div className="absolute inset-0 flex justify-between items-center px-4">
                  <button
                    onClick={() =>
                      setCurrentSlide((prev) =>
                        prev === 0 ? slideshowImages.length - 1 : prev - 1,
                      )
                    }
                    className="bg-black bg-opacity-50 text-white px-3 py-2 rounded-full hover:bg-opacity-70"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() =>
                      setCurrentSlide(
                        (prev) => (prev + 1) % slideshowImages.length,
                      )
                    }
                    className="bg-black bg-opacity-50 text-white px-3 py-2 rounded-full hover:bg-opacity-70"
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* Intro Video - 35% */}
              <iframe
                className="w-full h-[200px] md:h-[200px] lg:h-[250px] rounded-md mt-1"
                src="https://www.youtube.com/embed/hJdlhSy5bi0"
                title="The RajaSaab Telugu Teaser | Prabhas | Maruthi | Thaman | TG Vishwa Prasad | Dec 5 2025"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            ''
          )}

  {/* Bottom Row: Three Cards */}
  <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
    <h2 className="card-title">
      <User /> Contact Information
    </h2>
            <div>
              <h3 className="card-label">Email Address</h3>
              {isEditing ? (
                <input
                  name="email"
                  type="email"
                  value={editData.email || ''}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="input-field"
                />
              ) : (
                <p className="card-value">{lawyerData.email}</p>
              )}
            </div>
            <div>
              <h3 className="card-label">Mobile Number</h3>
              {isEditing ? (
                <input
                  name="mobile_Number"
                  type="tel"
                  value={editData.mobile_Number || ''}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="input-field"
                />
              ) : (
                <p className="card-value">{lawyerData.mobile_Number}</p>
              )}
            </div>
            <div>
              <h3 className="card-label">Office Address</h3>
              {isEditing ? (
                <textarea
                  name="address"
                  value={editData.address || ''}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="input-field"
                  rows={3}
                  placeholder="Enter your office address..."
                  maxLength={250}
                />
              ) : (
                <p className="card-value">{lawyerData.address}</p>
              )}
            </div>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
    <h2 className="card-title">
      <Briefcase /> Professional Details
    </h2>
    <div>
              <h3 className="card-label">Enrollment Number</h3>
              {isEditing ? (
                <input
                  name="enrollment_id"
                  value={editData.enrollment_id || ''}
                  readOnly
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="input-field bg-gray-100 cursor-not-allowed"
                />
              ) : (
                <p className="card-value">{lawyerData.enrollment_id}</p>
              )}
            </div>
    <div>
              <h3 className="card-label">Other Practice Areas</h3>
              {isEditing ? (
                <AutocompleteMultiSelect
                  options={expertiseOptions}
                  selected={editData.area_of_expertise || []}
                  onSelect={(value) =>
                    handleAddItem('area_of_expertise', value)
                  }
                  onRemove={(value) =>
                    handleRemoveItem('area_of_expertise', value)
                  }
                  placeholder="Add expertise..."
                />
              ) : (
                <p className="card-value font-semibold text-[#D6A767]">
                  {displayExpertise}
                </p>
              )}
            </div>
            {/* <div>
              <h3 className="card-label">Practice Start Year</h3>
              <p className="card-value bg-gray-100 rounded-md p-2">
                {isEditing
                  ? editData.practice_start_year || 'N/A'
                  : displayedPracticeStartYear || 'N/A'}
              </p>
            </div> */}
            <div>
              <h3 className="card-label">Years of Experience</h3>
              <p className="card-value bg-gray-100 rounded-md p-2">
                20+ years
              </p>
            </div>
            <div>
              <h3 className="card-label">Cop registered bar association</h3>
              {isEditing ? (
                <input
                  name="court_practice"
                  value={editData.court_practice || ''}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="input-field"
                />
              ) : (
                <p className="card-value">{lawyerData.court_practice}</p>
              )}
            </div>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
    <h2 className="card-title">
      <GraduationCap /> Additional Information
    </h2>
     <div>
              <h3 className="card-label">Cities of Practice</h3>
              {isEditing ? (
                <AutocompleteMultiSelect
                  options={cityOptions}
                  selected={editData.city || []}
                  onSelect={(value) => handleAddItem('city', value)}
                  onRemove={(value) => handleRemoveItem('city', value)}
                  placeholder="Add a city..."
                />
              ) : (
                <p className="card-value">{displayCities}</p>
              )}
            </div>
            <div>
              <h3 className="card-label">Education</h3>
              {isEditing ? (
                <input
                  name="education"
                  value={editData.education || ''}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="input-field"
                />
              ) : (
                <p className="card-value">{lawyerData.education}</p>
              )}
            </div>
            <div>
              <h3 className="card-label">Languages Known</h3>
              {isEditing ? (
                <AutocompleteMultiSelect
                  options={languageOptions}
                  selected={editData.languages || []}
                  onSelect={(value) => handleAddItem('languages', value)}
                  onRemove={(value) => handleRemoveItem('languages', value)}
                  placeholder="Add a language..."
                />
              ) : (
                <p className="card-value">{displayLanguages}</p>
              )}
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
