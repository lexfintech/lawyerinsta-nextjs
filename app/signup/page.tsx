'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow'
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
  const router = useRouter();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCityCheckboxChange = (city: string) => {
    setFormData((prev: { city: string[]; }) => {
      const exists = prev.city.includes(city);
      const updatedCities = exists
        ? prev.city.filter((c: string) => c !== city)
        : [...prev.city, city];
      return { ...prev, city: updatedCities };
    });
  };

  const validate = () => {
    const newErrors: any = {};
    const requiredFields = ['first_Name', 'last_Name', 'email', 'mobile_Number', 'enrollment_id', 'password_hash', 'confirmPassword'];

    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) newErrors[field] = `${field} is required.`;
    });

    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';
    if (!/^\d{10}$/.test(formData.mobile_Number)) newErrors.mobile_Number = 'Mobile number must be 10 digits.';
    if (formData.password_hash.length < 6) newErrors.password_hash = 'Password must be at least 6 characters.';
    if (formData.confirmPassword !== formData.password_hash) newErrors.confirmPassword = 'Passwords do not match.';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms.';
    if (formData.city.length === 0) newErrors.city = 'Select at least one city.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (validate()) {
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
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    } else {
      toast.error(data.message || 'Registration failed');
      console.error('🚫 Registration failed:', data);
      setErrors({ api: data.message || 'Registration failed' });
    }
  } else {
    console.warn('🚫 Validation failed');
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black">Register as a Lawyer</h2>
          <p className="mt-2 text-gray-600">Join India's largest lawyer directory</p>
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
                    value={formData[field]}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Shift'];
                      const isLetter = /^[a-zA-Z]$/.test(e.key);
                      if (!isLetter && !allowedKeys.includes(e.key)) e.preventDefault();
                    }}
                    className="input-style"
                    placeholder={field === 'first_Name' ? 'First name' : 'Last name'}
                  />
                  {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                </div>
              ))}
            </div>

            {[
              { name: 'enrollment_id', label: 'Enrollment ID *', type: 'text' },
              { name: 'email', label: 'Email Address *', type: 'email' },
              { name: 'mobile_Number', label: 'Mobile Number *', type: 'text' },
            ].map(({ name, label, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  className="input-style"
                  placeholder={`Enter your ${label.replace('*', '').trim()}`}
                />
                {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Cities *</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                  className="w-full text-left input-style"
                >
                  {formData.city.length > 0
                    ? formData.city.join(', ')
                    : 'Select cities'}
                </button>
                {cityDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {cities.map((city) => (
                      <label key={city} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mr-2"
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

            {[{ name: 'password_hash', label: 'Password *', show: showPassword, toggle: setShowPassword },
              { name: 'confirmPassword', label: 'Confirm Password *', show: showConfirmPassword, toggle: setShowConfirmPassword }
            ].map(({ name, label, show, toggle }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <div className="relative">
                  <input
                    name={name}
                    type={show ? 'text' : 'password'}
                    value={formData[name]}
                    onChange={handleChange}
                    className="input-style pr-12"
                    placeholder={`Enter ${label.replace('*', '').trim()}`}
                  />
                  <button type="button" onClick={() => toggle(!show)} className="eye-toggle">
                    {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
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
              <label htmlFor="termsAccepted" className="ml-2 text-sm text-gray-700">
                I agree to the{' '}
                <Link href="/terms" className="text-[#D6A767] hover:text-[#C19653]">Terms of Service</Link>{' '}and{' '}
                <Link href="/privacy" className="text-[#D6A767] hover:text-[#C19653]">Privacy Policy</Link>
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>
            )}

            <button type="submit" className="btn-primary w-full">Register as Lawyer</button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-[#D6A767] hover:text-[#C19653] font-semibold">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
