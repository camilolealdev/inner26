import React from 'react';
import { Surface } from '../../ui';

// Mismas reseñas reales verificadas de Google Business Profile (Inner Spirit Studio, Bogotá)
// ya usadas en TestimonialsSection.tsx — copiadas tal cual, sin alterar ni inventar.
const reviews = [
  { id: 1, name: 'Mayra Cárdenas', quote: 'Un lugar precioso, amplio, lleno de plantas, luz y con personas muy amables.', origin: 'Google Reviews • Bogotá', rating: 5 },
  { id: 3, name: 'Radharany Romero Ramírez', quote: 'Gracias por la creación de este espacio, que acoge, que abriga. La atención, el lugar, todo fue perfecto.', origin: 'Google Reviews • Bogotá', rating: 5 },
  { id: 5, name: 'lady cardenas', quote: 'Es un lugar increíble donde logras conectar con tu cuerpo, donde sanas, donde te alimentas espiritual y físicamente y además conoces grandes personas que te hacen más lindo el camino de la vida.', origin: 'Google Reviews • Bogotá', rating: 5 },
];

const StarRating: React.FC = () => (
  <div className="flex gap-1 mb-4" aria-hidden="true">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#C9ADA1">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const GoogleIcon: React.FC = () => (
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

const GoogleReviewsSection: React.FC = () => {
  return (
    <section id="resenas" className="is-section is-section--sand" aria-label="Reseñas de Google">
      <div className="is-shell">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="is-eyebrow justify-center">Lo que dice la comunidad</span>
          <h2 className="is-display text-4xl sm:text-5xl md:text-6xl mt-4">
            Reseñas reales en Google
          </h2>
          <div className="inline-flex items-center justify-center gap-2 mt-6 p-2.5 px-5 rounded-full border border-ink/10">
            <GoogleIcon />
            <span className="font-heading text-xl font-bold text-ink">4.9★</span>
            <span className="is-copy text-sm">en Google · 162 reseñas</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {reviews.map((r) => (
            <Surface key={r.id} className="p-6 md:p-8 text-left">
              <StarRating />
              <blockquote className="font-heading text-lg text-ink leading-relaxed mb-4">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="font-sans text-xs tracking-widest uppercase text-muted">
                {r.name}
                <span className="block text-[10px] mt-1 tracking-normal normal-case flex items-center gap-1.5 text-muted-light">
                  <GoogleIcon /> {r.origin}
                </span>
              </figcaption>
            </Surface>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://maps.google.com/maps?cid=12076127393282276532"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors border-b border-ink/20 hover:border-ink pb-1"
          >
            Ver todas las reseñas en Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;
