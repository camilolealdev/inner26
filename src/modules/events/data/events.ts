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
      'No es una fiesta. Es un ritual contemporaneo para soltar tension, mover el cuerpo con libertad y abrir espacio a la claridad.',
    dateLabel: 'Sabados - 6:00 PM a 10:00 PM',
    price: 55000,
    priceLabel: '$55.000 COP puerta - $44.000 anticipado',
    illustrationName: 'dance',
    coverImageUrl: '/images/events/inner-dance.jpg',
    bookingSlots: [
      'Sabado 6:00 PM - Cupo general',
      'Sabado 7:00 PM - Ingreso tardio',
      'Lista de espera - Confirmacion por WhatsApp',
    ],
    type: 'event',
  },
  {
    slug: 'rocket-yoga-training',
    tag: 'Formacion - lista de espera',
    title: 'ROCKET YOGA',
    subtitle: 'Teacher Training Nivel 1 - 50 horas',
    description:
      'La cohorte de abril 2026 ya cerro. Dejamos abierta la lista de espera para la siguiente fecha.',
    dateLabel: 'Siguiente cohorte por confirmar',
    price: 95000,
    priceLabel: 'Lista de espera - sin pago anticipado',
    illustrationName: 'yoga',
    coverImageUrl: '/images/events/rocket-yoga.jpg',
    bookingSlots: [
      'Avisarme siguiente cohorte',
      'Lista de espera - siguiente cohorte',
    ],
    status: 'waitlist',
    ctaLabel: 'Entrar a lista de espera',
    type: 'event',
  },
  {
    slug: 'circulo-luna-llena',
    tag: 'Ritual Mensual',
    title: 'CIRCULO LUNA LLENA',
    subtitle: 'Meditacion, journaling y sonido',
    description:
      'Encuentro mensual para cerrar ciclos con respiracion, escritura guiada y ceremonia sonora en comunidad.',
    dateLabel: 'Viernes de luna llena - 7:00 PM',
    price: 44000,
    priceLabel: '$44.000 COP anticipado',
    illustrationName: 'ritual',
    coverImageUrl: '/images/events/circulo-luna.jpg',
    bookingSlots: [
      'Viernes 7:00 PM - Candelaria',
      'Viernes 7:00 PM - Streaming privado',
      'Pack mensual - 3 encuentros',
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
