import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onInquireClick?: () => void;
}

// Single source of truth for Hero content (text and image references)
const HERO_CONTENT = {
  label: "Atlanta Wedding Florist",
  title: "Artistry in Every Petal",
  description: "North and South Georgia • Destination Events • Available for Travel",
  imageSrc: "/hero/hero-main.jpg",
  imageAlt: "Bespoke luxury floral arrangement"
};

const Hero: React.FC<HeroProps> = ({ onInquireClick }) => {
  return (
    <>
      {/* Mobile Hero View (md 미만에서 노출) */}
      <section className="relative min-h-[921px] flex items-center justify-center pt-32 pb-section-gap px-margin-mobile md:hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            alt={HERO_CONTENT.imageAlt}
            src={HERO_CONTENT.imageSrc}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-90 object-center animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="overflow-hidden py-1 mb-4">
            <span className="reveal-text font-label-caps text-[11px] tracking-[0.25em] text-white/70 uppercase block">
              {HERO_CONTENT.label}
            </span>
          </div>
          <h1 className="font-headline-xl md:text-headline-xl text-[36px] text-white mb-8 tracking-tight overflow-hidden py-1">
            <span className="reveal-text block">
              {HERO_CONTENT.title}
            </span>
          </h1>
          <p className="font-body-lg md:text-body-lg text-[15px] text-white/80 max-w-2xl mx-auto mb-12 overflow-hidden py-1">
            <span className="reveal-text block" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              {HERO_CONTENT.description}
            </span>
          </p>
          <div className="overflow-hidden py-1 flex flex-col sm:flex-row items-center justify-center gap-8 mt-4">
            <a
              className="inline-flex items-center space-x-2 text-white font-label-caps text-label-caps group border-b border-white/30 pb-1 hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-all reveal-text"
              href="#portfolio"
              style={{ animationDelay: '400ms', animationFillMode: 'both' }}
            >
              <span>Explore the Portfolio</span>
              <span
                className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              >
                arrow_right_alt
              </span>
            </a>
            <button
              onClick={onInquireClick}
              className="inline-flex items-center space-x-2 text-white font-label-caps text-label-caps group border-b border-white/30 pb-1 hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-all reveal-text cursor-pointer"
              style={{ animationDelay: '500ms', animationFillMode: 'both' }}
            >
              <span>Inquire for Florals</span>
              <span
                className="material-symbols-outlined group-hover:translate-y-0.5 transition-transform"
                aria-hidden="true"
              >
                mail
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Desktop Hero View (md 이상에서 노출) */}
      <section className="hidden md:grid grid-cols-12 gap-12 items-center min-h-[90vh] py-24 px-margin-desktop bg-background text-primary max-w-container-max mx-auto pt-36">
        {/* Left Side: Text Area */}
        <div className="col-span-6 flex flex-col justify-center items-start text-left z-10 animate-fade-in">
          <span className="font-label-caps text-[11px] tracking-[0.25em] text-primary/70 uppercase block mb-4">
            {HERO_CONTENT.label}
          </span>
          <h1 className="font-headline-xl text-[64px] lg:text-[76px] text-primary mb-6 tracking-tight leading-[1.1] font-medium">
            {HERO_CONTENT.title}
          </h1>
          <p className="font-body-md text-[16px] text-primary/70 max-w-[450px] mb-8 leading-relaxed">
            {HERO_CONTENT.description}
          </p>
          <a
            className="inline-flex items-center space-x-2 text-primary font-body-md font-medium border-b border-primary/20 pb-1 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary transition-all group"
            href="#portfolio"
          >
            <span>Explore the Portfolio</span>
            <span
              className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[18px]"
              aria-hidden="true"
            >
              arrow_right_alt
            </span>
          </a>
        </div>

        {/* Right Side: Framed Image */}
        <div className="col-span-6 flex justify-end items-center z-10">
          <div className="bg-[#061b0e] p-10 w-full max-w-[480px] aspect-[4/5] shadow-sm flex items-center justify-center">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                alt={HERO_CONTENT.imageAlt}
                src={HERO_CONTENT.imageSrc}
                fill
                priority
                sizes="(max-width: 1200px) 50vw, 480px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
