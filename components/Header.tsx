'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut } from 'lucide-react';
import Image from 'next/image';
import Logo from '../public/assets/images/logo.jpg';
import { request } from 'http';

type LawyerData = {
  email: string;
  enrollmentId: string | null;
  firstName: string;
  lastName: string;
  phone: number;
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [lawyerData, setLawyerData] = useState<LawyerData | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const fetchEnrollmentId = async () => {
      try {
        if (pathname === '/profile') {
          const response = await fetch('/api/me');
          if (response.ok) {
            const data = await response.json();
            setLawyerData({
              email: data.lawyer.email || '',
              enrollmentId: data.lawyer.enrollmentId || null,
              firstName: data.lawyer.firstName || '',
              lastName: data.lawyer.lastName || '',
              phone: data.lawyer.phone || 0,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchEnrollmentId();
  }, [pathname]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/find-a-lawyer', label: 'Find a Lawyer' },
  ];

  const handleLogout = async () => {
    await fetch('/api/logout');
    window.location.href = '/';
  };

  return (
    <header className="bg-[#3C222F] shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center w-[25%] md:w-[15%] lg:w-[12%]"
          >
            <Image
              src={Logo}
              alt="LawyerInsta Logo"
              className="w-full md:w-[70%]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[#D6A767] hover:text-[#D9A865] transition-colors
                  ${pathname === item.href ? 'after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-full after:bg-[#D6A767]' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center space-x-4 text-xl">
            {lawyerData ? (
              <div className="relative group">
                <span className="text-xl text-[#C19653] cursor-pointer p-4">
                  Hello,{' '}
                  <span className="text-[#F6D7A6]">{lawyerData.firstName}</span>
                </span>
                <div className="absolute right-0 mt-2 w-44 bg-[#2B1B26] rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50 border border-[#C19653]">
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-[#F6D7A6] hover:bg-[#3C222F] hover:text-[#D6A767] transition-colors rounded-t-xl"
                  >
                    <User className="h-4 w-4 mr-2 text-[#C19653]" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-[#F6D7A6] hover:bg-[#3C222F] hover:text-[#D6A767] transition-colors rounded-b-xl"
                  >
                    <LogOut className="h-4 w-4 mr-2 text-[#C19653]" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[#D6A767] hover:text-[#D9A865] transition-colors"
                >
                  Login
                </Link>
                <Link href="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
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
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[#D6A767] hover:text-[#D9A865] transition-colors ${
                    pathname === item.href ? 'font-bold underline' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-[#D6A767] border-opacity-30">
                {lawyerData ? (
                  <>
                    <Link
                      href="/profile"
                      className="text-[#D6A767] hover:text-[#D9A865] transition-colors"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-left text-[#D6A767] hover:text-[#D9A865] transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-[#D6A767] hover:text-[#D9A865] transition-colors"
                    >
                      Login
                    </Link>
                    <Link href="/signup" className="btn-primary text-center">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
