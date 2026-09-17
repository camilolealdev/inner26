import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowIcon, Surface } from '../ui';
import { useTranslation } from '../../i18n/useTranslation';
import { home } from '../../i18n/translations/home';

const GatewayIcon: React.FC<{ kind: 'mat' | 'moon' | 'hands' }> = ({ kind }) => {
  if (kind === 'moon') {
    return (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 32 32" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.6 25.2A10.2 10.2 0 0 1 9.9 8.8 9.4 9.4 0 1 0 21.6 25.2Z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22.4 7.5h.1M25.8 12h.1M18.9 4.8h.1" />
      </svg>
    );
  }

  if (kind === 'hands') {
    return (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 32 32" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.2 18.8 7.6 14c-.4-1.2.2-2.5 1.4-2.9 1-.3 2 .1 2.5 1l2.7 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m22.8 18.8 1.6-4.8c.4-1.2-.2-2.5-1.4-2.9-1-.3-2 .1-2.5 1l-2.7 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 18.5c1.4 4.4 3.2 6.6 5.5 6.6s4.1-2.2 5.5-6.6M16 7v5.5M12.8 9.2l3.2 3.2 3.2-3.2" />
      </svg>
    );
  }

  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 32 32" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 22h16M9.5 10.5h13a2 2 0 0 1 2 2V22h-17v-9.5a2 2 0 0 1 2-2Z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14h8M12 17h5" />
    </svg>
  );
};

const ExperienceGatewaySection: React.FC = () => {
  const { openBookingModal } = useContext(CartContext);
  const { navigate } = useNavigation();
  const { t } = useTranslation(home);

  const reserveFirstClass = () => {
    openBookingModal({
      type: 'class',
      title: t('gateway.bookingTitle') as string,
      price: 36000,
      imageUrl: '',
      illustrationName: 'yoga',
    });
  };

  const items = [
    {
      key: 'firstPractice' as const,
      icon: 'mat' as const,
      onClick: reserveFirstClass,
    },
    {
      key: 'upcomingRituals' as const,
      icon: 'moon' as const,
      onClick: () => navigate('eventos'),
    },
    {
      key: 'accompaniment' as const,
      icon: 'hands' as const,
      onClick: () => navigate('consultorio'),
    },
  ].map((item) => ({
    ...item,
    ...(t(`gateway.items.${item.key}`) as { label: string; title: string; copy: string; action: string }),
  }));

  return (
    <section className="is-section is-section--sand" aria-label={t('gateway.sectionAriaLabel') as string}>
      <div className="is-shell">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[0.9fr_2.1fr] lg:items-stretch">
          <div className="is-surface p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="is-eyebrow">{t('gateway.eyebrow') as string}</span>
              <h2 className="is-display mt-5 text-3xl md:text-4xl">
                {t('gateway.title') as string}
              </h2>
              <div className="is-luxury-rule mt-6" />
            </div>
            <p className="is-copy mt-8">
              {t('gateway.intro') as string}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <Surface key={item.title} interactive className="p-6 md:p-7">
                <button
                  type="button"
                  onClick={item.onClick}
                  aria-label={`${item.action}: ${item.title}`}
                  className="group flex h-full w-full flex-col items-start text-left"
                >
                  <span className="mb-7 flex h-12 w-12 items-center justify-center rounded-sm bg-slate-is text-sand-dune">
                    <GatewayIcon kind={item.icon} />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-is">
                    {item.label}
                  </span>
                  <span className="mt-3 block font-heading text-2xl leading-tight text-ink">
                    {item.title}
                  </span>
                  <span className="is-copy mt-4 block text-sm">
                    {item.copy}
                  </span>
                  <span className="mt-7 inline-flex min-h-11 items-center gap-2 font-heading text-lg text-slate-is">
                    {item.action}
                    <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </Surface>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceGatewaySection;
