import React, { useContext, useEffect, useRef, useState } from 'react';
import { ShoppingCartIcon } from '../../constants';
import { CartContext } from '../../context/CartContext';
import { useNavigation, pageToPath, type PageName } from '../../context/NavigationContext';
import { useTranslation } from '../../i18n/useTranslation';

type NavLink = { page: Exclude<PageName, 'home' | '404'>; navKey: string; href: string };

// "Sobre Nosotros" agrupa las 3 páginas institucionales bajo un dropdown en
// desktop para descargar la fila del nav; en mobile se listan igual de plano.
const aboutLinks: NavLink[] = [
  { page: 'nosotros', navKey: 'nosotros', href: pageToPath('nosotros') },
  { page: 'comunidad', navKey: 'comunidad', href: pageToPath('comunidad') },
  { page: 'espacio', navKey: 'espacio', href: pageToPath('espacio') },
];

const navLinks: NavLink[] = [
  { page: 'clases', navKey: 'clases', href: pageToPath('clases') },
  { page: 'eventos', navKey: 'eventos', href: pageToPath('eventos') },
  { page: 'consultorio', navKey: 'consultorio', href: pageToPath('consultorio') },
  { page: 'tienda', navKey: 'tienda', href: pageToPath('tienda') },
  { page: 'blog', navKey: 'blog', href: pageToPath('blog') },
  { page: 'contacto', navKey: 'contacto', href: pageToPath('contacto') },
];

const mobileLinks: NavLink[] = [...aboutLinks, ...navLinks];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const { cart, toggleCheckoutModal } = useContext(CartContext);
  const { page, navigate, location, openLocationGate, setLocation, setLanguage } = useNavigation();
  const { t, language } = useTranslation();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isAboutActive = aboutLinks.some((link) => link.page === page);
  const languageCode = language.toUpperCase();
  const languageCycle = { es: 'pt', pt: 'en', en: 'es' } as const;
  const cycleLanguage = () => setLanguage(languageCycle[language]);

  // On homepage, Portugal & Chicago hero, header is transparent with white text until scrolled.
  // When the mobile menu is open the overlay is light (sand), so the header must
  // switch to its solid/ink style — otherwise the white brand + close icon vanish.
  const isHeroPage = page === 'home' || page === 'portugal' || page === 'chicago';
  const isTransparent = isHeroPage && !scrolled && !isOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      if (event.key === 'Escape' && isAboutOpen) {
        setIsAboutOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, isAboutOpen]);

  useEffect(() => {
    if (!isAboutOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setIsAboutOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAboutOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavigate = (targetPage: PageName) => {
    navigate(targetPage);
    setIsOpen(false);
  };

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetPage: PageName
  ) => {
    event.preventDefault();
    handleNavigate(targetPage);
  };

  return (
    <>
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled ? 'py-3 md:py-4 shadow-sm is-header-surface' : 'py-5 md:py-7'
      } ${
        isTransparent
          ? 'text-white border-b border-white/10'
          : 'text-ink backdrop-blur-xl border-b border-sage/20'
      }`}
      style={{
        background: isTransparent
          ? 'transparent'
          : scrolled
            ? 'rgba(234,224,204,0.98)'
            : 'rgba(234,224,204,0.95)',
      }}
    >
      <div className="is-shell flex justify-between items-center">
        <div className="w-auto xl:w-1/4 flex justify-start">
          <a
            href={location === 'pt' ? pageToPath('portugal') : location === 'us' ? pageToPath('chicago') : pageToPath('home')}
            onClick={(event) => handleLinkClick(event, location === 'pt' ? 'portugal' : location === 'us' ? 'chicago' : 'home')}
            className="flex items-center gap-2.5 relative z-50 transition-colors duration-300"
            aria-current={(location === 'pt' ? page === 'portugal' : location === 'us' ? page === 'chicago' : page === 'home') ? 'page' : undefined}
          >
            {/* Logo mark — cropped to hide the built-in wordmark; color adapts to the
                header background (white on the dark hero, natural maroon on light). */}
            <span className="block shrink-0 overflow-hidden" style={{ height: '34px', width: '38px' }} aria-hidden="true">
              <img
                src="/images/logo.png"
                alt=""
                className="block w-[38px] h-auto"
                style={{
                  filter: isTransparent ? 'brightness(0) invert(1)' : 'none',
                  transition: 'filter 300ms ease',
                }}
              />
            </span>
            <span className="text-base sm:text-lg md:text-xl font-heading font-bold uppercase">
              Inner Spirit
            </span>
          </a>
        </div>

        <nav className="hidden xl:flex flex-1 justify-center items-center gap-7 2xl:gap-10">
          <div ref={aboutRef} className="relative">
            <button
              type="button"
              onClick={() => setIsAboutOpen((prev) => !prev)}
              className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors duration-300 hover:opacity-100 ${
                isAboutActive || isAboutOpen ? 'opacity-100' : 'opacity-70'
              }`}
              aria-haspopup="true"
              aria-expanded={isAboutOpen}
            >
              {t('nav.sobreNosotros') as string}
              <svg
                className={`h-3 w-3 transition-transform duration-300 ${isAboutOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`absolute left-1/2 top-full mt-3 w-48 -translate-x-1/2 rounded-sm border py-2 shadow-lg transition-all duration-200 text-ink is-header-surface ${
                isAboutOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1 pointer-events-none'
              }`}
              style={{ borderColor: 'rgba(121,132,120,0.2)', background: 'rgba(234,224,204,0.98)' }}
            >
              {aboutLinks.map((link) => (
                <a
                  key={link.page}
                  href={link.href}
                  onClick={(event) => { handleLinkClick(event, link.page); setIsAboutOpen(false); }}
                  className={`block px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors hover:opacity-100 ${
                    page === link.page ? 'opacity-100' : 'opacity-70'
                  }`}
                  aria-current={page === link.page ? 'page' : undefined}
                >
                  {t(`nav.${link.navKey}`) as string}
                </a>
              ))}
            </div>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.page}
              href={link.href}
              onClick={(event) => handleLinkClick(event, link.page)}
              className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 hover:opacity-100 ${
                page === link.page ? 'opacity-100' : 'opacity-70'
              }`}
              aria-current={page === link.page ? 'page' : undefined}
            >
              {t(`nav.${link.navKey}`) as string}
            </a>
          ))}
        </nav>

        <div className="w-auto xl:w-1/4 flex justify-end items-center space-x-2 sm:space-x-3">
          {/* Location Switcher Button */}
          <button
            type="button"
            onClick={openLocationGate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all border border-current/25 hover:border-current/70 hover:bg-current/10"
            title={t('header.changeSede') as string}
            aria-label={t('header.changeSedeLabel') as string}
          >
            <span className="text-sm select-none" role="img" aria-hidden="true">
              {location === 'pt' ? '🇵🇹' : location === 'us' ? '🇺🇸' : '🇨🇴'}
            </span>
            <span className="font-semibold uppercase tracking-widest text-[10px] hidden sm:inline">
              {location === 'pt' ? (t('header.portugal') as string) : location === 'us' ? (t('header.chicago') as string) : (t('header.colombia') as string)}
            </span>
          </button>

          {/* Idioma — independiente de la sede, cicla ES→PT→EN */}
          <button
            type="button"
            onClick={cycleLanguage}
            className="font-mono text-[10px] opacity-50 hover:opacity-100 transition-opacity px-1.5 py-1 rounded-sm"
            title={`${t('header.languageLabel') as string}: ${languageCode}`}
            aria-label={`${t('header.languageLabel') as string}: ${languageCode}`}
          >
            {languageCode}
          </button>

          <button
            onClick={toggleCheckoutModal}
            className="relative group flex h-11 w-11 items-center justify-center rounded-sm opacity-80 hover:opacity-100 transition-opacity"
            aria-label={t('header.cart') as string}
            type="button"
          >
            <ShoppingCartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center bg-slate-is">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="xl:hidden flex h-11 w-11 flex-col justify-center items-center space-y-1.5 focus:outline-none z-50"
            aria-label={isOpen ? (t('header.closeMenu') as string) : (t('header.openMenu') as string)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            type="button"
          >
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ease-out ${
                isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ease-out ${
                isOpen ? 'w-6 opacity-0' : 'w-4'
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ease-out ${
                isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'
              }`}
            />
          </button>
        </div>
      </div>
    </header>

      {/* Mobile menu overlay — sibling of <header> (NOT a child): the header's
          backdrop-blur establishes a containing block for fixed descendants, which
          would collapse this fixed inset-0 overlay to the header's height. */}
      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-base transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* min-h-full wrapper: centers when it fits, scrolls (no top clipping) when it doesn't */}
        <div className="min-h-full flex flex-col items-center justify-center gap-8 px-6 pt-28 pb-16 is-safe-bottom">
          {/* Mobile location pill */}
          <div className="flex items-center gap-2 p-1.5 px-3 rounded-full border border-ink/20 bg-ink/5">
            <span className="text-[11px] uppercase tracking-widest text-muted-light font-medium">{t('header.sede') as string}</span>
            <button
              type="button"
              onClick={() => { setLocation('co'); setIsOpen(false); }}
              className={`text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full transition-all ${
                location === 'co' ? 'bg-slate-is text-white' : 'text-ink opacity-70'
              }`}
            >
              🇨🇴 {t('header.colombia') as string}
            </button>
            <button
              type="button"
              onClick={() => { setLocation('pt'); setIsOpen(false); }}
              className={`text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full transition-all ${
                location === 'pt' ? 'bg-slate-is text-white' : 'text-ink opacity-70'
              }`}
            >
              🇵🇹 {t('header.portugal') as string}
            </button>
            <button
              type="button"
              onClick={() => { setLocation('us'); setIsOpen(false); }}
              className={`text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full transition-all ${
                location === 'us' ? 'bg-slate-is text-white' : 'text-ink opacity-70'
              }`}
            >
              🇺🇸 {t('header.chicago') as string}
            </button>
          </div>

          {/* Idioma — independiente de la sede, cicla ES→PT→EN */}
          <button
            type="button"
            onClick={cycleLanguage}
            className="font-mono text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity px-3 py-1"
            aria-label={`${t('header.languageLabel') as string}: ${languageCode}`}
          >
            {t('header.languageLabel') as string} · {languageCode}
          </button>

          <nav className="flex flex-col items-center gap-4 sm:gap-6 text-center">
            {mobileLinks.map((link, idx) => (
              <a
                key={link.page}
                href={link.href}
                onClick={(event) => handleLinkClick(event, link.page)}
                className={`text-2xl sm:text-3xl font-heading text-ink transition-all duration-500 ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${isOpen ? idx * 50 : 0}ms` }}
                aria-current={page === link.page ? 'page' : undefined}
              >
                {t(`nav.${link.navKey}`) as string}
              </a>
            ))}
          </nav>
          <div className="flex gap-6 text-sm tracking-widest uppercase text-muted-light">
            <a href="https://instagram.com/innerspirit_studio" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://wa.me/573212248261" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
