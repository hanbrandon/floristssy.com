"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
// import Contact from '@/components/Contact'; // 코멘트아웃 (요청사항 반영)
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

const HomeContent: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams && searchParams.get('inquire') === 'true') {
      setIsContactOpen(true);
      // URL 클린업
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams]);

  return (
    <>
      <Header onInquireClick={() => setIsContactOpen(true)} />
      <Hero onInquireClick={() => setIsContactOpen(true)} />
      <Portfolio />
      {/* <Contact /> */}
      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

const Home: React.FC = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-primary font-body-md">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
};

export default Home;


