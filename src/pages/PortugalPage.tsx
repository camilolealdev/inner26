import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useTranslation } from '../i18n/useTranslation';
import { portugal as portugalTranslations } from '../i18n/translations/portugal';

const IG_URL = 'https://www.instagram.com/innerspirit_portugal';

interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  category: string;
  tag?: string;
}

const PortugalPage: React.FC = () => {
  const { openLocationGate } = useNavigation();
  const { t } = useTranslation(portugalTranslations);
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Accessible Escape key and body scroll lock for lightbox modal
  useEffect(() => {
    if (!activePhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // Auto-focus the close button when dialog opens for screen readers & keyboard navigation
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhoto]);

  const offers = t('volunteer.offers') as string[];
  const asks = t('volunteer.asks') as string[];
  const tasks = t('volunteer.tasks') as string[];

  const territoryPhotoSrcs = [
    '/images/portugal/regiao-nazare-leiria.jpg',
    '/images/portugal/lagoa-ervedeira.jpg',
    '/images/portugal/serras-aire-candeeiros.jpg',
  ];
  const territoryPhotoMeta = t('region.photos') as Array<{
    alt: string;
    category: string;
    tag: string;
    caption: string;
  }>;
  const territoryPhotos: GalleryPhoto[] = territoryPhotoMeta.map((meta, i) => ({
    src: territoryPhotoSrcs[i] ?? '',
    alt: meta.alt,
    category: meta.category,
    tag: meta.tag,
    caption: meta.caption,
  }));

  const handleCardKeyDown = (e: React.KeyboardEvent, photo: GalleryPhoto) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActivePhoto(photo);
    }
  };

  return (
    <div className="bg-[#121210] text-[#FAF7F2] min-h-screen selection:bg-[#C9ADA1]/30 selection:text-[#FAF7F2]">
      {/* Hero Section with Nazaré Coastal Atmosphere */}
      <header className="relative min-h-[80vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 py-24 text-center">
        {/* Background Image of Nazaré Coast */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: "url('/images/portugal/nazare-hero.jpg')" }}
          aria-hidden="true"
        />

        {/* Ambient deep dark gradient overlay for luxury contrast & legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121210]/80 via-[#121210]/85 to-[#121210]" aria-hidden="true" />
        
        {/* Radial ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 35%, rgba(201, 173, 161, 0.22) 0%, rgba(18, 18, 16, 0.95) 75%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-8">
          <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#8B9A8B]/40 bg-[#8B9A8B]/15 text-xs font-sans uppercase tracking-[0.25em] text-[#8B9A8B] backdrop-blur-md">
            <span>🇵🇹 {t('hero.badgeLocation') as string}</span>
            <span className="opacity-40">•</span>
            <span>{t('hero.badgeNear') as string}</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 tracking-tight">
            {t('hero.titleBefore') as string}<span className="italic text-[#C9ADA1]">{t('hero.titleHighlight') as string}</span>{t('hero.titleAfter') as string}
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-light text-stone-300 leading-relaxed mb-10 max-w-2xl">
            {t('hero.description') as string}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[48px] px-8 py-4 rounded-full font-heading text-base tracking-wide uppercase font-semibold transition-all duration-300 shadow-lg hover:opacity-95 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9ADA1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121210] inline-flex items-center justify-center"
              style={{ background: '#C9ADA1', color: '#121210' }}
            >
              {t('hero.ctaApply') as string}
            </a>
            <button
              onClick={openLocationGate}
              className="w-full sm:w-auto min-h-[48px] px-8 py-4 rounded-full font-heading text-base tracking-wide uppercase border border-white/25 hover:border-white/70 transition-all text-white backdrop-blur-sm bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#121210] cursor-pointer inline-flex items-center justify-center"
            >
              {t('hero.ctaSwitch') as string}
            </button>
          </div>
        </div>
      </header>

      {/* Visão do Projeto: Cabanas, Glamping & Bem-Estar */}
      <section aria-labelledby="visao-projeto" className="py-16 md:py-24 border-t border-white/10 bg-[#151513]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual concept render */}
            <div className="lg:col-span-7">
              <figure
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={t('vision.render.ariaLabel') as string}
                onKeyDown={(e) => handleCardKeyDown(e, {
                  src: '/images/portugal/projeto-cabanas-glamping.jpg',
                  alt: t('vision.render.alt') as string,
                  caption: t('vision.render.caption') as string,
                  category: t('vision.render.category') as string,
                  tag: t('vision.render.tag') as string,
                })}
                onClick={() => setActivePhoto({
                  src: '/images/portugal/projeto-cabanas-glamping.jpg',
                  alt: t('vision.render.alt') as string,
                  caption: t('vision.render.caption') as string,
                  category: t('vision.render.category') as string,
                  tag: t('vision.render.tag') as string,
                })}
                className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9ADA1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#151513] transition-all"
              >
                <img
                  src="/images/portugal/projeto-cabanas-glamping.jpg"
                  alt={t('vision.render.imgAlt') as string}
                  className="w-full h-[320px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] uppercase tracking-widest px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#C9ADA1]">
                    {t('vision.render.badge') as string}
                  </span>
                </div>
                <figcaption className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-xs font-mono uppercase text-stone-300 tracking-wider block mb-1">
                    {t('vision.render.captionLabel') as string}
                  </span>
                  <p className="text-sm text-stone-200 font-light">
                    {t('vision.render.captionText') as string}
                  </p>
                </figcaption>
              </figure>
            </div>

            {/* Context and Roadmap description */}
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-[0.25em] font-sans block mb-3 text-[#8B9A8B]">
                {t('vision.eyebrow') as string}
              </span>
              <h2 id="visao-projeto" className="font-heading text-3xl sm:text-4xl text-white mb-5 leading-tight">
                {t('vision.heading') as string}
              </h2>
              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                {t('vision.description') as string}
              </p>
              <div className="space-y-4 border-l-2 border-[#8B9A8B]/40 pl-4 py-1">
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide uppercase">{t('vision.todayTitle') as string}</h3>
                  <p className="text-xs text-stone-400 font-light mt-1">{t('vision.todayDescription') as string}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#C9ADA1] tracking-wide uppercase">{t('vision.nextTitle') as string}</h3>
                  <p className="text-xs text-stone-400 font-light mt-1">{t('vision.nextDescription') as string}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voluntariado — Tarefas com fotos reais de apoio */}
      <section aria-labelledby="voluntariado-heading" className="py-16 md:py-24 border-t border-white/10 bg-[#161614]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-sans block mb-3 text-[#8B9A8B]">
              {t('volunteer.eyebrow') as string}
            </span>
            <h2 id="voluntariado-heading" className="font-heading text-3xl sm:text-4xl text-white mb-6">
              {t('volunteer.heading') as string}
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              {t('volunteer.description') as string}
            </p>
          </div>

          {/* Visual tasks row: Terra vs Remodelação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <figure
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={t('volunteer.terrenoPhoto.ariaLabel') as string}
              onKeyDown={(e) => handleCardKeyDown(e, {
                src: '/images/portugal/nazare-terreno.jpg',
                alt: t('volunteer.terrenoPhoto.alt') as string,
                caption: t('volunteer.terrenoPhoto.caption') as string,
                category: t('volunteer.terrenoPhoto.category') as string,
                tag: t('volunteer.terrenoPhoto.tag') as string,
              })}
              onClick={() => setActivePhoto({
                src: '/images/portugal/nazare-terreno.jpg',
                alt: t('volunteer.terrenoPhoto.alt') as string,
                caption: t('volunteer.terrenoPhoto.caption') as string,
                category: t('volunteer.terrenoPhoto.category') as string,
                tag: t('volunteer.terrenoPhoto.tag') as string,
              })}
              className="relative rounded-xl overflow-hidden border border-white/10 group cursor-pointer h-56 sm:h-64 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B9A8B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161614] transition-all"
            >
              <img
                src="/images/portugal/nazare-terreno.jpg"
                alt={t('volunteer.terrenoPhoto.imgAlt') as string}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <figcaption className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] uppercase tracking-widest text-[#8B9A8B] font-semibold block mb-1">
                  {t('volunteer.terrenoPhoto.label') as string}
                </span>
                <p className="text-xs text-stone-300 font-light">
                  {t('volunteer.terrenoPhoto.description') as string}
                </p>
              </figcaption>
            </figure>

            <figure
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={t('volunteer.remodelacaoPhoto.ariaLabel') as string}
              onKeyDown={(e) => handleCardKeyDown(e, {
                src: '/images/portugal/nazare-remodelacao.jpg',
                alt: t('volunteer.remodelacaoPhoto.alt') as string,
                caption: t('volunteer.remodelacaoPhoto.caption') as string,
                category: t('volunteer.remodelacaoPhoto.category') as string,
                tag: t('volunteer.remodelacaoPhoto.tag') as string,
              })}
              onClick={() => setActivePhoto({
                src: '/images/portugal/nazare-remodelacao.jpg',
                alt: t('volunteer.remodelacaoPhoto.alt') as string,
                caption: t('volunteer.remodelacaoPhoto.caption') as string,
                category: t('volunteer.remodelacaoPhoto.category') as string,
                tag: t('volunteer.remodelacaoPhoto.tag') as string,
              })}
              className="relative rounded-xl overflow-hidden border border-white/10 group cursor-pointer h-56 sm:h-64 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9ADA1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161614] transition-all"
            >
              <img
                src="/images/portugal/nazare-remodelacao.jpg"
                alt={t('volunteer.remodelacaoPhoto.imgAlt') as string}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <figcaption className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] uppercase tracking-widest text-[#C9ADA1] font-semibold block mb-1">
                  {t('volunteer.remodelacaoPhoto.label') as string}
                </span>
                <p className="text-xs text-stone-300 font-light">
                  {t('volunteer.remodelacaoPhoto.description') as string}
                </p>
              </figcaption>
            </figure>
          </div>

          {/* Cards of details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-[#1C1C19]">
              <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-white/15 text-stone-400 bg-white/5">{t('volunteer.tasksLabel') as string}</span>
              <ul className="mt-4 space-y-2.5">
                {tasks.map((task) => (
                  <li key={task} className="text-stone-300 font-light text-sm leading-relaxed flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: '#8B9A8B' }} aria-hidden="true" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-[#1C1C19]">
              <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-white/15 text-stone-400 bg-white/5">{t('volunteer.offersLabel') as string}</span>
              <ul className="mt-4 space-y-2.5">
                {offers.map((o) => (
                  <li key={o} className="text-stone-300 font-light text-sm leading-relaxed flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: '#C9ADA1' }} aria-hidden="true" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-[#1C1C19]">
              <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-white/15 text-stone-400 bg-white/5">{t('volunteer.asksLabel') as string}</span>
              <ul className="mt-4 space-y-2.5">
                {asks.map((a) => (
                  <li key={a} className="text-stone-300 font-light text-sm leading-relaxed flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: '#8B9A8B' }} aria-hidden="true" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center text-xs font-semibold uppercase tracking-widest text-[#8B9A8B] hover:text-[#FAF7F2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B9A8B] rounded px-3 py-2"
            >
              <span>{t('volunteer.applyViaInstagram') as string}</span>
              <svg className="w-3.5 h-3.5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Onde Estamos & O Território da Nazaré / Costa de Leiria */}
      <section aria-labelledby="regiao-heading" className="py-16 md:py-24 border-t border-white/10 bg-[#131311]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-sans block mb-3 text-[#C9ADA1]">
              {t('region.eyebrow') as string}
            </span>
            <h2 id="regiao-heading" className="font-heading text-3xl sm:text-4xl text-white mb-5">
              {t('region.heading') as string}
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              {t('region.description') as string}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {territoryPhotos.map((photo) => (
              <figure 
                key={photo.src}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`${t('region.viewDetailsPrefix') as string} ${photo.tag}`}
                onKeyDown={(e) => handleCardKeyDown(e, photo)}
                onClick={() => setActivePhoto(photo)}
                className="group rounded-2xl overflow-hidden border border-white/10 bg-[#1A1A17] flex flex-col cursor-pointer transition-all duration-300 hover:border-white/30 hover:translate-y-[-2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9ADA1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131311]"
              >
                <div className="relative h-64 overflow-hidden bg-black/40">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[#8B9A8B]">
                      {photo.tag}
                    </span>
                  </div>
                </div>
                <figcaption className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-2 font-mono">
                      {photo.category}
                    </span>
                    <p className="text-sm text-stone-300 font-light leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-stone-400 group-hover:text-[#C9ADA1] transition-colors">
                    <span>{t('region.viewEnlarged') as string}</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Comunidade em construção — honesto sobre o estágio atual */}
      <section aria-labelledby="comunidade-heading" className="py-16 md:py-24 border-t border-white/10 bg-[#121210]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-sans block mb-3 text-[#C9ADA1]">
            {t('community.eyebrow') as string}
          </span>
          <h2 id="comunidade-heading" className="font-heading text-3xl sm:text-4xl text-white mb-5">
            {t('community.heading') as string}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            {t('community.description') as string}
          </p>
        </div>
      </section>

      {/* Contact Section — Instagram é o canal oficial */}
      <section aria-labelledby="contacto-heading" className="py-20 border-t border-white/10 bg-[#191916] text-center px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.28em] font-sans block mb-3 text-[#8B9A8B]">
            {t('contact.eyebrow') as string}
          </span>
          <h2 id="contacto-heading" className="font-heading text-3xl sm:text-4xl text-white mb-4">
            {t('contact.heading') as string}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light mb-8 leading-relaxed">
            {t('contact.description') as string}
          </p>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] inline-flex items-center justify-center px-10 py-4 rounded-full font-heading text-sm tracking-widest uppercase font-semibold text-[#121210] bg-[#FAF7F2] hover:bg-[#EAE0CC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#191916]"
          >
            {t('contact.cta') as string}
          </a>
        </div>
      </section>

      {/* Lightbox Modal for Photo viewing (Accessible Dialog) */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.alt}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#181815] border border-white/20 rounded-2xl overflow-hidden shadow-2xl focus:outline-none"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <button
              ref={closeButtonRef}
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center text-base border border-white/20 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9ADA1]"
              aria-label={t('lightbox.close') as string}
            >
              ✕
            </button>
            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="p-5 sm:p-6 bg-[#181815] border-t border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest text-[#8B9A8B] font-mono">
                  {activePhoto.category}
                </span>
                {activePhoto.tag && (
                  <span className="text-xs text-stone-400">• {activePhoto.tag}</span>
                )}
              </div>
              <p className="text-sm text-stone-200 font-light">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortugalPage;
