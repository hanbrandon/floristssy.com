import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import About from '@/components/About';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "About Soyoun Kim | Florist SSY - Atlanta Wedding Florist",
  description: "Meet Soyoun Kim, the creative voice behind Florist SSY. Discover her 18-year journey of crafting elegant, timeless, and romantic floral designs for weddings in Atlanta, Buford, and destinations worldwide.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Soyoun Kim | Florist SSY - Atlanta Wedding Florist",
    description: "Meet Soyoun Kim, the creative voice behind Florist SSY. Discover her 18-year journey of crafting elegant, timeless, and romantic floral designs.",
    url: "https://floristssy.com/about",
    siteName: "Florist SSY",
    locale: "en_US",
    type: "website",
  },
};

const AboutPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36">
        <About />
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
