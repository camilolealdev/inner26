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
    'rocket-yoga-training': {
      tag: 'Formacion - lista de espera',
      title: 'ROCKET YOGA',
      subtitle: 'Teacher Training Nivel 1 - 50 horas',
      description:
        'La cohorte de abril 2026 ya cerro. Dejamos abierta la lista de espera para la siguiente fecha.',
      dateLabel: 'Siguiente cohorte por confirmar',
      priceLabel: 'Lista de espera - sin pago anticipado',
      bookingSlots: [
        'Avisarme siguiente cohorte',
        'Lista de espera - siguiente cohorte',
      ],
      ctaLabel: 'Entrar a lista de espera',
    },
    'circulo-luna-llena': {
      tag: 'Ritual Mensual',
      title: 'CIRCULO LUNA LLENA',
      subtitle: 'Meditacion, journaling y sonido',
      description:
        'Encuentro mensual para cerrar ciclos con respiracion, escritura guiada y ceremonia sonora en comunidad.',
      dateLabel: 'Viernes de luna llena - 7:00 PM',
      priceLabel: '$44.000 COP anticipado',
      bookingSlots: [
        'Viernes 7:00 PM - Candelaria',
        'Viernes 7:00 PM - Streaming privado',
        'Pack mensual - 3 encuentros',
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
    'rocket-yoga-training': {
      tag: 'Formação - lista de espera',
      title: 'ROCKET YOGA',
      subtitle: 'Formação de Professores Nível 1 - 50 horas',
      description:
        'A turma de abril de 2026 já encerrou. Deixamos aberta a lista de espera para a próxima data.',
      dateLabel: 'Próxima turma a confirmar',
      priceLabel: 'Lista de espera - sem pagamento antecipado',
      bookingSlots: [
        'Avisem-me da próxima turma',
        'Lista de espera - próxima turma',
      ],
      ctaLabel: 'Entrar na lista de espera',
    },
    'circulo-luna-llena': {
      tag: 'Ritual Mensal',
      title: 'CÍRCULO DE LUA CHEIA',
      subtitle: 'Meditação, journaling e som',
      description:
        'Encontro mensal para fechar ciclos com respiração, escrita guiada e cerimónia sonora em comunidade.',
      dateLabel: 'Sexta-feira de lua cheia - 19h00',
      priceLabel: '$44.000 COP antecipado',
      bookingSlots: [
        'Sexta 19h00 - Candelaria',
        'Sexta 19h00 - Streaming privado',
        'Pacote mensal - 3 encontros',
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
    'rocket-yoga-training': {
      tag: 'Training - waitlist',
      title: 'ROCKET YOGA',
      subtitle: 'Teacher Training Level 1 - 50 hours',
      description:
        'The April 2026 cohort is already closed. We keep the waitlist open for the next date.',
      dateLabel: 'Next cohort to be confirmed',
      priceLabel: 'Waitlist - no advance payment',
      bookingSlots: [
        'Notify me of the next cohort',
        'Waitlist - next cohort',
      ],
      ctaLabel: 'Join the waitlist',
    },
    'circulo-luna-llena': {
      tag: 'Monthly Ritual',
      title: 'FULL MOON CIRCLE',
      subtitle: 'Meditation, journaling and sound',
      description:
        'Monthly gathering to close cycles through breathwork, guided writing and a communal sound ceremony.',
      dateLabel: 'Full moon Friday - 7:00 PM',
      priceLabel: '$44,000 COP in advance',
      bookingSlots: [
        'Friday 7:00 PM - Candelaria',
        'Friday 7:00 PM - Private streaming',
        'Monthly pack - 3 gatherings',
      ],
    },
  },
} as const;
