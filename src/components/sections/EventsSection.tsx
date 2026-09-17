import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { Illustration } from '../../assets/Illustrations';
import InstagramFeedEmbed from '../../modules/events/components/InstagramFeedEmbed';
import {
  getEventCtaLabel,
  getEventWaitlistUrl,
  isEventBookable,
  studioEvents,
} from '../../modules/events/data/events';
import { toEventBookingDetails } from '../../modules/events/utils/toBookingDetails';
import { useTranslation } from '../../i18n/useTranslation';
import { home } from '../../i18n/translations/home';

const EventsSection: React.FC = () => {
  const { openBookingModal } = useContext(CartContext);
  const [activeIdx, setActiveIdx] = useState(0);
  const { t } = useTranslation(home);
  const event = studioEvents[activeIdx] ?? studioEvents[0];

  if (!event) return null;

  const reserveFromSite = () => {
    if (!isEventBookable(event)) {
      window.open(getEventWaitlistUrl(event), '_blank', 'noopener,noreferrer');
      return;
    }
    openBookingModal(toEventBookingDetails(event, 'site'));
  };

  return (
    <section id="eventos" className="is-section bg-base">
      <div className="is-shell">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="is-eyebrow justify-center" style={{ color: '#4D6A6D' }}>
            {t('events.eyebrow') as string}
          </span>
          <h2 className="is-display text-4xl sm:text-5xl md:text-6xl mt-4" style={{ color: '#252520' }}>
            {t('events.title') as string}
          </h2>
          <p className="mt-5 font-light leading-relaxed" style={{ color: '#798478' }}>
            {t('events.intro') as string}
          </p>
        </div>

        <div className="flex gap-3 mb-6 justify-center flex-wrap">
          {studioEvents.map((currentEvent, index) => (
            <button
              key={currentEvent.slug}
              onClick={() => setActiveIdx(index)}
              aria-pressed={activeIdx === index}
              className={`min-h-11 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-300 ${
                activeIdx === index
                  ? 'bg-slate-is text-sand-dune border-slate-is'
                  : 'bg-transparent text-muted-light border-accent'
              }`}
            >
              {currentEvent.tag}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-stretch lg:min-h-[480px] overflow-hidden">
          <div className="lg:w-5/12 relative overflow-hidden group min-h-[260px] sm:min-h-[320px]">
            <img
              src={event.coverImageUrl}
              alt={(t('events.imageAlt') as (title: string) => string)(event.title)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55))' }}
            >
              <Illustration
                name={event.illustrationName}
                className="w-40 h-40"
                style={{ color: 'rgba(255,255,255,0.85)' } as React.CSSProperties}
              />
            </div>
          </div>

          <div className="lg:w-7/12 flex flex-col justify-center p-6 md:p-12 lg:p-16 bg-dark-panel text-accent">
            <span className="text-xs font-bold tracking-[0.25em] uppercase mb-5 block text-slate-is">
              {event.tag}
            </span>

            <h3 className="text-4xl sm:text-5xl md:text-6xl font-heading text-white mb-2 leading-none">{event.title}</h3>
            <p className="font-serif italic text-xl mb-8 text-muted">
              {event.subtitle}
            </p>

            <div className="w-10 h-px mb-8 bg-slate-is" />

            <p className="text-base font-light leading-relaxed mb-10 opacity-90 text-accent">
              {event.description}
            </p>

            <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 flex-wrap">
              <div>
                <span className="text-white font-mono text-xs tracking-wide border border-slate-is px-4 py-2 rounded-full block mb-2">
                  {event.dateLabel}
                </span>
                <span className="text-xs text-muted-light">
                  {event.priceLabel}
                </span>
              </div>
              {isEventBookable(event) ? (
                <button
                  onClick={reserveFromSite}
                  className="min-h-11 text-white font-heading text-xl pb-1 transition-all duration-300 hover:opacity-80 border-b border-slate-is"
                >
                  {getEventCtaLabel(event)} &rarr;
                </button>
              ) : (
                <a
                  href={getEventWaitlistUrl(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-11 text-white font-heading text-xl pb-1 transition-all duration-300 hover:opacity-80 border-b border-slate-is"
                >
                  {getEventCtaLabel(event)} &rarr;
                </a>
              )}
            </div>
          </div>
        </div>

        <InstagramFeedEmbed />

        {/* Cómo participar */}
        <div className="mt-16 md:mt-24">
          <div className="text-center mb-10">
            <span className="is-eyebrow justify-center" style={{ color: '#4D6A6D' }}>{t('events.howParticipateEyebrow') as string}</span>
            <h3 className="is-display text-3xl sm:text-4xl mt-4" style={{ color: '#252520' }}>{t('events.howParticipateTitle') as string}</h3>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto list-none">
            {(['chooseEvent', 'bookSpot', 'arrive'] as const).map((key) =>
              t(`events.steps.${key}`) as { n: string; t: string; d: string }
            ).map((step) => (
              <li
                key={step.n}
                className="px-6 py-7 rounded-sm"
                style={{ background: '#FAF7F2', border: '1px solid #EAE0CC' }}
              >
                <span className="font-mono text-sm tracking-[0.2em]" style={{ color: '#A0A083' }}>{step.n}</span>
                <h4 className="font-heading text-2xl mt-3 mb-2" style={{ color: '#252520' }}>{step.t}</h4>
                <p className="font-light text-sm leading-relaxed" style={{ color: '#798478' }}>{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
