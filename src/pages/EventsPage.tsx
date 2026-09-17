import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { Illustration } from '../assets/Illustrations';
import InstagramFeedEmbed from '../modules/events/components/InstagramFeedEmbed';
import {
  getEventCtaLabel,
  getEventWaitlistUrl,
  isEventBookable,
  studioEvents,
} from '../modules/events/data/events';
import { toEventBookingDetails } from '../modules/events/utils/toBookingDetails';
import { useTranslation } from '../i18n/useTranslation';
import { homePages } from '../i18n/translations/homePages';

const EventsPage: React.FC = () => {
  const { openBookingModal } = useContext(CartContext);
  const [activeSlug, setActiveSlug] = useState(studioEvents[0]?.slug ?? '');
  const activeEvent = studioEvents.find((event) => event.slug === activeSlug) ?? studioEvents[0];
  const { t } = useTranslation(homePages);
  const steps = t('events.steps') as { n: string; t: string; d: string }[];

  useEffect(() => {
    // Un ItemList de los eventos reales, no un único Event genérico envolviendo
    // toda la página (eso describía la página entera como si fuera un solo evento
    // llamado "Rituales y Encuentros", que no existe como tal).
    const eventsSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Eventos y Rituales — Inner Spirit Studio",
      "url": "https://innerspirit.net/eventos",
      "itemListElement": studioEvents.map((event, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Event",
          "name": event.title,
          "description": event.description,
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "eventStatus": "https://schema.org/EventScheduled",
          "location": {
            "@type": "Place",
            "name": "Inner Spirit Studio",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Transversal 1 # 17-29",
              "addressLocality": "La Candelaria",
              "addressRegion": "Bogotá",
              "addressCountry": "CO"
            }
          },
          "organizer": {
            "@type": "Organization",
            "name": "Inner Spirit Studio",
            "url": "https://innerspirit.net"
          },
          "offers": {
            "@type": "Offer",
            "price": event.price,
            "priceCurrency": "COP",
            "url": "https://innerspirit.net/eventos"
          },
        },
      })),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(eventsSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  const reserveEvent = (eventSlug: string, source: 'site' | 'instagram') => {
    const event = studioEvents.find((item) => item.slug === eventSlug);
    if (!event) {
      return;
    }
    if (!isEventBookable(event)) {
      window.open(getEventWaitlistUrl(event), '_blank', 'noopener,noreferrer');
      return;
    }
    openBookingModal(toEventBookingDetails(event, source));
  };

  return (
    <div className="animate-fade-in-up">
      <section id="eventos-page" className="is-page-section bg-base">
        <div className="is-shell">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="is-eyebrow justify-center mb-4" style={{ color: '#4D6A6D' }}>
              {t('events.eyebrow') as string}
            </span>
            <h1 className="is-page-heading">
              {t('events.heading') as string}
            </h1>
            <p className="is-page-lead mt-6">
              {t('events.lead') as string}
            </p>
          </div>

          <div className="space-y-12">
            {studioEvents.map((event) => (
              <article
                key={event.slug}
                className="rounded-sm lg:flex items-stretch max-w-5xl mx-auto overflow-hidden group border"
                style={{ background: '#FAF7F2', borderColor: '#EAE0CC' }}
              >
                <div className="lg:w-5/12 overflow-hidden relative min-h-[220px] md:min-h-[260px]">
                  <img
                    src={event.coverImageUrl}
                    alt={`Portada del evento ${event.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.5))' }}
                  >
                    <Illustration
                      name={event.illustrationName}
                      className="w-28 h-28"
                      style={{ color: 'rgba(255,255,255,0.8)' } as React.CSSProperties}
                    />
                  </div>
                </div>

                <div className="lg:w-7/12 p-6 md:p-10 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#4D6A6D' }}>
                      {event.tag}
                    </span>
                    {(() => {
                      const bookable = isEventBookable(event);
                      return (
                        <span
                          className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
                          style={
                            bookable
                              ? { background: 'rgba(139,154,139,0.18)', color: '#5C6B5C', border: '1px solid rgba(139,154,139,0.4)' }
                              : { background: 'rgba(201,173,161,0.2)', color: '#9A6B58', border: '1px solid rgba(201,173,161,0.5)' }
                          }
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: bookable ? '#5C6B5C' : '#C9ADA1' }}
                            aria-hidden="true"
                          />
                          {bookable ? (t('events.bookable') as string) : (t('events.waitlist') as string)}
                        </span>
                      );
                    })()}
                  </div>
                  <h3 className="text-3xl font-heading font-bold mb-3" style={{ color: '#252520' }}>
                    {event.title}
                  </h3>
                  <p className="font-light leading-relaxed text-base mb-5" style={{ color: '#798478' }}>
                    {event.description}
                  </p>
                  <div
                    className="pt-5 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    style={{ borderColor: '#EAE0CC' }}
                  >
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest" style={{ color: '#A0A083' }}>
                        {event.dateLabel}
                      </p>
                      <p className="text-xs mt-1" style={{ color: '#798478' }}>
                        {event.priceLabel}
                      </p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => setActiveSlug(event.slug)}
                        className="font-heading text-sm px-4 py-2 border transition-all duration-300 hover:opacity-90"
                        style={{ borderColor: '#4D6A6D', color: '#4D6A6D' }}
                      >
                        {t('events.viewFeed') as string}
                      </button>
                      {isEventBookable(event) ? (
                        <button
                          onClick={() => reserveEvent(event.slug, 'site')}
                          className="w-full sm:w-auto font-heading text-lg px-6 py-2 transition-all duration-300 hover:opacity-90"
                          style={{ background: '#4D6A6D', color: '#EAE0CC' }}
                        >
                          {getEventCtaLabel(event)}
                        </button>
                      ) : (
                        <a
                          href={getEventWaitlistUrl(event)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto font-heading text-lg px-6 py-2 text-center transition-all duration-300 hover:opacity-90"
                          style={{ background: '#4D6A6D', color: '#EAE0CC' }}
                        >
                          {getEventCtaLabel(event)}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {activeEvent && (
            <div className="mt-16">
              <div className="flex flex-wrap gap-3 mb-4 justify-center">
                {studioEvents.map((event) => (
                  <button
                    key={event.slug}
                    onClick={() => setActiveSlug(event.slug)}
                    className="text-xs font-bold uppercase tracking-[0.18em] px-4 py-2 rounded-full border transition-all duration-300"
                    style={
                      event.slug === activeEvent.slug
                        ? { background: '#4D6A6D', color: '#EAE0CC', borderColor: '#4D6A6D' }
                        : { background: 'transparent', color: '#798478', borderColor: '#C9ADA1' }
                    }
                  >
                    {event.title}
                  </button>
                ))}
              </div>
              <InstagramFeedEmbed />
            </div>
          )}

          {/* Cómo participar */}
          <div className="mt-20 md:mt-28 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="is-eyebrow justify-center" style={{ color: '#4D6A6D' }}>{t('events.stepsEyebrow') as string}</span>
              <h2 className="is-display text-3xl sm:text-4xl mt-4" style={{ color: '#252520' }}>{t('events.stepsHeading') as string}</h2>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 list-none">
              {steps.map((step) => (
                <li
                  key={step.n}
                  className="px-6 py-7 rounded-sm"
                  style={{ background: '#FAF7F2', border: '1px solid #EAE0CC' }}
                >
                  <span className="font-mono text-sm tracking-[0.2em]" style={{ color: '#A0A083' }}>{step.n}</span>
                  <h3 className="font-heading text-2xl mt-3 mb-2" style={{ color: '#252520' }}>{step.t}</h3>
                  <p className="font-light text-sm leading-relaxed" style={{ color: '#798478' }}>{step.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
