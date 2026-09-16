
import React, { lazy, Suspense, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import BookingModal from './components/modals/BookingModal';
import CheckoutModal from './components/modals/CheckoutModal';
import ToastContainer from './components/ui/ToastContainer';
import SplashCursor from './components/effects/SplashCursor';
import ErrorBoundary from './components/ui/ErrorBoundary';

interface PageSEO {
  canonical: string;
  title: string;
  description: string;
  image?: string;
  locale?: string;
}

const pageSEO: Record<string, PageSEO> = {
  '404': {
    canonical: 'https://innerspirit.net/',
    title: 'Página no encontrada — Inner Spirit Studio',
    description: 'La página que buscas no existe. Vuelve al inicio para explorar nuestras clases de yoga, eventos y más.',
  },
  home: {
    canonical: 'https://innerspirit.net/',
    title: 'Inner Spirit Studio — Yoga, Bienestar y Cultura en La Candelaria, Bogotá',
    description: 'Centro de yoga, meditación, sound healing y bienestar integral en el corazón histórico de La Candelaria, Bogotá, a los pies de Monserrate. Clases diarias, eventos, ceremonias y acompañamiento individual. 4.9★ en Google (162 reseñas).',
    image: 'https://innerspirit.net/images/studio/yoga-clase-grupal.jpg',
    locale: 'es_CO',
  },
  nosotros: {
    canonical: 'https://innerspirit.net/nosotros',
    title: 'Nosotros — Inner Spirit Studio | Nuestra Historia',
    description: 'Conoce la historia de Inner Spirit Studio, un santuario de yoga y bienestar en el corazón de La Candelaria. 4.9⭐ en Google con 143+ reseñas.',
  },
  espacio: {
    canonical: 'https://innerspirit.net/espacio',
    title: 'El Espacio — Alquiler para Workshops y Certificaciones | Inner Spirit Studio',
    description: 'Alquila Inner Spirit Studio en La Candelaria, Bogotá para workshops, certificaciones, rituales y experiencias de turismo wellness. Un espacio sereno para producir encuentros con identidad local.',
  },
  clases: {
    canonical: 'https://innerspirit.net/clases',
    title: 'Clases de Yoga, Meditación y Breathwork — Inner Spirit Studio',
    description: 'Vinyasa, Hatha, Yin Yoga, meditación guiada, breathwork y sound healing. Clases para todos los niveles en La Candelaria, Bogotá. Desde $36.000 COP.',
  },
  eventos: {
    canonical: 'https://innerspirit.net/eventos',
    title: 'Eventos y Rituales — Inner Spirit Studio',
    description: 'Inner Dance, ceremonias de luna nueva, retiros y encuentros conscientes en Bogotá. Experiencias transformadoras en comunidad.',
  },
  consultorio: {
    canonical: 'https://innerspirit.net/consultorio',
    title: 'Consultorio — Sesiones Individuales | Inner Spirit Studio',
    description: 'Acompañamiento individual: yoga terapéutico, meditación guiada, breathwork y arte terapia. Sesiones 1:1 personalizadas en La Candelaria.',
  },
  tienda: {
    canonical: 'https://innerspirit.net/tienda',
    title: 'Tienda — Objetos Conscientes | Inner Spirit Studio',
    description: 'Cristales, incienso, aceites esenciales, cuencos tibetanos y más. Herramientas para acompañar tu práctica y rituales diarios.',
  },
  blog: {
    canonical: 'https://innerspirit.net/blog',
    title: 'Blog — Recursos para tu Viaje Interior | Inner Spirit Studio',
    description: 'Artículos sobre yoga, meditación, breathwork, chakras y crecimiento espiritual. Guías prácticas para nutrir tu bienestar.',
  },
  contacto: {
    canonical: 'https://innerspirit.net/contacto',
    title: 'Contacto — Inner Spirit Studio | La Candelaria, Bogotá',
    description: 'Visítanos en Transversal 1 #17-29, La Candelaria, Bogotá. WhatsApp: +57 321 224 8261. Horario: Lun-Vie 6:30AM–9PM, Sáb-Dom 8AM–9PM.',
  },
  portugal: {
    canonical: 'https://innerspirit.net/portugal',
    title: 'Inner Spirit Portugal — Voluntariado & Comunidade na Costa da Nazaré',
    description: 'Inner Spirit semeia um novo espaço de bem-estar na zona centro de Portugal, perto da Nazaré (costa de Leiria). Programa de voluntariado aberto: remodelações, horta e construção da futura comunidade.',
    image: 'https://innerspirit.net/images/portugal/og-portugal.jpg',
    locale: 'pt_PT',
  },
  privacidad: {
    canonical: 'https://innerspirit.net/privacidad',
    title: 'Política de Tratamiento de Datos — Inner Spirit Studio',
    description: 'Política de Tratamiento de Datos Personales de Inner Spirit Studio conforme a la Ley 1581 de 2012 (Habeas Data) en Colombia. Conoce tus derechos como titular.',
  },
};

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const EspacioPage = lazy(() => import('./pages/EspacioPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const ClassesPage = lazy(() => import('./pages/ClassesPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const ConsultorioPage = lazy(() => import('./pages/ConsultorioPage'));
const ShopPage = lazy(() => import('./modules/shop/pages/ShopPage'));
const BlogPage = lazy(() => import('./modules/blog/pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PortugalPage = lazy(() => import('./pages/PortugalPage'));
import LocationGateModal from './components/modals/LocationGateModal';
import RafflePopupModal from './components/modals/RafflePopupModal';

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-[50vh]" role="status" aria-label="Cargando página">
    <div className="w-8 h-8 border-4 border-slate-is border-t-transparent rounded-full animate-spin" />
  </div>
);

const NotFoundPage: React.FC = () => {
  const { navigate } = useNavigation();
  return (
    <section className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center px-6">
        <h1 className="text-7xl md:text-9xl font-heading font-bold text-slate-is/20 leading-none">404</h1>
        <h2 className="text-2xl md:text-3xl font-heading mt-4 text-ink">Página no encontrada</h2>
        <p className="mt-3 text-muted max-w-md mx-auto">Lo sentimos, no pudimos encontrar lo que buscas.</p>
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate('home'); }}
          className="mt-8 inline-block px-8 py-3 bg-slate-is text-sand-dune font-heading text-lg transition-all hover:bg-deep-teal"
        >
          Volver al inicio
        </a>
      </div>
    </section>
  );
};

const PageRenderer: React.FC = () => {
  const { page } = useNavigation();

  switch (page) {
    case 'nosotros':
      return <AboutPage />;
    case 'espacio':
      return <EspacioPage />;
    case 'clases':
      return <ClassesPage />;
    case 'eventos':
      return <EventsPage />;
    case 'consultorio':
      return <ConsultorioPage />;
    case 'tienda':
      return <ShopPage />;
    case 'blog':
      return <BlogPage />;
    case 'contacto':
      return <ContactPage />;
    case 'portugal':
      return <PortugalPage />;
    case 'privacidad':
      return <PrivacyPage />;
    case '404':
      return <NotFoundPage />;
    default:
      return <HomePage />;
  }
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const AppContent: React.FC = () => {
  const { page } = useNavigation();

  useEffect(() => {
    const seo = pageSEO[page] ?? pageSEO.home!;

    // Update document title
    document.title = seo.title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = seo.description;

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', seo.description);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', seo.canonical);
    const ogImage = document.querySelector('meta[property="og:image"]');
    const imageUrl = seo.image || 'https://innerspirit.net/images/studio/yoga-clase-grupal.jpg';
    if (ogImage) ogImage.setAttribute('content', imageUrl);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', seo.locale || 'es_CO');

    // Update Twitter tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', seo.title);
    const twDescription = document.querySelector('meta[name="twitter:description"]');
    if (twDescription) twDescription.setAttribute('content', seo.description);
    const twImage = document.querySelector('meta[name="twitter:image"]');
    if (twImage) twImage.setAttribute('content', imageUrl);

    // Update canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = seo.canonical;

    requestAnimationFrame(() => {
      document.getElementById('main-content')?.focus({ preventScroll: true });
    });
  }, [page]);

  return (
    <>
      {/* Particle cursor — 2D canvas, pointer-events:none, skipped if reduced-motion */}
      {!prefersReducedMotion() && (
        <ErrorBoundary fallback={null}>
          <SplashCursor />
        </ErrorBoundary>
      )}

      <div style={{ position: 'relative' }} className="bg-base text-base-text antialiased">
        {/* Header is fixed/z-50 — always on top */}
        <Header />

        {/* Main page content — wrapped in ErrorBoundary so WebGL crashes don't break nav */}
        {/* Homepage and Portugal page handle their own spacing */}
        <main
          id="main-content"
          tabIndex={-1}
          className={`${page !== 'home' && page !== 'portugal' ? 'pt-20 md:pt-24' : ''} focus:outline-none`}
        >
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <PageRenderer />
            </Suspense>
          </ErrorBoundary>
        </main>

        <Footer />

        {/* Modals layer — above everything */}
        <div style={{ position: 'relative', zIndex: 60 }}>
          <BookingModal />
          <CheckoutModal />
          <LocationGateModal />
          <RafflePopupModal />
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <NavigationProvider>
      <CartProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </CartProvider>
    </NavigationProvider>
  );
};

export default App;
