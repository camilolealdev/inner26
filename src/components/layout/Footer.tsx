
import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useTranslation } from '../../i18n/useTranslation';

const InstagramSVG = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427C2.013 14.784 2 14.43 2 12s.013-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.63 1.802h-.63c-2.403 0-2.736.01-3.7.054-.977.044-1.504.207-1.857.344a3.1 3.1 0 00-1.15.748 3.1 3.1 0 00-.747 1.15c-.137.353-.3.88-.344 1.857-.043.965-.052 1.252-.052 3.7s.009 2.736.052 3.7c.044.977.207 1.504.344 1.857a3.1 3.1 0 00.748 1.15 3.1 3.1 0 001.15.747c.353.137.88.3 1.857.344.964.044 1.297.052 3.7.052s2.736-.008 3.7-.052c.977-.044 1.504-.207 1.857-.344a3.1 3.1 0 001.15-.747 3.1 3.1 0 00.747-1.15c.137-.353.3-.88.344-1.857.044-.964.052-1.297.052-3.7s-.008-2.736-.052-3.7c-.044-.977-.207-1.504-.344-1.857a3.1 3.1 0 00-.747-1.15 3.1 3.1 0 00-1.15-.748c-.353-.137-.88-.3-1.857-.344-.964-.043-1.297-.052-3.7-.052zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const WhatsAppSVG = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.38 1.25 4.82l-1.33 4.86 4.98-1.31c1.39.75 2.97 1.18 4.62 1.18h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.22 15.2c-.28.27-.64.43-1.04.51-.39.08-.85.12-1.33.08-1.02-.09-2.28-.53-3.32-1.55-1.32-1.32-2.19-2.95-2.3-3.13-.11-.18-.89-1.19-.89-2.23s.54-1.54.73-1.75c.18-.21.4-.27.59-.27.16 0 .31 0 .43.01.21.01.48.04.69.34.25.35.88 2.13.94 2.29s.09.28.01.46c-.08.18-.21.32-.39.51-.2.21-.4.43-.55.59-.13.13-.27.28-.13.53.15.25.68.98 1.48 1.78.96.96 1.79 1.25 2.04 1.33.25.08.4-.04.55-.23.14-.18.61-.71.78-.95.17-.25.33-.27.56-.16.23.11 1.46.68 1.71.81.25.12.41.18.47.27.06.09.04.52-.24.79z" />
  </svg>
);

const Footer: React.FC = () => {
  const { navigate, location, setLocation, openLocationGate } = useNavigation();
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const isPt = location === 'pt';
  const isUs = location === 'us';

  return (
    <footer className="py-12 md:py-16 bg-warm-black text-muted">
      <div className="is-shell flex flex-col items-center text-center">

        {/* Final CTA */}
        <div className="max-w-xl mb-12">
          <span className="is-eyebrow justify-center" style={{ color: '#8B9A8B' }}>
            {isPt ? 'Inicia uma conversa' : isUs ? 'Start a conversation' : 'Inicia una conversación'}
          </span>
          <p className="font-heading text-2xl md:text-3xl leading-snug mt-5 mb-6" style={{ color: '#EAE0CC' }}>
            {isPt ? 'Diz-nos o que gostarias de trazer ao espaço.' : isUs ? "Tell us what you'd like to bring to the space." : 'Cuéntanos qué quieres traer al espacio.'}
          </p>
          <a
            href={isPt ? "https://www.instagram.com/innerspirit_portugal" : isUs ? "https://instagram.com/innerspirit_studio" : "https://wa.me/573212248261?text=Hola%2C%20quiero%20iniciar%20una%20conversaci%C3%B3n%20con%20Inner%20Spirit%20Studio"}
            target="_blank"
            rel="noopener noreferrer"
            className="is-action is-action--light"
          >
            {isPt ? 'Escreve-nos no Instagram' : isUs ? 'Message us on Instagram' : 'Escríbenos por WhatsApp (+57)'}
          </a>
        </div>

        {/* Brand logo — knocked out to cream so the maroon line-art reads on the dark footer */}
        <img
          src="/images/logo.png"
          alt="Inner Spirit"
          className="w-auto select-none mb-4"
          style={{ height: 'clamp(96px, 22vw, 140px)', filter: 'brightness(0) invert(1)', opacity: 0.92 }}
        />
        <p className="text-xs tracking-[0.3em] uppercase mb-3 text-slate-is">
          {isPt ? 'Portugal — Costa de Leiria, perto da Nazaré' : isUs ? 'Chicago — Timber Loft Studio' : 'Studio — La Candelaria, Bogotá'}
        </p>
        <p className="font-heading italic text-lg mb-10" style={{ color: '#8B9A8B' }}>
          {isPt ? 'As primeiras sementes de um refúgio por construir.' : isUs ? 'The first steps of a sanctuary taking root in Chicago.' : 'Un santuario para volver a ti.'}
        </p>

        <div className={`grid grid-cols-1 ${isPt || isUs ? 'md:grid-cols-3' : 'md:grid-cols-4'} w-full gap-10 md:gap-6 border-t border-slate-is/20 pt-10 text-left md:text-center md:items-start`}>
          {/* Location */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest block text-slate-is">{t('footer.sedesHeading') as string}</span>
            {location === 'pt' ? (
              <div className="space-y-2">
                <p className="font-light leading-relaxed text-accent">
                  🇵🇹 <strong>Inner Spirit Portugal</strong><br />
                  Costa de Leiria, perto da Nazaré<br />
                  Zona Centro, Portugal
                </p>
                <div className="flex flex-col gap-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setLocation('co')}
                    className="text-[#C9ADA1] underline hover:text-white transition-colors cursor-pointer text-left md:text-center"
                  >
                    {t('footer.sedeColombia') as string}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocation('us')}
                    className="text-[#8B9A8B] underline hover:text-white transition-colors cursor-pointer text-left md:text-center"
                  >
                    {t('footer.hubChicago') as string}
                  </button>
                </div>
              </div>
            ) : location === 'us' ? (
              <div className="space-y-2">
                <p className="font-light leading-relaxed text-accent">
                  🇺🇸 <strong>Inner Spirit Chicago</strong><br />
                  Timber Loft Studio<br />
                  Chicago, IL — USA
                </p>
                <div className="flex flex-col gap-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setLocation('co')}
                    className="text-[#C9ADA1] underline hover:text-white transition-colors cursor-pointer text-left md:text-center"
                  >
                    {t('footer.sedeColombia') as string}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocation('pt')}
                    className="text-[#8B9A8B] underline hover:text-white transition-colors cursor-pointer text-left md:text-center"
                  >
                    {t('footer.sedePortugal') as string}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="font-light leading-relaxed text-accent">
                  🇨🇴 <strong>Inner Spirit Colombia</strong><br />
                  Transversal 1 # 17-29<br />
                  La Candelaria, Bogotá
                </p>
                <div className="flex flex-col gap-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setLocation('pt')}
                    className="text-[#8B9A8B] underline hover:text-white transition-colors cursor-pointer text-left md:text-center"
                  >
                    {t('footer.sedePortugal') as string}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocation('us')}
                    className="text-[#C9ADA1] underline hover:text-white transition-colors cursor-pointer text-left md:text-center"
                  >
                    {t('footer.hubChicago') as string}
                  </button>
                </div>
              </div>
            )}
            <div className="pt-2">
              <button
                type="button"
                onClick={openLocationGate}
                className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 text-stone-300 hover:text-white hover:border-white/50 transition-all"
              >
                {t('footer.changeSanctuary') as string}
              </button>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="space-y-6 flex flex-col items-center">
            <div className="flex gap-6 text-muted-light">
              <a
                href={isPt ? "https://www.instagram.com/innerspirit_portugal" : "https://instagram.com/innerspirit_studio"}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-white"
                aria-label={isPt ? "Instagram @innerspirit_portugal" : "Instagram @innerspirit_studio"}
              >
                <InstagramSVG />
              </a>
              {!isPt && !isUs && (
                <a
                  href="https://wa.me/573212248261"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-white"
                  aria-label="WhatsApp"
                >
                  <WhatsAppSVG />
                </a>
              )}
            </div>
            <div className="space-y-2 text-sm">
              {!isPt && !isUs && (
                <a
                  href="https://wa.me/573212248261"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-white"
                >
                  +57 321 224 8261
                </a>
              )}
              <a
                href="mailto:hola@innerspirit.net"
                className="block mx-auto transition-colors hover:text-white pb-0.5 border-b border-muted-light/40"
              >
                hola@innerspirit.net
              </a>
            </div>
            <p className="text-xs tracking-widest uppercase text-slate-is">
              {isPt ? '@innerspirit_portugal' : '@innerspirit_studio'}
            </p>
          </div>

          {/* Shop — mismos 4 productos reales de ShopSection, sede Colombia únicamente */}
          {!isPt && !isUs && (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest block text-slate-is">{t('footer.shopHeading') as string}</span>
              <div className="flex flex-col gap-2 text-sm">
                {Object.values(t('footer.products') as Record<string, string>).map((name) => (
                  <a
                    key={name}
                    href="/tienda"
                    onClick={(e) => { e.preventDefault(); navigate('tienda'); }}
                    className="transition-colors hover:text-white text-left md:text-center"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Navigation — compacted into a 2-col grid so this list doesn't tower over the other columns */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest block text-slate-is">{t('footer.navHeading') as string}</span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:justify-items-center">
              {(['nosotros', 'comunidad', 'clases', 'eventos', 'espacio', 'consultorio', 'tienda', 'contacto'] as const).map(p => (
                <a
                  key={p}
                  href={`/${p}`}
                  onClick={(e) => { e.preventDefault(); navigate(p); }}
                  className="capitalize transition-colors hover:text-white text-left md:text-center"
                >
                  {t(`nav.${p}`) as string}
                </a>
              ))}
              <a
                href="/portugal"
                onClick={(e) => { e.preventDefault(); navigate('portugal'); }}
                className="transition-colors text-[#8B9A8B] hover:text-white text-left md:text-center font-medium"
              >
                {t('footer.portugalHub') as string}
              </a>
              <a
                href="/terminos"
                onClick={(e) => { e.preventDefault(); navigate('terminos'); }}
                className="transition-colors hover:text-white text-left md:text-center"
              >
                {t('nav.terminos') as string}
              </a>
              <a
                href="/privacidad"
                onClick={(e) => { e.preventDefault(); navigate('privacidad'); }}
                className="transition-colors hover:text-white text-left md:text-center"
              >
                {t('nav.privacidad') as string}
              </a>
            </div>
          </div>
        </div>

        {/* Sub-footer: Legal & Copyright */}
        <div className="w-full border-t border-slate-is/15 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-muted-light/60 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
            <p>{(t('footer.copyright') as (year: number) => string)(year)}</p>
            <span className="hidden md:inline text-slate-is/40 select-none">·</span>
            <p>
              {isPt ? 'Criado por' : isUs ? 'Created by' : 'Creado por'}{' '}
              <a
                href="https://eazy-marketing.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EAE0CC] hover:text-white underline decoration-slate-is/40 underline-offset-2 transition-colors font-medium"
              >
                eazy-marketing.xyz
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs">
            <a
              href="/terminos"
              onClick={(e) => { e.preventDefault(); navigate('terminos'); }}
              className="hover:text-white transition-colors"
            >
              {t('footer.legalTerms') as string}
            </a>
            <span className="text-slate-is/40 select-none">·</span>
            <a
              href="/privacidad"
              onClick={(e) => { e.preventDefault(); navigate('privacidad'); }}
              className="hover:text-white transition-colors"
            >
              {t('footer.legalPrivacy') as string}
            </a>
            <span className="text-slate-is/40 select-none">·</span>
            <a
              href="/cookies"
              onClick={(e) => { e.preventDefault(); navigate('terminos'); }}
              className="hover:text-white transition-colors"
            >
              {t('footer.legalCookies') as string}
            </a>
          </div>
        </div>

        {/* Floating contact CTA — WhatsApp in Colombia, Instagram in Portugal & Chicago (no live PT/US phone line yet) */}
        <a
          href={isPt ? "https://www.instagram.com/innerspirit_portugal" : isUs ? "https://instagram.com/innerspirit_studio" : "https://wa.me/573212248261?text=Hola%2C%20quiero%20reservar%20una%20clase%20en%20Inner%20Spirit%20Studio"}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed is-safe-float w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 z-40 text-white"
          style={{ background: isPt || isUs ? 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)' : '#25D366', touchAction: 'manipulation' }}
          aria-label={isPt ? 'Escreve-nos no Instagram' : isUs ? 'Message us on Instagram' : 'Escríbenos por WhatsApp'}
        >
          {isPt || isUs ? <InstagramSVG /> : <WhatsAppSVG />}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
