"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'floristssy@gmail.com';
  const contactPhoneRaw = process.env.NEXT_PUBLIC_CONTACT_PHONE || '9179928888';

  const formatPhoneNumber = (phone: string) => {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const contactPhone = formatPhoneNumber(contactPhoneRaw);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full pt-28 pb-12 bg-primary text-white font-body-md border-t border-white/5 relative overflow-hidden">
      {/* Subtle background ambient light */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 lg:gap-x-gutter">
          {/* Brand & Contact Column */}
          <div className="lg:col-span-5 flex flex-col items-start gap-8">
            <div className="flex flex-col gap-3">
              <Link 
                href="/" 
                className="font-headline-md text-[26px] md:text-headline-md text-white tracking-wide hover:opacity-85 transition-opacity"
              >
                Florist SSY
              </Link>
              <p className="font-body-md text-white/50 text-[14px] leading-relaxed max-w-sm">
                Creating romantic & refined floral moments for weddings and destinations. Now booking 2026/2027 weddings.
              </p>
            </div>

            {/* Direct Contact Info */}
            <div className="flex flex-col gap-3.5 text-[14px] font-body-md text-white/70">
              <div className="flex items-center gap-3 group">
                <span className="material-symbols-outlined text-[18px] text-white/40 group-hover:text-white transition-colors" aria-hidden="true">
                  call
                </span>
                <a 
                  href={`tel:${contactPhoneRaw}`} 
                  className="hover:text-white transition-colors hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white p-0.5 rounded"
                >
                  {contactPhone}
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <span className="material-symbols-outlined text-[18px] text-white/40 group-hover:text-white transition-colors" aria-hidden="true">
                  mail
                </span>
                <a 
                  href={`mailto:${contactEmail}`} 
                  className="hover:text-white transition-colors hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white p-0.5 rounded"
                >
                  {contactEmail}
                </a>
              </div>
            </div>

            {/* Social Media Link with Brevo-like refined outline button */}
            <a
              href="https://www.instagram.com/florist_ssy/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2.5 px-4 py-2 border border-white/10 rounded-full text-white/85 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Follow us on Instagram"
            >
              <svg
                className="w-4 h-4 text-current"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span className="font-label-caps text-[10px] tracking-[0.15em] font-semibold">INSTAGRAM</span>
            </a>
          </div>

          {/* Spacer for better layout balance on wide screens */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Navigation Column */}
          <div className="lg:col-span-3 flex flex-col gap-7 md:pl-0 lg:pl-8">
            <h4 className="font-label-caps text-[11px] tracking-[0.2em] text-white/40 uppercase font-bold">Explore</h4>
            <ul className="flex flex-col gap-4 font-label-caps text-[11px] tracking-[0.15em]">
              <li>
                <Link 
                  href="/about" 
                  className="text-white/70 hover:text-white transition-colors hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link 
                  href={isHome ? "#portfolio" : "/#portfolio"} 
                  onClick={(e) => handleExploreClick(e, 'portfolio')}
                  className="text-white/70 hover:text-white transition-colors hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  PORTFOLIO
                </Link>
              </li>
              <li>
                <Link 
                  href={isHome ? "#contact" : "/#contact"} 
                  onClick={(e) => handleExploreClick(e, 'contact')}
                  className="text-white/70 hover:text-white transition-colors hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  CONTACT US
                </Link>
              </li>
            </ul>
          </div>

          {/* Info / Legal Column */}
          <div className="lg:col-span-3 flex flex-col gap-7">
            <h4 className="font-label-caps text-[11px] tracking-[0.2em] text-white/40 uppercase font-bold">Studio Info</h4>
            <ul className="flex flex-col gap-5 text-[14px]">
              <li>
                <span className="font-label-caps text-[10px] tracking-[0.2em] text-white/30 block mb-1.5">REGIONS</span>
                <p className="font-body-md text-white/70 tracking-normal leading-relaxed not-italic">
                  North and South Georgia &bull; Destination Events &bull; Available for Travel
                </p>
              </li>
              <li>
                <span className="font-label-caps text-[10px] tracking-[0.2em] text-white/30 block mb-1.5">LEGAL</span>
                <Link 
                  href="/privacy" 
                  className="font-label-caps text-[11px] tracking-[0.15em] text-white/70 hover:text-white transition-colors hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  PRIVACY POLICY
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/10 my-16" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-label-caps text-[10px] tracking-[0.15em] text-white/40">
          <div>
            © 2026 FLORIST SSY. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-1.5">
            <span>WEBSITE DEVELOPED BY</span>
            <a
              href="https://gawoori.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors underline decoration-white/20 hover:decoration-white underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              GAWOORI.COM
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
