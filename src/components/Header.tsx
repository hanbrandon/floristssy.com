"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
  onInquireClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onInquireClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  
  // 홈이 아닌 다른 서브페이지(예: /about)에서는 스크롤 위치와 상관없이 헤더 배경색과 텍스트 대비를 강제 적용
  const forceScrolled = isScrolled || !isHome;

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleLinkClick = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  const handleLogoClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300 ${
          isMenuOpen
            ? 'bg-transparent border-transparent backdrop-blur-none shadow-none'
            : forceScrolled
              ? 'bg-background/80 dark:bg-background/80 backdrop-blur-md border-outline-variant/10 shadow-sm'
              : 'bg-transparent backdrop-blur-none border-transparent'
        }`}
        aria-label="Main Navigation"
      >
        <div className={`max-w-container-max mx-auto flex justify-between items-center px-margin-mobile md:px-margin-desktop transition-all duration-300 w-full ${
          isScrolled ? 'py-3.5' : 'py-6'
        }`}>
          <div 
            onClick={handleLogoClick}
            className={`font-headline-md text-[20px] md:text-headline-md transition-all duration-300 whitespace-nowrap cursor-pointer hover:opacity-75 ${
              (isMenuOpen || !forceScrolled) ? 'text-white' : 'text-primary dark:text-primary-fixed'
            }`}
          >
            Florist SSY
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 font-label-caps text-[11px] tracking-[0.15em] items-center">
            <Link
              className={`relative pb-1 transition-colors duration-300 cursor-pointer active:opacity-70 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                forceScrolled 
                  ? 'text-on-surface-variant hover:text-primary focus-visible:outline-primary' 
                  : 'text-white/80 hover:text-white focus-visible:outline-white'
              }`}
              href="/about"
            >
              ABOUT US
              <span className={`absolute bottom-0 left-0 w-full h-[1px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                forceScrolled ? 'bg-primary' : 'bg-white'
              }`} />
            </Link>
            <Link
              className={`relative pb-1 transition-colors duration-300 cursor-pointer active:opacity-70 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                forceScrolled 
                  ? 'text-on-surface-variant hover:text-primary focus-visible:outline-primary' 
                  : 'text-white/80 hover:text-white focus-visible:outline-white'
              }`}
              href={isHome ? "#portfolio" : "/#portfolio"}
              onClick={(e) => handleNavClick(e, 'portfolio')}
            >
              PORTFOLIO
              <span className={`absolute bottom-0 left-0 w-full h-[1px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                forceScrolled ? 'bg-primary' : 'bg-white'
              }`} />
            </Link>
            <Link
              className={`relative pb-1 transition-colors duration-300 cursor-pointer active:opacity-70 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                forceScrolled 
                  ? 'text-on-surface-variant hover:text-primary focus-visible:outline-primary' 
                  : 'text-white/80 hover:text-white focus-visible:outline-white'
              }`}
              href={isHome ? "#contact" : "/#contact"}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              CONTACT US
              <span className={`absolute bottom-0 left-0 w-full h-[1px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                forceScrolled ? 'bg-primary' : 'bg-white'
              }`} />
            </Link>
          </div>

          {/* Desktop Button */}
          <div className="hidden md:block">
            {isHome ? (
              <button
                className={`border bg-transparent font-label-caps text-[11px] tracking-[0.15em] py-2.5 px-7 rounded-sm transition-all duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                  forceScrolled
                    ? 'border-primary/20 hover:border-primary text-primary hover:bg-primary hover:text-white focus-visible:outline-primary'
                    : 'border-white/30 hover:border-white text-white hover:bg-white hover:text-primary focus-visible:outline-white'
                }`}
                type="button"
                onClick={onInquireClick}
              >
                INQUIRE
              </button>
            ) : (
              <Link
                href="/?inquire=true"
                className={`inline-block border bg-transparent font-label-caps text-[11px] tracking-[0.15em] py-2.5 px-7 rounded-sm transition-all duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                  forceScrolled
                    ? 'border-primary/20 hover:border-primary text-primary hover:bg-primary hover:text-white focus-visible:outline-primary'
                    : 'border-white/30 hover:border-white text-white hover:bg-white hover:text-primary focus-visible:outline-white'
                }`}
              >
                INQUIRE
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button (CSS Animated HTML Spans with Perfect Symmetry) */}
          <button
            className={`block md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer w-10 h-10 relative z-50 flex items-center justify-center ${
              (isMenuOpen || !forceScrolled) ? 'focus-visible:outline-white' : 'focus-visible:outline-primary'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            type="button"
          >
            <div className={`relative w-6 h-6 transition-colors duration-300 ${
              (isMenuOpen || !forceScrolled) ? 'text-white' : 'text-primary'
            }`}>
              <span
                className={`absolute left-0 w-full h-[2px] bg-current rounded-full transition-all duration-300 transform origin-center ${
                  isMenuOpen ? 'top-[11px] rotate-45' : 'top-[6px]'
                }`}
              />
              <span
                className={`absolute left-0 w-full h-[2px] bg-current rounded-full transition-all duration-300 transform origin-center ${
                  isMenuOpen ? 'top-[11px] opacity-0 scale-x-0' : 'top-[11px] opacity-100 scale-x-100'
                }`}
              />
              <span
                className={`absolute left-0 w-full h-[2px] bg-current rounded-full transition-all duration-300 transform origin-center ${
                  isMenuOpen ? 'top-[11px] -rotate-45' : 'top-[16px]'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu (Premium Slow-Luxury Glassmorphic Overlay) */}
      <div
        className={`fixed inset-0 z-40 bg-primary/98 dark:bg-primary/98 backdrop-blur-2xl flex flex-col justify-between px-8 py-16 transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto translate-x-0'
            : 'opacity-0 pointer-events-none translate-x-full'
        }`}
      >


        <div className="flex flex-col items-center space-y-8 my-auto">
          <button
            onClick={() => {
              setIsMenuOpen(false);
              router.push('/about');
            }}
            className={`font-headline-md md:text-headline-md text-[24px] text-white hover:text-tertiary-fixed transition-all duration-500 transform cursor-pointer uppercase ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '150ms' }}
            type="button"
          >
            ABOUT US
          </button>
          
          <div 
            className={`w-8 h-[1px] bg-white/20 transition-all duration-500 delay-200 transform ${
              isMenuOpen ? 'scale-x-100' : 'scale-x-0'
            }`} 
          />

          <button
            onClick={() => {
              setIsMenuOpen(false);
              if (isHome) {
                handleLinkClick('portfolio');
              } else {
                router.push('/#portfolio');
              }
            }}
            className={`font-headline-md md:text-headline-md text-[24px] text-white hover:text-tertiary-fixed transition-all duration-500 transform cursor-pointer uppercase ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '250ms' }}
            type="button"
          >
            PORTFOLIO
          </button>

          <div 
            className={`w-8 h-[1px] bg-white/20 transition-all duration-500 delay-300 transform ${
              isMenuOpen ? 'scale-x-100' : 'scale-x-0'
            }`} 
          />

          <button
            onClick={() => {
              setIsMenuOpen(false);
              if (isHome) {
                handleLinkClick('contact');
              } else {
                router.push('/#contact');
              }
            }}
            className={`font-headline-md md:text-headline-md text-[24px] text-white hover:text-tertiary-fixed transition-all duration-500 transform cursor-pointer uppercase ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '350ms' }}
            type="button"
          >
            CONTACT US
          </button>

          <button
            className={`bg-white text-primary font-label-caps text-label-caps py-4 px-14 rounded hover:bg-tertiary-fixed hover:text-primary transition-all duration-500 transform cursor-pointer text-[13px] mt-6 tracking-widest ${
              isMenuOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '450ms' }}
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              if (isHome) {
                if (onInquireClick) {
                  onInquireClick();
                } else {
                  handleLinkClick('contact');
                }
              } else {
                router.push('/?inquire=true');
              }
            }}
          >
            INQUIRE
          </button>
        </div>

        <div 
          className={`flex flex-col items-center text-center space-y-4 border-t border-white/10 pt-6 transition-all duration-700 delay-500 transform ${
            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <address className="not-italic text-white/50 font-body-md text-[13px] leading-relaxed">
            Buford • Atlanta • Destination
            <br />
            <a href={`tel:${contactPhoneRaw}`} className="hover:text-white transition-colors">{contactPhone}</a>
            <br />
            <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">{contactEmail}</a>
          </address>
          
          <a
            href="https://www.instagram.com/florist_ssy/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors py-1 px-3 rounded bg-white/5 hover:bg-white/10"
            aria-label="Follow us on Instagram"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="font-label-caps text-[10px] tracking-wider">INSTAGRAM</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;

