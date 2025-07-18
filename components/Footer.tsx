import Link from 'next/link';
import { Scale, Mail, Phone } from 'lucide-react';
import Logo from '../public/assets/images/logo.jpg';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#3C222F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 w-[70%]">
              <Image src={Logo} alt="LawyerInsta Logo" className="w-[80%]" />
            </Link>
            <p className="text-[#D6A767] text-opacity-80 text-md">
              India's Largest & Most Trusted Lawyer Directory. Making qualified
              legal help accessible, transparent, and instantaneous for every
              citizen of India.
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#D9A865]">
              Important Links
            </h3>
            <div className="space-y-2 text-md">
              <Link
                href="/find-a-lawyer"
                className="block text-[#D6A767] hover:text-[#D9A865] transition-colors"
              >
                Find a Lawyer
              </Link>
              <Link
                href="/signup"
                className="block text-[#D6A767] hover:text-[#D9A865] transition-colors"
              >
                Register as a Lawyer
              </Link>
              {/* <Link
                href="/careers"
                className="block text-[#D6A767] hover:text-[#D9A865] transition-colors"
              >
                Careers
              </Link>
              <Link
                href="/terms"
                className="block text-[#D6A767] hover:text-[#D9A865] transition-colors"
              >
                Terms of Service
              </Link> */}
              <Link
                href="/about"
                className="block text-[#D6A767] hover:text-[#D9A865] transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-[#D6A767] hover:text-[#D9A865] transition-colors"
              >
                Contact Us
              </Link>
              {/* <Link
                href="/privacy"
                className="block text-[#D6A767] hover:text-[#D9A865] transition-colors"
              >
                Privacy Policy
              </Link> */}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#D9A865]">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#D9A865]" />
                <a
                  href="mailto:Info@lawyerinsta.com"
                  className="text-[#D6A767] hover:text-[#D9A865] transition-colors"
                >
                  info@lawyerinsta.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#D6A767] border-opacity-30 mt-8 pt-8 text-center">
          <p className="text-[#D6A767] text-opacity-60 text-sm">
            © 2025 LawyerInsta | All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
