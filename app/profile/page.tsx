'use client';

import { useState } from 'react';
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
} from 'lucide-react';

// Mock lawyer data
const initialLawyerData = {
  id: 1,
  firstName: 'Rajesh',
  lastName: 'Kumar',
  email: 'rajesh.kumar@example.com',
  phone: '+91 98765 43210',
  barNumber: 'BAR123456',
  specialization: 'Criminal Law',
  experience: 15,
  city: 'Delhi',
  address: '123 Legal Street, Connaught Place, New Delhi - 110001',
  bio: 'Experienced criminal lawyer with 15 years of practice. Specialized in handling complex criminal cases with a success rate of 85%. Committed to providing the best legal representation to my clients.',
  education: 'LLB from Delhi University, LLM from Jamia Millia Islamia',
  languages: 'Hindi, English, Punjabi',
  courtPractice: 'Delhi High Court, Supreme Court of India',
  consultationFee: '₹2,000',
  rating: 4.8,
  totalCases: 250,
  successRate: 85,
  isPremium: true,
  profileImage:
    'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400',
  coverImage:
    'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

export default function LawyerProfile() {
  const [lawyerData, setLawyerData] = useState(initialLawyerData);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(initialLawyerData);

  const handleEdit = () => {
    setEditData(lawyerData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setLawyerData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(lawyerData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (type: 'profile' | 'cover') => {
    // In a real app, this would handle file upload
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
            setEditData((prev) => ({ ...prev, profileImage: imageUrl }));
          } else {
            setEditData((prev) => ({ ...prev, coverImage: imageUrl }));
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo Section */}
      <div className="relative h-64 bg-gradient-to-r from-[#3C222F] to-[#D6A767]">
        <img
          src={isEditing ? editData.coverImage : lawyerData.coverImage}
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
                    isEditing ? editData.profileImage : lawyerData.profileImage
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
                        value={editData.firstName}
                        onChange={(e) =>
                          handleInputChange('firstName', e.target.value)
                        }
                        className="text-2xl font-bold border-b-2 border-[#D6A767] focus:outline-none bg-transparent"
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        value={editData.lastName}
                        onChange={(e) =>
                          handleInputChange('lastName', e.target.value)
                        }
                        className="text-2xl font-bold border-b-2 border-[#D6A767] focus:outline-none bg-transparent"
                        placeholder="Last Name"
                      />
                    </div>
                  ) : (
                    <h1 className="text-3xl font-bold text-black">
                      {lawyerData.firstName} {lawyerData.lastName}
                    </h1>
                  )}
                  {lawyerData.isPremium && (
                    <Crown className="h-6 w-6 text-[#D6A767]" />
                  )}
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{lawyerData.rating}</span>
                  </div>
                  <div className="text-gray-600">
                    {lawyerData.totalCases} cases completed
                  </div>
                  <div className="text-gray-600">
                    {lawyerData.successRate}% success rate
                  </div>
                </div>

                {isEditing ? (
                  <select
                    value={editData.specialization}
                    onChange={(e) =>
                      handleInputChange('specialization', e.target.value)
                    }
                    className="text-lg text-[#D6A767] font-semibold border-b-2 border-[#D6A767] focus:outline-none bg-transparent"
                  >
                    <option value="Criminal Law">Criminal Law</option>
                    <option value="Corporate Law">Corporate Law</option>
                    <option value="Art Law">Art Law</option>
                    <option value="Animal Law">Animal Law</option>
                    <option value="Banking & Finance Law">
                      Banking & Finance Law
                    </option>
                    <option value="Business Law">Business Law</option>
                    <option value="Cyber Law">Cyber Law</option>
                    <option value="Family Law">Family Law</option>
                    <option value="Property Law">Property Law</option>
                    <option value="Labor Law">Labor Law</option>
                  </select>
                ) : (
                  <p className="text-lg text-[#D6A767] font-semibold">
                    {lawyerData.specialization}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-[#D6A767] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#C19653] transition-colors flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center space-x-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </>
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
                    value={editData.email}
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
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="flex-1 border-b border-gray-300 focus:border-[#D6A767] focus:outline-none"
                  />
                ) : (
                  <span className="text-gray-700">{lawyerData.phone}</span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#D6A767]" />
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="flex-1 border-b border-gray-300 focus:border-[#D6A767] focus:outline-none"
                  />
                ) : (
                  <span className="text-gray-700">{lawyerData.city}</span>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#D6A767] mt-1" />
                {isEditing ? (
                  <textarea
                    value={editData.address}
                    onChange={(e) =>
                      handleInputChange('address', e.target.value)
                    }
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
                  <span className="text-sm text-gray-500">Bar Number:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.barNumber}
                      onChange={(e) =>
                        handleInputChange('barNumber', e.target.value)
                      }
                      className="block w-full border-b border-gray-300 focus:border-[#D6A767] focus:outline-none"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {lawyerData.barNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-[#D6A767]" />
                <div>
                  <span className="text-sm text-gray-500">Experience:</span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.experience}
                      onChange={(e) =>
                        handleInputChange('experience', e.target.value)
                      }
                      className="block w-full border-b border-gray-300 focus:border-[#D6A767] focus:outline-none"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {lawyerData.experience} years
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Award className="h-5 w-5 text-[#D6A767] mt-1" />
                <div>
                  <span className="text-sm text-gray-500">Court Practice:</span>
                  {isEditing ? (
                    <textarea
                      value={editData.courtPractice}
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

              <div className="flex items-center space-x-3">
                <span className="text-[#D6A767] font-bold">₹</span>
                <div>
                  <span className="text-sm text-gray-500">
                    Consultation Fee:
                  </span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.consultationFee}
                      onChange={(e) =>
                        handleInputChange('consultationFee', e.target.value)
                      }
                      className="block w-full border-b border-gray-300 focus:border-[#D6A767] focus:outline-none"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {lawyerData.consultationFee}
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
                    value={editData.education}
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
                  <input
                    type="text"
                    value={editData.languages}
                    onChange={(e) =>
                      handleInputChange('languages', e.target.value)
                    }
                    className="block w-full mt-1 border-b border-gray-300 focus:border-[#D6A767] focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-700 font-medium">
                    {lawyerData.languages}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-black mb-6">About Me</h2>
          {isEditing ? (
            <textarea
              value={editData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D6A767] focus:border-transparent resize-none"
              rows={4}
              placeholder="Tell clients about yourself, your experience, and your approach to law..."
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{lawyerData.bio}</p>
          )}
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-black mb-6">
            Professional Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-[#E6D0B1] rounded-lg">
              <div className="text-3xl font-bold text-[#D6A767] mb-2">
                {lawyerData.totalCases}
              </div>
              <div className="text-sm text-gray-600">Total Cases</div>
            </div>
            <div className="text-center p-4 bg-[#E6D0B1] rounded-lg">
              <div className="text-3xl font-bold text-[#D6A767] mb-2">
                {lawyerData.successRate}%
              </div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-[#E6D0B1] rounded-lg">
              <div className="text-3xl font-bold text-[#D6A767] mb-2">
                {lawyerData.rating}
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
