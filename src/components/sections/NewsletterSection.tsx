
import React from 'react';
import Ribbons from '../effects/Ribbons';
import { useToast } from '../../context/ToastContext';
import { submitLead } from '../../utils/leads';
import { useTranslation } from '../../i18n/useTranslation';

const NewsletterSection: React.FC = () => {
  const { showToast } = useToast();
  const { t } = useTranslation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.querySelector('input[type="email"]') as HTMLInputElement)?.value ?? '';
    const consent = (form.querySelector('input[name="consent"]') as HTMLInputElement)?.checked ?? false;
    if (!consent) {
      showToast(t('newsletter.consentError') as string, 'error');
      return;
    }
    const text = encodeURIComponent(`Hola Inner Spirit, quiero unirme a la comunidad y recibir noticias. Mi correo es: ${email}`);
    submitLead({ source: 'newsletter', email, consent: true });
    showToast(t('newsletter.openingWhatsapp') as string, 'success');
    // Abrir dentro del gesto del usuario: un window.open diferido lo bloquean los popup blockers.
    window.open(`https://wa.me/573212248261?text=${text}`, '_blank', 'noopener,noreferrer');
    form.reset();
  };

  return (
    <section
      className="relative is-section border-t overflow-hidden"
      style={{ background: '#EAE0CC', borderColor: '#D9D1C0' }}
    >
      {/* Animated ribbon waves as section background */}
      <div className="absolute inset-0">
        <Ribbons />
      </div>

      <div className="relative is-shell text-center max-w-2xl" style={{ zIndex: 10 }}>
        <span className="is-eyebrow justify-center mb-3" style={{ color: '#4D6A6D' }}>
          {t('newsletter.eyebrow') as string}
        </span>
        <h2 className="font-heading text-3xl md:text-5xl mb-4" style={{ color: '#1A1A18' }}>
          {t('newsletter.title') as string}
        </h2>
        <p className="text-base md:text-lg font-light mb-6 leading-relaxed" style={{ color: '#5C6B5C' }}>
          {t('newsletter.description') as string}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: '#4D6A6D' }}>
          {(t('newsletter.bullets') as string[]).map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full" style={{ background: '#8B9A8B' }} />
              {item}
            </span>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div
            className="flex flex-col sm:flex-row gap-0 border-b transition-colors focus-within:border-opacity-100"
            style={{ borderColor: '#A0A083' }}
          >
            <input
              type="email"
              placeholder={t('newsletter.emailPlaceholder') as string}
              required
              className="flex-grow py-4 bg-transparent outline-none text-lg placeholder-stone-400"
              style={{ color: '#252520' }}
              aria-label={t('newsletter.emailLabel') as string}
            />
            <button
              type="submit"
              className="py-4 font-serif italic text-lg transition-colors"
              style={{ color: '#798478' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#4D6A6D'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#798478'; }}
            >
              {t('newsletter.submit') as string}
            </button>
          </div>
          <label className="flex items-start gap-2 mt-4 text-xs text-left" style={{ color: '#A0A083' }}>
            <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0" style={{ accentColor: '#4D6A6D' }} />
            <span>
              {t('newsletter.consentPrefix') as string}{' '}
              <a href="/privacidad" className="underline">{t('newsletter.consentLink') as string}</a>.
            </span>
          </label>
        </form>
        <p className="text-xs mt-6" style={{ color: '#A0A083' }}>
          {t('newsletter.footerNote') as string}
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
