import Link from 'next/link';
import { MapPin } from 'lucide-react';

const cities = [
  { name: 'Delhi', lawyers: '25,000+' },
  { name: 'Mumbai', lawyers: '22,000+' },
  { name: 'Bangalore', lawyers: '18,000+' },
  { name: 'Kolkata', lawyers: '15,000+' },
  { name: 'Chennai', lawyers: '14,000+' },
  { name: 'Hyderabad', lawyers: '12,000+' },
  { name: 'Pune', lawyers: '10,000+' },
  { name: 'Ahmedabad', lawyers: '8,000+' },
];

export default function CitiesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Find a Lawyer by City</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified lawyers in major Indian cities. Choose your city to find 
            the best legal professionals near you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cities.map((city, index) => (
            <Link
              key={index}
              href={`/find-lawyer?city=${city.name.toLowerCase()}`}
              className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#D6A767] hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center space-y-4">
                <div className="bg-[#D6A767] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#D6A767] group-hover:bg-opacity-20 transition-colors">
                  <MapPin className="h-8 w-8 text-[#D6A767]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black group-hover:text-[#D6A767] transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{city.lawyers} Lawyers</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/find-lawyer" className="btn-primary">
            View All Cities
          </Link>
        </div>
      </div>
    </section>
  );
}