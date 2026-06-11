import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onInquireClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onInquireClick }) => {
  return (
    <section className="relative min-h-[921px] flex items-center justify-center pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          alt="A breathtaking, high-end editorial photograph of a luxurious, sprawling floral arrangement featuring deep emerald green foliage intertwined with velvety white and blush petals. The composition is dramatic yet organic, set against a creamy, minimalist off-white background that evokes a high-fashion, slow-luxury aesthetic. Soft, natural studio lighting highlights the intricate textures of the botanical elements, creating subtle tonal depth and a tranquil, artisanal mood suitable for a premium bespoke florist portfolio."
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOBezEnOkXa_JG5txXSaNZb36cMH99W9NkEqnWViN31w3gps4mP21gTVhXhR5wI7CLGs9lxBBT0zkeLMilRfwNRphqv4ssmwSiZYsBPnNXezmwLcc4o76vqRQqHzNVBbvIPhe-Qb4ENeCaw2ma1m8rmMDuehSShx_Ojo4N4e1xiBrS37QS6_EjOssj_NZr2vpUB_QmAM4Kf5hCstt3tF0EuebA4jGOA6ElfJdw2_Tf2-9j9vCQoXaPxp-oK54vaq5OFK9Cf2q-1cU"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90 object-center animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>
      <div className="relative z-10 text-center max-w-4xl mx-auto pt-24">
        <div className="overflow-hidden py-1 mb-4">
          <span className="reveal-text font-label-caps text-[11px] tracking-[0.25em] text-white/70 uppercase block">
            Atlanta Wedding Florist
          </span>
        </div>
        <h1 className="font-headline-xl md:text-headline-xl text-[36px] text-white mb-8 tracking-tight overflow-hidden py-1">
          <span className="reveal-text block">
            Creating Romantic & Refined Floral Moments
          </span>
        </h1>
        <p className="font-body-lg md:text-body-lg text-[15px] text-white/80 max-w-2xl mx-auto mb-12 overflow-hidden py-1">
          <span className="reveal-text block" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            Now booking 2026/2027 weddings &bull; Buford &bull; Atlanta &bull; Destination
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
  );
};

export default Hero;
