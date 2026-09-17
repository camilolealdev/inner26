
import React from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import { home } from '../../i18n/translations/home';

const pillarImages = {
  yoga: '/images/studio/yoga-clase-grupal.jpg',
  danza: '/images/studio/danza-movimiento.jpg',
  capoeira: '/images/studio/capoeira-roda.jpg',
} as const;

const StudioSection: React.FC = () => {
  const { t } = useTranslation(home);
  const pillars = (Object.keys(pillarImages) as (keyof typeof pillarImages)[]).map((key) => ({
    key,
    img: pillarImages[key],
    ...(t(`studio.pillars.${key}`) as { label: string; alt: string }),
  }));
  const stats = (['rating', 'ranking', 'space'] as const).map((key) => ({
    key,
    ...(t(`studio.stats.${key}`) as { value: string; label: string; sub: string }),
  }));

  return (
    <section id="studio" className="is-section bg-base relative overflow-hidden">
      <div className="is-shell">

        {/* Editorial heading */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="is-eyebrow">{t('studio.eyebrow') as string}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading leading-tight mt-5 mb-4" style={{ color: '#1A1A18' }}>
            {t('studio.headingLine1') as string}<br />
            <span className="italic font-light" style={{ color: '#5C6B5C' }}>{t('studio.headingItalic') as string}</span>
          </h2>
          <div className="is-luxury-rule my-4" />
          <p className="text-base md:text-lg font-light max-w-2xl leading-relaxed" style={{ color: '#5c5c52' }}>
            {t('studio.description') as string}
          </p>
        </div>

        {/* Pillar cards — real photography of the space and its community */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {pillars.map((item) => (
            <div key={item.key} className="flex flex-col items-center group">
              <div className="w-full aspect-[3/4] rounded-sm overflow-hidden mb-5">
                <img
                  src={item.img}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#798478' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x rounded-sm py-8 text-center"
          style={{ background: '#F3EDE2' }}
        >
          {stats.map((s) => (
            <div key={s.key} className="flex flex-col items-center py-6 md:py-0">
              <span className="text-4xl md:text-5xl font-heading font-bold" style={{ color: '#4D6A6D' }}>
                {s.value}
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider mt-1" style={{ color: '#252520' }}>
                {s.label}
              </span>
              <span className="text-xs mt-1" style={{ color: '#A0A083' }}>{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioSection;
