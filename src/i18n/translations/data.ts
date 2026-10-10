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
        'El movimiento consciente se ha consolidado en Bogotá como una vía de transformación personal, meditación activa y bienestar comunitario. A diferencia de una fiesta tradicional, proponemos una pista libre de alcohol, sustancias, calzado y juicios — ritmos que van desde la electrónica orgánica y la latinotrónica mística hasta frecuencias de relajación y sanación. Línea de DJs y visuales distintos cada edición. Incluye aromática de hierbas al cierre.',
      dateLabel: 'Sabados - 6:30 PM a 9:30 PM',
      priceLabel: '$60.000 COP entrada - $100.000 COP dupla',
      bookingSlots: [
        '10 de octubre',
        '17 de octubre - DJ y visuales por confirmar',
        '24 de octubre - DJ y visuales por confirmar',
        '7 de noviembre - DJ y visuales por confirmar',
      ],
    },
    kamaflight: {
      tag: 'Evento Insignia',
      title: 'KAMAFLIGHT',
      subtitle: 'Practica de Bienestar en Pareja',
      description:
        'Una experiencia para salir de la rutina, conectar con tu cuerpo, confiar, jugar y descubrir nuevas formas de moverte y relacionarte con otros. Fusiona AcroYoga, masaje Thai, danza y movimiento de contacto, y espacios de conexión, presencia y confianza. No necesitas experiencia previa ni ser flexible, ni saber acroyoga — solo ganas de probar algo nuevo. Puedes venir solo/a: la práctica está diseñada para compartir, explorar y conectar en un espacio cuidado y guiado.',
      dateLabel: 'Sabado 10 de octubre - 11:00 AM a 1:00 PM',
      priceLabel: '$75.000 COP persona - $150.000 COP pareja',
      bookingSlots: [
        'Sabado 10 de octubre - 11:00 AM a 1:00 PM',
        'Sabado 24 de octubre - 11:00 AM a 1:00 PM',
        'Lista de espera - Confirmacion por WhatsApp',
      ],
    },
  },
  pt: {
    'inner-dance-luna-nueva': {
      tag: 'Evento Emblemático',
      title: 'INNER DANCE',
      subtitle: 'Ritual de Lua Nova',
      description:
        'O movimento consciente consolidou-se em Bogotá como uma via de transformação pessoal, meditação ativa e bem-estar comunitário. Diferente de uma festa tradicional, propomos uma pista livre de álcool, substâncias, calçado e julgamentos — ritmos que vão da eletrónica orgânica e da latinotrónica mística até frequências de relaxamento e sanação. Line-up de DJs e visuais diferentes em cada edição. Inclui aromática de ervas no encerramento.',
      dateLabel: 'Sábados - 18h30 às 21h30',
      priceLabel: '$60.000 COP entrada - $100.000 COP dupla',
      bookingSlots: [
        '10 de outubro',
        '17 de outubro - DJ e visuais a confirmar',
        '24 de outubro - DJ e visuais a confirmar',
        '7 de novembro - DJ e visuais a confirmar',
      ],
    },
    kamaflight: {
      tag: 'Evento Emblemático',
      title: 'KAMAFLIGHT',
      subtitle: 'Prática de Bem-Estar em Casal',
      description:
        'Uma experiência para sair da rotina, conectar com o teu corpo, confiar, brincar e descobrir novas formas de te mover e de te relacionar com os outros. Fusão de AcroYoga, massagem Thai, dança e movimento de contacto, e espaços de conexão, presença e confiança. Não precisas de experiência prévia nem de ser flexível, nem de saber acroyoga — só vontade de experimentar algo novo. Podes vir só/a: a prática foi desenhada para partilhar, explorar e conectar num espaço cuidado e guiado.',
      dateLabel: 'Sábado 10 de outubro - 11h00 às 13h00',
      priceLabel: '$75.000 COP pessoa - $150.000 COP casal',
      bookingSlots: [
        'Sábado 10 de outubro - 11h00 às 13h00',
        'Sábado 24 de outubro - 11h00 às 13h00',
        'Lista de espera - Confirmação por WhatsApp',
      ],
    },
  },
  en: {
    'inner-dance-luna-nueva': {
      tag: 'Flagship Event',
      title: 'INNER DANCE',
      subtitle: 'New Moon Ritual',
      description:
        "Conscious movement has become a path to personal transformation, active meditation and community wellness in Bogotá. Unlike a traditional party, our dance floor is free of alcohol, substances, shoes and judgment — rhythms ranging from organic electronic and mystic latinotronic music to relaxation and healing frequencies. A different DJ lineup and visuals every edition. Herbal tea included at closing.",
      dateLabel: 'Saturdays - 6:30 PM to 9:30 PM',
      priceLabel: '$60,000 COP entry - $100,000 COP for two',
      bookingSlots: [
        'October 10th',
        'October 17th - DJ and visuals to be announced',
        'October 24th - DJ and visuals to be announced',
        'November 7th - DJ and visuals to be announced',
      ],
    },
    kamaflight: {
      tag: 'Flagship Event',
      title: 'KAMAFLIGHT',
      subtitle: 'Couples Wellness Practice',
      description:
        "An experience to step out of routine, connect with your body, trust, play and discover new ways to move and relate to others. A fusion of AcroYoga, Thai massage, dance and contact movement, and spaces for connection, presence and trust. You don't need prior experience, flexibility, or acroyoga knowledge — just the will to try something new. You can come solo: the practice is designed to share, explore and connect in a cared-for, guided space.",
      dateLabel: 'Saturday, October 10th - 11:00 AM to 1:00 PM',
      priceLabel: '$75,000 COP per person - $150,000 COP per couple',
      bookingSlots: [
        'Saturday, October 10th - 11:00 AM to 1:00 PM',
        'Saturday, October 24th - 11:00 AM to 1:00 PM',
        'Waitlist - Confirmation via WhatsApp',
      ],
    },
  },
} as const;
