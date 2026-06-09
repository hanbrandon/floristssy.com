"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface PortfolioItem {
  src: string;
  title: string;
  description: string;
  alt: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3dkEwFdH59Bys0SRqJbqigHXWnzlspqZ_0JxMAE7xLV0A7wpzMvXsnbPpk7c_XIKi_n8rnjSY3C8ZQFpjcRdL117w_SWJxzbZGHWHnAZWjrnETtiKF4-WIBsIgYQNBx5GNO_teypLnfX3r4GMPyDk3pXgQkHGutXUdtwmOSj4L0Qwu0fgYaCx7RIoYR8dgU4FX9EZvrZmUh7jJmicpY7pU8OmkjeyH59mRpjT2SDG2aTNMQu35mMg56seT-X8f0DkjrihVVAt2gw',
    title: 'Editorial Romance',
    description: 'Bespoke Bridal Bouquet',
    alt: 'A breathtaking, close-up editorial shot of a lush, bespoke wedding bouquet resting on a piece of raw, textured linen in a minimalist setting. The arrangement features a sophisticated palette of deep burgundy, soft cream, and muted sage green organic foliage. The lighting is soft and moody, highlighting the delicate folds of the petals and the artisanal, slow-luxury aesthetic typical of a premium floristry brand.',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_SkkdvhNXwGoa-C3Srx_WbjylXOvbk04hVWwYosGGvYsK9DGYMY-snGGUhz3l8fyLlK3RmB-N2TSGevC550MVOcFcPXRLpp2yNWFzWh8TyjyOm7QvOByVuJqi2zn1tuDr9WYiVpb1O6mpag77Grkc33PqIDtC_Ax-XRY06nxQGVVitelaVS2yMchY7ro2u4PPKdNX4PwWrJ2OceLH8fI-lIHdSyRcBMhqMtwOCQjQqDLm19Ft0HemN3Oak87X4a6JseGMO-8KQKI',
    title: 'Architectural Grace',
    description: 'Tablescape Installation',
    alt: 'A striking, asymmetrical floral centerpiece displayed on a clean, modern off-white stone table. The arrangement utilizes a minimalist-organic style, featuring sculptural branches, delicate white blossoms, and deep emerald green accents. The environment is bathed in bright, natural light, creating a serene, high-end gallery feel that perfectly captures the sophisticated artistry of a luxury bespoke floral design.',
  },
  {
    src: '/portfolio_wildwood.png',
    title: 'Wildwood Harmony',
    description: 'Vintage Organic Centerpiece',
    alt: 'A beautiful, detailed editorial photo of a vintage organic floral centerpiece, featuring wildwood branches, climbing vines, delicate forest wildflowers, and soft cream roses.',
  },
  {
    src: '/portfolio_ethereal.png',
    title: 'Ethereal Whispers',
    description: 'Minimalist Wedding Arch',
    alt: 'A high-end editorial photo of a minimalist ethereal wedding arch, decorated with cascading white orchid blossoms, sheer cream chiffon fabric, and delicate dried twigs.',
  },
  {
    src: '/portfolio_autumn.png',
    title: 'Autumnal Radiance',
    description: 'Dining Table Florals',
    alt: 'An elegant editorial photo of a warm autumnal floral dining table styling, with terracotta and copper vessels holding wild pampas grass, warm orange dahlias, and burgundy eucalyptus leaves.',
  },
];

const Portfolio: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const isDragging = useRef(false);

  const handleScroll = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollLeft = container.scrollLeft;
      const totalWidth = container.scrollWidth - container.clientWidth;
      
      if (totalWidth <= 0) return;

      const percentage = scrollLeft / totalWidth;
      setScrollProgress(percentage);
      
      const index = Math.min(
        portfolioItems.length - 1,
        Math.max(0, Math.round(percentage * (portfolioItems.length - 1)))
      );
      setActiveIdx(index);
    }
  };

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const totalWidth = container.scrollWidth - container.clientWidth;
      const targetScroll = (index / (portfolioItems.length - 1)) * totalWidth;
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
      setActiveIdx(index);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    setIsMouseDown(true);
    isDragging.current = false;
    startX.current = e.pageX - container.offsetLeft;
    startScrollLeft.current = container.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !carouselRef.current) return;
    const container = carouselRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = x - startX.current;

    if (Math.abs(walk) > 5) {
      isDragging.current = true;
    }

    container.scrollLeft = startScrollLeft.current - walk * 1.5;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    if (selectedItem) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);

  return (
    <section className="py-section-gap bg-surface-container-low/50 w-full overflow-hidden" id="portfolio">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-label-caps text-label-caps text-tertiary tracking-widest uppercase block mb-4">
            Curated Works
          </span>
          <h2 className="font-headline-lg md:text-headline-lg text-[28px] text-primary">
            Selected Portfolio
          </h2>
        </div>
      </div>

      {/* Carousel Container - Full Width */}
      <div className="relative w-full px-margin-mobile md:px-margin-desktop mb-8">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-gutter overflow-x-auto scroll-smooth pb-4 select-none ${
            isMouseDown ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory scrollbar-none'
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="w-[75vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] xl:w-[18vw] flex-shrink-0 snap-start snap-always group relative overflow-hidden rounded cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
              tabIndex={0}
              aria-label={`${item.title} - ${item.description}. Click to zoom in.`}
              onClick={() => {
                if (!isDragging.current) {
                  setSelectedItem(item);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedItem(item);
                }
              }}
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden pointer-events-none">
                <Image
                  alt={item.alt}
                  src={item.src}
                  fill
                  sizes="(max-width: 640px) 75vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, (max-width: 1280px) 22vw, 18vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 group-focus-within:scale-105"
                />
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-container/90 to-transparent p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 transition-all duration-300 pointer-events-none"
              >
                <h3 className="font-headline-md text-headline-md text-on-primary text-[20px] leading-tight">
                  {item.title}
                </h3>
                <p className="font-body-md text-on-primary/80 mt-2 text-[13px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Luxury Minimalist Fraction & Progress Line Indicator */}
      <div className="flex justify-center items-center space-x-6 mt-8 select-none">
        {/* Left Arrow */}
        <button
          onClick={() => scrollToIndex(Math.max(0, activeIdx - 1))}
          disabled={activeIdx === 0}
          className="text-primary disabled:opacity-25 hover:text-tertiary transition-colors cursor-pointer disabled:cursor-default"
          aria-label="Previous slide"
          type="button"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div className="flex items-center space-x-4 font-label-caps text-[11px] tracking-[0.2em] text-primary/50">
          <span className="w-6 text-right text-primary">
            {(activeIdx + 1).toString().padStart(2, '0')}
          </span>
          
          <div className="relative w-32 h-[1px] bg-primary/10 overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out"
              style={{ 
                width: `${(1 / portfolioItems.length) * 100}%`,
                transform: `translateX(${scrollProgress * (portfolioItems.length - 1) * 100}%)`
              }}
            />
          </div>

          <span className="w-6 text-left">
            {portfolioItems.length.toString().padStart(2, '0')}
          </span>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scrollToIndex(Math.min(portfolioItems.length - 1, activeIdx + 1))}
          disabled={activeIdx === portfolioItems.length - 1}
          className="text-primary disabled:opacity-25 hover:text-tertiary transition-colors cursor-pointer disabled:cursor-default"
          aria-label="Next slide"
          type="button"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-white transition-colors cursor-pointer w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            onClick={() => setSelectedItem(null)}
            aria-label="Close modal"
            type="button"
          >
            <span className="material-symbols-outlined text-[28px]" aria-hidden="true">
              close
            </span>
          </button>

          <div
            className="relative max-w-4xl w-full flex flex-col items-center justify-center pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] max-h-[70vh] pointer-events-auto overflow-hidden rounded shadow-2xl">
              <Image
                alt={selectedItem.alt}
                src={selectedItem.src}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 80vw"
                className="object-contain bg-neutral-900"
              />
            </div>
            
            <div className="text-center mt-6 text-white pointer-events-auto max-w-2xl px-4">
              <h3 id="modal-title" className="font-headline-md text-headline-md text-white text-[28px] leading-tight">
                {selectedItem.title}
              </h3>
              <p className="font-body-md text-white/80 mt-2 text-[16px]">
                {selectedItem.description}
              </p>
              <p className="font-body-md text-white/60 mt-4 text-[13px] leading-relaxed max-w-xl mx-auto italic">
                {selectedItem.alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
