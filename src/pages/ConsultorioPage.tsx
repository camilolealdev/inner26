
import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useTranslation } from '../i18n/useTranslation';
import { homePages } from '../i18n/translations/homePages';

// Íconos SVG por modalidad — el copy (label/desc) viene de
// homePages.consultorio.modalities, en el mismo orden.
const modalityIcons = [
  <path key="yoga" d="M12 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6 11h12M12 8v4m0 0-3 8m3-8 3 8" />,
  <React.Fragment key="meditation"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" /></React.Fragment>,
  <path key="breathwork" d="M12 20c4-3 7-6 7-10a4 4 0 0 0-7-2.6A4 4 0 0 0 5 10c0 4 3 7 7 10Z" />,
  <React.Fragment key="art">
    <path d="M12 3a9 9 0 0 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7Z" />
    <circle cx="8" cy="11" r="1" /><circle cx="12" cy="8" r="1" /><circle cx="16" cy="11" r="1" />
  </React.Fragment>,
];

const ConsultorioPage: React.FC = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation(homePages);
  const modalities = t('consultorio.modalities') as { label: string; desc: string }[];
  const howSteps = t('consultorio.howSteps') as { n: string; t: string; d: string }[];

  return (
    <div className="animate-fade-in-up">
      <section className="relative is-page-section bg-stone-900 text-white overflow-hidden">
         <div className="absolute inset-0 bg-black/60"></div>
        <div className="is-shell relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-semibold">{t('consultorio.heading') as string}</h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-stone-200 leading-relaxed">
            {t('consultorio.lead') as string}
          </p>
        </div>
      </section>

      <section className="is-page-section bg-base">
        <div className="is-shell max-w-3xl text-center">
            <div className="text-lg text-base-text leading-relaxed space-y-8">
                <p>{t('consultorio.intro1') as string}</p>
                <p>
                {t('consultorio.intro2') as string}
                </p>
                <p>
                {t('consultorio.intro3') as string}
                </p>
                <p className="font-semibold text-accent text-2xl font-heading">{t('consultorio.intro4') as string}</p>
            </div>
        </div>

        {/* Modalidades 1:1 */}
        <div className="is-shell mt-20 md:mt-24">
          <div className="text-center mb-10">
            <span className="is-eyebrow justify-center" style={{ color: '#4D6A6D' }}>{t('consultorio.modalitiesEyebrow') as string}</span>
            <h2 className="is-display text-3xl sm:text-4xl mt-4" style={{ color: '#252520' }}>{t('consultorio.modalitiesHeading') as string}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {modalities.map((item, index) => (
              <div
                key={item.label}
                className="px-6 py-7 rounded-sm text-left"
                style={{ background: '#FAF7F2', border: '1px solid #EAE0CC' }}
              >
                <span
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{ background: '#EAE0CC', color: '#4D6A6D' }}
                  aria-hidden="true"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    {modalityIcons[index]}
                  </svg>
                </span>
                <h3 className="font-heading text-2xl mb-2" style={{ color: '#252520' }}>{item.label}</h3>
                <p className="font-light text-sm leading-relaxed" style={{ color: '#798478' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cómo funciona */}
        <div className="is-shell mt-20 md:mt-24">
          <div className="text-center mb-10">
            <span className="is-eyebrow justify-center" style={{ color: '#4D6A6D' }}>{t('consultorio.howEyebrow') as string}</span>
            <h2 className="is-display text-3xl sm:text-4xl mt-4" style={{ color: '#252520' }}>{t('consultorio.howHeading') as string}</h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto list-none">
            {howSteps.map((step) => (
              <li
                key={step.n}
                className="px-6 py-7 rounded-sm"
                style={{ background: '#F3EDE2', border: '1px solid #EAE0CC' }}
              >
                <span className="font-mono text-sm tracking-[0.2em]" style={{ color: '#A0A083' }}>{step.n}</span>
                <h3 className="font-heading text-2xl mt-3 mb-2" style={{ color: '#252520' }}>{step.t}</h3>
                <p className="font-light text-sm leading-relaxed" style={{ color: '#798478' }}>{step.d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contacto"
              onClick={(e) => { e.preventDefault(); navigate('contacto'); }}
              className="is-action"
              style={{ background: '#4D6A6D', color: '#EAE0CC' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#3d5557'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#4D6A6D'; }}
            >
              {t('consultorio.ctaTalk') as string}
            </a>
            <a
              href="https://wa.me/573212248261?text=Hola%2C%20me%20interesa%20una%20sesi%C3%B3n%20individual%20en%20el%20consultorio"
              target="_blank"
              rel="noopener noreferrer"
              className="is-action is-action--ghost"
            >
              {t('consultorio.ctaWhatsapp') as string}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsultorioPage;
