
import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { usePrefersReducedMotion } from '../../hooks';
import Galaxy from '../effects/Galaxy';
import VariableProximity from '../effects/VariableProximity';
import { useTranslation } from '../../i18n/useTranslation';
import { home } from '../../i18n/translations/home';

const HeroSection: React.FC = () => {
  const { navigate } = useNavigation();
  const reduceMotion = usePrefersReducedMotion();
  const { t } = useTranslation(home);

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#050a0b]"
      style={{ isolation: 'isolate' }}
    >
      {/* Galaxy Background — pointer-events disabled so buttons are always clickable */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {reduceMotion ? (
          <div className="h-full w-full is-hero-static" />
        ) : (
          <Galaxy
            mouseRepulsion
            mouseInteraction
            density={1.5}
            glowIntensity={0.4}
            saturation={0}
            hueShift={185}
            twinkleIntensity={0.4}
            rotationSpeed={0.03}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={0.3}
            speed={0.8}
          />
        )}
      </div>

      {/* Gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none is-hero-vignette"
        style={{ zIndex: 1 }}
      />

      {/* Main Content */}
      <div
        className="relative is-shell flex flex-col items-center justify-center text-center"
        style={{ zIndex: 2, minHeight: '100svh', paddingTop: '4rem', paddingBottom: '2rem' }}
      >
        <div className="animate-fade-in-up flex flex-col items-center w-full max-w-5xl">

          {/* Badge — location only, compact */}
          <span className="text-white/45 text-[10px] sm:text-[11px] font-bold tracking-[0.22em] sm:tracking-[0.34em] uppercase mb-8 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
            {t('hero.badge') as string}
          </span>

          {/* Headline — "Movimiento" reacts to mouse proximity */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[8.5rem] font-heading text-white leading-[0.9] tracking-normal">
            <span className="block opacity-95">
              {reduceMotion ? (t('hero.headlineMain') as string) : (
                <VariableProximity
                  text={t('hero.headlineMain') as string}
                  radius={220}
                  minWeight={300}
                  maxWeight={700}
                />
              )}
            </span>
            <span className="block font-light italic opacity-75 mt-2 md:mt-4" style={{ color: '#C9ADA1' }}>
              {t('hero.headlineSub') as string}
            </span>
          </h1>

          {/* Divider line */}
          <div className="w-px h-10 md:h-14 my-6 md:my-8" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.18), transparent)' }} />

          {/* Subtitle — reduced, lowered descriptor */}
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-400/70 mb-5">
            {t('hero.subtitle') as string}
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-stone-400 font-light max-w-lg mx-auto mb-10 leading-relaxed">
            {t('hero.description') as string}
          </p>

          {/* CTA buttons */}
          <div className="flex w-full flex-col sm:w-auto sm:flex-row items-center gap-4 sm:gap-5">
            <a
              href="/clases"
              onClick={(e) => { e.preventDefault(); navigate('clases'); }}
              className="w-full sm:w-auto px-9 py-4 font-heading text-lg min-w-[200px] text-center inline-block bg-slate-is text-sand-dune border border-slate-is hover:bg-deep-teal transition-all duration-300"
            >
              {t('hero.ctaClasses') as string}
            </a>
            <a
              href="/eventos"
              onClick={(e) => { e.preventDefault(); navigate('eventos'); }}
              className="w-full sm:w-auto px-9 py-4 font-heading text-lg italic min-w-[200px] text-center inline-block text-white/70 hover:text-white border-b border-white/25 hover:border-white/60 transition-all duration-300"
            >
              {t('hero.ctaEvents') as string} &rarr;
            </a>
          </div>

          {/* Meta row — three quiet value props */}
          <ul className="mt-12 md:mt-14 flex w-full max-w-md flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
            {(t('hero.metaItems') as readonly string[]).map((meta, i) => (
              <li key={meta} className="flex items-center gap-5">
                {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/25" />}
                <span>{meta}</span>
              </li>
            ))}
          </ul>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 opacity-35 animate-pulse" style={{ zIndex: 2 }} aria-hidden="true">
        <span className="text-[10px] tracking-[0.3em] text-white uppercase">{t('hero.scrollLabel') as string}</span>
        <div className="w-px h-8 bg-white" />
      </div>
    </section>
  );
};

export default HeroSection;
