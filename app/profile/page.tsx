'use client';

import { useEffect, useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  Calendar,
  Star,
  Edit3,
  Save,
  X,
  Camera,
  Crown,
  Briefcase,
  GraduationCap,
  Scale,
  ChevronDown,
} from 'lucide-react';
import { set } from 'mongoose';


// Predefined base lists for dropdowns
const availableLanguages = [
  'English', 'Spanish', 'Hindi', 'Telugu', 'French', 'German',
  'Mandarin Chinese', 'Arabic', 'Bengali', 'Russian', 'Portuguese', 'Japanese',
];

const availableCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
];

// CORRECTED: 'value' should be the raw data format, 'label' is for display.
const expertiseOptions = [
    { value: 'criminal_law', label: 'Criminal Law' },
    { value: 'corporate_law', label: 'Corporate Law' },
    { value: 'art_law', label: 'Art Law' },
    { value: 'animal_law', label: 'Animal Law' },
    { value: 'banking_&_finance_law', label: 'Banking & Finance Law' },
    { value: 'business_law', label: 'Business Law' },
    { value: 'cyber_law', label: 'Cyber Law' },
    { value: 'family_law', label: 'Family Law' },
    { value: 'property_law', label: 'Property Law' },
    { value: 'labor_law', label: 'Labor Law' },
];


type LawyerData = {
  cases_completed: number;
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
  courtPractice?: string;
  education?: string;
  languages?: string | string[];
  bio?: string;
};

export default function LawyerProfile() {
  const [lawyerData, setLawyerData] = useState<LawyerData>({
    cases_completed: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<LawyerData>({ cases_completed: 0 });
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isExpertiseDropdownOpen, setIsExpertiseDropdownOpen] = useState(false);

  const getYearFromEnrollment = (id: string | undefined): number | undefined => {
      if (!id || id.length < 4) return undefined;
      const potentialYear = id.slice(-4);
      if (!isNaN(Number(potentialYear))) {
          const year = parseInt(potentialYear, 10);
          if (year > 1950 && year <= new Date().getFullYear()) {
              return year;
          }
      }
      return undefined;
  };

  const calculateExperience = (startYear: number | undefined): number => {
    if (!startYear || isNaN(startYear)) return 0;
    const currentYear = new Date().getFullYear();
    const start = Number(startYear);
    if (start > currentYear) return 0;
    return currentYear - start;
  };

  const handleEdit = () => {
    // Ensure all multi-select fields are arrays for the edit state
    const languagesAsArray = Array.isArray(lawyerData.languages)
      ? lawyerData.languages
      : lawyerData.languages
      ? (lawyerData.languages as string).split(',').map(lang => lang.trim())
      : [];

    const cityAsArray = Array.isArray(lawyerData.city)
      ? lawyerData.city
      : lawyerData.city
      ? (lawyerData.city as unknown as string).split(',').map(c => c.trim())
      : [];
      
    const expertiseAsArray = Array.isArray(lawyerData.area_of_expertise)
      ? lawyerData.area_of_expertise
      : lawyerData.area_of_expertise
      ? (lawyerData.area_of_expertise as unknown as string).split(',').map(e => e.trim())
      : [];


    setEditData({ ...lawyerData, languages: languagesAsArray, city: cityAsArray, area_of_expertise: expertiseAsArray });
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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalData),
    });
    response
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setLawyerData(data.data);
        }
      })
      .catch((error) => {
        console.error('Error updating lawyer data:', error);
      });
    setIsEditing(false);
    setIsLangDropdownOpen(false);
    setIsCityDropdownOpen(false);
    setIsExpertiseDropdownOpen(false);
  };

  const handleCancel = () => {
    setEditData(lawyerData);
    setIsEditing(false);
    setIsLangDropdownOpen(false);
    setIsCityDropdownOpen(false);
    setIsExpertiseDropdownOpen(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLanguageChange = (language: string) => {
    const currentLanguages = (editData.languages as string[]) || [];
    const newLanguages = currentLanguages.includes(language)
      ? currentLanguages.filter((lang) => lang !== language)
      : [...currentLanguages, language];
    setEditData((prev) => ({
      ...prev,
      languages: newLanguages,
    }));
  };

  const handleCityChange = (city: string) => {
    const currentCities = editData.city || [];
    const newCities = currentCities.includes(city)
      ? currentCities.filter((c) => c !== city)
      : [...currentCities, city];
    setEditData((prev) => ({
      ...prev,
      city: newCities,
    }));
  };
  
  const handleExpertiseChange = (expertiseValue: string) => {
      const currentExpertise = editData.area_of_expertise || [];
      const newExpertise = currentExpertise.includes(expertiseValue)
        ? currentExpertise.filter((e) => e !== expertiseValue)
        : [...currentExpertise, expertiseValue];
      setEditData((prev) => ({
        ...prev,
        area_of_expertise: newExpertise,
      }));
  };

  useEffect(() => {
    const response = fetch('/api/lawyer');
    response
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setLawyerData(data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching lawyer data:', error);
      }
    );
  },[])
  
  useEffect(() => {
    if (isEditing) {
        const derivedYear = getYearFromEnrollment(editData.enrollment_id);
        const calculatedExp = calculateExperience(derivedYear);
        setEditData(prev => ({ 
            ...prev, 
            practice_start_year: derivedYear,
            experience: calculatedExp
        }));
    }
  }, [editData.enrollment_id, isEditing]);


  const handleImageUpload = (type: 'profile' | 'cover') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
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
  
  const allPossibleLanguages = isEditing ? Array.from(new Set([...availableLanguages, ...(editData.languages as string[] || [])])) : [];
  const allPossibleCities = isEditing ? Array.from(new Set([...availableCities, ...(editData.city || [])])) : [];

  const displayLanguages = Array.isArray(lawyerData.languages)
  ? lawyerData.languages.join(', ')
  : lawyerData.languages || '';

  const displayCities = Array.isArray(lawyerData.city)
  ? lawyerData.city.join(', ')
  : lawyerData.city || '';

  const getExpertiseLabel = (value: string) => {
    const option = expertiseOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  };
  
  const displayExpertise = Array.isArray(lawyerData.area_of_expertise)
    ? lawyerData.area_of_expertise.map(getExpertiseLabel).join(', ')
    : '';

  const displayedPracticeStartYear = getYearFromEnrollment(lawyerData.enrollment_id);
  const displayExperience = calculateExperience(displayedPracticeStartYear);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo Section */}
      <div className="relative h-64 bg-gradient-to-r from-[#3C222F] to-[#D6A767]">
        <img
          src={isEditing ? editData?.cover_picture_url : lawyerData?.cover_picture_url}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {isEditing && (
          <button
            onClick={() => handleImageUpload('cover')}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
          >
            <Camera className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={
                    isEditing ? editData?.profile_picture_url : lawyerData?.profile_picture_url
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <button
                    onClick={() => handleImageUpload('profile')}
                    className="absolute bottom-2 right-2 bg-[#D6A767] text-white p-2 rounded-full hover:bg-[#C19653] transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={editData?.first_Name || ''}
                        onChange={(e) =>
                          handleInputChange('first_Name', e.target.value)
                        }
                        className="text-2xl font-bold border-b-2 border-[#D6A767] focus:outline-none bg-transparent"
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        value={editData.last_Name || ''}
                        onChange={(e) =>
                          handleInputChange('last_Name', e.target.value)
                        }
                        className="text-2xl font-bold border-b-2 border-[#D6A767] focus:outline-none bg-transparent"
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

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    
                  </div>
                  <div className="text-gray-600">
                    {lawyerData.cases_completed} cases completed
                  </div>
                  
                </div>

                {isEditing ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsExpertiseDropdownOpen(!isExpertiseDropdownOpen)}
                      className="flex items-center justify-between w-full p-1 text-lg text-left text-[#D6A767] font-semibold border-b-2 border-[#D6A767] focus:outline-none bg-transparent"
                    >
                      <span className="truncate">
                        {editData.area_of_expertise && editData.area_of_expertise.length > 0
                          ? editData.area_of_expertise.map(getExpertiseLabel).join(', ')
                          : 'Select Areas of Expertise'}
                      </span>
                      <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isExpertiseDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isExpertiseDropdownOpen && (
                      <div className="absolute z-30 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {expertiseOptions.map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center w-full p-3 space-x-3 hover:bg-gray-100 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={(editData.area_of_expertise || []).includes(option.value)}
                              onChange={() => handleExpertiseChange(option.value)}
                              className="h-4 w-4 text-[#D6A767] border-gray-300 rounded focus:ring-[#C19653] cursor-pointer"
                            />
                            <span className="text-gray-700 font-normal">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-lg text-[#D6A767] font-semibold">
                    {displayExpertise}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex-shrink-0 ml-6">
                {isEditing ? (
                  <div className="flex flex-col">
                    <button
                      onClick={handleSave}
                      className="bg-[#D6A767] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#C19653] transition-colors flex items-center justify-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2 mt-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="bg-[#D6A767] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#C19653] transition-colors flex items-center space-x-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Update Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6 flex items-center space-x-2">
              <User className="h-5 w-5 text-[#D6A767]" />
              <span>Contact Information</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#D6A767]" />
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1 border-b border-gray-300 focus:border-[#D6A767] focus:outline-none"
                  />
                ) : (
                  <span className="text-gray-700">{lawyerData.email}</span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#D6A767]" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.mobile_Number || ''}
                    onChange={(e) => handleInputChange('mobile_Number', e.target.value)}
                    className="flex-1 border-b border-gray-300 focus:border-[#D6A767] focus:outline-none"
                  />
                ) : (
                  <span className="text-gray-700">{lawyerData.mobile_Number}</span>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#D6A767] mt-1" />
                {isEditing ? (
                    <div className="relative w-full">
                        <button
                        type="button"
                        onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                        className="flex items-center justify-between w-full p-1 border-b border-gray-300 focus:border-[#D6A767] focus:outline-none"
                        >
                        <span className="text-gray-700">
                            {editData.city && editData.city.length > 0
                            ? editData.city.join(', ')
                            : 'Select Cities'}
                        </span>
                        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isCityDropdownOpen && (
                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                            {allPossibleCities.map((city) => (
                            <label
                                key={city}
                                className="flex items-center w-full p-3 space-x-3 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                type="checkbox"
                                checked={(editData.city || []).includes(city)}
                                onChange={() => handleCityChange(city)}
                                className="h-4 w-4 text-[#D6A767] border-gray-300 rounded focus:ring-[#C19653] cursor-pointer"
                                />
                                <span className="text-gray-700">{city}</span>
                            </label>
                            ))}
                        </div>
                        )}
                    </div>
                ) : (
                    <span className="text-gray-700">{displayCities}</span>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-transparent mt-1" /> {/* Spacer */}
                {isEditing ? (
                  <textarea
                    value={editData.address || ''}
                    onChange={(e) =>
                      handleInputChange('address', e.target.value)
                    }
                    placeholder="Full Address"
                    className="flex-1 border-b border-gray-300 focus:border-[#D6A767] focus:outline-none resize-none"
                    rows={2}
                  />
                ) : (
                  <span className="text-gray-700">{lawyerData.address}</span>
                )}
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6 flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-[#D6A767]" />
              <span>Professional Details</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Scale className="h-5 w-5 text-[#D6A767]" />
                <div>
                  <span className="text-sm text-gray-500">Enrollment Number:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.enrollment_id || ''}
                      readOnly
                      onChange={(e) =>
                        handleInputChange('enrollment_id', e.target.value)
                      }
                      className="block w-full border-b border-gray-300 focus:border-[#D6A767] focus:outline-none cursor-not-allowed bg-gray-100"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {lawyerData.enrollment_id}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-[#D6A767]" />
                <div>
                    <span className="text-sm text-gray-500">Practice Start Year:</span>
                    {isEditing ? (
                        <input
                            type="number"
                            value={editData.practice_start_year || ''}
                            placeholder="Derived from Enrollment No."
                            readOnly
                            className="block w-full border-b border-gray-300 focus:border-[#D6A767] focus:outline-none bg-gray-100 cursor-not-allowed"
                        />
                    ) : (
                        <p className="text-gray-700 font-medium">
                            {displayedPracticeStartYear}
                        </p>
                    )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-[#D6A767]" />
                <div>
                  <span className="text-sm text-gray-500">Years of Experience:</span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.experience || 0}
                      readOnly
                      className="block w-full border-b border-gray-300 focus:border-[#D6A767] focus:outline-none bg-gray-100 cursor-not-allowed"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {displayExperience} years
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6 flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-[#D6A767]" />
              <span>Additional Information</span>
            </h2>

            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500">Education:</span>
                {isEditing ? (
                  <textarea
                    value={editData.education || ''}
                    onChange={(e) =>
                      handleInputChange('education', e.target.value)
                    }
                    className="block w-full mt-1 border-b border-gray-300 focus:border-[#D6A767] focus:outline-none resize-none"
                    rows={2}
                  />
                ) : (
                  <p className="text-gray-700 font-medium">
                    {lawyerData.education}
                  </p>
                )}
              </div>

              <div>
                <span className="text-sm text-gray-500">Languages:</span>
                {isEditing ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                      className="flex items-center justify-between w-full mt-1 p-2 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-[#D6A767]"
                    >
                      <span className="text-gray-700">
                        {editData.languages && (editData.languages as string[]).length > 0
                          ? (editData.languages as string[]).join(', ')
                          : 'Select Languages'}
                      </span>
                      <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isLangDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {allPossibleLanguages.map((lang) => (
                          <label
                            key={lang}
                            className="flex items-center w-full p-3 space-x-3 hover:bg-gray-100 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={(editData.languages as string[] || []).includes(lang)}
                              onChange={() => handleLanguageChange(lang)}
                              className="h-4 w-4 text-[#D6A767] border-gray-300 rounded focus:ring-[#C19653] cursor-pointer"
                            />
                            <span className="text-gray-700">{lang}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-700 font-medium">
                    {displayLanguages}
                  </p>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <Briefcase className="h-5 w-5 text-[#D6A767] mt-1" />
                <div>
                  <span className="text-sm text-gray-500">Court Practice:</span>
                  {isEditing ? (
                    <textarea
                      value={editData.courtPractice || ''}
                      onChange={(e) =>
                        handleInputChange('courtPractice', e.target.value)
                      }
                      className="block w-full border-b border-gray-300 focus:border-[#D6A767] focus:outline-none resize-none"
                      rows={2}
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {lawyerData.courtPractice}
                    </p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-black mb-6">About Me</h2>
          {isEditing ? (
            <textarea
              value={editData.bio || ''}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D6A767] focus:border-transparent resize-none"
              rows={4}
              placeholder="Tell clients about yourself, your experience, and your approach to law..."
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{lawyerData.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
}