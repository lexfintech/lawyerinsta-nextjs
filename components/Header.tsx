'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Logo from '../public/assets/images/logo.jpg';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isProfilePage = pathname === '/profile';

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/find-lawyer', label: 'Find a Lawyer' },
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
          <Link href="" className="flex items-center space-x-1 w-[25%] md:w-[15%] lg:w-[12%]">
            <Image src={Logo} alt="LawyerInsta Logo" className="w-[100%] md:w-[70%]" />
          </Link>

          {/* Profile page: only logo and logout */}
          {isProfilePage ? (
            <div className="flex items-center space-x-4">
              <Link
                href=""
                onClick={handleLogout}
                className="text-[#D6A767] hover:text-[#D9A865] text-xl"
              >
                Logout
              </Link>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {!isProfilePage && isMenuOpen && (
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
