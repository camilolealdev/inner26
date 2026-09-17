import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import InstagramFeedEmbed from '../modules/events/components/InstagramFeedEmbed';
import { useTranslation } from '../i18n/useTranslation';
import { community } from '../i18n/translations/community';

// Mismas reseñas reales verificadas en Google Business Profile que usa
// TestimonialsSection.tsx — reutilizadas tal cual, sin inventar categorías de
// servicio por reseña (ese dato no existe en la fuente original).
const REVIEWS = [
  {
    id: 1,
    author: 'Mayra Cárdenas',
    rating: 5,
    text: 'Un lugar precioso, amplio, lleno de plantas, luz y con personas muy amables. La energía se siente desde que cruzas la puerta.',
    date: 'Google Reviews • Bogotá',
  },
  {
    id: 2,
    author: 'Zoitsa Noriega',
    rating: 5,
    text: 'Hermoso lugar para las prácticas de cuerpo, siempre limpio, organizado, con energía linda. Es fácil llegar pues está muy cerca a Transmilenio. El servicio es super amable.',
    date: 'Google Reviews • Bogotá',
  },
  {
    id: 3,
    author: 'Radharany Romero Ramírez',
    rating: 5,
    text: 'Gracias por la creación de este espacio, que acoge, que abriga. La atención, el lugar, todo fue perfecto.',
    date: 'Google Reviews • Bogotá',
  },
  {
    id: 4,
    author: 'sheny matheu',
    rating: 5,
    text: 'Increíble lugar, sobre todo la energía. Lo bien que le hace al alma lugares como éstos, donde se viven grandes momentos.',
    date: 'Google Reviews • Bogotá',
  },
  {
    id: 5,
    author: 'lady cardenas',
    rating: 5,
    text: 'Es un lugar increíble donde logras conectar con tu cuerpo, donde sanas, donde te alimentas espiritual y físicamente y además conoces grandes personas que te hacen más lindo el camino de la vida.',
    date: 'Google Reviews • Bogotá',
  },
  {
    id: 6,
    author: 'Daniela Piedrahita',
    rating: 5,
    text: 'Hermoso espacio.',
    date: 'Google Reviews • Bogotá',
  },
];

const CommunityPage: React.FC = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation(community);
  const pillars = t('pillars') as { title: string; desc: string }[];

  return (
    <div className="animate-fade-in-up bg-[#FAF7F2] text-[#1E1B16]">
      {/* Hero */}
      <section className="is-page-section is-section--sand text-center py-16 md:py-24">
        <div className="is-shell max-w-4xl mx-auto">
          <span className="is-eyebrow justify-center" style={{ color: '#4D6A6D' }}>
            {t('hero.eyebrow') as string}
          </span>
          <h1 className="is-display text-4xl sm:text-6xl md:text-7xl mt-4 leading-tight">
            {t('hero.title') as string}
          </h1>
          <p className="is-page-lead max-w-2xl mx-auto mt-6 text-stone-600">
            {t('hero.lead') as string}
          </p>

          {/* Social Proof Metric Badge */}
          <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-6 px-6 py-3.5 rounded-2xl bg-white/80 border border-stone-200/80 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="font-heading text-2xl font-bold text-stone-900">4.9</span>
              <div className="flex text-amber-500" aria-label={t('hero.ratingLabel') as string}>
                {'★★★★★'}
              </div>
            </div>
            <div className="h-4 w-px bg-stone-300 hidden sm:block" />
            <p className="text-xs sm:text-sm font-medium text-stone-700">
              {t('hero.reviewsBadge') as string}
            </p>
            <div className="h-4 w-px bg-stone-300 hidden sm:block" />
            <a
              href="https://instagram.com/innerspirit_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-semibold text-[#4D6A6D] hover:underline"
            >
              @innerspirit_studio
            </a>
          </div>
        </div>
      </section>

      {/* Grid de Pilares Comunitarios */}
      <section className="is-section py-16 border-t border-stone-200/60 bg-white">
        <div className="is-shell">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((col) => (
              <div
                key={col.title}
                className="p-8 rounded-2xl border"
                style={{
                  background: '#FAF7F2',
                  borderColor: 'rgba(201, 173, 161, 0.3)',
                }}
              >
                <div className="w-8 h-8 rounded-full bg-[#8B9A8B]/20 flex items-center justify-center text-[#4D6A6D] font-serif font-bold text-sm mb-4">
                  ✦
                </div>
                <h3 className="font-heading text-2xl text-stone-900 mb-2">{col.title}</h3>
                <p className="text-sm font-light text-stone-600 leading-relaxed">{col.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feed real de Instagram — mismo widget Behold.so usado en Eventos */}
      <section className="is-section py-20" style={{ background: '#FAF7F2' }}>
        <div className="is-shell">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="is-eyebrow justify-center" style={{ color: '#4D6A6D' }}>
              {t('instagram.eyebrow') as string}
            </span>
            <h2 className="is-display text-3xl sm:text-5xl text-stone-900 mt-2">
              {t('instagram.title') as string}
            </h2>
            <p className="text-sm text-stone-600 font-light mt-3">
              {t('instagram.subtitle') as string}
            </p>
          </div>

          <InstagramFeedEmbed />
        </div>
      </section>

      {/* Testimonios Verificados Google 4.9★ */}
      <section className="is-section py-20 bg-white border-t border-stone-200/60">
        <div className="is-shell">
          <div className="max-w-3xl mb-14">
            <span className="is-eyebrow" style={{ color: '#4D6A6D' }}>
              {t('testimonials.eyebrow') as string}
            </span>
            <h2 className="is-display text-3xl sm:text-5xl text-stone-900 mt-2">
              {t('testimonials.title') as string}
            </h2>
            <p className="text-sm text-stone-600 font-light mt-3">
              {t('testimonials.subtitle') as string}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-7 rounded-2xl border flex flex-col justify-between"
                style={{
                  background: '#FAF7F2',
                  borderColor: 'rgba(201, 173, 161, 0.3)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-500 text-xs">
                      {'★'.repeat(rev.rating)}
                    </div>
                    <span className="text-[11px] text-stone-500 font-mono">{rev.date}</span>
                  </div>
                  <p className="text-stone-800 text-sm font-light leading-relaxed mb-6 italic">
                    "{rev.text}"
                  </p>
                </div>
                <div className="border-t border-stone-200 pt-3">
                  <p className="font-heading text-base text-stone-900">{rev.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA para unirse a la Tribu */}
      <section
        className="is-section py-20 text-center text-white"
        style={{ background: 'linear-gradient(150deg, #1E1B16 0%, #121210 100%)' }}
      >
        <div className="is-shell max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9ADA1] block mb-3 font-medium">
            {t('cta.eyebrow') as string}
          </span>
          <h2 className="is-display text-3xl sm:text-5xl text-white mb-5">
            {t('cta.title') as string}
          </h2>
          <p className="text-sm sm:text-base font-light text-stone-300 leading-relaxed mb-8">
            {t('cta.description') as string}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/573212248261?text=Hola%2C%20quiero%20unirme%20al%20grupo%20comunitario%20de%20Inner%20Spirit."
              target="_blank"
              rel="noopener noreferrer"
              className="is-action is-action--light w-full sm:w-auto px-8 py-3.5"
            >
              {t('cta.joinWhatsapp') as string}
            </a>
            <button
              onClick={() => navigate('eventos')}
              className="is-action is-action--ghost text-white w-full sm:w-auto px-8 py-3.5"
            >
              {t('cta.viewEvents') as string}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
