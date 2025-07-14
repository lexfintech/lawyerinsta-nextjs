'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Info } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';

const cities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
  'Pune',
  'Jaipur',
  'Lucknow',
];

export default function SignUp() {
  const [formData, setFormData] = useState({
    first_Name: '',
    last_Name: '',
    email: '',
    mobile_Number: '',
    enrollment_id: '',
    password_hash: '',
    confirmPassword: '',
    termsAccepted: false,
    city: [] as string[],
  });

  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    let processedValue = value;

    if (name === 'enrollment_id') {
      processedValue = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    }

    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue,
    }));
  };

  const handleCityCheckboxChange = (city: string) => {
    // FIX: Removed incorrect type annotation on 'prev'. TypeScript now correctly infers the full formData type.
    setFormData((prev) => {
      const exists = prev.city.includes(city);
      const updatedCities = exists
        ? prev.city.filter((c: string) => c !== city)
        : [...prev.city, city];
      return { ...prev, city: updatedCities };
    });
  };

  const validate = () => {
    const newErrors: any = {};
    const requiredFields = [
      'first_Name',
      'last_Name',
      'email',
      'mobile_Number',
      'enrollment_id',
      'password_hash',
      'confirmPassword',
    ];

    requiredFields.forEach((field) => {
      if (!(formData[field as keyof typeof formData] as string)?.trim()) {
        newErrors[field] = 'This field is required.';
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid.';
    if (formData.mobile_Number && !/^\d{10}$/.test(formData.mobile_Number))
      newErrors.mobile_Number = 'Mobile number must be 10 digits.';
    if (formData.password_hash.length < 6)
      newErrors.password_hash = 'Password must be at least 6 characters.';
    if (formData.confirmPassword !== formData.password_hash)
      newErrors.confirmPassword = 'Passwords do not match.';
    if (!formData.termsAccepted)
      newErrors.termsAccepted = 'You must accept the terms.';
    if (formData.city.length === 0)
      newErrors.city = 'Select at least one city.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Reset errors
    if (isLoading) return; // Prevent multiple submissions
    if (validate()) {
      setIsLoading(true);
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful! Redirecting...');
        setIsLoading(false);
        setTimeout(() => {
          router.push('/profile');
        }, 1500);
      } else {
        toast.error(data.message || 'Registration failed');
        setIsLoading(false);
        setErrors({ api: data.message || 'Registration failed' });
      }
    } else {
      console.warn('🚫 Validation failed');
      toast.error('Please fix the errors before submitting.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black">
            Register as a Lawyer
          </h2>
          <p className="mt-2 text-gray-600">
            Join India's largest lawyer directory
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {['first_Name', 'last_Name'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field === 'first_Name' ? 'First Name *' : 'Last Name *'}
                  </label>
                  <input
                    name={field}
                    type="text"
                    // FIX: Assert value as string to resolve type conflict.
                    value={formData[field as keyof typeof formData] as string}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        'Backspace',
                        'Tab',
                        'ArrowLeft',
                        'ArrowRight',
                        'Delete',
                        'Shift',
                        ' ',
                      ];
                      const isLetter = /^[a-zA-Z]$/.test(e.key);
                      if (!isLetter && !allowedKeys.includes(e.key))
                        e.preventDefault();
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#D6A767] focus:border-[#D6A767]"
                    placeholder={
                      field === 'first_Name' ? 'First name' : 'Last name'
                    }
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>

            {[
              {
                name: 'enrollment_id',
                label: 'Enrollment Number *',
                type: 'text',
              },
              { name: 'email', label: 'Email Address *', type: 'email' },
              { name: 'mobile_Number', label: 'Mobile Number *', type: 'text' },
            ].map(({ name, label, type }) => (
              <div key={name}>
                <div className="flex items-center space-x-1.5 mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  {name === 'enrollment_id' && (
                    <div className="relative group flex items-center">
                      <Info className="h-4 w-4 text-gray-400" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        This will be your username for login.
                      </div>
                    </div>
                  )}
                </div>
                <input
                  name={name}
                  type={type}
                  // FIX: Assert value as string to resolve type conflict.
                  value={formData[name as keyof typeof formData] as string}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#D6A767] focus:border-[#D6A767]"
                  placeholder={`Enter your ${label.replace('*', '').trim()}`}
                />
                {errors[name] && (
                  <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Cities *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                  className="w-full text-left px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white"
                >
                  {formData.city.length > 0
                    ? formData.city.join(', ')
                    : 'Select cities'}
                </button>
                {cityDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {cities.map((city) => (
                      <label
                        key={city}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="mr-2 h-4 w-4 text-[#D6A767] focus:ring-[#C19653] border-gray-300 rounded"
                          value={city}
                          checked={formData.city.includes(city)}
                          onChange={() => handleCityCheckboxChange(city)}
                        />
                        {city}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            {[
              {
                name: 'password_hash',
                label: 'Password *',
                show: showPassword,
                toggle: setShowPassword,
              },
              {
                name: 'confirmPassword',
                label: 'Confirm Password *',
                show: showConfirmPassword,
                toggle: setShowConfirmPassword,
              },
            ].map(({ name, label, show, toggle }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <div className="relative">
                  <input
                    name={name}
                    type={show ? 'text' : 'password'}
                    // FIX: Assert value as string to resolve type conflict.
                    value={formData[name as keyof typeof formData] as string}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#D6A767] focus:border-[#D6A767] pr-12"
                    placeholder={`Enter ${label.replace('*', '').trim()}`}
                  />
                  <button
                    type="button"
                    onClick={() => toggle(!show)}
                    className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500"
                  >
                    {show ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors[name] && (
                  <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                )}
              </div>
            ))}

            <div className="flex items-center">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="h-4 w-4 text-[#D6A767] focus:ring-[#D6A767] border-gray-300 rounded"
              />
              <label
                htmlFor="termsAccepted"
                className="ml-2 text-sm text-gray-700"
              >
                I agree to the{' '}
                <Link
                  href="/terms"
                  className="text-[#D6A767] hover:text-[#C19653]"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="text-[#D6A767] hover:text-[#C19653]"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-red-500 text-xs mt-1">
                {errors.termsAccepted}
              </p>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D6A767] hover:bg-[#C19653] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C19653]"
            >
              {isLoading ? 'Registering...' : 'Register as Lawyer'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[#D6A767] hover:text-[#C19653] font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
