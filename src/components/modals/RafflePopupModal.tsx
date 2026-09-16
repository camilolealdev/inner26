import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useToast } from '../../context/ToastContext';
import { submitLead } from '../../utils/leads';
import { rafflePopupConfig } from '../../config/rafflePopup';

const enteredKey = (id: string) => `inner_spirit_raffle_${id}_entered`;
const dismissedKey = (id: string) => `inner_spirit_raffle_${id}_dismissed_at`;

const RafflePopupModal: React.FC = () => {
  const { page, isLocationGateOpen } = useNavigation();
  const { showToast } = useToast();
  const config = rafflePopupConfig;

  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', consent: false, honeypot: '' });

  useEffect(() => {
    if (!config.enabled) return;
    if (!config.pages.includes(page)) return;
    if (isLocationGateOpen) return;
    if (typeof window === 'undefined') return;

    if (localStorage.getItem(enteredKey(config.id))) return;

    const dismissedAt = Number(localStorage.getItem(dismissedKey(config.id)) || 0);
    if (dismissedAt) {
      const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
      if (daysSince < config.reshowAfterDays) return;
    }

    const timer = setTimeout(() => setIsOpen(true), config.delayMs);
    return () => clearTimeout(timer);
  }, [page, isLocationGateOpen, config]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleDismiss();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!config.enabled || !isOpen) return null;

  const handleDismiss = () => {
    localStorage.setItem(dismissedKey(config.id), String(Date.now()));
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    if (!form.consent) {
      showToast('Debes aceptar la política de privacidad para participar.', 'error');
      return;
    }
    if (form.name.trim().length < 2) {
      showToast('Cuéntanos tu nombre para inscribirte.', 'error');
      return;
    }

    submitLead({
      source: 'raffle',
      name: form.name.trim(),
      email: form.email.trim(),
      ...(form.phone.trim() ? { phone: form.phone.trim() } : {}),
      interest: config.title,
      consent: true,
    });

    localStorage.setItem(enteredKey(config.id), String(Date.now()));
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="raffle-popup-title"
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
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
        className="relative w-full max-w-md rounded-2xl p-6 sm:p-9 text-center border shadow-2xl animate-in fade-in zoom-in-95 duration-500"
        style={{
          background: 'linear-gradient(150deg, #1E1B16 0%, #121210 100%)',
          borderColor: 'rgba(201, 173, 161, 0.3)',
          color: '#FAF7F2',
        }}
      >
        <button
          onClick={handleDismiss}
          aria-label="Cerrar"
          className="absolute top-4 right-4 p-2.5 rounded-full text-stone-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="py-6">
            <div className="text-4xl mb-4" aria-hidden="true">🎉</div>
            <h2 id="raffle-popup-title" className="font-heading text-2xl mb-3">
              {config.successTitle}
            </h2>
            <p className="text-sm text-stone-300 font-light leading-relaxed mb-6">{config.successMessage}</p>
            <button
              onClick={handleDismiss}
              className="is-action is-action--light"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <span className="text-xs uppercase tracking-[0.28em] font-sans font-medium" style={{ color: '#C9ADA1' }}>
              {config.eyebrow}
            </span>
            <h2 id="raffle-popup-title" className="font-heading text-2xl sm:text-3xl mt-3 mb-3 leading-snug">
              {config.title}
            </h2>
            <p className="text-sm font-light text-stone-300 leading-relaxed mb-5">{config.description}</p>

            <div
              className="rounded-xl border p-4 mb-6 text-left"
              style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
            >
              <p className="text-sm font-semibold mb-2" style={{ color: '#EAE0CC' }}>{config.prizeLabel}</p>
              <ul className="space-y-1.5">
                {config.bullets.map((b) => (
                  <li key={b} className="text-xs text-stone-400 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: '#8B9A8B' }} />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] uppercase tracking-widest mt-3" style={{ color: '#8B9A8B' }}>
                {config.deadlineLabel}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <input
                type="text"
                name="honeypot"
                value={form.honeypot}
                onChange={(e) => setForm((p) => ({ ...p, honeypot: e.target.value }))}
                className="hidden"
                aria-hidden="true"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label htmlFor="raffle-name" className="sr-only">Tu nombre</label>
                <input
                  id="raffle-name"
                  type="text"
                  placeholder="Tu nombre"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-transparent border-b py-2.5 text-base outline-none transition-colors placeholder-stone-500 focus:border-[#C9ADA1]"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                />
              </div>

              <div>
                <label htmlFor="raffle-email" className="sr-only">Tu correo</label>
                <input
                  id="raffle-email"
                  type="email"
                  placeholder="Tu correo electrónico"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full bg-transparent border-b py-2.5 text-base outline-none transition-colors placeholder-stone-500 focus:border-[#C9ADA1]"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                />
              </div>

              <div>
                <label htmlFor="raffle-phone" className="sr-only">Tu WhatsApp</label>
                <input
                  id="raffle-phone"
                  type="tel"
                  placeholder="Tu WhatsApp (opcional)"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full bg-transparent border-b py-2.5 text-base outline-none transition-colors placeholder-stone-500 focus:border-[#C9ADA1]"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                />
              </div>

              <label className="flex items-start gap-2.5 text-xs text-stone-400 pt-1">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(e) => setForm((p) => ({ ...p, consent: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ accentColor: '#C9ADA1' }}
                />
                <span>
                  Autorizo el tratamiento de mis datos según la{' '}
                  {config.termsUrl ? (
                    <a href={config.termsUrl} className="underline hover:text-white">política de privacidad</a>
                  ) : (
                    'política de privacidad'
                  )}
                  .
                </span>
              </label>

              <button type="submit" className="is-action is-action--light w-full justify-center mt-2">
                {config.ctaLabel}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RafflePopupModal;
