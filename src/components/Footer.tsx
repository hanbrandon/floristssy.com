import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full pt-24 pb-12 bg-primary text-white font-body-md border-t border-white/5">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 lg:gap-x-gutter">
          {/* Brand Column */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            <div className="font-headline-md text-[24px] md:text-headline-md text-white tracking-wide">
              Florist SSY
            </div>
            <p className="font-body-md text-white/50 text-[14px] leading-relaxed max-w-sm">
              Creating romantic & refined floral moments for weddings and destinations. Now booking 2026/2027 weddings.
            </p>
            <a
              href="https://www.instagram.com/florist_ssy/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white p-1 rounded"
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
              <span className="font-label-caps text-[11px] tracking-[0.15em] border-b border-white/20 pb-0.5 hover:border-white transition-all">INSTAGRAM</span>
            </a>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3 flex flex-col gap-6 md:pl-0 lg:pl-12">
            <h4 className="font-label-caps text-[11px] tracking-[0.2em] text-white/40 uppercase">Explore</h4>
            <ul className="flex flex-col gap-4 font-label-caps text-[11px] tracking-[0.15em]">
              <li>
                <a href="#about" className="text-white/80 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                  ABOUT US
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-white/80 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                  PORTFOLIO
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/80 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                  CONTACT US
                </a>
              </li>
            </ul>
          </div>

          {/* Info / Legal Column */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="font-label-caps text-[11px] tracking-[0.2em] text-white/40 uppercase">Info & Legal</h4>
            <ul className="flex flex-col gap-4 font-label-caps text-[11px] tracking-[0.15em]">
              <li>
                <a href="#privacy" className="text-white/80 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                  PRIVACY POLICY
                </a>
              </li>
              <li>
                <span className="text-white/40 block mb-1">REGIONS</span>
                <p className="font-body-md text-white/70 text-[13px] tracking-normal leading-relaxed not-italic">
                  Buford &bull; Atlanta &bull; Destination
                </p>
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
          <div>
            WEBSITE DEVELOPED BY{' '}
            <a
              href="https://gawoori.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors underline decoration-white/20 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
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
