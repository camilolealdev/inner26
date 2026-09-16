import React, { useContext, useEffect, useState } from 'react';
import { ShoppingCartIcon } from '../../constants';
import { CartContext } from '../../context/CartContext';
import { useNavigation, pageToPath, type PageName } from '../../context/NavigationContext';

const navLinks: Array<{ page: Exclude<PageName, 'home' | '404'>; label: string; href: string }> = [
  { page: 'nosotros', label: 'Nosotros', href: pageToPath('nosotros') },
  { page: 'espacio', label: 'El Espacio', href: pageToPath('espacio') },
  { page: 'clases', label: 'Clases', href: pageToPath('clases') },
  { page: 'eventos', label: 'Eventos', href: pageToPath('eventos') },
  { page: 'consultorio', label: 'Consultorio', href: pageToPath('consultorio') },
  { page: 'tienda', label: 'Tienda', href: pageToPath('tienda') },
  { page: 'blog', label: 'Blog', href: pageToPath('blog') },
  { page: 'contacto', label: 'Contacto', href: pageToPath('contacto') },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, toggleCheckoutModal } = useContext(CartContext);
  const { page, navigate, location, openLocationGate, setLocation } = useNavigation();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // On homepage & Portugal hero, header is transparent with white text until scrolled.
  // When the mobile menu is open the overlay is light (sand), so the header must
  // switch to its solid/ink style — otherwise the white brand + close icon vanish.
  const isHeroPage = page === 'home' || page === 'portugal';
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
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

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
            href={location === 'pt' ? pageToPath('portugal') : pageToPath('home')}
            onClick={(event) => handleLinkClick(event, location === 'pt' ? 'portugal' : 'home')}
            className="flex items-center gap-2.5 relative z-50 transition-colors duration-300"
            aria-current={(location === 'pt' ? page === 'portugal' : page === 'home') ? 'page' : undefined}
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
              {link.label}
            </a>
          ))}
          {location === 'pt' && (
            <a
              href="/portugal"
              onClick={(event) => handleLinkClick(event, 'portugal')}
              className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 text-[#8B9A8B] hover:text-white ${
                page === 'portugal' ? 'opacity-100 underline underline-offset-4' : 'opacity-85'
              }`}
              aria-current={page === 'portugal' ? 'page' : undefined}
            >
              🇵🇹 Portugal Hub
            </a>
          )}
        </nav>

        <div className="w-auto xl:w-1/4 flex justify-end items-center space-x-2 sm:space-x-3">
          {/* Location Switcher Button */}
          <button
            type="button"
            onClick={openLocationGate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all border border-current/25 hover:border-current/70 hover:bg-current/10"
            title="Cambiar sede / Choose sanctuary (Colombia / Portugal)"
            aria-label="Cambiar sede"
          >
            <span className="text-sm select-none" role="img" aria-hidden="true">
              {location === 'pt' ? '🇵🇹' : '🇨🇴'}
            </span>
            <span className="font-semibold uppercase tracking-widest text-[10px] hidden sm:inline">
              {location === 'pt' ? 'Portugal' : 'Colombia'}
            </span>
          </button>

          <button
            onClick={toggleCheckoutModal}
            className="relative group flex h-11 w-11 items-center justify-center rounded-sm opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Carrito"
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
            aria-label={isOpen ? 'Cerrar menu' : 'Abrir menu'}
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
            <span className="text-[11px] uppercase tracking-widest text-muted-light font-medium">Sede:</span>
            <button
              type="button"
              onClick={() => { setLocation('co'); setIsOpen(false); }}
              className={`text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full transition-all ${
                location === 'co' ? 'bg-slate-is text-white' : 'text-ink opacity-70'
              }`}
            >
              🇨🇴 Colombia
            </button>
            <button
              type="button"
              onClick={() => { setLocation('pt'); setIsOpen(false); }}
              className={`text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full transition-all ${
                location === 'pt' ? 'bg-slate-is text-white' : 'text-ink opacity-70'
              }`}
            >
              🇵🇹 Portugal
            </button>
          </div>

          <nav className="flex flex-col items-center gap-4 sm:gap-6 text-center">
            {navLinks.map((link, idx) => (
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
                {link.label}
              </a>
            ))}
            <a
              href="/portugal"
              onClick={(event) => handleLinkClick(event, 'portugal')}
              className={`text-2xl sm:text-3xl font-heading text-[#8B9A8B] transition-all duration-500 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              aria-current={page === 'portugal' ? 'page' : undefined}
            >
              🇵🇹 Portugal Hub
            </a>
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
