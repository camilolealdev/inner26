
import React, { useEffect, useState } from 'react';
import type { BlogPost } from '../../../types';
import { Illustration } from '../../../assets/Illustrations';
import { CloseIcon } from '../../../constants';






interface ArticleContent {
  body: string[];
}

const articleContent: Record<number, ArticleContent> = {
  1: {
    body: [
      'La meditación no es un privilegio reservado para monjes o personas con años de práctica. Es una herramienta simple y poderosa que cualquier persona puede comenzar hoy, con lo que tiene.',
      '**1. Crea un espacio de silencio**\nNo necesitas un altar ni una habitación especial. Basta con un rincón donde puedas sentarte sin interrupciones durante unos minutos. Una silla, un cojín en el suelo o una alfombra de yoga son suficientes. Lo importante es que ese lugar te transmita calma.',
      '**2. Empieza con 5 minutos**\nEl error más común es intentar meditar durante 30 minutos desde el primer día. Comienza con 5 minutos. Pon una alarma suave. Cuando esos 5 minutos se vuelvan fáciles, extiende a 10. La consistencia vale más que la duración.',
      '**3. Ancla tu atención en la respiración**\nCierra los ojos y lleva la atención a tu respiración. No trates de controlarla — solo obsérva cómo el aire entra y sale. Siente el movimiento del abdomen, la temperatura del aire en la nariz. Esto es meditación.',
      '**4. Cuando la mente divague, vuelve sin juzgar**\nLa mente vagará. Eso es lo que hace. No es un fracaso — es el momento más importante de la práctica: el instante en que te das cuenta de que te fuiste, y decides volver. Cada vez que regresas, estás entrenando la atención.',
      '**5. Sé constante, no perfecto**\nMeditar cinco minutos todos los días es infinitamente más valioso que una hora una vez a la semana. Conviértelo en un ritual: al despertar, antes de dormir, o en cualquier pausa del día. La práctica se construye momento a momento.',
      'En Inner Spirit ofrecemos clases de meditación y breathwork para todos los niveles, en un espacio diseñado para el silencio interior. Si quieres dar el primer paso acompañado, te esperamos.',
    ],
  },
  2: {
    body: [
      'El yoga no exige flexibilidad, fuerza especial ni un cuerpo particular. Exige presencia. Estas posturas fundamentales son la base de cualquier práctica, y puedes comenzarlas desde cero.',
      '**Tadasana — La Montaña**\nParada o de pie, pies juntos o separados al ancho de las caderas. Alarga la columna, relaja los hombros y distribuye el peso por igual entre los dos pies. Es la postura más simple y la más poderosa: aprender a estar de pie con consciencia.',
      '**Adho Mukha Svanasana — El Perro Mirando Abajo**\nDesde cuatro patas, levanta las caderas hacia el techo formando una V invertida. Estira los talones hacia el suelo (no importa si no llegan) y alarga la columna. Esta postura energiza el cuerpo y estira la cadena posterior completa.',
      '**Virabhadrasana I — El Guerrero I**\nDe pie, da un paso largo hacia adelante. Dobla la rodilla delantera a 90 grados, mantén la rodilla trasera estirada y levanta los brazos hacia el cielo. Desarrolla fuerza en las piernas y abre el pecho.',
      '**Balasana — La Postura del Niño**\nSiéntate sobre los talones, dobla el torso hacia adelante y estira los brazos en el suelo o apóyalos a los lados del cuerpo. Es la postura del descanso. Vuelve a ella cuando necesites recuperarte entre posturas más intensas.',
      '**Savasana — El Cadáver**\nAcostado boca arriba, brazos y piernas ligeramente separados, ojos cerrados. No es solo el final de la clase — es quizás la postura más difícil: soltar completamente el control y descansar en el no-hacer.',
      'En nuestras clases de Hatha y Vinyasa trabajamos estas posturas desde sus fundamentos, adaptando cada práctica al cuerpo y nivel de cada persona. Únete a nosotros en La Candelaria.',
    ],
  },
  3: {
    body: [
      'Los chakras son centros de energía del cuerpo sutil que han sido mapeados por tradiciones milenarias de la India. Aunque no son visibles al ojo, su influencia se siente en nuestra salud física, emocional y mental.',
      '**¿Qué son los chakras?**\nLa palabra sánscrita "chakra" significa rueda o disco. Son puntos donde la energía vital (prana) se concentra y distribuye. Existen siete chakras principales alineados a lo largo de la columna vertebral, desde la base hasta la coronilla.',
      '**Los siete centros principales**\nMuladhara (raíz) se relaciona con la seguridad y los instintos básicos. Svadhisthana (sacro) rige la creatividad y las emociones. Manipura (plexo solar) es el centro del poder personal. Anahata (corazón) es la sede del amor incondicional. Vishuddha (garganta) gobierna la comunicación. Ajna (tercer ojo) es el centro de la intuición. Sahasrara (coronilla) conecta con la conciencia universal.',
      '**Señales de desequilibrio**\nCuando un chakra está bloqueado o hiperactivo, puede manifestarse en síntomas físicos o emocionales. Un Muladhara desequilibrado puede generar ansiedad o inseguridad. Un Anahata cerrado puede expresarse como dificultad para dar o recibir amor.',
      '**Prácticas para el equilibrio**\nEl yoga, la meditación, el breathwork y el sonido son herramientas poderosas para armonizar los chakras. Las asanas que activan zonas específicas del cuerpo, los mantras vibracionales y la visualización de colores son técnicas utilizadas en la tradición tántrica.',
      'En Inner Spirit integramos el trabajo con los chakras en nuestras sesiones de Sound Healing y en el acompañamiento individual del Consultorio. Cada cuerpo es un universo — la práctica es aprender a habitarlo con consciencia.',
    ],
  },
  4: {
    body: [
      'La luna nueva es el momento del ciclo lunar en que la luna no es visible en el cielo nocturno. Representa el inicio, el vacío fértil, el espacio antes de que algo nazca. Es el momento ideal para sembrar intenciones.',
      '**¿Por qué la luna nueva?**\nLas tradiciones ancestrales de todo el mundo han observado la influencia lunar sobre los ciclos naturales. Así como la luna afecta las mareas, también influye sobre los fluidos del cuerpo y los ciclos emocionales. La luna nueva invita a la introversión, la reflexión y el nuevo comienzo.',
      '**Paso 1: Crea tu espacio sagrado**\nApaga las luces artificiales. Enciende una vela o incienso. Siéntate en un lugar tranquilo donde no seas interrumpido. Este gesto de separar un espacio del tiempo cotidiano le dice al inconsciente que algo importante está por ocurrir.',
      '**Paso 2: Escribe tus intenciones**\nToma un cuaderno y escribe en tiempo presente lo que deseas sembrar en este ciclo. No listas de tareas — intenciones desde el corazón. "Elijo la calma ante lo que no puedo controlar." "Estoy abierto a recibir lo que necesito." Escribe con presencia.',
      '**Paso 3: Meditación de visualización**\nCierra los ojos y visualiza tus intenciones como semillas que plantas en tierra fértil. Siente la textura de la tierra, el calor del sol futuro, el agua que nutrirá esas semillas. Dale imagen y sensación a lo que deseas crear.',
      '**Paso 4: Cierra el ritual**\nAgradece. A ti mismo por hacer el espacio, a la luna por su ciclo constante, a la vida por su posibilidad permanente. Apaga la vela consciente de que el ritual ha concluido, pero la intención sigue viva.',
      'En Inner Spirit celebramos rituales de luna nueva en comunidad. Únete a nuestros eventos mensuales o escríbenos para saber las próximas fechas.',
    ],
  },
  5: {
    body: [
      'Respiramos entre 17.000 y 23.000 veces al día, casi siempre sin darnos cuenta. El breathwork es la práctica de llevar consciencia a ese proceso automático — y usarlo como herramienta de transformación.',
      '**¿Qué es el Breathwork?**\nEl término engloba un amplio espectro de técnicas respiratorias con objetivos distintos: calmar el sistema nervioso, energizar el cuerpo, liberar emociones almacenadas o expandir la conciencia. A diferencia de la meditación convencional, el breathwork es activo — el cuerpo y la mente participan plenamente.',
      '**Técnica 1: Respiración Cuadrada (Box Breathing)**\nInhala durante 4 tiempos. Retén el aire durante 4. Exhala durante 4. Retén vacío durante 4. Repite durante 4 minutos. Esta técnica activa el sistema nervioso parasimpático y es utilizada por militares, atletas y ejecutivos para recuperar la calma bajo presión.',
      '**Técnica 2: Respiración 4-7-8**\nInhala durante 4 tiempos, retén durante 7 y exhala lentamente durante 8. El ratio extendido de la exhalación activa el nervio vago y desacelera el ritmo cardíaco. Ideal para conciliar el sueño o calmar una crisis de ansiedad.',
      '**Técnica 3: Respiración Activadora**\nRespiración rápida y consciente por la nariz, tanto en la inhalación como en la exhalación, durante 1-2 minutos. Seguida de una retención en inhalación. Genera energía, calor interno y mayor concentración. Es la base del pranayama kapalabhati del yoga.',
      '**Lo que puede ocurrir**\nCon la práctica constante, el breathwork puede reducir los niveles de cortisol, mejorar la calidad del sueño, aumentar la claridad mental y liberar tensiones físicas y emocionales crónicas. Algunas personas experimentan sensaciones intensas — la facilitación consciente es importante.',
      'En Inner Spirit ofrecemos clases de Meditación y Breathwork todos los días. Si quieres experimentar estas técnicas en un espacio seguro y guiado, te esperamos en La Candelaria.',
    ],
  },
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '5 Pasos para Iniciar tu Práctica de Meditación',
    category: 'Meditación',
    excerpt: 'La meditación no requiere experiencia previa — solo la disposición de sentarte contigo mismo unos minutos al día.',
    imageUrl: '',
    illustrationName: 'meditation',
  },
  {
    id: 2,
    title: 'Yoga para Principiantes: Posturas Esenciales',
    category: 'Yoga',
    excerpt: 'Una guía de las posturas fundamentales de Hatha Yoga para construir una base sólida y consciente.',
    imageUrl: '',
    illustrationName: 'yoga',
  },
  {
    id: 3,
    title: 'Alineando tu Energía Vital con los Chakras',
    category: 'Crecimiento Espiritual',
    excerpt: 'Aprende qué son los chakras y cómo mantenerlos en equilibrio para tu salud física y emocional.',
    imageUrl: '',
    illustrationName: 'abstract-spirit',
  },
  {
    id: 4,
    title: 'Rituales de Luna Nueva: Sembrando Intenciones',
    category: 'Crecimiento Espiritual',
    excerpt: 'Aprovecha la energía renovadora de la luna nueva con estos rituales simples para plantar las semillas de tus deseos.',
    imageUrl: '',
    illustrationName: 'ritual',
  },
  {
    id: 5,
    title: 'Breathwork: El Arte de Respirar con Consciencia',
    category: 'Bienestar',
    excerpt: 'La respiración es la herramienta más accesible para transformar tu energía. Descubre las técnicas más usadas en el studio.',
    imageUrl: '',
    illustrationName: 'breathwork',
  },
];

const ArticleModal: React.FC<{ post: BlogPost; onClose: () => void }> = ({ post, onClose }) => {
  const content = articleContent[post.id];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(26,26,24,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-2xl my-4 md:my-8 rounded-sm shadow-2xl animate-fade-in-up"
        style={{ background: '#FAF7F2' }}
      >
        <div className="sticky top-0 flex justify-between items-center px-8 py-5 border-b z-10 rounded-t-sm" style={{ background: '#FAF7F2', borderColor: '#EAE0CC' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4D6A6D' }}>{post.category}</span>
          <button onClick={onClose} aria-label="Cerrar artículo" className="transition-transform hover:scale-110" style={{ color: '#A0A083' }}>
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-7 md:px-8 md:py-10">
          <div className="flex items-center justify-center aspect-[3/1] mb-8 rounded-sm" style={{ background: '#EAE0CC' }}>
            <Illustration
              name={post.illustrationName ?? 'meditation'}
              className="w-1/4 h-1/4"
              style={{ color: '#C9ADA1' } as React.CSSProperties}
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight mb-8" style={{ color: '#252520' }}>
            {post.title}
          </h2>

          <div className="space-y-5">
            {content?.body.map((paragraph, i) => {
              if (paragraph.startsWith('**') && paragraph.includes('\n')) {
                const [heading = '', ...rest] = paragraph.split('\n');
                return (
                  <div key={i}>
                    <p className="font-semibold text-lg font-heading mb-1 text-ink">
                      {heading.replace(/\*\*/g, '')}
                    </p>
                    <p className="font-light leading-relaxed" style={{ color: '#5C5C58' }}>{rest.join(' ')}</p>
                  </div>
                );
              }
              return (
                <p key={i} className="font-light leading-relaxed text-base" style={{ color: '#5C5C58' }}>
                  {paragraph}
                </p>
              );
            })}
          </div>

          <div className="mt-10 pt-8 border-t" style={{ borderColor: '#EAE0CC' }}>
            <a
              href="https://wa.me/573212248261?text=Hola%2C%20le%C3%AD%20el%20blog%20de%20Inner%20Spirit%20y%20quiero%20saber%20m%C3%A1s"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-heading text-lg px-8 py-3 transition-all hover:opacity-90"
              style={{ background: '#4D6A6D', color: '#EAE0CC' }}
            >
              Reservar una clase →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [featuredPost, ...otherPosts] = blogPosts;

  useEffect(() => {
    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Blog - Inner Spirit Studio",
      "description": "Artículos sobre yoga, meditación, crecimiento espiritual y bienestar integral.",
      "url": "https://innerspirit.co/blog",
      "publisher": {
        "@type": "Organization",
        "name": "Inner Spirit Studio",
        "url": "https://innerspirit.co"
      }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(blogSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="animate-fade-in-up">
      {selectedPost && (
        <ArticleModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}

      <section id="blog-page" className="is-page-section is-section--paper">
        <div className="is-shell">

          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="is-eyebrow justify-center">Journal</span>
            <h1 className="is-page-heading mt-5">
              Palabras para el Camino
            </h1>
            <p className="is-page-lead mt-6">
              Recursos, guías e inspiración para nutrir tu viaje interior — escritos desde la práctica, no desde la teoría.
            </p>
          </div>

          {/* Featured article — wide dark editorial card */}
          {featuredPost && (
            <button
              type="button"
              onClick={() => setSelectedPost(featuredPost)}
              className="is-surface is-surface--dark is-surface--interactive group w-full text-left flex flex-col md:flex-row overflow-hidden mb-12"
            >
              <div className="is-media-stage md:w-2/5 aspect-[16/10] md:aspect-auto flex items-center justify-center">
                <Illustration
                  name={featuredPost.illustrationName ?? 'meditation'}
                  className="w-1/3 h-1/3 transition-transform duration-700 group-hover:scale-110"
                  style={{ color: '#C9ADA1' } as React.CSSProperties}
                />
              </div>
              <div className="md:w-3/5 p-7 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: '#C9ADA1' }}>
                    Lectura destacada
                  </span>
                  <span className="is-luxury-rule" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: '#8B9A8B' }}>
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl leading-tight mb-4" style={{ color: '#FAF7F2' }}>
                  {featuredPost.title}
                </h2>
                <p className="font-light leading-relaxed mb-6 max-w-xl" style={{ color: 'rgba(234,224,204,0.72)' }}>
                  {featuredPost.excerpt}
                </p>
                <span className="font-heading text-lg transition-colors group-hover:text-white" style={{ color: '#C9ADA1' }}>
                  Leer artículo &rarr;
                </span>
              </div>
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <div
                key={post.id}
                className="is-surface is-surface--interactive group flex flex-col overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-slate-is focus-visible:outline-offset-4"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedPost(post)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedPost(post); } }}
              >
                <div className="is-media-stage overflow-hidden aspect-[3/2] flex items-center justify-center">
                  <Illustration
                    name={post.illustrationName ?? 'meditation'}
                    className="w-2/5 h-2/5 transition-all duration-700 group-hover:scale-110"
                    style={{ color: '#C9ADA1' } as React.CSSProperties}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] mb-2 text-slate-is">
                    {post.category}
                  </p>
                  <h3 className="text-xl md:text-2xl font-heading font-semibold leading-tight mb-3 transition-colors text-ink group-hover:text-slate-is">
                    {post.title}
                  </h3>
                  <p className="font-light leading-relaxed mb-5 text-muted-light flex-grow">
                    {post.excerpt}
                  </p>
                  <span className="inline-block text-sm font-semibold pb-0.5 text-ink border-b border-accent transition-all group-hover:text-slate-is group-hover:border-slate-is self-start">
                    Leer artículo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
