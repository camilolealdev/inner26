
import React, { useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useTranslation } from '../../i18n/useTranslation';
import { home } from '../../i18n/translations/home';

// Reseñas reales verificadas en Google Business Profile (Inner Spirit Studio, Bogotá).
// Solo se incluyen reseñas completas tal como las dejó cada persona — sin recortar ni
// completar las que Google trunca con "Ver reseña completa".
const testimonialsCO = [
  { id: 1, name: 'Mayra Cárdenas', quote: 'Un lugar precioso, amplio, lleno de plantas, luz y con personas muy amables.', origin: 'Google Reviews • Bogotá', rating: 5 },
  { id: 2, name: 'Zoitsa Noriega', quote: 'Hermoso lugar para las prácticas de cuerpo, siempre limpio, organizado, con energía linda. Es fácil llegar pues está muy cerca a Transmilenio. El servicio es super amable.', origin: 'Google Reviews • Bogotá', rating: 5 },
  { id: 3, name: 'Radharany Romero Ramírez', quote: 'Gracias por la creación de este espacio, que acoge, que abriga. La atención, el lugar, todo fue perfecto.', origin: 'Google Reviews • Bogotá', rating: 5 },
  { id: 4, name: 'sheny matheu', quote: 'Increíble lugar, sobre todo la energía. Lo bien que le hace al alma lugares como éstos, donde se viven grandes momentos.', origin: 'Google Reviews • Bogotá', rating: 5 },
  { id: 5, name: 'lady cardenas', quote: 'Es un lugar increíble donde logras conectar con tu cuerpo, donde sanas, donde te alimentas espiritual y físicamente y además conoces grandes personas que te hacen más lindo el camino de la vida.', origin: 'Google Reviews • Bogotá', rating: 5 },
  { id: 6, name: 'Daniela Piedrahita', quote: 'Hermoso espacio.', origin: 'Google Reviews • Bogotá', rating: 5 },
];

const StarRating = () => (
  <div className="flex gap-1 mb-4" aria-hidden="true">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#C9ADA1">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

const TestimonialsSection: React.FC = () => {
  const { location } = useNavigation();
  const { t } = useTranslation(home);
  const isPt = location === 'pt';
  const list = testimonialsCO;
  const loop = [...list, ...list, ...list];

  // If a live third-party review script (Elfsight / Trustindex) is added in the DOM,
  // this hook can mount or refresh it cleanly.
  useEffect(() => {
    // Check if custom review widget exists in window
    const widgetElement = document.getElementById('google-reviews-live-embed');
    if (widgetElement && (window as unknown as { ElfsightApp?: { init?: () => void } }).ElfsightApp?.init) {
      (window as unknown as { ElfsightApp?: { init?: () => void } }).ElfsightApp?.init?.();
    }
  }, []);

  // Portugal todavía no tiene reseñas propias — nada de testimonios inventados aquí.
  // Este componente solo se monta en HomePage (Colombia); si el visitante cambió la
  // sede a Portugal sin salir del home, mostramos un estado honesto en vez de reciclar
  // las reseñas de Bogotá o inventar unas nuevas.
  if (isPt) {
    return (
      <section
        className="py-14 md:py-20 border-t text-center"
        style={{ background: '#121210', borderColor: 'rgba(77,106,109,0.15)' }}
        aria-label={t('testimonials.honestAriaLabel') as string}
      >
        <div className="is-shell max-w-xl mx-auto">
          <span className="is-eyebrow justify-center" style={{ color: '#8B9A8B' }}>{t('testimonials.honestEyebrow') as string}</span>
          <h2 className="font-heading text-2xl md:text-3xl mt-3 leading-snug" style={{ color: '#FAF7F2' }}>
            {t('testimonials.honestHeading') as string}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-14 md:py-20 overflow-hidden border-t"
      style={{ background: '#121210', borderColor: 'rgba(77,106,109,0.15)' }}
      aria-label={t('testimonials.ariaLabel') as string}
    >
      <div className="is-shell mb-10 text-center">
        <span className="is-eyebrow justify-center" style={{ color: '#8B9A8B' }}>
          {t('testimonials.eyebrow') as string}
        </span>
        <h2 className="font-heading text-2xl md:text-4xl mt-3 leading-snug" style={{ color: '#FAF7F2' }}>
          {t('testimonials.heading') as string}
        </h2>

        {/* Live Google Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 mt-6 p-2.5 px-5 rounded-full border border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <GoogleIcon />
            <span className="text-xs font-semibold uppercase tracking-wider text-white">{t('testimonials.googleReviewsLabel') as string}</span>
          </div>
          <span className="text-xl font-heading font-bold" style={{ color: '#C9ADA1' }}>
            4.9
          </span>
          <div className="flex gap-0.5" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#C9ADA1">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-stone-400">
            {t('testimonials.reviewsCount') as string}
          </span>
          <a
            href="https://maps.google.com/?cid=12076127393282276532"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-wider font-semibold underline text-[#8B9A8B] hover:text-white transition-colors ml-1"
          >
            {t('testimonials.verEnGoogle') as string}
          </a>
        </div>
      </div>

      {/* Container for optional live embed script widget (e.g. Elfsight / Trustindex) */}
      <div id="google-reviews-live-embed" className="max-w-6xl mx-auto px-4 empty:hidden" />

      {/* Infinite Marquee of verified Google Reviews */}
      <div className="relative w-full">
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .marquee-content {
            display: flex;
            width: fit-content;
            animation: marquee 60s linear infinite;
          }
          .marquee-content:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="marquee-content" aria-hidden="true">
          {loop.map((t, i) => (
            <figure
              key={i}
              className="w-[calc(100vw-3rem)] max-w-[360px] md:w-[500px] md:max-w-none px-6 md:px-10 flex flex-col items-center text-center flex-shrink-0"
            >
              <StarRating />
              <blockquote className="font-heading text-lg md:text-xl text-white leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="font-sans text-xs tracking-widest uppercase" style={{ color: '#A0A083' }}>
                {t.name}
                <span className="block text-[10px] mt-1 tracking-normal normal-case flex items-center justify-center gap-1.5" style={{ color: '#8B9A8B' }}>
                  <GoogleIcon /> {t.origin}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Accessible, non-duplicated rendering for screen readers */}
        <ul className="sr-only">
          {list.map((t) => (
            <li key={t.id}>
              &ldquo;{t.quote}&rdquo; — {t.name}, {t.origin}
            </li>
          ))}
        </ul>
      </div>

      {/* Direct link to leave a review */}
      <div className="text-center mt-10">
        <a
          href="https://maps.google.com/?cid=12076127393282276532"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-widest text-stone-400 hover:text-white transition-colors border-b border-stone-600 hover:border-white pb-1"
        >
          {t('testimonials.leaveReview') as string}
        </a>
      </div>
    </section>
  );
};

export default TestimonialsSection;
