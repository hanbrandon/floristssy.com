import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="about">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <div className="md:col-span-5 md:col-start-2 relative">
          <div className="absolute -inset-4 bg-surface-container rounded-lg -z-10 opacity-50" />
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded border border-outline-variant/20 group">
            <Image
              alt="A serene, professional lifestyle portrait of a bespoke florist meticulously arranging delicate, high-end blooms in a minimalist, light-filled studio. The florist is wearing a tasteful linen apron, surrounded by buckets of lush greenery and exquisite flowers. The scene is bathed in soft, diffused natural daylight, creating a creamy, off-white cinematic atmosphere. The aesthetic emphasizes artisanal craftsmanship, organic beauty, and sophisticated slow luxury."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl2zW5_cs7hTU-DeUUnOivFD1JQ4Bdubj5DC0fuFcJ9aofnwURQcFzAqSt2ZcY5xI2AoO6_2ldMp2U1oWRyITauTJM2snG6q35Rq9Auegkkd0uzBXIfmchnbT3UlP194oKX5zgv-NmrQVjtrL4SUpM8IeLaQLcR01_Igc1BhIUcOBOTHYITJesonJKQfwcLkWqXAM1tluPcu30g6u4ZR5jmDaEUROOfgaehsewGwTF4M6UH4qvOHhoVjbtZFxBWHGWdX7FJ2Vi9NM"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-8 flex flex-col justify-center space-y-8 mt-12 md:mt-0">
          <span className="font-label-caps text-label-caps text-tertiary tracking-widest uppercase">
            Our Heritage
          </span>
          <h2 className="font-headline-lg md:text-headline-lg text-[28px] text-primary">
            Rooted in Nature, Cultivated with Elegance.
          </h2>
          <p className="font-body-lg md:text-body-lg text-[15px] text-on-surface-variant leading-relaxed">
            At Florist SSY, we believe that floral design is a form of fine art. Our botanical heritage
            inspires a passionate commitment to nature&apos;s unrefined beauty. We craft unique floral narratives
            that speak to the heart of your most cherished celebrations.
          </p>
          <p className="font-body-md md:text-body-md text-[14px] text-on-surface-variant leading-relaxed opacity-80">
            Every arrangement is thoughtfully curated, embracing asymmetry and organic textures to deliver a
            tactile, premium experience that elevates any environment into a space of quiet prestige.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
