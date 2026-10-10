import type { StudioEvent } from '../types';
import { eventsData } from '../../../i18n/translations/data';

type Language = keyof typeof eventsData;

export const studioEvents: StudioEvent[] = [
  {
    slug: 'inner-dance-luna-nueva',
    tag: 'Evento Insignia',
    title: 'INNER DANCE',
    subtitle: 'Ritual de Luna Nueva',
    description:
      'El movimiento consciente se ha consolidado en Bogotá como una vía de transformación personal, meditación activa y bienestar comunitario. A diferencia de una fiesta tradicional, proponemos una pista libre de alcohol, sustancias, calzado y juicios — ritmos que van desde la electrónica orgánica y la latinotrónica mística hasta frecuencias de relajación y sanación.',
    dateLabel: 'Sabados - 6:30 PM a 9:30 PM',
    price: 60000,
    priceLabel: '$60.000 COP entrada - $100.000 COP dupla',
    illustrationName: 'dance',
    coverImageUrl: '/images/events/innerdance.jpeg',
    bookingSlots: [
      '10 de octubre',
      '17 de octubre - DJ y visuales por confirmar',
      '24 de octubre - DJ y visuales por confirmar',
      '7 de noviembre - DJ y visuales por confirmar',
    ],
    type: 'event',
  },
  {
    slug: 'kamaflight',
    tag: 'Evento Insignia',
    title: 'KAMAFLIGHT',
    subtitle: 'Practica de Bienestar en Pareja',
    description:
      'Una experiencia para salir de la rutina, conectar con tu cuerpo, confiar, jugar y descubrir nuevas formas de moverte y relacionarte con otros. Fusiona AcroYoga, masaje Thai, danza y movimiento de contacto, y espacios de conexión, presencia y confianza. No necesitas experiencia previa ni ser flexible, ni saber acroyoga — solo ganas de probar algo nuevo. Puedes venir solo/a.',
    dateLabel: 'Sabado 10 de octubre - 11:00 AM a 1:00 PM',
    price: 75000,
    priceLabel: '$75.000 COP persona - $150.000 COP pareja',
    illustrationName: 'acro-yoga',
    coverImageUrl: '/images/events/kamafligth.jpg',
    bookingSlots: [
      'Sabado 10 de octubre - 11:00 AM a 1:00 PM',
      'Sabado 24 de octubre - 11:00 AM a 1:00 PM',
      'Lista de espera - Confirmacion por WhatsApp',
    ],
    type: 'event',
  },
];

export const getEventBySlug = (slug: string): StudioEvent | undefined =>
  studioEvents.find((event) => event.slug === slug);

export const isEventBookable = (event: StudioEvent): boolean =>
  event.status !== 'waitlist';

export const getEventCtaLabel = (event: StudioEvent): string =>
  event.ctaLabel ?? 'Reservar Lugar';

// Devuelve el evento con su copy (tag/title/subtitle/description/dateLabel/
// priceLabel/bookingSlots/ctaLabel) en el idioma pedido, con fallback a
// español si el slug no tiene traducción todavía. Campos estructurales
// (price, slug, illustrationName, coverImageUrl, status, type) no cambian:
// no son copy, son datos operativos. Pensado para que las vistas que
// consuman studioEvents (EventsPage, EventsSection) se conecten a esto en
// una migración posterior sin romper el shape actual de StudioEvent.
export const getLocalizedEvent = (event: StudioEvent, language: Language): StudioEvent => {
  const translation = eventsData[language]?.[event.slug as keyof (typeof eventsData)['es']]
    ?? eventsData.es[event.slug as keyof (typeof eventsData)['es']];
  if (!translation) return event;
  const ctaLabel = (translation as { ctaLabel?: string }).ctaLabel ?? event.ctaLabel;
  return {
    ...event,
    tag: translation.tag,
    title: translation.title,
    subtitle: translation.subtitle,
    description: translation.description,
    dateLabel: translation.dateLabel,
    priceLabel: translation.priceLabel,
    bookingSlots: [...translation.bookingSlots],
    ...(ctaLabel !== undefined ? { ctaLabel } : {}),
  };
};

export const getLocalizedEvents = (language: Language): StudioEvent[] =>
  studioEvents.map((event) => getLocalizedEvent(event, language));

export const getEventWaitlistUrl = (event: StudioEvent): string => {
  const text = encodeURIComponent(
    `Hola Inner Spirit, quiero entrar a la lista de espera para ${event.title}.`
  );
  return `https://wa.me/573212248261?text=${text}`;
};
