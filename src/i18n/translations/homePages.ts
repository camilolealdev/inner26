// Traducciones de las páginas standalone de Bogotá (rutas propias, no forman
// parte del Home): Nosotros, El Espacio, Clases, Eventos, Consultorio, Tienda,
// Blog, Contacto y Privacidad. Ver src/i18n/translations/common.ts para el
// chrome compartido (Header/Footer/modales) y src/i18n/translations/home.ts
// para las secciones del Home (migrados aparte).
//
// Nota sobre alcance (Fase 2b):
// - Los datos de eventos (src/modules/events/data/events.ts) NO se migran
//   aquí — los gestiona otro agente en la Fase 5.
// - El cuerpo largo de los artículos del Blog (articleContent en BlogPage.tsx,
//   los párrafos completos que se abren en el modal) tampoco se migra: es
//   contenido editorial extenso, análogo a "posts de blog" con datos, fuera
//   del alcance de este archivo. Queda en español para los tres idiomas.
// - PrivacyPage: el cuerpo legal (Ley 1581 de 2012, Colombia) permanece
//   exclusivamente en español — ver la clave `privacy` para el aviso que se
//   muestra en PT/EN en su lugar.

export interface WeeklySlot {
  day: string;
  time: string;
  focus: string;
}

export interface ClassItem {
  title: string;
  subtitle: string;
  description: string;
  priceLabel: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Step {
  n: string;
  t: string;
  d: string;
}

export interface Modality {
  label: string;
  desc: string;
}

export interface ShopProductCopy {
  name: string;
  description: string;
  availability: string;
}

export interface BlogPostCopy {
  title: string;
  category: string;
  excerpt: string;
}

export const homePages = {
  es: {
    about: {
      eyebrowStudio: 'Inner Spirit Studio',
      heroTitleLine1: 'Somos un espacio',
      heroTitleLine2: 'para recordar',
      heroLead:
        'Un lugar para soltar el ruido de afuera y volver a escuchar la sabiduría que ya habita en ti.',
      philosophyTitle: 'Nuestra Filosofía',
      philosophyP1:
        'No somos un gimnasio. No somos un centro de terapia. Somos un espacio donde el movimiento nace desde adentro. Donde la meditación no es una técnica, sino un descanso. Donde la danza no tiene pasos, solo impulso.',
      philosophyP2:
        'Creemos que cada persona posee su propia brújula interna. Nuestro rol no es dar respuestas, sino crear las condiciones de calma y presencia para que puedas escuchar las tuyas.',
      guideTitle: 'La Guía',
      guideP1: 'El camino de Inner Spirit es sostenido por una escucha.',
      guideP2:
        'Una que ha sido nutrida por estudios en Sanación Energética, Meditación y Yoga Holístico, pero cuya verdadera guía es la presencia compartida en el silencio. Más que enseñar, el propósito es crear el espacio para que cada quien recuerde su propia sabiduría.',
      spaceTitle: 'El Espacio',
      spaceLead:
        '100 m² de espacio sagrado a los pies de Monserrate, en el barrio La Candelaria de Bogotá. Luz natural, paredes de barro y un piso que ha visto miles de respiraciones.',
      galleryLabels: ['Movimiento Consciente', 'Silencio Interior', 'Florecimiento'] as string[],
    },
    espacio: {
      eyebrow: 'La Candelaria, Bogotá',
      heroTitle: 'Un espacio para habitar la práctica, no solo tomar una clase.',
      heroLead:
        'Inner Spirit Studio recibe clases permanentes, workshops, certificaciones, rituales y experiencias de turismo wellness en el corazón histórico de Bogotá.',
      ctaReserve: 'Reservar el espacio',
      ctaTalk: 'Conversar una idea',
    },
    classes: {
      eyebrow: 'Práctica Diaria',
      heading: 'Nuestras Prácticas',
      lead:
        'Cada clase es una invitación a habitar tu cuerpo y calmar tu mente. No se requiere experiencia, solo presencia.',
      weeklyRhythm: [
        { day: 'Lun – Vie', time: '6:30 AM', focus: 'Yoga & Pranayama al amanecer' },
        { day: 'Sáb – Dom', time: '8:00 AM', focus: 'Vinyasa, danza y sound healing' },
      ] as WeeklySlot[],
      items: [
        {
          title: 'Yoga',
          subtitle: 'Hatha · Vinyasa · Yin · AcroYoga · Kundalini',
          description:
            'Una práctica para unificar cuerpo, mente y respiración. Flujos dinámicos, posturas clásicas y trabajo energético con mantras. Para todos los niveles, en español e inglés.',
          priceLabel: '$36.000 COP / sesión',
        },
        {
          title: 'Meditación & Breathwork',
          subtitle: 'Silencio · Pranayama · Atención Plena',
          description:
            'Un espacio de silencio para observar y descansar. Técnicas de respiración para liberar tensiones, expandir la energía y cultivar la claridad interior. Sin experiencia previa.',
          priceLabel: '$36.000 COP / sesión',
        },
        {
          title: 'Danza & Movimiento',
          subtitle: 'Inner Dance · Danza Boreal · Inner Movement',
          description:
            'Movimiento libre para liberar el cuerpo y la mente. Sin coreografías — una invitación a que tu cuerpo se exprese auténticamente guiado por la música y tu impulso interior.',
          priceLabel: '$36.000 COP / sesión',
        },
        {
          title: 'Sound Healing',
          subtitle: 'Gong · Cuencos Tibetanos · Arte Terapia',
          description:
            'Sesiones de sanación sonora con gong, cuencos tibetanos y campanas. El sonido como vehículo de transformación para armonizar cuerpo, mente y espíritu.',
          priceLabel: '$36.000 COP / sesión',
        },
      ] as ClassItem[],
      viewSchedule: 'Ver Horarios',
      promoLabel: 'Promo Mensual',
      promoTitle: '3 sesiones por $100.000 COP',
      promoDetail: '~$25 USD · Lun–Vie 6:30 AM · Sáb–Dom 8:00 AM',
      promoCta: 'Reservar por WhatsApp',
      faqEyebrow: 'Antes de tu primera clase',
      faqHeading: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Necesito experiencia previa?',
          a: 'No. Nuestras clases son para todos los niveles; los guías adaptan las instrucciones para principiantes y para quienes ya tienen práctica.',
        },
        {
          q: '¿Qué debo llevar?',
          a: 'Ropa cómoda y disposición de estar presente. Contamos con tapetes, cojines y mantas en el estudio; solo trae tu botella de agua.',
        },
        {
          q: '¿Las clases son en español o inglés?',
          a: 'Ambos. Nuestro espacio es bilingüe y damos la bienvenida a visitantes internacionales: guiamos en español e inglés según el grupo.',
        },
        {
          q: '¿Cómo reservo mi lugar?',
          a: 'Elige una práctica y pulsa "Ver Horarios" para reservar, o escríbenos por WhatsApp. Los cupos son limitados para cuidar la intimidad del grupo.',
        },
      ] as Faq[],
    },
    events: {
      eyebrow: 'Próximos Encuentros',
      heading: 'Rituales y Encuentros',
      lead:
        'Inner Dance, ceremonias de luna nueva y encuentros de sonido para marcar el ciclo en comunidad. Encuentros activos, lista de espera para formaciones cerradas y reserva directa cuando hay cupo.',
      bookable: 'Cupos abiertos',
      waitlist: 'Lista de espera',
      viewFeed: 'Ver Feed IG',
      stepsEyebrow: 'Cómo participar',
      stepsHeading: 'Tres pasos para acompañarnos',
      steps: [
        { n: '01', t: 'Elige tu encuentro', d: 'Explora los rituales activos. Cada uno tiene su fecha, intención y energía propia.' },
        { n: '02', t: 'Reserva tu lugar', d: 'Aparta cupo desde el sitio o únete a la lista de espera si la formación está cerrada.' },
        { n: '03', t: 'Llega y habítalo', d: 'Ven con ropa cómoda y mente abierta. Nosotros sostenemos el espacio para que solo te entregues.' },
      ] as Step[],
    },
    consultorio: {
      heading: 'Acompañamiento Individual',
      lead: 'Un espacio seguro y confidencial para caminar a tu lado en tu proceso de autodescubrimiento.',
      intro1: 'A veces, el camino necesita un testigo.',
      intro2:
        'En sesiones individuales, ofrecemos un espacio seguro para explorar lo que emerge: patrones que se repiten, preguntas sin respuesta, duelos callados. No se trata de "arreglar" nada, sino de iluminar con consciencia lo que ya está presente.',
      intro3:
        'Trabajamos con herramientas simples: la escucha profunda, el diálogo consciente y, cuando es necesario, prácticas energéticas suaves para re-equilibrar el cuerpo sutil. Cada sesión es única, tejida a la medida de tu necesidad del momento.',
      intro4: 'No damos consejos. Caminamos contigo.',
      modalitiesEyebrow: 'Sesiones 1:1',
      modalitiesHeading: 'Modalidades de acompañamiento',
      modalities: [
        { label: 'Yoga terapéutico', desc: 'Movimiento suave y consciente para liberar tensión y reconectar con el cuerpo.' },
        { label: 'Meditación guiada', desc: 'Un descanso para la mente: presencia, silencio y observación acompañada.' },
        { label: 'Breathwork', desc: 'Respiración consciente para soltar lo retenido y expandir tu energía vital.' },
        { label: 'Arte terapia', desc: 'El gesto creativo como vía para nombrar lo que las palabras no alcanzan.' },
      ] as Modality[],
      howEyebrow: 'Cómo funciona',
      howHeading: 'De la primera visita a la continuidad',
      howSteps: [
        { n: '01', t: 'Agenda tu visita', d: 'Escríbenos y conversamos sin compromiso. Escuchamos lo que necesitas y elegimos juntos la modalidad.' },
        { n: '02', t: 'Sesión personalizada', d: 'Un encuentro 1:1 tejido a la medida de tu momento, en un espacio seguro y confidencial.' },
        { n: '03', t: 'Continuidad', d: 'Si lo deseas, diseñamos un acompañamiento sostenido para profundizar tu proceso con calma.' },
      ] as Step[],
      ctaTalk: 'Conversemos para agendar',
      ctaWhatsapp: 'Agendar por WhatsApp',
    },
    shop: {
      eyebrow: 'La Tienda · Objetos conscientes',
      heading: 'Herramientas para la Presencia',
      lead:
        'Objetos conscientes para acompañar tu práctica y tus rituales diarios. Retiro en el estudio de La Candelaria o envío local — escríbenos para coordinar.',
      addToCart: (name: string) => `Añadir ${name} al carrito`,
      products: [
        { name: 'Cristal de Cuarzo', description: 'Pieza limpia para altar, meditacion o ritual personal.', availability: 'Retiro en estudio o envio local' },
        { name: 'Incienso Natural', description: 'Aroma suave para preparar practica y cierre de dia.', availability: 'Disponible para retiro' },
        { name: 'Aceite Esencial', description: 'Mezcla botanica para respiracion, descanso y presencia.', availability: 'Retiro en estudio o envio local' },
        { name: 'Diario de Gratitud', description: 'Cuaderno para intenciones, seguimiento y journaling.', availability: 'Disponible para retiro' },
        { name: 'Vela de Soja', description: 'Vela mineral para rituales cortos y meditacion guiada.', availability: 'Retiro en estudio o envio local' },
        { name: 'Manta de Lino', description: 'Textil liviano para savasana, meditacion o consultorio.', availability: 'Confirmar color por WhatsApp' },
        { name: 'Cuenco Tibetano', description: 'Cuenco de practica para sonido, pausa y vibracion.', availability: 'Entrega coordinada' },
        { name: 'Palo Santo', description: 'Madera aromatica para limpieza consciente del espacio.', availability: 'Disponible para retiro' },
      ] as ShopProductCopy[],
      helpText: '¿Buscas algo en particular o quieres confirmar disponibilidad? Cuéntanos qué quieres traer a tu espacio.',
      whatsappCta: 'Escríbenos por WhatsApp',
    },
    blog: {
      eyebrow: 'Journal',
      heading: 'Palabras para el Camino',
      lead: 'Recursos, guías e inspiración para nutrir tu viaje interior — escritos desde la práctica, no desde la teoría.',
      featuredLabel: 'Lectura destacada',
      readArticleArrow: 'Leer artículo →',
      readArticle: 'Leer artículo',
      closeArticle: 'Cerrar artículo',
      reserveClassCta: 'Reservar una clase →',
      posts: [
        { title: '5 Pasos para Iniciar tu Práctica de Meditación', category: 'Meditación', excerpt: 'La meditación no requiere experiencia previa — solo la disposición de sentarte contigo mismo unos minutos al día.' },
        { title: 'Yoga para Principiantes: Posturas Esenciales', category: 'Yoga', excerpt: 'Una guía de las posturas fundamentales de Hatha Yoga para construir una base sólida y consciente.' },
        { title: 'Alineando tu Energía Vital con los Chakras', category: 'Crecimiento Espiritual', excerpt: 'Aprende qué son los chakras y cómo mantenerlos en equilibrio para tu salud física y emocional.' },
        { title: 'Rituales de Luna Nueva: Sembrando Intenciones', category: 'Crecimiento Espiritual', excerpt: 'Aprovecha la energía renovadora de la luna nueva con estos rituales simples para plantar las semillas de tus deseos.' },
        { title: 'Breathwork: El Arte de Respirar con Consciencia', category: 'Bienestar', excerpt: 'La respiración es la herramienta más accesible para transformar tu energía. Descubre las técnicas más usadas en el studio.' },
      ] as BlogPostCopy[],
    },
    contact: {
      eyebrow: 'Hablemos',
      heading: 'Nuestro Umbral',
      lead: 'Si sientes que este es tu lugar, las puertas están abiertas. Escríbenos o visítanos en La Candelaria, Bogotá.',
      mapAriaLabel: 'Mapa ilustrado de la ubicación de Inner Spirit en La Candelaria, Bogotá',
      mapCardAddress: 'Transversal 1 #17-29 · La Candelaria',
      visitLabel: 'Visítanos',
      visitAddressLine1: 'Transversal 1 #17-29',
      visitAddressLine2: 'La Candelaria, Bogotá',
      hoursLabel: 'Horario',
      hoursLine1: 'Lun–Vie · 6:30 AM – 9:00 PM',
      hoursLine2: 'Sáb–Dom · 8:00 AM – 9:00 PM',
      writeLabel: 'Escríbenos',
      followLabel: 'Síguenos',
      igAriaLabel: 'Instagram @innerspirit_studio',
      waAriaLabel: 'WhatsApp +57 321 224 8261',
      beforeVisitLabel: 'Antes de tu visita',
      beforeVisitText:
        'Llega 10 minutos antes para acomodarte sin prisa. Trae ropa cómoda; mat, mantas y props los tenemos en el estudio. Si es tu primera vez, escríbenos por WhatsApp y te orientamos con gusto.',
      formEyebrow: 'Inicia una conversación',
      formTitlePrefix: 'Cuéntanos qué quieres ',
      formTitleEmphasis: 'traer al espacio',
      formTitleSuffix: '.',
      formLead: 'Déjanos un mensaje y seguimos por WhatsApp para coordinar lo que necesites.',
      nameLabel: 'Tu Nombre',
      emailLabel: 'Tu Email',
      typeLabel: 'Motivo de consulta',
      typeOptions: {
        clase: 'Consulta sobre Clases',
        evento: 'Consulta sobre Eventos',
        producto: 'Consulta sobre Tienda',
        otro: 'Otro motivo',
      },
      messageLabel: 'Mensaje',
      messagePlaceholder: '¿En qué podemos acompañarte?',
      consentPrefix: 'Autorizo el tratamiento de mis datos según la',
      consentLink: 'política de privacidad',
      submit: 'Enviar Mensaje',
    },
    privacy: {
      eyebrow: 'Legal',
      title: 'Política de Tratamiento de Datos Personales',
      notice: '',
      emailCta: 'Escribir un correo',
      contactCta: 'Ir a Contacto',
    },
    terms: {
      eyebrow: 'Legal',
      title: 'Términos y Condiciones de Uso y Servicio',
      subtitle: 'Condiciones de participación en clases, eventos, consultas, uso del espacio patrimonial y tienda de Inner Spirit Studio.',
      emailCta: 'Escribir un correo',
      contactCta: 'Ir a Contacto',
    },
  },
  pt: {
    about: {
      eyebrowStudio: 'Inner Spirit Studio',
      heroTitleLine1: 'Somos um espaço',
      heroTitleLine2: 'para recordar',
      heroLead:
        'Um lugar para soltar o ruído de fora e voltar a escutar a sabedoria que já habita em ti.',
      philosophyTitle: 'A Nossa Filosofia',
      philosophyP1:
        'Não somos um ginásio. Não somos um centro de terapia. Somos um espaço onde o movimento nasce de dentro. Onde a meditação não é uma técnica, mas um descanso. Onde a dança não tem passos, só impulso.',
      philosophyP2:
        'Acreditamos que cada pessoa possui a sua própria bússola interna. O nosso papel não é dar respostas, mas criar as condições de calma e presença para que possas escutar as tuas.',
      guideTitle: 'A Guia',
      guideP1: 'O caminho de Inner Spirit é sustentado por uma escuta.',
      guideP2:
        'Uma que foi nutrida por estudos em Cura Energética, Meditação e Yoga Holístico, mas cuja verdadeira guia é a presença partilhada no silêncio. Mais do que ensinar, o propósito é criar o espaço para que cada pessoa recorde a sua própria sabedoria.',
      spaceTitle: 'O Espaço',
      spaceLead:
        '100 m² de espaço sagrado aos pés de Monserrate, no bairro de La Candelaria em Bogotá. Luz natural, paredes de barro e um piso que já viu milhares de respirações.',
      galleryLabels: ['Movimento Consciente', 'Silêncio Interior', 'Florescimento'] as string[],
    },
    espacio: {
      eyebrow: 'La Candelaria, Bogotá',
      heroTitle: 'Um espaço para habitar a prática, não apenas fazer uma aula.',
      heroLead:
        'O Inner Spirit Studio recebe aulas permanentes, workshops, certificações, rituais e experiências de turismo wellness no coração histórico de Bogotá.',
      ctaReserve: 'Reservar o espaço',
      ctaTalk: 'Conversar sobre uma ideia',
    },
    classes: {
      eyebrow: 'Prática Diária',
      heading: 'As Nossas Práticas',
      lead:
        'Cada aula é um convite para habitares o teu corpo e acalmares a tua mente. Não é preciso experiência, só presença.',
      weeklyRhythm: [
        { day: 'Seg – Sex', time: '6:30 AM', focus: 'Yoga & Pranayama ao amanhecer' },
        { day: 'Sáb – Dom', time: '8:00 AM', focus: 'Vinyasa, dança e sound healing' },
      ] as WeeklySlot[],
      items: [
        {
          title: 'Yoga',
          subtitle: 'Hatha · Vinyasa · Yin · AcroYoga · Kundalini',
          description:
            'Uma prática para unificar corpo, mente e respiração. Fluxos dinâmicos, posturas clássicas e trabalho energético com mantras. Para todos os níveis, em português e inglês.',
          priceLabel: '$36.000 COP / sessão',
        },
        {
          title: 'Meditação & Breathwork',
          subtitle: 'Silêncio · Pranayama · Atenção Plena',
          description:
            'Um espaço de silêncio para observar e descansar. Técnicas de respiração para libertar tensões, expandir a energia e cultivar a clareza interior. Sem experiência prévia.',
          priceLabel: '$36.000 COP / sessão',
        },
        {
          title: 'Dança & Movimento',
          subtitle: 'Inner Dance · Dança Boreal · Inner Movement',
          description:
            'Movimento livre para libertar o corpo e a mente. Sem coreografias — um convite para que o teu corpo se expresse autenticamente guiado pela música e pelo teu impulso interior.',
          priceLabel: '$36.000 COP / sessão',
        },
        {
          title: 'Sound Healing',
          subtitle: 'Gong · Taças Tibetanas · Arte Terapia',
          description:
            'Sessões de cura sonora com gong, taças tibetanas e sinos. O som como veículo de transformação para harmonizar corpo, mente e espírito.',
          priceLabel: '$36.000 COP / sessão',
        },
      ] as ClassItem[],
      viewSchedule: 'Ver Horários',
      promoLabel: 'Promoção Mensal',
      promoTitle: '3 sessões por $100.000 COP',
      promoDetail: '~$25 USD · Seg–Sex 6:30 AM · Sáb–Dom 8:00 AM',
      promoCta: 'Reservar pelo WhatsApp',
      faqEyebrow: 'Antes da tua primeira aula',
      faqHeading: 'Perguntas frequentes',
      faqs: [
        {
          q: 'Preciso de experiência prévia?',
          a: 'Não. As nossas aulas são para todos os níveis; os guias adaptam as instruções para principiantes e para quem já tem prática.',
        },
        {
          q: 'O que devo levar?',
          a: 'Roupa confortável e disposição para estar presente. Temos tapetes, almofadas e mantas no estúdio; traz só a tua garrafa de água.',
        },
        {
          q: 'As aulas são em português ou inglês?',
          a: 'Ambos. O nosso espaço é bilingue e damos as boas-vindas a visitantes internacionais: guiamos em português e inglês conforme o grupo.',
        },
        {
          q: 'Como reservo o meu lugar?',
          a: 'Escolhe uma prática e clica em "Ver Horários" para reservar, ou escreve-nos pelo WhatsApp. As vagas são limitadas para cuidar da intimidade do grupo.',
        },
      ] as Faq[],
    },
    events: {
      eyebrow: 'Próximos Encontros',
      heading: 'Rituais e Encontros',
      lead:
        'Inner Dance, cerimónias de lua nova e encontros de som para marcar o ciclo em comunidade. Encontros ativos, lista de espera para formações fechadas e reserva direta quando há vaga.',
      bookable: 'Vagas abertas',
      waitlist: 'Lista de espera',
      viewFeed: 'Ver Feed IG',
      stepsEyebrow: 'Como participar',
      stepsHeading: 'Três passos para nos acompanhares',
      steps: [
        { n: '01', t: 'Escolhe o teu encontro', d: 'Explora os rituais ativos. Cada um tem a sua data, intenção e energia própria.' },
        { n: '02', t: 'Reserva o teu lugar', d: 'Garante a tua vaga a partir do site ou junta-te à lista de espera se a formação estiver fechada.' },
        { n: '03', t: 'Chega e habita-o', d: 'Vem com roupa confortável e mente aberta. Nós sustentamos o espaço para que só te entregues.' },
      ] as Step[],
    },
    consultorio: {
      heading: 'Acompanhamento Individual',
      lead: 'Um espaço seguro e confidencial para caminhar ao teu lado no teu processo de autodescoberta.',
      intro1: 'Às vezes, o caminho precisa de uma testemunha.',
      intro2:
        'Nas sessões individuais, oferecemos um espaço seguro para explorar o que emerge: padrões que se repetem, perguntas sem resposta, lutos silenciados. Não se trata de "consertar" nada, mas de iluminar com consciência o que já está presente.',
      intro3:
        'Trabalhamos com ferramentas simples: a escuta profunda, o diálogo consciente e, quando necessário, práticas energéticas suaves para reequilibrar o corpo sutil. Cada sessão é única, tecida à medida da tua necessidade do momento.',
      intro4: 'Não damos conselhos. Caminhamos contigo.',
      modalitiesEyebrow: 'Sessões 1:1',
      modalitiesHeading: 'Modalidades de acompanhamento',
      modalities: [
        { label: 'Yoga terapêutico', desc: 'Movimento suave e consciente para libertar tensão e reconectar com o corpo.' },
        { label: 'Meditação guiada', desc: 'Um descanso para a mente: presença, silêncio e observação acompanhada.' },
        { label: 'Breathwork', desc: 'Respiração consciente para soltar o que está retido e expandir a tua energia vital.' },
        { label: 'Arte terapia', desc: 'O gesto criativo como via para nomear o que as palavras não alcançam.' },
      ] as Modality[],
      howEyebrow: 'Como funciona',
      howHeading: 'Da primeira visita à continuidade',
      howSteps: [
        { n: '01', t: 'Marca a tua visita', d: 'Escreve-nos e conversamos sem compromisso. Ouvimos o que precisas e escolhemos juntos a modalidade.' },
        { n: '02', t: 'Sessão personalizada', d: 'Um encontro 1:1 tecido à medida do teu momento, num espaço seguro e confidencial.' },
        { n: '03', t: 'Continuidade', d: 'Se quiseres, desenhamos um acompanhamento sustentado para aprofundar o teu processo com calma.' },
      ] as Step[],
      ctaTalk: 'Vamos conversar para marcar',
      ctaWhatsapp: 'Marcar pelo WhatsApp',
    },
    shop: {
      eyebrow: 'A Loja · Objetos conscientes',
      heading: 'Ferramentas para a Presença',
      lead:
        'Objetos conscientes para acompanhar a tua prática e os teus rituais diários. Levantamento no estúdio em La Candelaria ou entrega local — escreve-nos para combinar.',
      addToCart: (name: string) => `Adicionar ${name} ao carrinho`,
      products: [
        { name: 'Cristal de Quartzo', description: 'Peça limpa para altar, meditação ou ritual pessoal.', availability: 'Levantamento no estúdio ou entrega local' },
        { name: 'Incenso Natural', description: 'Aroma suave para preparar a prática e fechar o dia.', availability: 'Disponível para levantamento' },
        { name: 'Óleo Essencial', description: 'Mistura botânica para respiração, descanso e presença.', availability: 'Levantamento no estúdio ou entrega local' },
        { name: 'Diário de Gratidão', description: 'Caderno para intenções, registo e journaling.', availability: 'Disponível para levantamento' },
        { name: 'Vela de Soja', description: 'Vela mineral para rituais curtos e meditação guiada.', availability: 'Levantamento no estúdio ou entrega local' },
        { name: 'Manta de Linho', description: 'Têxtil leve para savasana, meditação ou consultório.', availability: 'Confirmar cor pelo WhatsApp' },
        { name: 'Tigela Tibetana', description: 'Tigela de prática para som, pausa e vibração.', availability: 'Entrega combinada' },
        { name: 'Pau Santo', description: 'Madeira aromática para limpeza consciente do espaço.', availability: 'Disponível para levantamento' },
      ] as ShopProductCopy[],
      helpText: 'Procuras algo em particular ou queres confirmar disponibilidade? Diz-nos o que queres trazer para o teu espaço.',
      whatsappCta: 'Escreve-nos pelo WhatsApp',
    },
    blog: {
      eyebrow: 'Journal',
      heading: 'Palavras para o Caminho',
      lead: 'Recursos, guias e inspiração para nutrir a tua viagem interior — escritos a partir da prática, não da teoria.',
      featuredLabel: 'Leitura em destaque',
      readArticleArrow: 'Ler artigo →',
      readArticle: 'Ler artigo',
      closeArticle: 'Fechar artigo',
      reserveClassCta: 'Reservar uma aula →',
      posts: [
        { title: '5 Passos para Iniciares a tua Prática de Meditação', category: 'Meditação', excerpt: 'A meditação não exige experiência prévia — só a disposição de te sentares contigo mesmo uns minutos por dia.' },
        { title: 'Yoga para Principiantes: Posturas Essenciais', category: 'Yoga', excerpt: 'Um guia das posturas fundamentais de Hatha Yoga para construíres uma base sólida e consciente.' },
        { title: 'Alinhando a tua Energia Vital com os Chakras', category: 'Crescimento Espiritual', excerpt: 'Aprende o que são os chakras e como mantê-los em equilíbrio para a tua saúde física e emocional.' },
        { title: 'Rituais de Lua Nova: Semeando Intenções', category: 'Crescimento Espiritual', excerpt: 'Aproveita a energia renovadora da lua nova com estes rituais simples para plantares as sementes dos teus desejos.' },
        { title: 'Breathwork: A Arte de Respirar com Consciência', category: 'Bem-Estar', excerpt: 'A respiração é a ferramenta mais acessível para transformares a tua energia. Descobre as técnicas mais usadas no estúdio.' },
      ] as BlogPostCopy[],
    },
    contact: {
      eyebrow: 'Vamos Falar',
      heading: 'O Nosso Limiar',
      lead: 'Se sentes que este é o teu lugar, as portas estão abertas. Escreve-nos ou visita-nos em La Candelaria, Bogotá.',
      mapAriaLabel: 'Mapa ilustrado da localização do Inner Spirit em La Candelaria, Bogotá',
      mapCardAddress: 'Transversal 1 #17-29 · La Candelaria',
      visitLabel: 'Visita-nos',
      visitAddressLine1: 'Transversal 1 #17-29',
      visitAddressLine2: 'La Candelaria, Bogotá',
      hoursLabel: 'Horário',
      hoursLine1: 'Seg–Sex · 6:30 AM – 9:00 PM',
      hoursLine2: 'Sáb–Dom · 8:00 AM – 9:00 PM',
      writeLabel: 'Escreve-nos',
      followLabel: 'Segue-nos',
      igAriaLabel: 'Instagram @innerspirit_studio',
      waAriaLabel: 'WhatsApp +57 321 224 8261',
      beforeVisitLabel: 'Antes da tua visita',
      beforeVisitText:
        'Chega 10 minutos antes para te instalares sem pressa. Traz roupa confortável; temos tapetes, mantas e props no estúdio. Se é a tua primeira vez, escreve-nos pelo WhatsApp e orientamos-te com todo o gosto.',
      formEyebrow: 'Inicia uma conversa',
      formTitlePrefix: 'Diz-nos o que queres ',
      formTitleEmphasis: 'trazer para o espaço',
      formTitleSuffix: '.',
      formLead: 'Deixa-nos uma mensagem e seguimos pelo WhatsApp para combinar o que precisares.',
      nameLabel: 'O teu Nome',
      emailLabel: 'O teu Email',
      typeLabel: 'Motivo do contacto',
      typeOptions: {
        clase: 'Consulta sobre Aulas',
        evento: 'Consulta sobre Eventos',
        producto: 'Consulta sobre a Loja',
        otro: 'Outro motivo',
      },
      messageLabel: 'Mensagem',
      messagePlaceholder: 'Em que podemos acompanhar-te?',
      consentPrefix: 'Autorizo o tratamento dos meus dados segundo a',
      consentLink: 'política de privacidade',
      submit: 'Enviar Mensagem',
    },
    privacy: {
      eyebrow: 'Legal',
      title: 'Política de Privacidade',
      notice:
        'Esta página está disponível apenas em espanhol, em conformidade com a legislação colombiana de proteção de dados pessoais (Lei 1581 de 2012). Se tiveres dúvidas sobre o tratamento dos teus dados, contacta-nos diretamente.',
      emailCta: 'Enviar um email',
      contactCta: 'Ir para Contacto',
    },
    terms: {
      eyebrow: 'Legal',
      title: 'Termos e Condições de Serviço',
      subtitle: 'Condições de participação em práticas, eventos, consultório, uso do espaço e loja online do Inner Spirit Studio.',
      notice:
        'Os termos de serviço e condições de contratação aplicam-se em conformidade com as leis vigentes. Para questões detalhadas sobre reservas, reembolsos ou encomendas, contacta-nos diretamente.',
      emailCta: 'Enviar um email',
      contactCta: 'Ir para Contacto',
    },
  },
  en: {
    about: {
      eyebrowStudio: 'Inner Spirit Studio',
      heroTitleLine1: 'We are a space',
      heroTitleLine2: 'to remember',
      heroLead:
        'A place to release the noise from outside and listen again to the wisdom that already lives within you.',
      philosophyTitle: 'Our Philosophy',
      philosophyP1:
        "We're not a gym. We're not a therapy center. We're a space where movement is born from within. Where meditation isn't a technique, but a rest. Where dance has no steps, only impulse.",
      philosophyP2:
        "We believe every person carries their own inner compass. Our role isn't to give answers, but to create the conditions of calm and presence so you can hear your own.",
      guideTitle: 'The Guide',
      guideP1: "Inner Spirit's path is held by a kind of listening.",
      guideP2:
        'One nurtured by studies in Energy Healing, Meditation and Holistic Yoga, but whose true guidance is shared presence in silence. More than teaching, the purpose is to create the space for each person to remember their own wisdom.',
      spaceTitle: 'The Space',
      spaceLead:
        '100 m² of sacred space at the foot of Monserrate, in the La Candelaria neighborhood of Bogotá. Natural light, clay walls and a floor that has witnessed thousands of breaths.',
      galleryLabels: ['Conscious Movement', 'Inner Silence', 'Flourishing'] as string[],
    },
    espacio: {
      eyebrow: 'La Candelaria, Bogotá',
      heroTitle: 'A space to inhabit the practice, not just take a class.',
      heroLead:
        'Inner Spirit Studio hosts ongoing classes, workshops, certifications, rituals and wellness-tourism experiences in the historic heart of Bogotá.',
      ctaReserve: 'Book the space',
      ctaTalk: 'Talk through an idea',
    },
    classes: {
      eyebrow: 'Daily Practice',
      heading: 'Our Practices',
      lead: 'Every class is an invitation to inhabit your body and calm your mind. No experience required, only presence.',
      weeklyRhythm: [
        { day: 'Mon – Fri', time: '6:30 AM', focus: 'Yoga & Pranayama at dawn' },
        { day: 'Sat – Sun', time: '8:00 AM', focus: 'Vinyasa, dance and sound healing' },
      ] as WeeklySlot[],
      items: [
        {
          title: 'Yoga',
          subtitle: 'Hatha · Vinyasa · Yin · AcroYoga · Kundalini',
          description:
            'A practice to unify body, mind and breath. Dynamic flows, classic postures and energetic work with mantras. For all levels, in Spanish and English.',
          priceLabel: '$36,000 COP / session',
        },
        {
          title: 'Meditation & Breathwork',
          subtitle: 'Silence · Pranayama · Mindfulness',
          description:
            'A space of silence to observe and rest. Breathing techniques to release tension, expand energy and cultivate inner clarity. No previous experience needed.',
          priceLabel: '$36,000 COP / session',
        },
        {
          title: 'Dance & Movement',
          subtitle: 'Inner Dance · Boreal Dance · Inner Movement',
          description:
            "Free movement to release body and mind. No choreography — an invitation for your body to express itself authentically, guided by the music and your own inner impulse.",
          priceLabel: '$36,000 COP / session',
        },
        {
          title: 'Sound Healing',
          subtitle: 'Gong · Tibetan Bowls · Art Therapy',
          description:
            'Sound healing sessions with gong, Tibetan bowls and bells. Sound as a vehicle for transformation, harmonizing body, mind and spirit.',
          priceLabel: '$36,000 COP / session',
        },
      ] as ClassItem[],
      viewSchedule: 'View Schedule',
      promoLabel: 'Monthly Promo',
      promoTitle: '3 sessions for $100,000 COP',
      promoDetail: '~$25 USD · Mon–Fri 6:30 AM · Sat–Sun 8:00 AM',
      promoCta: 'Book via WhatsApp',
      faqEyebrow: 'Before your first class',
      faqHeading: 'Frequently asked questions',
      faqs: [
        {
          q: 'Do I need previous experience?',
          a: 'No. Our classes are for all levels; our guides adapt instructions for beginners and for those who already have a practice.',
        },
        {
          q: 'What should I bring?',
          a: 'Comfortable clothes and a willingness to be present. We have mats, cushions and blankets at the studio; just bring your water bottle.',
        },
        {
          q: 'Are classes in Spanish or English?',
          a: 'Both. Our space is bilingual and we welcome international visitors: we guide in Spanish and English depending on the group.',
        },
        {
          q: 'How do I book my spot?',
          a: 'Choose a practice and tap "View Schedule" to book, or write to us on WhatsApp. Spots are limited to protect the intimacy of the group.',
        },
      ] as Faq[],
    },
    events: {
      eyebrow: 'Upcoming Gatherings',
      heading: 'Rituals & Gatherings',
      lead:
        "Inner Dance, new moon ceremonies and sound gatherings to mark the cycle in community. Active gatherings, a waitlist for closed trainings, and direct booking when there's room.",
      bookable: 'Spots open',
      waitlist: 'Waitlist',
      viewFeed: 'View IG Feed',
      stepsEyebrow: 'How to join',
      stepsHeading: 'Three steps to join us',
      steps: [
        { n: '01', t: 'Choose your gathering', d: 'Explore the active rituals. Each one has its own date, intention and energy.' },
        { n: '02', t: 'Book your spot', d: "Reserve a spot on the site, or join the waitlist if the training is closed." },
        { n: '03', t: 'Arrive and inhabit it', d: 'Come with comfortable clothes and an open mind. We hold the space so you can simply give yourself to it.' },
      ] as Step[],
    },
    consultorio: {
      heading: 'One-on-One Guidance',
      lead: 'A safe, confidential space to walk alongside you in your process of self-discovery.',
      intro1: 'Sometimes, the path needs a witness.',
      intro2:
        'In individual sessions, we offer a safe space to explore what surfaces: recurring patterns, unanswered questions, quiet grief. It\'s not about "fixing" anything, but about consciously illuminating what\'s already there.',
      intro3:
        "We work with simple tools: deep listening, conscious dialogue and, when needed, gentle energetic practices to rebalance the subtle body. Every session is unique, woven to fit your need in the moment.",
      intro4: "We don't give advice. We walk with you.",
      modalitiesEyebrow: 'One-on-One Sessions',
      modalitiesHeading: 'Ways to be accompanied',
      modalities: [
        { label: 'Therapeutic Yoga', desc: 'Gentle, conscious movement to release tension and reconnect with the body.' },
        { label: 'Guided Meditation', desc: 'A rest for the mind: presence, silence and accompanied observation.' },
        { label: 'Breathwork', desc: "Conscious breathing to release what's held and expand your vital energy." },
        { label: 'Art Therapy', desc: 'The creative gesture as a way to name what words cannot reach.' },
      ] as Modality[],
      howEyebrow: 'How it works',
      howHeading: 'From the first visit to ongoing support',
      howSteps: [
        { n: '01', t: 'Schedule your visit', d: "Write to us and we'll talk with no commitment. We listen to what you need and choose the modality together." },
        { n: '02', t: 'Personalized session', d: 'A one-on-one encounter woven to fit your moment, in a safe and confidential space.' },
        { n: '03', t: 'Continuity', d: "If you'd like, we design ongoing support to deepen your process at your own pace." },
      ] as Step[],
      ctaTalk: "Let's talk to schedule",
      ctaWhatsapp: 'Schedule via WhatsApp',
    },
    shop: {
      eyebrow: 'The Shop · Conscious Objects',
      heading: 'Tools for Presence',
      lead:
        'Conscious objects to accompany your practice and daily rituals. Studio pickup in La Candelaria or local delivery — message us to coordinate.',
      addToCart: (name: string) => `Add ${name} to cart`,
      products: [
        { name: 'Quartz Crystal', description: 'A cleansed piece for your altar, meditation or personal ritual.', availability: 'Studio pickup or local delivery' },
        { name: 'Natural Incense', description: 'A soft scent to prepare your practice and close the day.', availability: 'Available for pickup' },
        { name: 'Essential Oil', description: 'A botanical blend for breath, rest and presence.', availability: 'Studio pickup or local delivery' },
        { name: 'Gratitude Journal', description: 'A notebook for intentions, tracking and journaling.', availability: 'Available for pickup' },
        { name: 'Soy Candle', description: 'A mineral wax candle for short rituals and guided meditation.', availability: 'Studio pickup or local delivery' },
        { name: 'Linen Blanket', description: 'A lightweight fabric for savasana, meditation or the consultation room.', availability: 'Confirm color via WhatsApp' },
        { name: 'Tibetan Bowl', description: 'A practice bowl for sound, pause and vibration.', availability: 'Coordinated delivery' },
        { name: 'Palo Santo', description: 'Aromatic wood for consciously clearing the space.', availability: 'Available for pickup' },
      ] as ShopProductCopy[],
      helpText: "Looking for something specific, or want to confirm availability? Tell us what you'd like to bring into your space.",
      whatsappCta: 'Message us on WhatsApp',
    },
    blog: {
      eyebrow: 'Journal',
      heading: 'Words for the Path',
      lead: 'Resources, guides and inspiration to nourish your inner journey — written from practice, not theory.',
      featuredLabel: 'Featured read',
      readArticleArrow: 'Read article →',
      readArticle: 'Read article',
      closeArticle: 'Close article',
      reserveClassCta: 'Book a class →',
      posts: [
        { title: '5 Steps to Start Your Meditation Practice', category: 'Meditation', excerpt: "Meditation doesn't require previous experience — only the willingness to sit with yourself for a few minutes a day." },
        { title: 'Yoga for Beginners: Essential Postures', category: 'Yoga', excerpt: 'A guide to the fundamental Hatha Yoga postures to build a solid, conscious foundation.' },
        { title: 'Aligning Your Vital Energy with the Chakras', category: 'Spiritual Growth', excerpt: 'Learn what the chakras are and how to keep them balanced for your physical and emotional health.' },
        { title: 'New Moon Rituals: Planting Intentions', category: 'Spiritual Growth', excerpt: 'Harness the renewing energy of the new moon with these simple rituals to plant the seeds of your desires.' },
        { title: 'Breathwork: The Art of Conscious Breathing', category: 'Wellness', excerpt: 'Breath is the most accessible tool to transform your energy. Discover the techniques most used in the studio.' },
      ] as BlogPostCopy[],
    },
    contact: {
      eyebrow: "Let's Talk",
      heading: 'Our Threshold',
      lead: 'If this feels like your place, the doors are open. Write to us or visit us in La Candelaria, Bogotá.',
      mapAriaLabel: "Illustrated map of Inner Spirit's location in La Candelaria, Bogotá",
      mapCardAddress: 'Transversal 1 #17-29 · La Candelaria',
      visitLabel: 'Visit Us',
      visitAddressLine1: 'Transversal 1 #17-29',
      visitAddressLine2: 'La Candelaria, Bogotá',
      hoursLabel: 'Hours',
      hoursLine1: 'Mon–Fri · 6:30 AM – 9:00 PM',
      hoursLine2: 'Sat–Sun · 8:00 AM – 9:00 PM',
      writeLabel: 'Write to Us',
      followLabel: 'Follow Us',
      igAriaLabel: 'Instagram @innerspirit_studio',
      waAriaLabel: 'WhatsApp +57 321 224 8261',
      beforeVisitLabel: 'Before Your Visit',
      beforeVisitText:
        "Arrive 10 minutes early to settle in without rushing. Bring comfortable clothes; we have mats, blankets and props at the studio. If it's your first time, message us on WhatsApp and we're happy to guide you.",
      formEyebrow: 'Start a Conversation',
      formTitlePrefix: 'Tell us what you want to ',
      formTitleEmphasis: 'bring into the space',
      formTitleSuffix: '.',
      formLead: "Leave us a message and we'll follow up on WhatsApp to coordinate what you need.",
      nameLabel: 'Your Name',
      emailLabel: 'Your Email',
      typeLabel: 'Reason for contact',
      typeOptions: {
        clase: 'Question about Classes',
        evento: 'Question about Events',
        producto: 'Question about the Shop',
        otro: 'Other reason',
      },
      messageLabel: 'Message',
      messagePlaceholder: 'How can we support you?',
      consentPrefix: 'I agree to the processing of my data per the',
      consentLink: 'privacy policy',
      submit: 'Send Message',
    },
    privacy: {
      eyebrow: 'Legal',
      title: 'Privacy Policy',
      notice:
        'This page is only available in Spanish, per Colombian data protection law (Ley 1581 de 2012). If you have questions about how your data is handled, please reach out to us directly.',
      emailCta: 'Send an email',
      contactCta: 'Go to Contact',
    },
    terms: {
      eyebrow: 'Legal',
      title: 'Terms & Conditions of Service',
      subtitle: 'Terms governing class bookings, conscious events, consultations, venue rental, and online shop purchases at Inner Spirit Studio.',
      notice:
        'The terms of service and reservation conditions apply in accordance with applicable consumer regulations. If you have questions regarding bookings, cancellations, or shop orders, please contact our team directly.',
      emailCta: 'Send an email',
      contactCta: 'Go to Contact',
    },
  },
} as const;
