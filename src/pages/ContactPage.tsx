
import React, { useState, useEffect } from 'react';
import { InstagramIcon, WhatsAppIcon } from '../constants';
import { useContactForm } from '../hooks/useContactForm';
import { useTranslation } from '../i18n/useTranslation';
import { homePages } from '../i18n/translations/homePages';

const ContactPage: React.FC = () => {
  const { t } = useTranslation(homePages);
  const typeOptions = t('contact.typeOptions') as { clase: string; evento: string; producto: string; otro: string };

  useEffect(() => {
    const contactSchema = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contacto - Inner Spirit Studio",
      "description": "Contáctanos para clases de yoga, eventos o consultas en Inner Spirit Studio, Bogotá.",
      "url": "https://innerspirit.net/contacto",
      "mainEntity": {
        "@type": "Organization",
        "name": "Inner Spirit Studio",
        "telephone": "+573212248261",
        "email": "hola@innerspirit.co"
      }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(contactSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  const { formState, handleInputChange, setConsent, handleSubmit } = useContactForm();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const getInputClass = (fieldName: string) => `
    w-full bg-transparent border-b py-4 text-lg text-stone-800 outline-none transition-all duration-300
    ${focusedField === fieldName ? 'border-accent placeholder-accent/70' : 'border-stone-300 placeholder-stone-400'}
  `;
  
  return (
    <div className="animate-fade-in-up is-section--paper min-h-screen">
        <section id="contacto-page">
            <div className="is-shell py-24 md:py-32">

                {/* Hero Text */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <span className="is-eyebrow justify-center">{t('contact.eyebrow') as string}</span>
                    <h1 className="is-page-heading mt-5">{t('contact.heading') as string}</h1>
                    <div className="is-luxury-rule mx-auto my-6" style={{ width: '1px', height: '3rem' }}></div>
                    <p className="is-page-lead">
                        {t('contact.lead') as string}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">

                    {/* Left Column: Map & Info */}
                    <div className="space-y-10">
                        {/* Stylized location card (grid-line background + pin, no external embed) */}
                        <div className="is-surface overflow-hidden">
                            <div
                                className="relative aspect-[4/3]"
                                style={{
                                    background:
                                        'linear-gradient(90deg, rgba(77,106,109,0.10) 1px, transparent 1px), linear-gradient(180deg, rgba(77,106,109,0.08) 1px, transparent 1px), linear-gradient(135deg, rgba(201,173,161,0.18), rgba(77,106,109,0.10)), #F3EDE2',
                                    backgroundSize: '2rem 2rem, 2rem 2rem, auto, auto',
                                }}
                                role="img"
                                aria-label={t('contact.mapAriaLabel') as string}
                            >
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(115deg, transparent 46%, rgba(139,154,139,0.28) 46%, rgba(139,154,139,0.28) 49%, transparent 49%)' }} />
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
                                    <span aria-hidden="true" className="block w-3.5 h-3.5 rounded-full ring-4" style={{ background: '#4D6A6D', boxShadow: '0 6px 16px rgba(45,74,77,0.35)' }} />
                                    <span aria-hidden="true" className="block w-px h-5" style={{ background: '#4D6A6D' }} />
                                </div>
                                <div className="absolute left-4 bottom-4 right-4 sm:right-auto sm:max-w-[16rem] px-4 py-3 rounded-sm" style={{ background: 'rgba(250,247,242,0.92)', backdropFilter: 'blur(4px)', border: '1px solid rgba(77,106,109,0.16)' }}>
                                    <p className="font-heading text-lg leading-tight" style={{ color: '#2D4A4D' }}>Inner Spirit Studio</p>
                                    <p className="text-sm font-light mt-0.5" style={{ color: '#5E675D' }}>{t('contact.mapCardAddress') as string}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                             <div>
                                <p className="is-eyebrow mb-3">{t('contact.visitLabel') as string}</p>
                                <p className="is-copy" style={{ lineHeight: 1.6 }}>{t('contact.visitAddressLine1') as string}<br />{t('contact.visitAddressLine2') as string}</p>
                             </div>
                             <div>
                                <p className="is-eyebrow mb-3">{t('contact.hoursLabel') as string}</p>
                                <p className="is-copy is-metric" style={{ lineHeight: 1.6 }}>{t('contact.hoursLine1') as string}<br />{t('contact.hoursLine2') as string}</p>
                             </div>
                             <div>
                                <p className="is-eyebrow mb-3">{t('contact.writeLabel') as string}</p>
                                <a href="https://wa.me/573212248261" target="_blank" rel="noopener noreferrer" className="is-copy block transition-colors hover:text-slate-is">+57 321 224 8261</a>
                                <a href="mailto:hola@innerspirit.co" className="is-copy block transition-colors hover:text-slate-is">hola@innerspirit.co</a>
                             </div>
                             <div>
                                <p className="is-eyebrow mb-3">{t('contact.followLabel') as string}</p>
                                <div className="flex gap-5">
                                    <a href="https://instagram.com/innerspirit_studio" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-slate-is transition-colors transform hover:-translate-y-0.5 duration-300" aria-label={t('contact.igAriaLabel') as string}><InstagramIcon /></a>
                                    <a href="https://wa.me/573212248261" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-slate-is transition-colors transform hover:-translate-y-0.5 duration-300" aria-label={t('contact.waAriaLabel') as string}><WhatsAppIcon /></a>
                                </div>
                             </div>
                        </div>

                        {/* Antes de tu visita */}
                        <div className="is-surface p-5" style={{ background: 'linear-gradient(180deg, rgba(139,154,139,0.10), rgba(139,154,139,0.03)), #FAF7F2' }}>
                            <p className="is-eyebrow mb-2">{t('contact.beforeVisitLabel') as string}</p>
                            <p className="is-copy" style={{ fontSize: '0.95rem' }}>
                                {t('contact.beforeVisitText') as string}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Minimalist Form */}
                    <div className="is-surface px-5 py-8 sm:px-8 md:px-12 md:py-14">
                        <p className="is-eyebrow">{t('contact.formEyebrow') as string}</p>
                        <h3 className="is-display text-3xl md:text-4xl mt-4 mb-4">
                          {t('contact.formTitlePrefix') as string}<span className="italic" style={{ color: '#C9ADA1' }}>{t('contact.formTitleEmphasis') as string}</span>{t('contact.formTitleSuffix') as string}
                        </h3>
                        <p className="is-copy mb-10">
                          {t('contact.formLead') as string}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Honeypot */}
                            <input type="text" name="honeypot" value={formState.honeypot} onChange={handleInputChange} className="hidden" aria-hidden="true" tabIndex={-1} />

                            <div>
                                <label htmlFor="contact-name" className="sr-only">{t('contact.nameLabel') as string}</label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder={t('contact.nameLabel') as string}
                                    className={getInputClass('name')}
                                    autoComplete="name"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-email" className="sr-only">{t('contact.emailLabel') as string}</label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder={t('contact.emailLabel') as string}
                                    className={getInputClass('email')}
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-type" className="sr-only">{t('contact.typeLabel') as string}</label>
                                <select
                                    id="contact-type"
                                    name="type"
                                    value={formState.type}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('type')}
                                    onBlur={() => setFocusedField(null)}
                                    className={`${getInputClass('type')} cursor-pointer appearance-none`}
                                >
                                    <option value="clase">{typeOptions.clase}</option>
                                    <option value="evento">{typeOptions.evento}</option>
                                    <option value="producto">{typeOptions.producto}</option>
                                    <option value="otro">{typeOptions.otro}</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="contact-message" className="sr-only">{t('contact.messageLabel') as string}</label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={formState.message}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder={t('contact.messagePlaceholder') as string}
                                    rows={4}
                                    className={`${getInputClass('message')} resize-none`}
                                    required
                                ></textarea>
                            </div>

                            <div className="flex items-start gap-3">
                                <input
                                    id="contact-consent"
                                    type="checkbox"
                                    name="consent"
                                    checked={formState.consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    className="mt-1 h-4 w-4 shrink-0 accent-accent"
                                    required
                                />
                                <label htmlFor="contact-consent" className="text-sm text-stone-500 leading-relaxed">
                                    {t('contact.consentPrefix') as string}{' '}
                                    <a href="/privacidad" className="underline hover:text-accent">{t('contact.consentLink') as string}</a>.
                                </label>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="w-full bg-stone-900 text-white font-heading text-xl py-4 hover:bg-accent transition-colors duration-500">
                                    {t('contact.submit') as string}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};

export default ContactPage;
