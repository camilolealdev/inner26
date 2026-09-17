
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type PageName =
  | 'home'
  | 'nosotros'
  | 'espacio'
  | 'clases'
  | 'eventos'
  | 'consultorio'
  | 'tienda'
  | 'blog'
  | 'contacto'
  | 'privacidad'
  | 'terminos'
  | 'portugal'
  | 'chicago'
  | 'comunidad'
  | '404';

export type LocationChoice = 'co' | 'pt' | 'us';
export type Language = 'es' | 'pt' | 'en';

const languageForLocation = (loc: LocationChoice): Language =>
  loc === 'pt' ? 'pt' : loc === 'us' ? 'en' : 'es';

export const PAGE_TO_PATH: Record<PageName, string> = {
  '404': '/404',
  home: '/',
  nosotros: '/nosotros',
  espacio: '/espacio',
  clases: '/clases',
  eventos: '/eventos',
  consultorio: '/consultorio',
  tienda: '/tienda',
  blog: '/blog',
  contacto: '/contacto',
  privacidad: '/privacidad',
  terminos: '/terminos',
  portugal: '/portugal',
  chicago: '/chicago',
  comunidad: '/comunidad',
};

export const pathToPage = (pathname: string): PageName => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  if (normalizedPath === '/pt' || normalizedPath === '/portugal') {
    return 'portugal';
  }
  if (normalizedPath === '/us' || normalizedPath === '/chicago' || normalizedPath === '/static-dance') {
    return 'chicago';
  }
  if (normalizedPath === '/comunidad' || normalizedPath === '/community') {
    return 'comunidad';
  }
  if (normalizedPath === '/co' || normalizedPath === '/colombia') {
    return 'home';
  }
  if (
    normalizedPath === '/terminos' ||
    normalizedPath === '/terminos-y-condiciones' ||
    normalizedPath === '/terms' ||
    normalizedPath === '/cookies' ||
    normalizedPath === '/devoluciones'
  ) {
    return 'terminos';
  }
  if (
    normalizedPath === '/privacidad' ||
    normalizedPath === '/politica-privacidad' ||
    normalizedPath === '/privacy' ||
    normalizedPath === '/habeas-data'
  ) {
    return 'privacidad';
  }
  const found = (Object.entries(PAGE_TO_PATH) as Array<[PageName, string]>).find(
    ([, path]) => path === normalizedPath
  );
  return found?.[0] ?? '404';
};

export const pageToPath = (page: PageName): string => PAGE_TO_PATH[page];

interface NavigationContextType {
  page: PageName;
  navigate: (page: PageName) => void;
  location: LocationChoice;
  setLocation: (loc: LocationChoice) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isLocationGateOpen: boolean;
  openLocationGate: () => void;
  closeLocationGate: () => void;
}

const NavigationContext = createContext<NavigationContextType>({} as NavigationContextType);

const STORAGE_KEY = 'inner_spirit_location';
const LANGUAGE_STORAGE_KEY = 'inner_spirit_language';

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<PageName>(() => {
    if (typeof window === 'undefined') return 'home';
    return pathToPage(window.location.pathname);
  });

  const [location, setLocationState] = useState<LocationChoice>(() => {
    if (typeof window === 'undefined') return 'co';
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pt') || currentPath.includes('/portugal')) {
      return 'pt';
    }
    if (currentPath.includes('/us') || currentPath.includes('/chicago')) {
      return 'us';
    }
    const saved = localStorage.getItem(STORAGE_KEY) as LocationChoice | null;
    return saved === 'pt' || saved === 'co' || saved === 'us' ? saved : 'co';
  });

  const [isLocationGateOpen, setIsLocationGateOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    // Open on first entry if no choice has ever been made and not explicitly on a subpath
    const saved = localStorage.getItem(STORAGE_KEY);
    return !saved;
  });

  // Idioma: independiente de la sede. Por defecto se deriva de la sede activa,
  // pero el visitante puede cambiarlo aparte (persistido en su propia clave).
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return languageForLocation(location);
    const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    if (savedLang === 'es' || savedLang === 'pt' || savedLang === 'en') {
      return savedLang;
    }
    return languageForLocation(location);
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  };

  const setLocation = (newLoc: LocationChoice) => {
    setLocationState(newLoc);
    setLanguage(languageForLocation(newLoc));
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLoc);
    }
    if (newLoc === 'pt') {
      navigate('portugal');
    } else if (newLoc === 'us') {
      navigate('chicago');
    } else if (page === 'portugal' || page === 'chicago') {
      navigate('home');
    }
    setIsLocationGateOpen(false);
  };

  const openLocationGate = () => setIsLocationGateOpen(true);
  const closeLocationGate = () => setIsLocationGateOpen(false);

  const navigate = (targetPage: PageName): void => {
    if (page === targetPage) return;

    const performNavigation = () => {
      setPage(targetPage);
      if (typeof window !== 'undefined') {
        const targetPath = pageToPath(targetPage);
        if (window.location.pathname !== targetPath) {
          window.history.pushState({ page: targetPage }, '', targetPath);
        }
        window.scrollTo(0, 0);
      }
    };

    if (document.startViewTransition) {
      document.startViewTransition(performNavigation);
    } else {
      performNavigation();
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const targetPage = pathToPage(window.location.pathname);
      if (targetPage === 'portugal') {
        setLocationState('pt');
      } else if (targetPage === 'chicago') {
        setLocationState('us');
      } else if (targetPage === 'home') {
        setLocationState('co');
      }
      if (document.startViewTransition) {
        document.startViewTransition(() => setPage(targetPage));
      } else {
        setPage(targetPage);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        page,
        navigate,
        location,
        setLocation,
        language,
        setLanguage,
        isLocationGateOpen,
        openLocationGate,
        closeLocationGate,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
