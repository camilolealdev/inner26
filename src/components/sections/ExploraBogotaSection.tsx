import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useTranslation } from '../../i18n/useTranslation';
import { home } from '../../i18n/translations/home';

interface Excursion {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  level: string;
  description: string;
  imageUrl: string;
  highlights: readonly string[];
  whatsappMessage: string;
}

// Imagen y clave del diccionario por excursión — el texto viene de
// home.explora.excursions.<key> (title/subtitle/location/duration/level/
// description/highlights/whatsappMessage).
const EXCURSION_META = [
  { key: 'monserrate' as const, id: 'monserrate', imageUrl: '/images/excursions/monserrate-amanecer.jpg' },
  { key: 'guatavita' as const, id: 'guatavita', imageUrl: '/images/excursions/guatavita-ancestral.jpg' },
  { key: 'laChorrera' as const, id: 'la-chorrera', imageUrl: '/images/excursions/la-chorrera-cascada.jpg' },
];

const HUB_FACET_META = [
  { key: 'espacio' as const, page: 'espacio' as const },
  { key: 'consultorio' as const, page: 'consultorio' as const },
  { key: 'eventos' as const, page: 'eventos' as const },
];

const ExploraBogotaSection: React.FC = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation(home);

  const EXCURSIONES: Excursion[] = EXCURSION_META.map((meta) => ({
    id: meta.id,
    imageUrl: meta.imageUrl,
    ...(t(`explora.excursions.${meta.key}`) as Omit<Excursion, 'id' | 'imageUrl'>),
  }));

  const HUB_FACETS = HUB_FACET_META.map((meta) => ({
    page: meta.page,
    ...(t(`explora.hubFacets.${meta.key}`) as { title: string; tag: string; desc: string; cta: string }),
  }));

  return (
    <section className="is-section is-section--paper" aria-labelledby="explora-bogota-title">
      <div className="is-shell">
        {/* Encabezado de sección */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="is-eyebrow" style={{ color: '#4D6A6D' }}>
            {t('explora.eyebrow') as string}
          </span>
          <h2 id="explora-bogota-title" className="is-display text-4xl sm:text-5xl md:text-6xl mt-4">
            {t('explora.title') as string}
          </h2>
          <p className="is-copy mt-5 text-base sm:text-lg leading-relaxed text-stone-700">
            {t('explora.intro') as string}
          </p>
        </div>

        {/* Grid de las 3 excursiones conscientes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {EXCURSIONES.map((exc) => {
            const waHref = `https://wa.me/573212248261?text=${encodeURIComponent(exc.whatsappMessage)}`;
            return (
              <article
                key={exc.id}
                className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: 'rgba(201, 173, 161, 0.35)',
                }}
              >
                {/* Imagen con overlay sutil */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
                  <img
                    src={exc.imageUrl}
                    alt={exc.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(18, 18, 16, 0.7) 0%, rgba(18, 18, 16, 0) 50%)',
                    }}
                  />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider backdrop-blur-md"
                      style={{ background: 'rgba(250, 247, 242, 0.9)', color: '#1E1B16' }}
                    >
                      {exc.duration}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider backdrop-blur-md"
                      style={{ background: 'rgba(30, 27, 22, 0.8)', color: '#FAF7F2' }}
                    >
                      {exc.level}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-xs uppercase tracking-widest text-stone-300 font-sans">{exc.location}</p>
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="flex-1 flex flex-col p-6 sm:p-7">
                  <h3 className="font-heading text-2xl text-stone-900 mb-1">{exc.title}</h3>
                  <p className="text-xs font-medium uppercase tracking-wider mb-4" style={{ color: '#4D6A6D' }}>
                    {exc.subtitle}
                  </p>
                  <p className="text-sm font-light text-stone-600 leading-relaxed mb-6 flex-1">
                    {exc.description}
                  </p>

                  <div className="border-t pt-4 mb-6" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 mb-2.5">
                      {t('explora.includesLabel') as string}
                    </p>
                    <ul className="space-y-2">
                      {exc.highlights.map((h) => (
                        <li key={h} className="text-xs text-stone-600 flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#8B9A8B' }} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="is-action w-full justify-center text-center text-xs py-3"
                  >
                    {t('explora.consultCta') as string}
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Módulo conector: El Hub Completo de Bogotá */}
        <div
          className="rounded-2xl p-8 sm:p-10 border text-stone-900"
          style={{
            background: 'linear-gradient(140deg, rgba(234, 224, 204, 0.45) 0%, rgba(201, 173, 161, 0.2) 100%)',
            borderColor: 'rgba(201, 173, 161, 0.4)',
          }}
        >
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: '#4D6A6D' }}>
              {t('explora.hubEyebrow') as string}
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl mt-2 text-stone-900">
              {t('explora.hubTitle') as string}
            </h3>
            <p className="text-sm text-stone-600 mt-2 font-light">
              {t('explora.hubIntro') as string}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HUB_FACETS.map((facet) => (
              <div
                key={facet.title}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border flex flex-col justify-between"
                style={{ borderColor: 'rgba(255,255,255,0.6)' }}
              >
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
                    {facet.tag}
                  </span>
                  <h4 className="font-heading text-xl text-stone-900 mt-1 mb-2">{facet.title}</h4>
                  <p className="text-xs text-stone-600 font-light leading-relaxed mb-6">{facet.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(facet.page)}
                  className="is-action is-action--ghost text-xs w-full justify-center"
                >
                  {facet.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploraBogotaSection;
