import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useToast } from '../context/ToastContext';
import { submitLead } from '../utils/leads';
import { useTranslation } from '../i18n/useTranslation';
import { chicagoTranslations } from '../i18n/translations/chicago';

type Agreement = { num: string; title: string; desc: string };
type SessionPhase = { step: string; title: string; time: string; desc: string };

// Envuelve en <strong> las apariciones literales de un término (marca/nombre
// propio que no se traduce, p.ej. "MOVE" o "Static Dance") dentro de un
// string ya traducido, sin depender del orden de palabras de cada idioma.
const renderWithEmphasis = (text: string, term: string): React.ReactNode => {
  const parts = text.split(term);
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 && <strong>{term}</strong>}
    </React.Fragment>
  ));
};

const ChicagoPage: React.FC = () => {
  const { navigate } = useNavigation();
  const { showToast } = useToast();
  const { t } = useTranslation(chicagoTranslations);

  const agreements = t('agreements.items') as Agreement[];
  const sessionPhases = t('session.phases') as SessionPhase[];
  const experienceOptions = t('waitlist.experienceOptions') as {
    firstTime: string;
    occasional: string;
    regular: string;
    facilitator: string;
  };

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'first-time',
    consent: false,
    honeypot: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    if (!form.consent) {
      showToast(t('waitlist.errorConsent') as string, 'error');
      return;
    }
    if (form.name.trim().length < 2) {
      showToast(t('waitlist.errorName') as string, 'error');
      return;
    }

    submitLead({
      source: 'contact',
      name: form.name.trim(),
      email: form.email.trim(),
      ...(form.phone.trim() ? { phone: form.phone.trim() } : {}),
      interest: `Chicago Static Dance Waitlist (${form.experience})`,
      message: `Chicago Static Dance waitlist signup. Prior experience: ${form.experience}.`,
      consent: true,
    });

    setSubmitted(true);
    showToast(t('waitlist.toastSuccess') as string, 'success');
  };

  return (
    <div className="animate-fade-in-up bg-[#121210] text-[#FAF7F2]">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/chicago/chicago-loft-static-dance.jpg"
            alt={t('hero.heroAlt') as string}
            className="w-full h-full object-cover object-center scale-105 filter brightness-75 transition-transform duration-1000"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(18,18,16,0.65) 0%, rgba(18,18,16,0.85) 65%, #121210 100%)',
            }}
          />
        </div>

        <div className="relative z-10 is-shell text-center max-w-4xl mx-auto mt-6">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.28em] font-sans font-medium border mb-6"
            style={{
              background: 'rgba(201, 173, 161, 0.15)',
              borderColor: 'rgba(201, 173, 161, 0.4)',
              color: '#C9ADA1',
            }}
          >
            {t('hero.badge') as string}
          </span>
          <h1 className="is-display text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-white mb-6">
            {t('hero.title') as string}
          </h1>
          <p className="text-lg sm:text-2xl font-light text-stone-200 max-w-2xl mx-auto leading-relaxed mb-8">
            {t('hero.subtitle') as string}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#waitlist" className="is-action is-action--light w-full sm:w-auto px-8 py-3.5">
              {t('hero.ctaJoin') as string}
            </a>
            <a
              href="#acuerdos"
              className="is-action is-action--ghost text-white w-full sm:w-auto px-8 py-3.5"
              style={{ borderColor: 'rgba(255,255,255,0.3)' }}
            >
              {t('hero.ctaHow') as string}
            </a>
          </div>
        </div>
      </section>

      {/* Qué es Static Dance */}
      <section className="is-section py-20 border-t border-b border-stone-800" style={{ background: '#181512' }}>
        <div className="is-shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="is-eyebrow" style={{ color: '#C9ADA1' }}>
                {t('philosophy.eyebrow') as string}
              </span>
              <h2 className="is-display text-3xl sm:text-4xl md:text-5xl text-white">
                {t('philosophy.title') as string}
              </h2>
              <p className="text-stone-300 font-light text-base sm:text-lg leading-relaxed">
                {renderWithEmphasis(t('philosophy.p1') as string, 'MOVE')}
              </p>
              <p className="text-stone-400 font-light text-sm sm:text-base leading-relaxed">
                {renderWithEmphasis(t('philosophy.p2') as string, 'Static Dance')}
              </p>

              <div className="pt-4 flex items-center gap-6 text-sm text-stone-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8B9A8B]" />
                  <span>{t('philosophy.badgeSound') as string}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8B9A8B]" />
                  <span>{t('philosophy.badgeSafe') as string}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8B9A8B]" />
                  <span>{t('philosophy.badgeLevels') as string}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border shadow-2xl" style={{ borderColor: 'rgba(201, 173, 161, 0.25)' }}>
                <img
                  src="/images/chicago/chicago-sound-movement.jpg"
                  alt={t('philosophy.spaceAlt') as string}
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(18, 18, 16, 0.75) 0%, transparent 60%)',
                  }}
                />
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#C9ADA1]">
                    {t('philosophy.spaceEyebrow') as string}
                  </span>
                  <p className="text-sm font-light text-stone-200 mt-1">
                    {t('philosophy.spaceCaption') as string}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Los 4 Acuerdos */}
      <section id="acuerdos" className="is-section py-20">
        <div className="is-shell">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="is-eyebrow justify-center" style={{ color: '#8B9A8B' }}>
              {t('agreements.eyebrow') as string}
            </span>
            <h2 className="is-display text-3xl sm:text-5xl text-white mt-3">
              {t('agreements.title') as string}
            </h2>
            <p className="text-stone-300 font-light text-base mt-4">
              {t('agreements.subtitle') as string}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agreements.map((a) => (
              <div
                key={a.num}
                className="rounded-xl p-6 sm:p-7 border flex flex-col justify-between"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'rgba(201, 173, 161, 0.2)',
                }}
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#C9ADA1] block mb-4">
                    {a.num}
                  </span>
                  <h3 className="font-heading text-xl text-white mb-2">{a.title}</h3>
                  <p className="text-xs sm:text-sm font-light text-stone-300 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* La Ola: Anatomía de la Sesión */}
      <section className="is-section py-20 border-t border-stone-800" style={{ background: '#161411' }}>
        <div className="is-shell">
          <div className="max-w-3xl mb-14">
            <span className="is-eyebrow" style={{ color: '#C9ADA1' }}>
              {t('session.eyebrow') as string}
            </span>
            <h2 className="is-display text-3xl sm:text-5xl text-white mt-3">
              {t('session.title') as string}
            </h2>
            <p className="text-stone-300 font-light text-base mt-4">
              {t('session.subtitle') as string}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sessionPhases.map((wave) => (
              <div
                key={wave.step}
                className="p-6 rounded-xl border relative"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#8B9A8B]">
                    {wave.step}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">{wave.time}</span>
                </div>
                <h4 className="font-heading text-lg text-white mb-2">{wave.title}</h4>
                <p className="text-xs text-stone-400 font-light leading-relaxed">{wave.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de Lista de Espera */}
      <section id="waitlist" className="is-section py-20 border-t border-stone-800">
        <div className="is-shell max-w-2xl mx-auto">
          <div
            className="rounded-2xl p-8 sm:p-12 border shadow-2xl text-center"
            style={{
              background: 'linear-gradient(150deg, #1E1B16 0%, #121210 100%)',
              borderColor: 'rgba(201, 173, 161, 0.35)',
            }}
          >
            <span className="text-xs uppercase tracking-[0.28em] font-sans font-medium" style={{ color: '#C9ADA1' }}>
              {t('waitlist.badge') as string}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-white mt-3 mb-3">
              {t('waitlist.title') as string}
            </h2>
            <p className="text-sm font-light text-stone-300 leading-relaxed mb-8 max-w-lg mx-auto">
              {t('waitlist.subtitle') as string}
            </p>

            {submitted ? (
              <div className="py-8 bg-white/5 rounded-xl border border-white/10 p-6">
                <div className="text-4xl mb-3">✨</div>
                <h3 className="font-heading text-2xl text-white mb-2">{t('waitlist.successTitle') as string}</h3>
                <p className="text-sm text-stone-300 font-light">
                  {t('waitlist.successDesc') as string}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <input
                  type="text"
                  name="honeypot"
                  value={form.honeypot}
                  onChange={(e) => setForm((p) => ({ ...p, honeypot: e.target.value }))}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label htmlFor="chi-name" className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                    {t('waitlist.nameLabel') as string}
                  </label>
                  <input
                    id="chi-name"
                    type="text"
                    required
                    placeholder={t('waitlist.namePlaceholder') as string}
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-white placeholder-stone-500 outline-none focus:border-[#C9ADA1]"
                    style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                  />
                </div>

                <div>
                  <label htmlFor="chi-email" className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                    {t('waitlist.emailLabel') as string}
                  </label>
                  <input
                    id="chi-email"
                    type="email"
                    required
                    placeholder={t('waitlist.emailPlaceholder') as string}
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-white placeholder-stone-500 outline-none focus:border-[#C9ADA1]"
                    style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                  />
                </div>

                <div>
                  <label htmlFor="chi-phone" className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                    {t('waitlist.phoneLabel') as string}
                  </label>
                  <input
                    id="chi-phone"
                    type="tel"
                    placeholder={t('waitlist.phonePlaceholder') as string}
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-white placeholder-stone-500 outline-none focus:border-[#C9ADA1]"
                    style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                  />
                </div>

                <div>
                  <label htmlFor="chi-experience" className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                    {t('waitlist.experienceLabel') as string}
                  </label>
                  <select
                    id="chi-experience"
                    value={form.experience}
                    onChange={(e) => setForm((p) => ({ ...p, experience: e.target.value }))}
                    className="w-full bg-[#181512] border rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-[#C9ADA1]"
                    style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <option value="first-time">{experienceOptions.firstTime}</option>
                    <option value="occasional">{experienceOptions.occasional}</option>
                    <option value="regular">{experienceOptions.regular}</option>
                    <option value="facilitator">{experienceOptions.facilitator}</option>
                  </select>
                </div>

                <label className="flex items-start gap-2.5 text-xs text-stone-400 pt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={(e) => setForm((p) => ({ ...p, consent: e.target.checked }))}
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ accentColor: '#C9ADA1' }}
                  />
                  <span>{t('waitlist.consentLabel') as string}</span>
                </label>

                <button type="submit" className="is-action is-action--light w-full justify-center py-3.5 mt-4 text-sm font-semibold">
                  {t('waitlist.submitButton') as string}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Conexión con Sedes Hermanas */}
      <section className="is-section py-16 border-t border-stone-800 text-center" style={{ background: '#121210' }}>
        <div className="is-shell max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2">{t('network.eyebrow') as string}</p>
          <h3 className="font-heading text-xl text-stone-300 mb-6">
            {t('network.title') as string}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('home')}
              className="is-action is-action--ghost text-xs px-5 py-2.5"
            >
              {t('network.bogota') as string}
            </button>
            <button
              onClick={() => navigate('portugal')}
              className="is-action is-action--ghost text-xs px-5 py-2.5"
            >
              {t('network.portugal') as string}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChicagoPage;
