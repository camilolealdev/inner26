
import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Illustration } from '../../assets/Illustrations';
import { useTranslation } from '../../i18n/useTranslation';
import { home } from '../../i18n/translations/home';

const ConsultorioSection: React.FC = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation(home);
  const services = t('consultorio.services') as {
    yoga: string; meditacion: string; breathwork: string; arteTerapia: string;
  };

  return (
    <section
      id="consultorio"
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: '50vh' }}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #1c2829 0%, #2a3f42 45%, #1f3235 100%)' }}
      />

      {/* Decorative illustrations */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none opacity-10 pr-8 md:pr-20">
        <Illustration
          name="abstract-spirit"
          className="w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96"
          style={{ color: '#4D6A6D' } as React.CSSProperties}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-start pointer-events-none opacity-5 pl-8 md:pl-20">
        <Illustration
          name="lotus"
          className="w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64"
          style={{ color: '#C9ADA1' } as React.CSSProperties}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 is-shell text-center text-white py-12 md:py-16">
        <span className="block text-xs font-bold tracking-[0.35em] uppercase mb-4 opacity-70 text-muted">
          {t('consultorio.eyebrow') as string}
        </span>
        <h2 className="text-4xl md:text-5xl font-heading font-medium text-white mb-6 leading-tight">
          {t('consultorio.headingLine1') as string} <br />
          <span className="italic font-light text-accent">{t('consultorio.headingItalic') as string}</span>
        </h2>

        <div className="w-10 h-px mx-auto mb-6 bg-slate-is" />

        <p className="max-w-xl mx-auto text-lg font-light leading-relaxed mb-8 text-accent">
          {t('consultorio.description') as string}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
          {[
            {
              label: services.yoga,
              icon: (
                <path d="M12 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6 11h12M12 8v4m0 0-3 8m3-8 3 8" />
              ),
            },
            {
              label: services.meditacion,
              icon: (
                <>
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="12" cy="12" r="8" />
                </>
              ),
            },
            {
              label: services.breathwork,
              icon: (
                <path d="M12 20c4-3 7-6 7-10a4 4 0 0 0-7-2.6A4 4 0 0 0 5 10c0 4 3 7 7 10Z" />
              ),
            },
            {
              label: services.arteTerapia,
              icon: (
                <>
                  <path d="M12 3a9 9 0 0 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7Z" />
                  <circle cx="8" cy="11" r="1" />
                  <circle cx="12" cy="8" r="1" />
                  <circle cx="16" cy="11" r="1" />
                </>
              ),
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 px-3 py-4 rounded-sm"
              style={{ background: 'rgba(234,224,204,0.06)', border: '1px solid rgba(234,224,204,0.14)' }}
            >
              <span className="text-sand-dune" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                </svg>
              </span>
              <span className="text-xs font-light tracking-wide text-accent text-center leading-tight">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/consultorio"
            onClick={(e) => { e.preventDefault(); navigate('consultorio'); }}
            className="px-6 sm:px-10 py-3 sm:py-4 font-heading text-lg sm:text-xl transition-all duration-300 inline-block border border-slate-is/60 text-sand-dune hover:bg-slate-is"
          >
            {t('consultorio.ctaVer') as string}
          </a>
          <a
            href="https://wa.me/573212248261?text=Hola%2C%20me%20interesa%20una%20sesi%C3%B3n%20individual"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-10 py-3 sm:py-4 font-heading text-lg sm:text-xl transition-all duration-300 bg-slate-is text-sand-dune border border-slate-is hover:bg-deep-teal"
          >
            {t('consultorio.ctaWhatsapp') as string}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ConsultorioSection;
