
import React, { useEffect } from 'react';
import InnerDanceHeroSection from '../components/sections/landing/InnerDanceHeroSection';
import ExperienciasSection from '../components/sections/landing/ExperienciasSection';
import LandingIGSection from '../components/sections/landing/LandingIGSection';
import PortugalTeaserSection from '../components/sections/landing/PortugalTeaserSection';
import TiendaTeaserSection from '../components/sections/landing/TiendaTeaserSection';
import GoogleReviewsSection from '../components/sections/landing/GoogleReviewsSection';
import WhatsAppCommunitySection from '../components/sections/landing/WhatsAppCommunitySection';

const landingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Inner Dance — Danza Consciente en Bogotá',
  description:
    'Ritual de movimiento consciente guiado por sonido en vivo, descalzo y sin coreografía, en Inner Spirit Studio, La Candelaria, Bogotá.',
  location: {
    '@type': 'Place',
    name: 'Inner Spirit Studio',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Transversal 1 # 17-29',
      addressLocality: 'La Candelaria',
      addressRegion: 'Bogotá',
      addressCountry: 'CO',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Inner Spirit Studio',
    url: 'https://innerspirit.net',
  },
};

const LandingPage: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(landingSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <>
      <InnerDanceHeroSection />
      <ExperienciasSection />
      <PortugalTeaserSection />
      <TiendaTeaserSection />
      <GoogleReviewsSection />
      <LandingIGSection />
      <WhatsAppCommunitySection />
    </>
  );
};

export default LandingPage;
