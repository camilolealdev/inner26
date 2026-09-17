import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Surface, ArrowIcon } from '../ui';
import { useTranslation } from '../../i18n/useTranslation';
import { home } from '../../i18n/translations/home';

// Copy reutilizado tal cual de LocationGateModal.tsx — misma descripción de
// cada sede, solo en formato de sección inline en vez de modal.
const destinationsMeta = [
  { key: 'co' as const, flag: '🇨🇴', accent: '#C9ADA1', loc: 'co' as const },
  { key: 'pt' as const, flag: '🇵🇹', accent: '#8B9A8B', loc: 'pt' as const },
  { key: 'us' as const, flag: '🇺🇸', accent: '#4D6A6D', loc: 'us' as const },
] as const;

const DestinationsSection: React.FC = () => {
  const { navigate, setLocation } = useNavigation();
  const { t } = useTranslation(home);

  const destinations = destinationsMeta.map((d) => ({
    ...d,
    ...(t(`destinations.items.${d.key}`) as {
      flagLabel: string;
      tag: string;
      title: string;
      copy: string;
      cta: string;
    }),
  }));

  const goTo = (loc: 'co' | 'pt' | 'us') => {
    setLocation(loc);
    if (loc === 'pt') navigate('portugal');
    else if (loc === 'us') navigate('chicago');
    else navigate('home');
  };

  return (
    <section className="is-section is-section--sand" aria-label={t('destinations.ariaLabel') as string}>
      <div className="is-shell">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="is-eyebrow justify-center">{t('destinations.eyebrow') as string}</span>
          <h2 className="is-display text-4xl sm:text-5xl md:text-6xl mt-4">
            {t('destinations.title') as string}
          </h2>
          <p className="is-copy mt-5">
            {t('destinations.intro') as string}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {destinations.map((d) => (
            <Surface key={d.tag} interactive className="p-6 md:p-8 text-left">
              <button
                type="button"
                onClick={() => goTo(d.loc)}
                className="group flex h-full w-full flex-col items-start text-left"
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <span className="text-4xl select-none" role="img" aria-label={d.flagLabel}>
                    {d.flag}
                  </span>
                  <span
                    className="text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                    style={{ borderColor: `${d.accent}66`, color: d.accent, background: `${d.accent}14` }}
                  >
                    {d.tag}
                  </span>
                </div>
                <h3 className="font-heading text-2xl text-ink mb-2">{d.title}</h3>
                <p className="is-copy text-sm">{d.copy}</p>
                <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-heading text-lg" style={{ color: d.accent }}>
                  {d.cta}
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </Surface>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-light">
          {t('destinations.footerNote') as string}
        </p>
      </div>
    </section>
  );
};

export default DestinationsSection;
