
import React, { useEffect } from 'react';
import HeroSection from '../components/sections/HeroSection';
import ExperienceGatewaySection from '../components/sections/ExperienceGatewaySection';
import StudioSection from '../components/sections/StudioSection';
import AboutSection from '../components/sections/AboutSection';
import DestinationsSection from '../components/sections/DestinationsSection';
import FindYourPracticeSection from '../components/sections/FindYourPracticeSection';
import EventsSection from '../components/sections/EventsSection';
import ConsultorioSection from '../components/sections/ConsultorioSection';
import ShopSection from '../modules/shop/components/ShopSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ExploraBogotaSection from '../components/sections/ExploraBogotaSection';
import BlogSection from '../modules/blog/components/BlogSection';
import NewsletterSection from '../components/sections/NewsletterSection';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'YogaStudio',
  '@id': 'https://innerspirit.net',
  name: 'Inner Spirit Studio',
  image: 'https://innerspirit.net/images/og-banner.jpg',
  description: 'Centro de yoga, meditación, danza y bienestar integral en La Candelaria, Bogotá.',
  url: 'https://innerspirit.net',
  telephone: '+573212248261',
  email: 'hola@innerspirit.co',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Transversal 1 # 17-29',
    addressLocality: 'La Candelaria',
    addressRegion: 'Bogotá',
    addressCountry: 'CO',
    postalCode: '111711',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 4.5942,
    longitude: -74.0705,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '06:30',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '08:00',
      closes: '21:00',
    },
  ],
  priceRange: '$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '162',
    bestRating: '5',
  },
  sameAs: [
    'https://instagram.com/innerspirit_studio',
    'https://wa.me/573212248261',
  ],
};

const HomePage: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <>
      <HeroSection />
      <ExperienceGatewaySection />
      <EventsSection />
      <StudioSection />
      <AboutSection />
      <DestinationsSection />
      <FindYourPracticeSection />
      <ConsultorioSection />
      <ExploraBogotaSection />
      <TestimonialsSection />
      <ShopSection />
      <BlogSection />
      <NewsletterSection />
    </>
  );
};

export default HomePage;
