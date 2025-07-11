import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "LawyerInsta - India's Largest & Most Trusted Lawyer Directory",
  description:
    'Find verified lawyers across India. Connect with legal professionals instantly. 20+ lakh verified lawyer profiles with transparent pricing and reviews.',
  keywords:
    'lawyers, legal help, India, lawyer directory, legal services, find lawyer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
