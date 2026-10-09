// Traducciones de datos operativos que viven en archivos de datos separados
// (no en componentes de sección) — hoy solo src/modules/events/data/events.ts.
// Cada evento se traduce por 'slug' para no acoplar el orden del array.
// NO se traducen aquí: price (número), slug, illustrationName, coverImageUrl,
// status, type — son datos estructurales, no copy. Fechas/horarios/montos se
// traducen como frase pero el dato exacto (cifra, moneda, hora) no cambia.

export type EventTranslation = {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  dateLabel: string;
  priceLabel: string;
  bookingSlots: string[];
  ctaLabel?: string;
};

export const eventsData = {
  es: {
    'inner-dance-luna-nueva': {
      tag: 'Evento Insignia',
      title: 'INNER DANCE',
      subtitle: 'Ritual de Luna Nueva',
      description:
        'No es una fiesta. Es un ritual contemporaneo para soltar tension, mover el cuerpo con libertad y abrir espacio a la claridad.',
      dateLabel: 'Sabados - 6:00 PM a 10:00 PM',
      priceLabel: '$55.000 COP puerta - $44.000 anticipado',
      bookingSlots: [
        'Sabado 6:00 PM - Cupo general',
        'Sabado 7:00 PM - Ingreso tardio',
        'Lista de espera - Confirmacion por WhatsApp',
      ],
    },
    kamaflight: {
      tag: 'Evento Insignia',
      title: 'KAMAFLIGHT',
      subtitle: 'Practica de Bienestar en Pareja',
      description:
        'Una fusion de AcroYoga, masaje tailandes y danza improvisada. Aprendemos a escuchar, apoyar, recibir y confiar a traves del cuerpo — abierto tanto para quienes vienen por primera vez como para quienes quieren seguir profundizando en la practica.',
      dateLabel: 'Sabado 10 de octubre - 11:00 AM a 1:00 PM',
      priceLabel: '$100.000 COP',
      bookingSlots: [
        'Sabado 10 de octubre - 11:00 AM a 1:00 PM',
      ],
    },
  },
  pt: {
    'inner-dance-luna-nueva': {
      tag: 'Evento Emblemático',
      title: 'INNER DANCE',
      subtitle: 'Ritual de Lua Nova',
      description:
        'Não é uma festa. É um ritual contemporâneo para libertar tensão, mover o corpo em liberdade e abrir espaço à clareza.',
      dateLabel: 'Sábados - 18h00 às 22h00',
      priceLabel: '$55.000 COP na porta - $44.000 antecipado',
      bookingSlots: [
        'Sábado 18h00 - Vaga geral',
        'Sábado 19h00 - Entrada tardia',
        'Lista de espera - Confirmação por WhatsApp',
      ],
    },
    kamaflight: {
      tag: 'Evento Emblemático',
      title: 'KAMAFLIGHT',
      subtitle: 'Prática de Bem-Estar em Casal',
      description:
        'Uma fusão de AcroYoga, massagem tailandesa e dança improvisada. Aprendemos a escutar, apoiar, receber e confiar através do corpo — aberto tanto para quem vem pela primeira vez como para quem quer aprofundar a prática.',
      dateLabel: 'Sábado 10 de outubro - 11h00 às 13h00',
      priceLabel: '$100.000 COP',
      bookingSlots: [
        'Sábado 10 de outubro - 11h00 às 13h00',
      ],
    },
  },
  en: {
    'inner-dance-luna-nueva': {
      tag: 'Flagship Event',
      title: 'INNER DANCE',
      subtitle: 'New Moon Ritual',
      description:
        "It's not a party. It's a contemporary ritual to release tension, move the body freely, and open space for clarity.",
      dateLabel: 'Saturdays - 6:00 PM to 10:00 PM',
      priceLabel: '$55,000 COP at the door - $44,000 in advance',
      bookingSlots: [
        'Saturday 6:00 PM - General spot',
        'Saturday 7:00 PM - Late entry',
        'Waitlist - Confirmation via WhatsApp',
      ],
    },
    kamaflight: {
      tag: 'Flagship Event',
      title: 'KAMAFLIGHT',
      subtitle: 'Couples Wellness Practice',
      description:
        "A fusion of AcroYoga, Thai massage and improvised dance. We learn to listen, support, receive and trust through the body — open to first-timers and to those deepening their practice.",
      dateLabel: 'Saturday, October 10th - 11:00 AM to 1:00 PM',
      priceLabel: '$100,000 COP',
      bookingSlots: [
        'Saturday, October 10th - 11:00 AM to 1:00 PM',
      ],
    },
  },
} as const;
