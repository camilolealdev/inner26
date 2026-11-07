import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { rafflePopupConfig } from '../../config/rafflePopup';
import { useTranslation } from '../../i18n/useTranslation';

const dismissedKey = (id: string) => `inner_spirit_raffle_${id}_dismissed_at`;

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const RafflePopupModal: React.FC = () => {
  const { page, isLocationGateOpen } = useNavigation();
  const { t } = useTranslation();
  const config = rafflePopupConfig;

  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!config.enabled) return;

    // The landing page is a self-contained funnel with its own WhatsApp CTA — never interrupt it.
    if (page === 'landing') return;

    const isAllowedPage =
      config.pages === 'all'
        ? page !== '404'
        : Array.isArray(config.pages) && config.pages.includes(page);
    if (!isAllowedPage) return;

    if (isLocationGateOpen) return;
    if (typeof window === 'undefined') return;

    const dismissedAt = Number(localStorage.getItem(dismissedKey(config.id)) || 0);
    if (dismissedAt) {
      const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
      if (daysSince < config.reshowAfterDays) return;
    }

    let triggered = false;
    const triggerOpen = () => {
      if (triggered) return;
      triggered = true;
      setIsOpen(true);
    };

    // 1. Disparador por tiempo
    const timer = setTimeout(triggerOpen, config.delayMs);

    // 2. Disparador por roll over / scroll porcentual
    const scrollThreshold = config.scrollPercentTrigger ?? 30;
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        const percent = (scrollTop / scrollHeight) * 100;
        if (percent >= scrollThreshold) {
          triggerOpen();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, isLocationGateOpen, config]);

  const handleDismiss = React.useCallback(() => {
    localStorage.setItem(dismissedKey(config.id), String(Date.now()));
    setIsOpen(false);
  }, [config.id]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleDismiss();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleDismiss]);

  if (!config.enabled || !isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center overflow-y-auto p-3 sm:p-6"
      style={{
        backgroundColor: 'rgba(18, 18, 16, 0.82)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="raffle-popup-title"
        aria-describedby="raffle-popup-description"
        tabIndex={-1}
        className="relative grid w-full max-w-3xl max-h-[92vh] grid-rows-[auto_minmax(0,1fr)] md:grid-rows-1 md:grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-[26px] border shadow-2xl outline-none animate-in fade-in zoom-in-95 duration-500"
        style={{
          background: 'linear-gradient(160deg, #201C17 0%, #14120F 100%)',
          borderColor: 'rgba(201, 173, 161, 0.28)',
          color: '#FAF7F2',
        }}
      >
        <button
          onClick={handleDismiss}
          aria-label={t('raffle.close') as string}
          className="absolute right-3 top-3 z-30 rounded-full bg-black/50 p-2 text-stone-300 backdrop-blur-md transition-colors hover:bg-black/75 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9ADA1]"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Panel visual */}
        <div className="relative h-36 overflow-hidden bg-[#181512] sm:h-44 md:h-auto">
          {config.imageUrl ? (
            <img
              src={config.imageUrl}
              alt="Cuenco tibetano artesanal con su baqueta de madera y cojín de soporte"
              className="h-full w-full object-cover object-center"
              loading="eager"
              width={720}
              height={960}
            />
          ) : null}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(18,18,16,0.05) 0%, rgba(18,18,16,0.35) 55%, rgba(20,18,15,0.95) 100%)',
            }}
          />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <span
              className="inline-block rounded-full border px-3 py-1 text-[10px] font-sans font-medium uppercase tracking-[0.25em] backdrop-blur-md"
              style={{
                background: 'rgba(30, 27, 22, 0.72)',
                borderColor: 'rgba(201, 173, 161, 0.42)',
                color: '#EAE0CC',
              }}
            >
              {config.eyebrow}
            </span>
            <p className="mt-3 hidden max-w-[15rem] font-heading text-lg leading-snug text-[#EDE5D8] md:block">
              Un ritual de calma para tus días
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="overflow-y-auto overscroll-contain px-5 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-8">
          <h2
            id="raffle-popup-title"
            className="pr-10 font-heading text-2xl leading-tight sm:text-[28px]"
            style={{ color: '#FAF7F2' }}
          >
            {config.title}
          </h2>
          <p
            id="raffle-popup-description"
            className="mt-2.5 text-sm font-light leading-relaxed text-stone-300"
          >
            {config.description}
          </p>

          <section className="mt-5 rounded-xl border p-4" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
            <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em]" style={{ color: '#C9ADA1' }}>
              {config.prizeLabel}
            </h3>
            <ul className="mt-2.5 space-y-1.5">
              {config.prizeItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] leading-snug text-stone-200">
                  <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#8B9A8B" strokeWidth={2.2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-5">
            <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em]" style={{ color: '#C9ADA1' }}>
              Cómo participar
            </h3>
            <ol className="mt-3 space-y-3">
              {config.steps.map((step, index) => (
                <li key={step.title} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-sans text-[11px] font-semibold tabular-nums"
                    style={{ borderColor: 'rgba(201,173,161,0.45)', color: '#EAE0CC' }}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-medium leading-snug text-[#F3EDE2]">{step.title}</p>
                    {step.detail && (
                      <p className="mt-0.5 text-xs font-light leading-relaxed text-stone-400">{step.detail}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {config.bonusNote && (
            <p
              className="mt-4 rounded-lg border px-3 py-2.5 text-xs leading-relaxed"
              style={{
                borderColor: 'rgba(139,154,139,0.35)',
                background: 'rgba(139,154,139,0.1)',
                color: '#D9E0D6',
              }}
            >
              🧿 {config.bonusNote}
            </p>
          )}

          <a
            href={config.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="is-action is-action--light mt-5 flex w-full items-center justify-center gap-2"
          >
            <InstagramIcon className="h-4 w-4" />
            {config.ctaLabel}
          </a>
          <p className="mt-2 text-center text-[11px] uppercase tracking-[0.18em] text-stone-400">
            {config.instagramHandle}
          </p>

          <div className="mt-5 space-y-1.5 border-t pt-4 text-[11px] leading-relaxed text-stone-400" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <p>
              <span className="uppercase tracking-[0.14em]" style={{ color: '#C9ADA1' }}>Resultado:</span>{' '}
              {config.deadlineLabel}, anunciado en nuestras redes.
            </p>
            {config.locationNote && <p>{config.locationNote}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RafflePopupModal;
