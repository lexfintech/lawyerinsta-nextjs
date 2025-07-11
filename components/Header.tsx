'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Scale } from 'lucide-react';
import Image from 'next/image';
import Logo from '../public/assets/images/logo.jpg';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-[#3C222F] shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[fit-content] py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 w-[12%]">
            <Image src={Logo} alt="LawyerInsta Logo" className="w-[70%]" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-xl">
            <Link
              href="/"
              className="text-[#D6A767] hover:text-[#D9A865] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-[#D6A767] hover:text-[#D9A865] transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-[#D6A767] hover:text-[#D9A865] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/find-lawyer"
              className="text-[#D6A767] hover:text-[#D9A865] transition-colors"
            >
              Find a Lawyer
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 text-xl">
            <Link
              href="/login"
              className="text-[#D6A767] hover:text-[#D9A865] transition-colors"
            >
              Login
            </Link>
            <Link href="/signup" className="btn-primary">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-[#D6A767] hover:text-[#D9A865]"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#D6A767] border-opacity-30">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-[#D6A767] hover:text-[#D9A865] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-[#D6A767] hover:text-[#D9A865] transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-[#D6A767] hover:text-[#D9A865] transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/find-lawyer"
                className="text-[#D6A767] hover:text-[#D9A865] transition-colors"
              >
                Find a Lawyer
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-[#D6A767] border-opacity-30">
                <Link
                  href="/login"
                  className="text-[#D6A767] hover:text-[#D9A865] transition-colors"
                >
                  Login
                </Link>
                <Link href="/signup" className="btn-primary text-center">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
