
import React from 'react';
import { Illustration } from '../assets/Illustrations';
import { useTranslation } from '../i18n/useTranslation';
import { homePages } from '../i18n/translations/homePages';
import TestimonialsSection from '../components/sections/TestimonialsSection';

const galleryItems = [
  { imageUrl: '/images/about/movimiento-consciente.jpg', alt: 'Movimiento Consciente' },
  { imageUrl: '/images/about/silencio-interior.jpg', alt: 'Silencio Interior' },
  { imageUrl: '/images/about/florecimiento.jpg', alt: 'Florecimiento' },
];

const AboutPage: React.FC = () => {
  const { t } = useTranslation(homePages);
  const galleryLabels = t('about.galleryLabels') as string[];

  return (
    <div className="animate-fade-in-up">

      {/* Hero — gradient, no external images */}
      <section
        className="relative is-page-section flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1c2829 0%, #2a3f42 50%, #252520 100%)' }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <Illustration name="abstract-spirit" className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px]" style={{ color: '#4D6A6D' } as React.CSSProperties} />
        </div>
        <div className="is-shell relative z-10 text-center text-white">
          <span className="text-xs font-bold tracking-[0.3em] uppercase mb-6 block" style={{ color: '#4D6A6D' }}>
            {t('about.eyebrowStudio') as string}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-semibold mb-6" style={{ color: '#EAE0CC' }}>
            {t('about.heroTitleLine1') as string}<br />{t('about.heroTitleLine2') as string}
          </h1>
          <p className="mt-4 text-xl max-w-3xl mx-auto font-light leading-relaxed" style={{ color: '#A0A083' }}>
            {t('about.heroLead') as string}
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="is-page-section bg-base">
        <div className="is-shell max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold mb-8" style={{ color: '#4D6A6D' }}>
            {t('about.philosophyTitle') as string}
          </h2>
          <div className="text-xl font-light leading-relaxed space-y-8" style={{ color: '#5c5c52' }}>
            <p>
              {t('about.philosophyP1') as string}
            </p>
            <p>
              {t('about.philosophyP2') as string}
            </p>
            <p>
              {t('about.philosophyP3') as string}
            </p>
            <p>
              {t('about.philosophyP4') as string}
            </p>
          </div>
        </div>
      </section>

      {/* Founder / Guide */}
      <section className="is-page-section" style={{ background: '#F3EDE2' }}>
        <div className="is-shell">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="md:w-2/5 flex justify-center">
              <div className="relative">
                <div
                  className="absolute -inset-3 rounded-full"
                  style={{ border: '1px solid rgba(201,173,161,0.4)' }}
                />
                <div
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center"
                  style={{ background: '#EAE0CC' }}
                >
                  <Illustration
                    name="lotus"
                    className="w-3/5 h-3/5"
                    style={{ color: '#C9ADA1' } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>
            <div className="md:w-3/5 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-6" style={{ color: '#4D6A6D' }}>
                {t('about.guideTitle') as string}
              </h2>
              <p className="text-xl font-light leading-relaxed mb-4" style={{ color: '#252520' }}>
                {t('about.guideP1') as string}
              </p>
              <p className="text-lg font-light leading-relaxed" style={{ color: '#798478' }}>
                {t('about.guideP2') as string}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio — illustration gallery */}
      <section className="is-page-section bg-base">
        <div className="is-shell">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-6" style={{ color: '#4D6A6D' }}>
              {t('about.spaceTitle') as string}
            </h2>
            <p className="text-xl font-light leading-relaxed max-w-3xl mx-auto" style={{ color: '#798478' }}>
              {t('about.spaceLead') as string}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="is-surface is-surface--interactive group flex flex-col overflow-hidden rounded-sm transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-md"
              >
                <div className="is-media-stage overflow-hidden aspect-[3/4] relative flex items-center justify-center bg-sand-light">
                  <img
                    src={item.imageUrl}
                    alt={galleryLabels[index] ?? item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <p className="absolute bottom-6 left-6 right-6 text-xs font-bold uppercase tracking-widest text-white drop-shadow-sm">
                    {galleryLabels[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </div>
  );
};

export default AboutPage;
