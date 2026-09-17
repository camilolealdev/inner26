import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Illustration } from '../assets/Illustrations';
import { useTranslation } from '../i18n/useTranslation';
import { homePages, type ClassItem as ClassItemCopy } from '../i18n/translations/homePages';

interface ClassItem {
  title: string;
  subtitle: string;
  description: string;
  illustrationName: string;
  imageUrl?: string;
  imageAlt?: string;
  price: number;
  priceLabel: string;
}

// Ilustraciones/imagenes e id de precio no dependen del idioma — el copy
// (title/subtitle/description/priceLabel) viene de homePages.classes.items.
const classMeta: { illustrationName: string; imageUrl?: string; imageAlt?: string; price: number }[] = [
  { illustrationName: 'yoga', imageUrl: '/images/studio/yoga-clase-grupal.jpg', imageAlt: 'Clase de yoga en grupo sobre esterillas en Inner Spirit Studio', price: 36000 },
  { illustrationName: 'breathwork', imageUrl: '/images/studio/meditacion-mudra.jpg', imageAlt: 'Persona en meditación con mudra sobre un cojín', price: 36000 },
  { illustrationName: 'dance', imageUrl: '/images/studio/danza-movimiento.jpg', imageAlt: 'Clase de danza y movimiento consciente en comunidad', price: 36000 },
  { illustrationName: 'sound-healing', imageUrl: '/images/chicago/chicago-sound-movement.jpg', imageAlt: 'Sesión de Sound Healing con cuencos tibetanos y gongs', price: 36000 },
];

const ClassesPage: React.FC = () => {
  const { openBookingModal } = useContext(CartContext);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { t } = useTranslation(homePages);
  const weeklyRhythm = t('classes.weeklyRhythm') as { day: string; time: string; focus: string }[];
  const faqs = t('classes.faqs') as { q: string; a: string }[];
  const classItems = t('classes.items') as ClassItemCopy[];
  const classes: ClassItem[] = classItems.map((item, index) => {
    const meta = classMeta[index] ?? { illustrationName: 'yoga', price: 36000 };
    return {
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      priceLabel: item.priceLabel,
      illustrationName: meta.illustrationName,
      ...(meta.imageUrl ? { imageUrl: meta.imageUrl } : {}),
      ...(meta.imageAlt ? { imageAlt: meta.imageAlt } : {}),
      price: meta.price,
    };
  });

  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Qué tipos de yoga ofrecen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ofrecemos Hatha, Vinyasa, Yin, AcroYoga y Kundalini. Cada estilo tiene su enfoque: desde flujos dinámicos hasta prácticas restaurativas."
          }
        },
        {
          "@type": "Question",
          "name": "¿Necesito experiencia previa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, nuestras clases son para todos los niveles. Nuestros guías adaptan las instrucciones para principiantes y avanzados."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cuánto cuesta una clase?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cada sesión tiene un valor de $36.000 COP. También tenemos promociones mensuales: 3 sesiones por $100.000 COP."
          }
        },
        {
          "@type": "Question",
          "name": "¿Las clases son en español o inglés?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ofrecemos clases en español e inglés. Nuestro espacio es bilingual y welcoming para visitantes internacionales."
          }
        }
      ]
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="animate-fade-in-up">
      <section className="is-page-section bg-base">
        <div className="is-shell">

          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold tracking-[0.3em] uppercase mb-4 block" style={{ color: '#4D6A6D' }}>
              {t('classes.eyebrow') as string}
            </span>
            <h1 className="is-page-heading">
              {t('classes.heading') as string}
            </h1>
            <p className="is-page-lead mt-6">
              {t('classes.lead') as string}
            </p>
          </div>

          {/* Weekly rhythm rail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14 max-w-3xl mx-auto">
            {weeklyRhythm.map((slot) => (
              <div
                key={slot.day}
                className="flex items-center gap-5 px-6 py-5 rounded-sm"
                style={{ background: '#F3EDE2', border: '1px solid #EAE0CC' }}
              >
                <span
                  className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full"
                  style={{ background: '#EAE0CC', color: '#4D6A6D' }}
                  aria-hidden="true"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: '#A0A083' }}>{slot.day}</p>
                  <p className="font-heading text-2xl leading-tight" style={{ color: '#252520' }}>{slot.time}</p>
                  <p className="text-sm font-light mt-0.5" style={{ color: '#798478' }}>{slot.focus}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {classes.map((item) => (
              <div
                key={item.title}
                className="rounded-sm shadow-sm overflow-hidden group border flex flex-col transition-all duration-300"
                style={{ background: '#FAF7F2', borderColor: '#EAE0CC' }}
              >
                <div
                  className="overflow-hidden aspect-[16/9] relative flex items-center justify-center transition-colors duration-500"
                  style={{ background: '#EAE0CC' }}
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt ?? item.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <Illustration
                      name={item.illustrationName}
                      className="w-1/3 h-1/3 transition-all duration-700 group-hover:scale-110"
                      style={{ color: '#C9ADA1' } as React.CSSProperties}
                    />
                  )}
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#4D6A6D' }}>
                    {item.subtitle}
                  </span>
                  <h3 className="text-3xl font-heading font-bold mb-3" style={{ color: '#252520' }}>
                    {item.title}
                  </h3>
                  <p className="font-light flex-grow leading-relaxed mb-2" style={{ color: '#798478' }}>
                    {item.description}
                  </p>
                  <p className="text-xs font-mono mb-6" style={{ color: '#A0A083' }}>{item.priceLabel}</p>
                  <button
                    onClick={() => openBookingModal({ type: 'class', title: item.title, price: item.price, imageUrl: item.imageUrl ?? '', illustrationName: item.illustrationName })}
                    className="border font-heading uppercase tracking-widest text-sm py-3 px-6 transition-all duration-300 hover:opacity-90"
                    style={{ borderColor: '#4D6A6D', color: '#4D6A6D' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#4D6A6D'; (e.currentTarget as HTMLButtonElement).style.color = '#EAE0CC'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#4D6A6D'; }}
                  >
                    {t('classes.viewSchedule') as string}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-16 p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-sm"
            style={{ background: '#F3EDE2', border: '1px solid #D9D1C0' }}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#4D6A6D' }}>{t('classes.promoLabel') as string}</p>
              <h3 className="text-2xl font-heading" style={{ color: '#252520' }}>{t('classes.promoTitle') as string}</h3>
              <p className="text-sm mt-1" style={{ color: '#798478' }}>{t('classes.promoDetail') as string}</p>
            </div>
            <a
              href="https://wa.me/573212248261?text=Hola%2C%20me%20interesa%20la%20promo%20de%203%20sesiones"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3 font-heading text-lg text-center transition-all hover:opacity-90"
              style={{ background: '#4D6A6D', color: '#EAE0CC' }}
            >
              {t('classes.promoCta') as string}
            </a>
          </div>

          {/* FAQ accordion */}
          <div className="mt-20 md:mt-28 max-w-3xl mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <span className="is-eyebrow justify-center" style={{ color: '#A0A083' }}>{t('classes.faqEyebrow') as string}</span>
              <h2 className="is-display text-3xl sm:text-4xl mt-4" style={{ color: '#252520' }}>{t('classes.faqHeading') as string}</h2>
            </div>
            <ul className="space-y-3">
              {faqs.map((item, index) => {
                const isOpen = openFaq === index;
                const panelId = `classes-faq-panel-${index}`;
                const buttonId = `classes-faq-button-${index}`;
                return (
                  <li
                    key={index}
                    className="rounded-sm overflow-hidden"
                    style={{ background: '#FAF7F2', border: '1px solid #EAE0CC' }}
                  >
                    <h3 className="m-0">
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-7 py-5 transition-colors duration-200"
                        style={{ color: '#252520' }}
                      >
                        <span className="font-heading text-xl sm:text-2xl leading-snug">{item.q}</span>
                        <span
                          className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300"
                          style={{
                            background: isOpen ? '#4D6A6D' : '#EAE0CC',
                            color: isOpen ? '#EAE0CC' : '#4D6A6D',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                          aria-hidden="true"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      className="px-5 sm:px-7 pb-6 -mt-1"
                    >
                      <p className="font-light leading-relaxed text-sm sm:text-base" style={{ color: '#798478' }}>
                        {item.a}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClassesPage;
