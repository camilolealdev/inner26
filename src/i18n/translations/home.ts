// Traducciones de la sección Home/Bogotá — copy único de HeroSection,
// ExperienceGatewaySection, StudioSection, AboutSection, DestinationsSection,
// FindYourPracticeSection, EventsSection, ConsultorioSection,
// ExploraBogotaSection, TestimonialsSection (solo UI, nunca las reseñas
// reales), ShopSection y BlogSection. Ver src/i18n/translations/common.ts
// para el chrome compartido (Header, Footer, modales).

export const home = {
  es: {
    hero: {
      badge: 'La Candelaria, Bogotá',
      headlineMain: 'Movimiento',
      headlineSub: 'Consciente',
      subtitle: 'Santuario de Yoga y Meditación',
      description:
        'Un refugio en el corazón histórico de Bogotá para calmar la mente, habitar el cuerpo y volver a ti. Aquí la práctica es una forma de vivir: dejar fluir.',
      ctaClasses: 'Ver Clases',
      ctaEvents: 'Próximos Eventos',
      metaItems: ['Comunidad', 'Cuidado', 'Reconexión'],
      scrollLabel: 'Descubre',
    },
    gateway: {
      eyebrow: 'Entrada guiada',
      title: 'Elige el ritmo de tu visita.',
      intro:
        'Tres caminos para pasar de explorar a reservar: una clase para esta semana, un ritual con fecha o un acompañamiento solo para ti.',
      sectionAriaLabel: 'Accesos principales',
      bookingTitle: 'Yoga',
      items: {
        firstPractice: {
          label: 'Primera práctica',
          title: 'Agenda una clase esta semana',
          copy: 'Yoga, meditación, breathwork y movimiento consciente con reserva directa.',
          action: 'Reservar clase',
        },
        upcomingRituals: {
          label: 'Rituales próximos',
          title: 'Encuentros con fecha y cupo',
          copy: 'Rituales y experiencias de comunidad con cada detalle claro antes de reservar.',
          action: 'Ver eventos',
        },
        accompaniment: {
          label: 'Acompañamiento',
          title: 'Sesiones individuales 1:1',
          copy: 'Un espacio privado para explorar lo que emerge, con escucha y presencia.',
          action: 'Ver consultorio',
        },
      },
    },
    studio: {
      eyebrow: 'El Espacio',
      headingLine1: 'No somos un gimnasio.',
      headingItalic: 'Somos un santuario.',
      description:
        'Yoga, meditación, danza, capoeira, breathwork y sound healing reunidos en un espacio de 100 m² a los pies de Monserrate. Un lugar para dejar fluir, respirar hondo y reencontrarte con la comunidad. Clases en español e inglés.',
      pillars: {
        yoga: { label: 'Yoga', alt: 'Clase de yoga en grupo sobre esterillas en Inner Spirit Studio' },
        danza: { label: 'Danza', alt: 'Clase de danza y movimiento consciente en comunidad' },
        capoeira: { label: 'Capoeira', alt: 'Roda de capoeira con músicos en el estudio de La Candelaria' },
      },
      stats: {
        rating: { value: '4.9', label: 'Calificación Google', sub: '143+ reseñas' },
        ranking: { value: '#1', label: 'Yoga Studio', sub: 'Bogotá, Colombia' },
        space: { value: '100m²', label: 'Espacio sagrado', sub: 'La Candelaria' },
      },
    },
    about: {
      eyebrow: 'Nuestra Esencia',
      headingLine1: 'Un espacio para',
      headingItalic: 'recordar',
      p1: 'Inner Spirit no es un destino, es un punto de partida. Un santuario a los pies de Monserrate, en el corazón histórico de La Candelaria, diseñado para soltar el ruido externo y reconectar con la sabiduría que ya habita en ti.',
      p2Part1: 'Aquí el movimiento nace desde adentro y la práctica es una forma de ',
      p2Italic: 'dejar fluir',
      p2Part2:
        '. Ofrecemos yoga, meditación, danza, breathwork, sound healing y arte terapia en un espacio inclusivo para la comunidad local e internacional — clasificado como el',
      p2Strong: ' #1 estudio de yoga en Bogotá',
      p2Part3: ' con 4.9 en Google (143+ reseñas).',
      metrics: {
        ranking: { value: '#1', label: 'Estudio en Bogotá' },
        rating: { value: '4.9', label: 'En Google' },
        reviews: { value: '143+', label: 'Reseñas' },
      },
      linkHistoria: 'Conoce nuestra historia',
      linkReservar: 'Reservar clase',
      imgAlt: 'Práctica de yoga junto a los ventanales del estudio en La Candelaria',
      paraQueEyebrow: '¿Para qué?',
      paraQueText:
        'En un mundo lleno de ruido, Inner Spirit es un espacio diseñado para ayudarte a reconectar con tu esencia. Ofrecemos clases, terapias y eventos que nutren tu cuerpo, mente y espíritu.',
      porQueEyebrow: '¿Por qué?',
      porQueText:
        'Somos más que un centro de bienestar: somos una comunidad que celebra tu crecimiento y te acompaña en cada paso de tu viaje hacia la paz interior.',
    },
    destinations: {
      ariaLabel: 'Sedes Inner Spirit',
      eyebrow: 'Tres orillas',
      title: 'Elige tu santuario Inner Spirit',
      intro: 'Un espacio vivo de silencio, práctica y expansión consciente presente en tres orillas.',
      footerNote: 'Puedes alternar tu santuario en cualquier momento desde el selector en la cabecera.',
      items: {
        co: {
          flagLabel: 'Bandera de Colombia',
          tag: 'Bogotá',
          title: 'Inner Spirit Colombia',
          copy: 'La Candelaria — Santuario matriz. Clases diarias, sound healing, consultorio y turismo andino consciente.',
          cta: 'Explorar Bogotá',
        },
        pt: {
          flagLabel: 'Bandeira de Portugal',
          tag: 'Nazaré',
          title: 'Inner Spirit Portugal',
          copy: 'Costa de Leiria, perto da Nazaré. Um projeto que nasce agora — voluntariado, horta e comunidade em construção.',
          cta: 'Explorar Portugal',
        },
        us: {
          flagLabel: 'Flag of the United States',
          tag: 'Chicago',
          title: 'Inner Spirit Chicago',
          copy: 'Timber loft histórico. Static Dance, movimiento somático libre de sustancias y sonido acústico 432Hz.',
          cta: 'Explorar Chicago',
        },
      },
    },
    practice: {
      ariaLabel: 'Encuentra tu práctica',
      eyebrow: 'Tu práctica',
      title: '¿Qué buscas hoy?',
      intro:
        'Empieza por cómo quieres sentirte. Cada camino te lleva a una práctica pensada para acompañarte justo ahí.',
      groupAriaLabel: 'Filtrar prácticas por intención',
      tabs: { calma: 'Calma', movimiento: 'Movimiento', conexion: 'Conexión' },
      items: {
        calma: {
          meditacion: {
            title: 'Meditación',
            description: 'Sesiones guiadas para cultivar el silencio interior y la claridad mental.',
            priceLabel: '$36.000 COP',
          },
          sesion1a1: {
            title: 'Sesión 1:1',
            description: 'Acompañamiento individual con escucha profunda y presencia plena.',
          },
        },
        movimiento: {
          yogaFlow: {
            title: 'Yoga Flow',
            description: 'Vinyasa, Hatha y Yin — unión de respiración y movimiento consciente.',
            priceLabel: '$36.000 COP',
          },
          breathwork: {
            title: 'Breathwork',
            description: 'Técnicas de respiración para liberar tensiones y expandir la energía.',
            priceLabel: '$36.000 COP',
          },
        },
        conexion: {
          innerDance: {
            title: 'INNER DANCE',
            description: 'Ritual sonoro de expansión — danza interna, meditación musical y visual.',
            priceLabel: '$55.000 COP',
          },
          soundHealing: {
            title: 'Sound Healing',
            description: 'Cuencos tibetanos, gong y campanas para armonizar cuerpo y mente.',
            priceLabel: '$36.000 COP',
          },
        },
      },
    },
    events: {
      eyebrow: 'Rituales & Encuentros',
      title: 'Reunirnos para volver al centro',
      intro:
        'Inner Dance, ceremonias de luna nueva y encuentros de sonido. Espacios vivos que marcan el ciclo y nos recuerdan que el camino también se transita en comunidad.',
      imageAlt: (title: string) => `Imagen del evento ${title}`,
      howParticipateEyebrow: 'Cómo participar',
      howParticipateTitle: 'Tres pasos para acompañarnos',
      steps: {
        chooseEvent: {
          n: '01',
          t: 'Elige tu encuentro',
          d: 'Explora los rituales activos arriba. Cada uno tiene su fecha, intención y energía propia.',
        },
        bookSpot: {
          n: '02',
          t: 'Reserva tu lugar',
          d: 'Aparta cupo desde el sitio o únete a la lista de espera si la formación está cerrada.',
        },
        arrive: {
          n: '03',
          t: 'Llega y habítalo',
          d: 'Ven con ropa cómoda y mente abierta. Nosotros sostenemos el espacio para que solo te entregues.',
        },
      },
    },
    consultorio: {
      eyebrow: 'Sesiones 1:1',
      headingLine1: 'Acompañamiento',
      headingItalic: 'Individual',
      description:
        'Un espacio seguro para explorar lo que emerge en el silencio, con acompañamiento profesional personalizado.',
      services: {
        yoga: 'Yoga terapéutico',
        meditacion: 'Meditación guiada',
        breathwork: 'Breathwork',
        arteTerapia: 'Arte terapia',
      },
      ctaVer: 'Ver Consultorio',
      ctaWhatsapp: 'Agendar por WhatsApp',
    },
    explora: {
      eyebrow: 'Pilar EXPLORE · Bogotá & Cundinamarca',
      title: 'Explora más allá del studio',
      intro:
        'La práctica en Inner Spirit trasciende las cuatro paredes de La Candelaria. Extendemos la quietud y el trabajo somático hacia los templos vivos de la cordillera andina: páramos, cascadas sagradas y senderos de niebla.',
      includesLabel: 'Qué incluye:',
      consultCta: 'Consultar próximas fechas',
      hubEyebrow: 'Ecosistema Integral',
      hubTitle: 'Inner Spirit Bogotá Hub',
      hubIntro:
        'Desde la práctica íntima en consultorio hasta la montaña abierta, una experiencia conectada en La Candelaria.',
      excursions: {
        monserrate: {
          title: 'Monserrate Consciente',
          subtitle: 'Amanecer en los Cerros Orientales',
          location: 'Cerros Orientales, Bogotá',
          duration: '4 horas (Amanecer)',
          level: 'Moderado',
          description:
            'Ascenso consciente a través del bosque de niebla andino y senderos ancestrales. Meditación guiada al despuntar el sol, contemplando el despertar de la sabana a 3.152 msnm con breathwork de presencia.',
          highlights: [
            'Meditación y silencio contemplativo en la cumbre',
            'Breathwork para altura y activación energética',
            'Infusión herbal andina y desayuno ligero consciente',
            'Salida y regreso desde La Candelaria',
          ],
          whatsappMessage: 'Hola, me interesa participar en la excursión consciente a Monserrate al amanecer.',
        },
        guatavita: {
          title: 'Laguna Sagrada de Guatavita',
          subtitle: 'Peregrinaje Muisca & Ceremonia de Cacao',
          location: 'Cordillera Oriental, Cundinamarca',
          duration: 'Día completo (8:00 AM - 4:30 PM)',
          level: 'Suave / Meditativo',
          description:
            'Inmersión en el epicentro espiritual de la cosmogonía Muisca. Caminata en presencia por el páramo andino, círculo de propósito junto a las aguas esmeralda de la laguna sagrada y ceremonia de cacao medicinal.',
          highlights: [
            'Contexto histórico y espiritual del territorio sagrado',
            'Ceremonia de cacao ceremonial de origen colombiano',
            'Ritual de liberación y siembra de intenciones',
            'Transporte privado ida y vuelta desde el studio',
          ],
          whatsappMessage: 'Hola, deseo reservar un cupo para el peregrinaje consciente a la Laguna de Guatavita.',
        },
        laChorrera: {
          title: 'Cascada La Chorrera',
          subtitle: 'Baño de Bosque (Shinrin-yoku) & Breathwork',
          location: 'Choachí, Cundinamarca',
          duration: 'Día completo (7:30 AM - 5:00 PM)',
          level: 'Moderado (Sendero de montaña)',
          description:
            'Peregrinaje a la caída de agua escalonada más alta de Colombia (590m). Caminata sensorial entre helechos gigantes y bosque andino húmedo, culminando en una sesión de breathwork liberador frente al rocío vivo de la cascada.',
          highlights: [
            'Inmersión sensorial de Shinrin-yoku (baño de bosque)',
            'Práctica de pranayama y breathwork elemental frente a la cascada',
            'Almuerzo consciente de origen local y campestre',
            'Guianza somática y acompañamiento en todo el recorrido',
          ],
          whatsappMessage: 'Hola, quiero unirme a la inmersión consciente en Cascada La Chorrera.',
        },
      },
      hubFacets: {
        espacio: {
          title: 'El Studio',
          tag: 'Práctica & Espacio',
          desc: 'Salas de madera y adobe colonial para clases regulares, talleres y alquiler a facilitadores.',
          cta: 'Conocer El Espacio',
        },
        consultorio: {
          title: 'El Consultorio',
          tag: 'Terapias 1:1',
          desc: 'Sesiones privadas de Sound Healing, Reiki, Masaje Sonoro y sanación personalizada.',
          cta: 'Ver Consultorio',
        },
        eventos: {
          title: 'Eventos & Rituales',
          tag: 'Comunidad Viva',
          desc: 'Círculos de luna, ceremonias de cacao, conciertos meditativos y Ecstatic Dance.',
          cta: 'Ver Calendario',
        },
      },
    },
    testimonials: {
      ariaLabel: 'Lo que dice la comunidad',
      eyebrow: 'Comunidad Inner Spirit',
      heading: 'Historias de quienes vuelven a respirar aquí.',
      googleReviewsLabel: 'Google Reviews',
      reviewsCount: '162 reseñas verificadas',
      verEnGoogle: 'Ver en Google',
      leaveReview: '✦ Deja tu reseña en Google Maps',
      honestAriaLabel: 'Comunidad Inner Spirit Portugal',
      honestEyebrow: 'Comunidad Inner Spirit',
      honestHeading: 'Una comunidad que está empezando ahora en Portugal.',
    },
    shop: {
      eyebrow: 'La Tienda · Objetos conscientes',
      title: 'Objetos para tu ritual',
      description:
        'Piezas escogidas con cuidado para acompañar la práctica: madera, mineral, aroma y textil que sostienen la presencia dentro y fuera del estudio.',
      ctaViewAll: 'Ver colección completa',
      addToCart: (name: string) => `Añadir ${name} al carrito`,
    },
    blog: {
      eyebrow: 'Journal · Inner Spirit',
      title: 'Palabras para el camino',
      description:
        'Lecturas pausadas sobre práctica, ritual y vida interior — para acompañarte entre una respiración y la siguiente.',
      ctaViewAll: 'Ver todo el journal',
      featuredLabel: 'Destacado',
      readArticle: 'Leer artículo',
      readingTime: (min: number) => `${min} min de lectura`,
      posts: {
        meditation: {
          title: '5 Pasos para Iniciar tu Práctica de Meditación',
          category: 'Meditación',
          excerpt:
            'La meditación no requiere experiencia previa — solo la disposición de sentarte contigo mismo unos minutos al día.',
        },
        yoga: {
          title: 'Yoga para Principiantes: Posturas Esenciales',
          category: 'Yoga',
          excerpt: 'Una guía de las posturas fundamentales de Hatha Yoga para construir una base sólida y consciente.',
        },
        'abstract-spirit': {
          title: 'Alineando tu Energía Vital con los Chakras',
          category: 'Crecimiento Espiritual',
          excerpt: 'Aprende qué son los chakras y cómo mantenerlos en equilibrio para tu salud física y emocional.',
        },
        ritual: {
          title: 'Rituales de Luna Nueva: Sembrando Intenciones',
          category: 'Crecimiento Espiritual',
          excerpt:
            'Aprovecha la energía renovadora de la luna nueva con estos rituales simples para plantar las semillas de tus deseos.',
        },
        breathwork: {
          title: 'Breathwork: El Arte de Respirar con Consciencia',
          category: 'Bienestar',
          excerpt:
            'La respiración es la herramienta más accesible para transformar tu energía. Descubre las técnicas más usadas en el estudio.',
        },
      },
    },
  },
  pt: {
    hero: {
      badge: 'La Candelaria, Bogotá',
      headlineMain: 'Movimento',
      headlineSub: 'Consciente',
      subtitle: 'Santuário de Yoga e Meditação',
      description:
        'Um refúgio no coração histórico de Bogotá para acalmar a mente, habitar o corpo e voltar a ti. Aqui a prática é uma forma de viver: deixar fluir.',
      ctaClasses: 'Ver Aulas',
      ctaEvents: 'Próximos Eventos',
      metaItems: ['Comunidade', 'Cuidado', 'Reconexão'],
      scrollLabel: 'Descobre',
    },
    gateway: {
      eyebrow: 'Entrada guiada',
      title: 'Escolhe o ritmo da tua visita.',
      intro:
        'Três caminhos para passar de explorar a reservar: uma aula para esta semana, um ritual com data marcada ou um acompanhamento só para ti.',
      sectionAriaLabel: 'Acessos principais',
      bookingTitle: 'Yoga',
      items: {
        firstPractice: {
          label: 'Primeira prática',
          title: 'Agenda uma aula esta semana',
          copy: 'Yoga, meditação, breathwork e movimento consciente com reserva direta.',
          action: 'Reservar aula',
        },
        upcomingRituals: {
          label: 'Rituais próximos',
          title: 'Encontros com data e vagas',
          copy: 'Rituais e experiências de comunidade com cada detalhe claro antes de reservares.',
          action: 'Ver eventos',
        },
        accompaniment: {
          label: 'Acompanhamento',
          title: 'Sessões individuais 1:1',
          copy: 'Um espaço privado para explorar o que emerge, com escuta e presença.',
          action: 'Ver consultório',
        },
      },
    },
    studio: {
      eyebrow: 'O Espaço',
      headingLine1: 'Não somos um ginásio.',
      headingItalic: 'Somos um santuário.',
      description:
        'Yoga, meditação, dança, capoeira, breathwork e sound healing reunidos num espaço de 100 m² aos pés de Monserrate. Um lugar para deixar fluir, respirar fundo e reencontrares-te com a comunidade. Aulas em espanhol e inglês.',
      pillars: {
        yoga: { label: 'Yoga', alt: 'Aula de yoga em grupo sobre esteiras no Inner Spirit Studio' },
        danza: { label: 'Dança', alt: 'Aula de dança e movimento consciente em comunidade' },
        capoeira: { label: 'Capoeira', alt: 'Roda de capoeira com músicos no estúdio de La Candelaria' },
      },
      stats: {
        rating: { value: '4.9', label: 'Classificação Google', sub: '143+ avaliações' },
        ranking: { value: '#1', label: 'Yoga Studio', sub: 'Bogotá, Colômbia' },
        space: { value: '100m²', label: 'Espaço sagrado', sub: 'La Candelaria' },
      },
    },
    about: {
      eyebrow: 'A Nossa Essência',
      headingLine1: 'Um espaço para',
      headingItalic: 'recordar',
      p1: 'Inner Spirit não é um destino, é um ponto de partida. Um santuário aos pés de Monserrate, no coração histórico de La Candelaria, desenhado para soltar o ruído externo e reconectar com a sabedoria que já habita em ti.',
      p2Part1: 'Aqui o movimento nasce de dentro e a prática é uma forma de ',
      p2Italic: 'deixar fluir',
      p2Part2:
        '. Oferecemos yoga, meditação, dança, breathwork, sound healing e arte-terapia num espaço inclusivo para a comunidade local e internacional — classificado como o',
      p2Strong: ' #1 estúdio de yoga em Bogotá',
      p2Part3: ' com 4.9 no Google (143+ avaliações).',
      metrics: {
        ranking: { value: '#1', label: 'Estúdio em Bogotá' },
        rating: { value: '4.9', label: 'No Google' },
        reviews: { value: '143+', label: 'Avaliações' },
      },
      linkHistoria: 'Conhece a nossa história',
      linkReservar: 'Reservar aula',
      imgAlt: 'Prática de yoga junto às janelas do estúdio em La Candelaria',
      paraQueEyebrow: 'Para quê?',
      paraQueText:
        'Num mundo cheio de ruído, Inner Spirit é um espaço desenhado para te ajudar a reconectar com a tua essência. Oferecemos aulas, terapias e eventos que nutrem o teu corpo, mente e espírito.',
      porQueEyebrow: 'Porquê?',
      porQueText:
        'Somos mais do que um centro de bem-estar: somos uma comunidade que celebra o teu crescimento e te acompanha em cada passo da tua jornada rumo à paz interior.',
    },
    destinations: {
      ariaLabel: 'Sedes Inner Spirit',
      eyebrow: 'Três costas',
      title: 'Escolhe o teu santuário Inner Spirit',
      intro: 'Um espaço vivo de silêncio, prática e expansão consciente presente em três costas.',
      footerNote: 'Podes alternar o teu santuário a qualquer momento a partir do seletor no cabeçalho.',
      items: {
        co: {
          flagLabel: 'Bandeira da Colômbia',
          tag: 'Bogotá',
          title: 'Inner Spirit Colômbia',
          copy: 'La Candelaria — Santuário matriz. Aulas diárias, sound healing, consultório e turismo andino consciente.',
          cta: 'Explorar Bogotá',
        },
        pt: {
          flagLabel: 'Bandeira de Portugal',
          tag: 'Nazaré',
          title: 'Inner Spirit Portugal',
          copy: 'Costa de Leiria, perto da Nazaré. Um projeto que nasce agora — voluntariado, horta e comunidade em construção.',
          cta: 'Explorar Portugal',
        },
        us: {
          flagLabel: 'Bandeira dos Estados Unidos',
          tag: 'Chicago',
          title: 'Inner Spirit Chicago',
          copy: 'Timber loft histórico. Static Dance, movimento somático livre de substâncias e som acústico 432Hz.',
          cta: 'Explorar Chicago',
        },
      },
    },
    practice: {
      ariaLabel: 'Encontra a tua prática',
      eyebrow: 'A tua prática',
      title: 'O que procuras hoje?',
      intro:
        'Começa por como te queres sentir. Cada caminho leva-te a uma prática pensada para te acompanhar exatamente aí.',
      groupAriaLabel: 'Filtrar práticas por intenção',
      tabs: { calma: 'Calma', movimiento: 'Movimento', conexion: 'Conexão' },
      items: {
        calma: {
          meditacion: {
            title: 'Meditação',
            description: 'Sessões guiadas para cultivar o silêncio interior e a clareza mental.',
            priceLabel: '$36.000 COP',
          },
          sesion1a1: {
            title: 'Sessão 1:1',
            description: 'Acompanhamento individual com escuta profunda e presença plena.',
          },
        },
        movimiento: {
          yogaFlow: {
            title: 'Yoga Flow',
            description: 'Vinyasa, Hatha e Yin — união de respiração e movimento consciente.',
            priceLabel: '$36.000 COP',
          },
          breathwork: {
            title: 'Breathwork',
            description: 'Técnicas de respiração para libertar tensões e expandir a energia.',
            priceLabel: '$36.000 COP',
          },
        },
        conexion: {
          innerDance: {
            title: 'INNER DANCE',
            description: 'Ritual sonoro de expansão — dança interna, meditação musical e visual.',
            priceLabel: '$55.000 COP',
          },
          soundHealing: {
            title: 'Sound Healing',
            description: 'Taças tibetanas, gongo e sinos para harmonizar corpo e mente.',
            priceLabel: '$36.000 COP',
          },
        },
      },
    },
    events: {
      eyebrow: 'Rituais & Encontros',
      title: 'Reunirmo-nos para voltar ao centro',
      intro:
        'Inner Dance, cerimónias de lua nova e encontros de som. Espaços vivos que marcam o ciclo e nos lembram que o caminho também se percorre em comunidade.',
      imageAlt: (title: string) => `Imagem do evento ${title}`,
      howParticipateEyebrow: 'Como participar',
      howParticipateTitle: 'Três passos para nos acompanhares',
      steps: {
        chooseEvent: {
          n: '01',
          t: 'Escolhe o teu encontro',
          d: 'Explora os rituais ativos acima. Cada um tem a sua data, intenção e energia própria.',
        },
        bookSpot: {
          n: '02',
          t: 'Reserva o teu lugar',
          d: 'Garante a tua vaga no site ou junta-te à lista de espera se a turma estiver fechada.',
        },
        arrive: {
          n: '03',
          t: 'Chega e habita-o',
          d: 'Vem com roupa confortável e mente aberta. Nós sustentamos o espaço para que só te entregues.',
        },
      },
    },
    consultorio: {
      eyebrow: 'Sessões 1:1',
      headingLine1: 'Acompanhamento',
      headingItalic: 'Individual',
      description:
        'Um espaço seguro para explorar o que emerge no silêncio, com acompanhamento profissional personalizado.',
      services: {
        yoga: 'Yoga terapêutico',
        meditacion: 'Meditação guiada',
        breathwork: 'Breathwork',
        arteTerapia: 'Arte-terapia',
      },
      ctaVer: 'Ver Consultório',
      ctaWhatsapp: 'Agendar pelo WhatsApp',
    },
    explora: {
      eyebrow: 'Pilar EXPLORE · Bogotá & Cundinamarca',
      title: 'Explora para além do studio',
      intro:
        'A prática na Inner Spirit ultrapassa as quatro paredes de La Candelaria. Estendemos a quietude e o trabalho somático até aos templos vivos da cordilheira andina: páramos, cascatas sagradas e trilhos de névoa.',
      includesLabel: 'O que inclui:',
      consultCta: 'Consultar próximas datas',
      hubEyebrow: 'Ecossistema Integral',
      hubTitle: 'Inner Spirit Bogotá Hub',
      hubIntro:
        'Da prática íntima em consultório até à montanha aberta, uma experiência conectada em La Candelaria.',
      excursions: {
        monserrate: {
          title: 'Monserrate Consciente',
          subtitle: 'Amanhecer nos Cerros Orientales',
          location: 'Cerros Orientales, Bogotá',
          duration: '4 horas (Amanhecer)',
          level: 'Moderado',
          description:
            'Subida consciente através da floresta de nevoeiro andina e trilhos ancestrais. Meditação guiada ao nascer do sol, contemplando o despertar da savana a 3.152 m de altitude com breathwork de presença.',
          highlights: [
            'Meditação e silêncio contemplativo no cume',
            'Breathwork para altitude e ativação energética',
            'Infusão de ervas andinas e pequeno-almoço leve consciente',
            'Partida e regresso a partir de La Candelaria',
          ],
          whatsappMessage: 'Olá, tenho interesse em participar na excursão consciente a Monserrate ao amanhecer.',
        },
        guatavita: {
          title: 'Lagoa Sagrada de Guatavita',
          subtitle: 'Peregrinação Muisca & Cerimónia de Cacau',
          location: 'Cordilheira Oriental, Cundinamarca',
          duration: 'Dia completo (8:00 - 16:30)',
          level: 'Suave / Meditativo',
          description:
            'Imersão no epicentro espiritual da cosmogonia Muisca. Caminhada em presença pelo páramo andino, círculo de propósito junto às águas esmeralda da lagoa sagrada e cerimónia de cacau medicinal.',
          highlights: [
            'Contexto histórico e espiritual do território sagrado',
            'Cerimónia de cacau cerimonial de origem colombiana',
            'Ritual de libertação e plantio de intenções',
            'Transporte privado de ida e volta a partir do studio',
          ],
          whatsappMessage: 'Olá, gostaria de reservar um lugar para a peregrinação consciente à Lagoa de Guatavita.',
        },
        laChorrera: {
          title: 'Cascata La Chorrera',
          subtitle: 'Banho de Floresta (Shinrin-yoku) & Breathwork',
          location: 'Choachí, Cundinamarca',
          duration: 'Dia completo (7:30 - 17:00)',
          level: 'Moderado (Trilho de montanha)',
          description:
            'Peregrinação à queda de água escalonada mais alta da Colômbia (590m). Caminhada sensorial entre fetos gigantes e floresta andina húmida, culminando numa sessão de breathwork libertador em frente ao orvalho vivo da cascata.',
          highlights: [
            'Imersão sensorial de Shinrin-yoku (banho de floresta)',
            'Prática de pranayama e breathwork elemental em frente à cascata',
            'Almoço consciente de origem local e campestre',
            'Orientação somática e acompanhamento em todo o percurso',
          ],
          whatsappMessage: 'Olá, quero juntar-me à imersão consciente na Cascata La Chorrera.',
        },
      },
      hubFacets: {
        espacio: {
          title: 'O Studio',
          tag: 'Prática & Espaço',
          desc: 'Salas de madeira e adobe colonial para aulas regulares, workshops e aluguer a facilitadores.',
          cta: 'Conhecer O Espaço',
        },
        consultorio: {
          title: 'O Consultório',
          tag: 'Terapias 1:1',
          desc: 'Sessões privadas de Sound Healing, Reiki, Massagem Sonora e cura personalizada.',
          cta: 'Ver Consultório',
        },
        eventos: {
          title: 'Eventos & Rituais',
          tag: 'Comunidade Viva',
          desc: 'Círculos de lua, cerimónias de cacau, concertos meditativos e Ecstatic Dance.',
          cta: 'Ver Calendário',
        },
      },
    },
    testimonials: {
      ariaLabel: 'O que diz a comunidade',
      eyebrow: 'Comunidade Inner Spirit',
      heading: 'Histórias de quem volta a respirar aqui.',
      googleReviewsLabel: 'Google Reviews',
      reviewsCount: '162 avaliações verificadas',
      verEnGoogle: 'Ver no Google',
      leaveReview: '✦ Deixa a tua avaliação no Google Maps',
      honestAriaLabel: 'Comunidade Inner Spirit Portugal',
      honestEyebrow: 'Comunidade Inner Spirit',
      honestHeading: 'Uma comunidade que está a começar agora em Portugal.',
    },
    shop: {
      eyebrow: 'A Loja · Objetos conscientes',
      title: 'Objetos para o teu ritual',
      description:
        'Peças escolhidas com cuidado para acompanhar a prática: madeira, mineral, aroma e têxtil que sustentam a presença dentro e fora do estúdio.',
      ctaViewAll: 'Ver coleção completa',
      addToCart: (name: string) => `Adicionar ${name} ao carrinho`,
    },
    blog: {
      eyebrow: 'Journal · Inner Spirit',
      title: 'Palavras para o caminho',
      description:
        'Leituras pausadas sobre prática, ritual e vida interior — para te acompanhar entre uma respiração e a seguinte.',
      ctaViewAll: 'Ver todo o journal',
      featuredLabel: 'Destaque',
      readArticle: 'Ler artigo',
      readingTime: (min: number) => `${min} min de leitura`,
      posts: {
        meditation: {
          title: '5 Passos para Iniciar a tua Prática de Meditação',
          category: 'Meditação',
          excerpt:
            'A meditação não requer experiência prévia — apenas a disposição de te sentares contigo mesmo uns minutos por dia.',
        },
        yoga: {
          title: 'Yoga para Iniciantes: Posturas Essenciais',
          category: 'Yoga',
          excerpt: 'Um guia das posturas fundamentais de Hatha Yoga para construíres uma base sólida e consciente.',
        },
        'abstract-spirit': {
          title: 'Alinhando a tua Energia Vital com os Chakras',
          category: 'Crescimento Espiritual',
          excerpt: 'Aprende o que são os chakras e como mantê-los em equilíbrio para a tua saúde física e emocional.',
        },
        ritual: {
          title: 'Rituais de Lua Nova: Semeando Intenções',
          category: 'Crescimento Espiritual',
          excerpt:
            'Aproveita a energia renovadora da lua nova com estes rituais simples para plantares as sementes dos teus desejos.',
        },
        breathwork: {
          title: 'Breathwork: A Arte de Respirar com Consciência',
          category: 'Bem-Estar',
          excerpt:
            'A respiração é a ferramenta mais acessível para transformares a tua energia. Descobre as técnicas mais usadas no estúdio.',
        },
      },
    },
  },
  en: {
    hero: {
      badge: 'La Candelaria, Bogotá',
      headlineMain: 'Movement',
      headlineSub: 'Conscious',
      subtitle: 'Yoga & Meditation Sanctuary',
      description:
        'A refuge in the historic heart of Bogotá to calm the mind, inhabit the body and return to yourself. Here practice is a way of living: let it flow.',
      ctaClasses: 'View Classes',
      ctaEvents: 'Upcoming Events',
      metaItems: ['Community', 'Care', 'Reconnection'],
      scrollLabel: 'Discover',
    },
    gateway: {
      eyebrow: 'Guided entry',
      title: 'Choose the pace of your visit.',
      intro:
        'Three paths from exploring to booking: a class for this week, a dated ritual, or one-on-one support just for you.',
      sectionAriaLabel: 'Main entry points',
      bookingTitle: 'Yoga',
      items: {
        firstPractice: {
          label: 'First practice',
          title: 'Book a class this week',
          copy: 'Yoga, meditation, breathwork and conscious movement with direct booking.',
          action: 'Book a class',
        },
        upcomingRituals: {
          label: 'Upcoming rituals',
          title: 'Dated gatherings with open spots',
          copy: 'Community rituals and experiences with every detail clear before you book.',
          action: 'View events',
        },
        accompaniment: {
          label: 'One-on-one support',
          title: 'Individual 1:1 sessions',
          copy: 'A private space to explore what emerges, with listening and presence.',
          action: 'View consultations',
        },
      },
    },
    studio: {
      eyebrow: 'The Space',
      headingLine1: "We're not a gym.",
      headingItalic: 'We are a sanctuary.',
      description:
        'Yoga, meditation, dance, capoeira, breathwork and sound healing gathered in a 100 m² space at the foot of Monserrate. A place to let flow, breathe deep and reconnect with community. Classes in Spanish and English.',
      pillars: {
        yoga: { label: 'Yoga', alt: 'Group yoga class on mats at Inner Spirit Studio' },
        danza: { label: 'Dance', alt: 'Dance and conscious movement class in community' },
        capoeira: { label: 'Capoeira', alt: 'Capoeira roda with musicians at the La Candelaria studio' },
      },
      stats: {
        rating: { value: '4.9', label: 'Google Rating', sub: '143+ reviews' },
        ranking: { value: '#1', label: 'Yoga Studio', sub: 'Bogotá, Colombia' },
        space: { value: '100m²', label: 'Sacred space', sub: 'La Candelaria' },
      },
    },
    about: {
      eyebrow: 'Our Essence',
      headingLine1: 'A space to',
      headingItalic: 'remember',
      p1: "Inner Spirit isn't a destination, it's a starting point. A sanctuary at the foot of Monserrate, in the historic heart of La Candelaria, designed to release outside noise and reconnect with the wisdom that already lives in you.",
      p2Part1: 'Here movement is born from within and practice is a way of ',
      p2Italic: 'letting flow',
      p2Part2:
        '. We offer yoga, meditation, dance, breathwork, sound healing and art therapy in a space inclusive to the local and international community — ranked as the',
      p2Strong: ' #1 yoga studio in Bogotá',
      p2Part3: ' with 4.9 on Google (143+ reviews).',
      metrics: {
        ranking: { value: '#1', label: 'Studio in Bogotá' },
        rating: { value: '4.9', label: 'On Google' },
        reviews: { value: '143+', label: 'Reviews' },
      },
      linkHistoria: 'Discover our story',
      linkReservar: 'Book a class',
      imgAlt: 'Yoga practice by the studio windows in La Candelaria',
      paraQueEyebrow: 'What for?',
      paraQueText:
        'In a world full of noise, Inner Spirit is a space designed to help you reconnect with your essence. We offer classes, therapies and events that nourish your body, mind and spirit.',
      porQueEyebrow: 'Why?',
      porQueText:
        "We're more than a wellness center: we're a community that celebrates your growth and walks with you every step of your journey toward inner peace.",
    },
    destinations: {
      ariaLabel: 'Inner Spirit Sanctuaries',
      eyebrow: 'Three shores',
      title: 'Choose your Inner Spirit sanctuary',
      intro: 'A living space of silence, practice and conscious expansion present on three shores.',
      footerNote: 'You can switch your sanctuary anytime from the selector in the header.',
      items: {
        co: {
          flagLabel: 'Flag of Colombia',
          tag: 'Bogotá',
          title: 'Inner Spirit Colombia',
          copy: 'La Candelaria — the founding sanctuary. Daily classes, sound healing, consultations and conscious Andean tourism.',
          cta: 'Explore Bogotá',
        },
        pt: {
          flagLabel: 'Flag of Portugal',
          tag: 'Nazaré',
          title: 'Inner Spirit Portugal',
          copy: 'Leiria coast, near Nazaré. A project just being born — volunteering, a garden and community under construction.',
          cta: 'Explore Portugal',
        },
        us: {
          flagLabel: 'Flag of the United States',
          tag: 'Chicago',
          title: 'Inner Spirit Chicago',
          copy: 'Historic timber loft. Static Dance, substance-free somatic movement and 432Hz acoustic sound.',
          cta: 'Explore Chicago',
        },
      },
    },
    practice: {
      ariaLabel: 'Find your practice',
      eyebrow: 'Your practice',
      title: 'What are you looking for today?',
      intro: 'Start with how you want to feel. Each path leads you to a practice designed to meet you right there.',
      groupAriaLabel: 'Filter practices by intention',
      tabs: { calma: 'Calm', movimiento: 'Movement', conexion: 'Connection' },
      items: {
        calma: {
          meditacion: {
            title: 'Meditation',
            description: 'Guided sessions to cultivate inner silence and mental clarity.',
            priceLabel: '$36.000 COP',
          },
          sesion1a1: {
            title: '1:1 Session',
            description: 'Individual support with deep listening and full presence.',
          },
        },
        movimiento: {
          yogaFlow: {
            title: 'Yoga Flow',
            description: 'Vinyasa, Hatha and Yin — uniting breath and conscious movement.',
            priceLabel: '$36.000 COP',
          },
          breathwork: {
            title: 'Breathwork',
            description: 'Breathing techniques to release tension and expand energy.',
            priceLabel: '$36.000 COP',
          },
        },
        conexion: {
          innerDance: {
            title: 'INNER DANCE',
            description: 'A sonic ritual of expansion — inner dance, musical and visual meditation.',
            priceLabel: '$55.000 COP',
          },
          soundHealing: {
            title: 'Sound Healing',
            description: 'Tibetan bowls, gong and bells to harmonize body and mind.',
            priceLabel: '$36.000 COP',
          },
        },
      },
    },
    events: {
      eyebrow: 'Rituals & Gatherings',
      title: 'Coming together to return to center',
      intro:
        'Inner Dance, new moon ceremonies and sound gatherings. Living spaces that mark the cycle and remind us the path is also walked in community.',
      imageAlt: (title: string) => `Image of the event ${title}`,
      howParticipateEyebrow: 'How to join',
      howParticipateTitle: 'Three steps to join us',
      steps: {
        chooseEvent: {
          n: '01',
          t: 'Choose your gathering',
          d: 'Explore the active rituals above. Each has its own date, intention and energy.',
        },
        bookSpot: {
          n: '02',
          t: 'Book your spot',
          d: 'Reserve directly on the site, or join the waitlist if the session is full.',
        },
        arrive: {
          n: '03',
          t: 'Arrive and inhabit it',
          d: 'Come in comfortable clothes with an open mind. We hold the space so you can simply show up.',
        },
      },
    },
    consultorio: {
      eyebrow: '1:1 Sessions',
      headingLine1: 'Individual',
      headingItalic: 'Support',
      description:
        'A safe space to explore what emerges in silence, with personalized professional support.',
      services: {
        yoga: 'Therapeutic yoga',
        meditacion: 'Guided meditation',
        breathwork: 'Breathwork',
        arteTerapia: 'Art therapy',
      },
      ctaVer: 'View Consultations',
      ctaWhatsapp: 'Book via WhatsApp',
    },
    explora: {
      eyebrow: 'EXPLORE Pillar · Bogotá & Cundinamarca',
      title: 'Explore beyond the studio',
      intro:
        'Practice at Inner Spirit reaches beyond the four walls of La Candelaria. We extend stillness and somatic work toward the living temples of the Andean mountains: páramos, sacred waterfalls and misty trails.',
      includesLabel: "What's included:",
      consultCta: 'Ask about upcoming dates',
      hubEyebrow: 'Integrated Ecosystem',
      hubTitle: 'Inner Spirit Bogotá Hub',
      hubIntro: 'From intimate consultations to the open mountain, one connected experience in La Candelaria.',
      excursions: {
        monserrate: {
          title: 'Conscious Monserrate',
          subtitle: 'Sunrise in the Eastern Hills',
          location: 'Cerros Orientales, Bogotá',
          duration: '4 hours (Sunrise)',
          level: 'Moderate',
          description:
            'A conscious climb through the Andean cloud forest and ancestral trails. Guided meditation at first light, watching the savanna wake at 3,152 m above sea level with presence breathwork.',
          highlights: [
            'Meditation and contemplative silence at the summit',
            'Breathwork for altitude and energetic activation',
            'Andean herbal tea and a light conscious breakfast',
            'Departure and return from La Candelaria',
          ],
          whatsappMessage: "Hi, I'm interested in joining the conscious sunrise excursion to Monserrate.",
        },
        guatavita: {
          title: 'Sacred Lagoon of Guatavita',
          subtitle: 'Muisca Pilgrimage & Cacao Ceremony',
          location: 'Eastern Cordillera, Cundinamarca',
          duration: 'Full day (8:00 AM - 4:30 PM)',
          level: 'Gentle / Meditative',
          description:
            'An immersion into the spiritual epicenter of Muisca cosmology. A mindful walk across the Andean páramo, a circle of intention by the emerald waters of the sacred lagoon, and a medicinal cacao ceremony.',
          highlights: [
            'Historical and spiritual context of the sacred territory',
            'Ceremonial cacao ceremony of Colombian origin',
            'Release ritual and planting of intentions',
            'Private round-trip transport from the studio',
          ],
          whatsappMessage: 'Hi, I would like to book a spot for the conscious pilgrimage to the Guatavita Lagoon.',
        },
        laChorrera: {
          title: 'La Chorrera Waterfall',
          subtitle: 'Forest Bathing (Shinrin-yoku) & Breathwork',
          location: 'Choachí, Cundinamarca',
          duration: 'Full day (7:30 AM - 5:00 PM)',
          level: 'Moderate (Mountain trail)',
          description:
            "A pilgrimage to Colombia's tallest tiered waterfall (590m). A sensory walk among giant ferns and humid Andean forest, culminating in a liberating breathwork session facing the waterfall's living mist.",
          highlights: [
            'Sensory immersion in Shinrin-yoku (forest bathing)',
            'Pranayama and elemental breathwork practice facing the waterfall',
            'Conscious lunch of local, countryside origin',
            'Somatic guidance and support throughout the route',
          ],
          whatsappMessage: 'Hi, I want to join the conscious immersion at La Chorrera Waterfall.',
        },
      },
      hubFacets: {
        espacio: {
          title: 'The Studio',
          tag: 'Practice & Space',
          desc: 'Wood and colonial adobe rooms for regular classes, workshops and facilitator rentals.',
          cta: 'Discover The Space',
        },
        consultorio: {
          title: 'The Consultation Room',
          tag: '1:1 Therapies',
          desc: 'Private sessions of Sound Healing, Reiki, Sound Massage and personalized healing.',
          cta: 'View Consultations',
        },
        eventos: {
          title: 'Events & Rituals',
          tag: 'Living Community',
          desc: 'Moon circles, cacao ceremonies, meditative concerts and Ecstatic Dance.',
          cta: 'View Calendar',
        },
      },
    },
    testimonials: {
      ariaLabel: 'What the community says',
      eyebrow: 'Inner Spirit Community',
      heading: 'Stories from those who come back to breathe here.',
      googleReviewsLabel: 'Google Reviews',
      reviewsCount: '162 verified reviews',
      verEnGoogle: 'View on Google',
      leaveReview: '✦ Leave your review on Google Maps',
      honestAriaLabel: 'Inner Spirit Portugal Community',
      honestEyebrow: 'Inner Spirit Community',
      honestHeading: "A community that's just getting started in Portugal.",
    },
    shop: {
      eyebrow: 'The Shop · Conscious objects',
      title: 'Objects for your ritual',
      description:
        'Pieces chosen with care to accompany practice: wood, mineral, aroma and textile that hold presence inside and outside the studio.',
      ctaViewAll: 'View full collection',
      addToCart: (name: string) => `Add ${name} to cart`,
    },
    blog: {
      eyebrow: 'Journal · Inner Spirit',
      title: 'Words for the path',
      description:
        'Unhurried reads on practice, ritual and inner life — to keep you company between one breath and the next.',
      ctaViewAll: 'View the full journal',
      featuredLabel: 'Featured',
      readArticle: 'Read article',
      readingTime: (min: number) => `${min} min read`,
      posts: {
        meditation: {
          title: '5 Steps to Start Your Meditation Practice',
          category: 'Meditation',
          excerpt: "Meditation doesn't require prior experience — just the willingness to sit with yourself a few minutes a day.",
        },
        yoga: {
          title: 'Yoga for Beginners: Essential Postures',
          category: 'Yoga',
          excerpt: 'A guide to the fundamental Hatha Yoga postures to build a solid, conscious foundation.',
        },
        'abstract-spirit': {
          title: 'Aligning Your Life Energy with the Chakras',
          category: 'Spiritual Growth',
          excerpt: 'Learn what the chakras are and how to keep them balanced for your physical and emotional health.',
        },
        ritual: {
          title: 'New Moon Rituals: Planting Intentions',
          category: 'Spiritual Growth',
          excerpt: 'Harness the renewing energy of the new moon with these simple rituals to plant the seeds of your desires.',
        },
        breathwork: {
          title: 'Breathwork: The Art of Conscious Breathing',
          category: 'Wellness',
          excerpt: 'Breath is the most accessible tool to transform your energy. Discover the techniques most used in the studio.',
        },
      },
    },
  },
} as const;
