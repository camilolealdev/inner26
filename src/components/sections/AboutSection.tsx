
import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useTranslation } from '../../i18n/useTranslation';
import { home } from '../../i18n/translations/home';

const AboutSection: React.FC = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation(home);
  const metrics = (['ranking', 'rating', 'reviews'] as const).map((key) => ({
    key,
    ...(t(`about.metrics.${key}`) as { value: string; label: string }),
  }));

  return (
    <section id="about" className="is-section is-section--paper overflow-hidden">
      <div className="is-shell">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Left: Text */}
          <div className="lg:w-1/2 lg:pr-12 order-2 lg:order-1">
            <span className="is-eyebrow">{t('about.eyebrow') as string}</span>
            <h2 className="is-display text-5xl md:text-6xl leading-none mt-6 mb-8">
              {t('about.headingLine1') as string} <br />
              <span className="italic font-light" style={{ color: '#C9ADA1' }}>{t('about.headingItalic') as string}</span>.
            </h2>

            <div className="is-luxury-rule mb-8" />

            <div className="is-copy space-y-6">
              <p>
                {t('about.p1') as string}
              </p>
              <p>
                {t('about.p2Part1') as string}<span className="italic" style={{ color: '#5C6B5C' }}>{t('about.p2Italic') as string}</span>
                {t('about.p2Part2') as string}
                <strong className="text-slate-is">{t('about.p2Strong') as string}</strong>
                {t('about.p2Part3') as string}
              </p>
            </div>

            {/* Trust metrics */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {metrics.map((m) => (
                <div key={m.key} className="is-surface px-3 py-4 text-center">
                  <p className="is-metric font-heading text-3xl leading-none text-slate-is">{m.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] mt-2 text-muted">{m.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-6">
              <a
                href="/nosotros"
                onClick={(e) => { e.preventDefault(); navigate('nosotros'); }}
                className="font-heading text-xl pb-1 transition-all duration-300 inline-block text-ink border-b border-sage hover:text-slate-is hover:border-slate-is"
              >
                {t('about.linkHistoria') as string} &rarr;
              </a>
              <a
                href="https://wa.me/573212248261?text=Hola%2C%20quiero%20info%20sobre%20clases"
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-xl pb-1 transition-all duration-300 text-slate-is border-b border-slate-is"
              >
                {t('about.linkReservar') as string}
              </a>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="lg:w-1/2 order-1 lg:order-2 relative">
            <div className="is-frame relative aspect-[3/4] overflow-hidden">
              <img
                src="/images/studio/yoga-postura-ventanas.jpg"
                alt={t('about.imgAlt') as string}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] ease-out hover:scale-105"
              />
            </div>
            <span className="hidden md:block absolute -bottom-6 -left-6 w-28 h-28 rounded-sm" style={{ border: '1px solid rgba(201,173,161,0.5)', zIndex: -1 }} />
          </div>

        </div>

        {/* Para qué / Por qué — propósito y comunidad */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <article className="is-surface p-8 md:p-10">
            <span className="is-eyebrow">{t('about.paraQueEyebrow') as string}</span>
            <p className="is-copy mt-5">
              {t('about.paraQueText') as string}
            </p>
          </article>
          <article className="is-surface p-8 md:p-10">
            <span className="is-eyebrow">{t('about.porQueEyebrow') as string}</span>
            <p className="is-copy mt-5">
              {t('about.porQueText') as string}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
