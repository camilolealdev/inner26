
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
  | 'portugal'
  | '404';

export type LocationChoice = 'co' | 'pt';

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
  portugal: '/portugal',
};

export const pathToPage = (pathname: string): PageName => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  if (normalizedPath === '/pt' || normalizedPath === '/portugal') {
    return 'portugal';
  }
  if (normalizedPath === '/co' || normalizedPath === '/colombia') {
    return 'home';
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
  isLocationGateOpen: boolean;
  openLocationGate: () => void;
  closeLocationGate: () => void;
}

const NavigationContext = createContext<NavigationContextType>({} as NavigationContextType);

const STORAGE_KEY = 'inner_spirit_location';

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
    const saved = localStorage.getItem(STORAGE_KEY) as LocationChoice | null;
    return saved === 'pt' || saved === 'co' ? saved : 'co';
  });

  const [isLocationGateOpen, setIsLocationGateOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    // Open on first entry if no choice has ever been made and not explicitly on a subpath
    const saved = localStorage.getItem(STORAGE_KEY);
    return !saved;
  });

  const setLocation = (newLoc: LocationChoice) => {
    setLocationState(newLoc);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLoc);
    }
    if (newLoc === 'pt') {
      navigate('portugal');
    } else if (page === 'portugal') {
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
