'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Info } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import Select from 'react-select';

const cities = [
  'Delhi',
  'Bengaluru',
  'Ahmedabad',
  'Chennai',
  'Pune',
  'Gurugram',
  'Kochi',
].map((city) => ({ value: city, label: city }));

const specializations = [
  'Admiralty Law',
  'Animal Law',
  'Arbitration Law',
  'Armed Force Law',
  'Art Law',
  'Artificial Intelligence',
  'Asset Management',
  'Aviation Law',
  'Banking Law',
  'Bankruptcy & Insolvency (IBC)',
  'Business Law',
  'Capital Markets',
  'Civil Litigation',
  'Commercial Litigation',
  'Company Law',
  'Competition & Anti-trust Law',
  'Constitutional Law',
  'Consumer Law',
  'Contracts',
  'Conveyance',
  'Copyright Law',
  'Corporate Law',
  'Corporate Secretarial',
  'Criminal Law',
  'Cross Border Transaction',
  'Customs',
  'Cyber Law',
  'Data Privacy & Protection',
  'Debt Recovery',
  'Dispute Resolution',
  'Divorce',
  "Director's Disputes",
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
].map((item) => ({ value: item, label: item }));

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
    area_of_expertise: [] as string[],
  });

  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;
    if (name === 'enrollment_id') {
      processedValue = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue,
    }));
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
    if (formData.area_of_expertise.length === 0)
      newErrors.area_of_expertise = 'Select at least one expertise.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (isLoading) return;
    if (validate()) {
      setIsLoading(true);
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful! Redirecting...');
        setTimeout(() => router.push('/profile'), 1500);
      } else {
        toast.error(data.message || 'Registration failed');
        setErrors({ api: data.message || 'Registration failed' });
      }
      setIsLoading(false);
    } else {
      toast.error('Please fix the errors before submitting.');
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
                    value={formData[field as keyof typeof formData] as string}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
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

            {['enrollment_id', 'email', 'mobile_Number'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field === 'enrollment_id'
                    ? 'Enrollment Number *'
                    : field === 'email'
                      ? 'Email *'
                      : 'Mobile Number *'}
                </label>
                <input
                  name={field}
                  type="text"
                  value={formData[field as keyof typeof formData] as string}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder={`Enter your ${field.replace('_', ' ')}`}
                />
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cities *
              </label>
              <Select
                isMulti
                name="city"
                options={cities}
                className="basic-multi-select"
                classNamePrefix="select"
                value={cities.filter((option) =>
                  formData.city.includes(option.value),
                )}
                onChange={(selectedOptions) => {
                  setFormData((prev) => ({
                    ...prev,
                    city: selectedOptions.map((option) => option.value),
                  }));
                }}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Areas of Expertise *
              </label>
              <Select
                isMulti
                name="area_of_expertise"
                options={specializations}
                className="basic-multi-select"
                classNamePrefix="select"
                value={specializations.filter((option) =>
                  formData.area_of_expertise?.includes(option.value),
                )}
                onChange={(selectedOptions) => {
                  setFormData((prev) => ({
                    ...prev,
                    area_of_expertise: selectedOptions.map(
                      (option) => option.value,
                    ),
                  }));
                }}
              />
              {errors.area_of_expertise && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.area_of_expertise}
                </p>
              )}
            </div>

            {[
              {
                name: 'password_hash',
                label: 'Password *',
                visible: showPassword,
                setVisible: setShowPassword,
              },
              {
                name: 'confirmPassword',
                label: 'Confirm Password *',
                visible: showConfirmPassword,
                setVisible: setShowConfirmPassword,
              },
            ].map(({ name, label, visible, setVisible }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <div className="relative">
                  <input
                    name={name}
                    type={visible ? 'text' : 'password'}
                    value={formData[name as keyof typeof formData] as string}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={`Enter ${label}`}
                  />
                  <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                    className="absolute right-3 top-2"
                  >
                    {visible ? <EyeOff size={18} /> : <Eye size={18} />}
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
                className="h-4 w-4 text-[#D6A767] border-gray-300 rounded"
              />
              <label
                htmlFor="termsAccepted"
                className="ml-2 text-sm text-gray-700"
              >
                I agree to the{' '}
                <Link href="/terms" className="text-[#D6A767] underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#D6A767] underline">
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
              className="w-full py-3 px-4 bg-[#D6A767] text-white rounded-md"
            >
              {isLoading ? 'Registering...' : 'Register as Lawyer'}
            </button>
          </form>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
