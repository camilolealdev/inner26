import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useTranslation } from '../i18n/useTranslation';
import { homePages } from '../i18n/translations/homePages';
import LegalNavTabs, { LegalTabKey } from '../components/legal/LegalNavTabs';

const STUDIO_INFO = {
  nombreComercial: 'Inner Spirit Studio',
  razonSocial: 'Inner Spirit Studio S.A.S. (o titular responsable)',
  nit: 'NIT en trámite de registro mercantil — Bogotá D.C.',
  direccion: 'Transversal 1 # 17-29, La Candelaria, Bogotá D.C., Colombia',
  correoGeneral: 'hola@innerspirit.net',
  correoLegal: 'privacidad@innerspirit.net',
  whatsapp: '+57 321 224 8261',
  ultimaActualizacion: '17 de septiembre de 2026',
} as const;

const Section: React.FC<{ id?: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section id={id} className="mt-12 first:mt-0 scroll-mt-24">
    <h2 className="font-heading text-2xl md:text-3xl leading-tight mb-4" style={{ color: '#2D4A4D' }}>
      {title}
    </h2>
    <div className="is-copy space-y-4">{children}</div>
  </section>
);

const HighlightBox: React.FC<{ title?: string; children: React.ReactNode; type?: 'info' | 'warning' }> = ({
  title,
  children,
  type = 'info',
}) => {
  const isWarning = type === 'warning';
  return (
    <div
      className="p-5 my-5 rounded-sm border"
      style={{
        background: isWarning ? 'rgba(201, 173, 161, 0.15)' : 'rgba(139, 154, 139, 0.12)',
        borderColor: isWarning ? 'rgba(201, 173, 161, 0.45)' : 'rgba(139, 154, 139, 0.35)',
      }}
    >
      {title && (
        <h4
          className="font-heading font-semibold text-base mb-2 flex items-center gap-2"
          style={{ color: isWarning ? '#8C4334' : '#2D4A4D' }}
        >
          <span>{isWarning ? '⚠️' : '🌿'}</span>
          <span>{title}</span>
        </h4>
      )}
      <div className="text-sm space-y-2" style={{ color: '#2A332B' }}>
        {children}
      </div>
    </div>
  );
};

const TermsPage: React.FC = () => {
  const { navigate, language } = useNavigation();
  const { t } = useTranslation(homePages);
  const [currentTab, setCurrentTab] = useState<LegalTabKey>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('cookies')) return 'cookies';
      if (path.includes('devoluciones')) return 'devoluciones';
    }
    return 'terminos';
  });

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Términos y Condiciones de Uso y Servicio — Inner Spirit Studio',
      url: 'https://innerspirit.net/terminos',
      inLanguage: 'es-CO',
      isPartOf: { '@type': 'WebSite', name: 'Inner Spirit Studio', url: 'https://innerspirit.net' },
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  if (language !== 'es') {
    return (
      <div className="is-page-section is-section--paper">
        <div className="is-shell">
          <div className="max-w-3xl mx-auto text-center">
            <span className="is-eyebrow justify-center">{t('terms.eyebrow') as string}</span>
            <h1 className="is-page-heading mt-5">{t('terms.title') as string}</h1>
            <p className="is-page-lead mt-6">{t('terms.notice') as string}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={`mailto:${STUDIO_INFO.correoGeneral}`} className="is-action is-action--ghost">
                {t('terms.emailCta') as string}
              </a>
              <a
                href="/contacto"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('contacto');
                }}
                className="is-action"
              >
                {t('terms.contactCta') as string}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="is-page-section is-section--paper">
      <div className="is-shell">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8 text-center md:text-left">
            <span className="is-eyebrow">Marco Legal y de Convivencia</span>
            <h1 className="is-page-heading mt-4">
              {currentTab === 'terminos' && 'Términos y Condiciones de Uso y Servicio'}
              {currentTab === 'cookies' && 'Política de Cookies y Tecnologías de Rastreo'}
              {currentTab === 'devoluciones' && 'Política de Envíos, Retracto y Devoluciones'}
            </h1>
            <p className="is-page-lead mt-4">
              {currentTab === 'terminos' &&
                'Bienvenido a Inner Spirit Studio. Este documento define las condiciones generales que rigen tu participación en nuestras clases, eventos, consultas individuales, alquiler del espacio patrimonial y compras en nuestra tienda de objetos conscientes.'}
              {currentTab === 'cookies' &&
                'Explicación transparente sobre el uso de cookies en innerspirit.net, cómo optimizan tu experiencia de navegación y cómo gestionarlas o desactivarlas en cualquier momento.'}
              {currentTab === 'devoluciones' &&
                'Transparencia total en tus pedidos de tienda, tiempos de entrega en Bogotá y resto de Colombia, y ejercicio del derecho de retracto bajo el Estatuto del Consumidor (Ley 1480 de 2011).'}
            </p>
            <p className="text-xs uppercase tracking-wider mt-4" style={{ color: '#798478' }}>
              Última actualización: {STUDIO_INFO.ultimaActualizacion} · Sede Principal: Bogotá, Colombia
            </p>
          </header>

          {/* Navigation Tabs */}
          <LegalNavTabs activeTab={currentTab} onTabChange={(tab) => setCurrentTab(tab)} />

          <div className="is-luxury-rule mb-12" />

          {/* ========================================================================= */}
          {/* TAB 1: TÉRMINOS Y CONDICIONES GENERALES */}
          {/* ========================================================================= */}
          {currentTab === 'terminos' && (
            <div className="space-y-12">
              <Section title="1. Identificación del Estudio y Ámbito de Aplicación">
                <p>
                  Los presentes Términos y Condiciones regulan la relación entre los usuarios, practicantes y clientes
                  (en adelante, el «Usuario» o «Practicante») y{' '}
                  <strong style={{ color: '#2D4A4D' }}>{STUDIO_INFO.nombreComercial}</strong>, con sede física en{' '}
                  {STUDIO_INFO.direccion}, canal oficial de contacto{' '}
                  <a className="underline" style={{ color: '#4D6A6D' }} href={`mailto:${STUDIO_INFO.correoGeneral}`}>
                    {STUDIO_INFO.correoGeneral}
                  </a>{' '}
                  y línea de atención WhatsApp{' '}
                  <a
                    className="underline"
                    style={{ color: '#4D6A6D' }}
                    href="https://wa.me/573212248261"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {STUDIO_INFO.whatsapp}
                  </a>
                  .
                </p>
                <p>
                  El acceso a este sitio web, la adquisición de membresías o tiqueteras, la reserva de clases o eventos,
                  el alquiler de instalaciones y la compra de objetos en la tienda virtual implican la aceptación
                  irrestricta de estos Términos. Si no estás de acuerdo con alguna disposición, te solicitamos abstenerte
                  de utilizar nuestros servicios.
                </p>
              </Section>

              <Section title="2. Naturaleza de los Servicios Ofrecidos">
                <p>Inner Spirit Studio ofrece experiencias y servicios orientados al bienestar integral y la cultura consciente:</p>
                <ul className="space-y-2 pl-2">
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Clases regulares de yoga y movimiento:</strong> Vinyasa Flow, Hatha Yoga,
                    Yin Yoga, Rocket Yoga, Yoga Restaurativo, Meditación Guiada y Sound Healing.
                  </li>
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Eventos y ceremonias vivenciales:</strong> Círculos de Luna Nueva y Llena,
                    sesiones de Inner Dance / danza somática libre, baños sonoros con cuencos tibetanos y gongs, y ceremonias de cacao.
                  </li>
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Excursiones conscientes y retiros de naturaleza:</strong> Caminatas meditativas
                    y jornadas de inmersión en Monserrate, la Laguna Sagrada de Guatavita y la Cascada La Chorrera.
                  </li>
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Consultorio holístico y sesiones individuales (1:1):</strong> Acompañamiento
                    personalizado en sonoterapia, meditación, breathwork y terapia de movimiento.
                  </li>
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Alquiler del Espacio Patrimonial:</strong> Disponibilidad de la sala para
                    workshops, conferencias conscientes, filmaciones y retiros urbanos compatibles con el espíritu de serenidad del lugar.
                  </li>
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Tienda de Objetos Conscientes:</strong> Venta presencial y virtual de cristales
                    de cuarzo, inciensos naturales, aceites esenciales puros, velas botánicas de soja, diarios de gratitud y cuencos tibetanos 7 metales.
                  </li>
                </ul>
              </Section>

              <Section title="3. Salud, Aptitud Física y Responsabilidad Personal del Practicante">
                <HighlightBox title="Consentimiento Informado y Enfoque de Bienestar" type="warning">
                  <p>
                    Las prácticas de yoga, breathwork (respiración consciente), sonoterapia y danza libre promovidas por
                    Inner Spirit Studio tienen como propósito exclusivo el bienestar personal, el autoconocimiento y la
                    relajación.
                  </p>
                  <p>
                    <strong>No constituyen tratamiento médico, psiquiátrico ni fisioterapéutico</strong>, ni reemplazan la consulta
                    o prescripción de un profesional de la salud debidamente cualificado.
                  </p>
                </HighlightBox>
                <p>Al reservar y participar en cualquiera de nuestras sesiones, declaras y aceptas que:</p>
                <ul className="space-y-2 pl-2">
                  <li>
                    Te encuentras en condiciones físicas y mentales idóneas para participar en actividades que involucran
                    movimiento corporal, posturas de flexibilidad, fuerza y ejercicios de respiración.
                  </li>
                  <li>
                    Es tu deber informar al facilitador o instructor, de manera previa al inicio de cada clase, cualquier
                    condición relevante: cirugías recientes, lesiones articulares o de columna, hipertensión, afecciones
                    cardíacas, epilepsia, embarazo o cualquier otra circunstancia médica preexistente.
                  </li>
                  <li>
                    En prácticas de respiración intensa (Breathwork) y movimiento libre (Inner Dance o Static Dance), te comprometes
                    a respetar tus propios límites biológicos y detenerte o solicitar apoyo si experimentas mareo,
                    hiperventilación, fatiga o dolor agudo.
                  </li>
                  <li>
                    Participas de forma voluntaria y consciente, asumiendo la responsabilidad de tus decisiones motrices
                    durante la práctica.
                  </li>
                </ul>
              </Section>

              <Section title="4. Convivencia, Puntualidad y Cierre de Puertas en el Santuario">
                <p>
                  Para preservar la atmósfera de silencio, introspección y respeto que caracteriza a nuestra casa patrimonial
                  en La Candelaria, se aplican las siguientes pautas de convivencia:
                </p>
                <ul className="space-y-2 pl-2">
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Puntualidad rigurosa:</strong> Te sugerimos llegar entre 10 y 15 minutos
                    antes del horario programado para registrarte, cambiarte y tomar tu lugar con serenidad.
                  </li>
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Cierre de puertas:</strong> Por respeto al estado meditativo y la
                    concentración del grupo, las puertas de la sala se cierran puntualmente a la hora fijada. Una vez iniciada
                    la clase o ceremonia, <strong>no se permitirá el ingreso bajo ninguna circunstancia</strong>.
                  </li>
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Desconexión digital y calzado:</strong> El ingreso a la sala de práctica se
                    realiza sin zapatos (descalzo o con medias limpias). Los teléfonos móviles deben apagarse o colocarse en
                    modo silencio absoluto (sin vibración) en el área de casilleros.
                  </li>
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Espacio libre de sustancias:</strong> Inner Spirit es un santuario 100% libre
                    de humo, tabaco, cigarrillos electrónicos, alcohol y sustancias psicoactivas. Cualquier persona bajo el influjo
                    de sustancias será invitada a retirarse de inmediato sin derecho a reembolso.
                  </li>
                </ul>
              </Section>

              <Section title="5. Reservas, Cancelaciones y Política de No-Show (Clases y Eventos)">
                <p>
                  Dado que nuestras clases y eventos cuentan con aforo limitado para garantizar una atención íntima y segura,
                  se rigen por las siguientes condiciones:
                </p>
                <ul className="space-y-3 pl-2">
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Clases regulares (sueltas o tiqueteras):</strong> Las reservas pueden cancelarse
                    o reprogramarse sin penalidad hasta con <strong>12 horas de anticipación</strong> a la hora de inicio. En caso de
                    cancelación tardía (menos de 12 horas) o inasistencia («no-show»), la clase se considerará consumida y no será
                    reembolsable ni transferible.
                  </li>
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Eventos especiales, retiros y talleres (cupos fijos):</strong> Debido a los
                    costos de preparación, materiales y facilitadores invitados, las reservas en eventos especiales (como ceremonias
                    de luna o sesiones de Inner Dance) admiten cancelación con reembolso o crédito interno hasta con <strong>48 horas de anticipación</strong>.
                    Pasado dicho término, el valor abonado no es reembolsable; sin embargo, el titular podrá ceder su cupo a otra persona
                    notificando el nombre y contacto del reemplazo por WhatsApp o correo antes del evento.
                  </li>
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Cancelaciones por parte del Estudio:</strong> Si por motivos de fuerza mayor,
                    salud del instructor o caso fortuito Inner Spirit debe reprogramar o suspender una clase o evento, se notificará de
                    inmediato al Practicante ofreciendo la opción de reprogramar sin costo o recibir la devolución íntegra del importe pagado.
                  </li>
                </ul>
              </Section>

              <Section title="6. Excursiones Conscientes al Aire Libre (Monserrate, Guatavita, La Chorrera)">
                <p>
                  Nuestras jornadas de senderismo y turismo de bienestar en el páramo y bosque de niebla colombiano conllevan
                  dinámicas específicas:
                </p>
                <ul className="space-y-2 pl-2">
                  <li>
                    El Practicante debe vestir ropa y calzado de senderismo adecuado para senderos húmedos o de montaña, y portar hidratación
                    y protección solar / para lluvia según las indicaciones provistas en la ficha de cada actividad.
                  </li>
                  <li>
                    Las actividades al aire libre dependen de condiciones meteorológicas seguras. En caso de alertas ambientales o
                    lluvias torrenciales que comprometan la seguridad de los senderistas, Inner Spirit se reserva el derecho de ajustar la ruta
                    o reprogramar la fecha de la excursión protegiendo siempre la integridad del grupo.
                  </li>
                </ul>
              </Section>

              <Section title="7. Tienda Online, Precios y Medios de Pago">
                <p>
                  Todos los precios publicados en la tienda virtual están expresados en <strong>Pesos Colombianos (COP)</strong> e incluyen
                  los gravámenes aplicables de conformidad con la ley colombiana.
                </p>
                <p>
                  Las transacciones electrónicas se procesan a través de pasarelas de pago certificadas con cifrado bancario de alta seguridad:
                </p>
                <ul className="space-y-1 pl-2">
                  <li><strong style={{ color: '#5C6B5C' }}>Mercado Pago Colombia:</strong> Tarjetas de crédito, débito PSE y pagos en efectivo.</li>
                  <li><strong style={{ color: '#5C6B5C' }}>Wompi (Bancolombia):</strong> Cuentas Bancolombia, Botón Bancolombia, PSE, Nequi y tarjetas de crédito.</li>
                </ul>
                <p>
                  Inner Spirit Studio <strong>no almacena ni tiene acceso directo a números de tarjeta de crédito, claves ni datos financieros sensibles</strong>.
                  La confirmación de la orden queda sujeta a la aprobación efectiva por parte de la pasarela y la entidad bancaria emisora.
                </p>
              </Section>

              <Section title="8. Envíos, Derecho de Retracto y Garantías (Estatuto del Consumidor)">
                <HighlightBox title="Derecho de Retracto Legal — Ley 1480 de 2011 (Art. 47)">
                  <p>
                    Para compras realizadas a través de nuestra tienda electrónica de objetos físicos, el consumidor tiene derecho a retractarse
                    dentro de los <strong>cinco (5) días hábiles siguientes a la entrega del producto</strong>.
                  </p>
                  <p>
                    El producto debe devolverse en las mismas condiciones en que fue recibido: sin uso, con etiquetas, precintos y empaques
                    originales íntegros. Los costos de transporte para la devolución serán asumidos por el comprador según lo estipulado en la ley.
                  </p>
                </HighlightBox>
                <p>
                  Para detalles pormenorizados sobre envíos en Bogotá, despachos nacionales y trámites de reposición por avería, consulta la pestaña de{' '}
                  <button
                    type="button"
                    onClick={() => setCurrentTab('devoluciones')}
                    className="underline font-semibold cursor-pointer"
                    style={{ color: '#4D6A6D' }}
                  >
                    Envíos y Devoluciones
                  </button>
                  .
                </p>
              </Section>

              <Section title="9. Alquiler del Espacio Patrimonial (The Space)">
                <p>
                  La casa patrimonial de Inner Spirit en La Candelaria está disponible para eventos conscientes, formaciones y filmaciones bajo las siguientes pautas:
                </p>
                <ul className="space-y-2 pl-2">
                  <li>
                    La reserva se perfecciona con el anticipo del 50% del valor pactado y la liquidación del saldo restante antes del inicio de la jornada.
                  </li>
                  <li>
                    Se exige un depósito de garantía reembolsable destinado a cubrir eventuales daños en la arquitectura de madera, muros patrimoniales,
                    sistemas de iluminación o equipos de sonido profesional.
                  </li>
                  <li>
                    El organizador se compromete a mantener el nivel sonoro dentro de los decibeles permitidos por la normativa ambiental de Bogotá y a entregar el
                    espacio en idénticas condiciones de limpieza y orden a las recibidas.
                  </li>
                </ul>
              </Section>

              <Section title="10. Bases Oficiales de la Rifa del Cuenco Tibetano Artesanal">
                <p>
                  Inner Spirit Studio organiza periódicamente dinámicas y sorteos conscientes orientados a su comunidad. Los términos de la rifa activa del Cuenco Tibetano son:
                </p>
                <ul className="space-y-2 pl-2">
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Participación gratuita:</strong> No requiere compra previa. Pueden inscribirse personas mayores de 18 años residentes en Colombia a través del formulario oficial en el sitio web o en la recepción del estudio.
                  </li>
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Premio:</strong> Un (1) Cuenco Tibetano Artesanal de 7 Metales, martillado a mano, con su baqueta de madera forrada en gamuza y cojín bordado tradicional.
                  </li>
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Notificación y Entrega:</strong> El sorteo se realizará de manera transparente y se notificará al ganador registrado mediante llamada/WhatsApp y correo electrónico, además de su anuncio en nuestro canal oficial de Instagram (@innerspirit_studio). Si el ganador no responde dentro de los diez (10) días hábiles siguientes, se sorteará un suplente.
                  </li>
                  <li>
                    El premio no es redimible por dinero en efectivo ni transferible a cuentas de terceros.
                  </li>
                </ul>
              </Section>

              <Section title="11. Propiedad Intelectual y Derechos de Autor">
                <p>
                  Todos los contenidos albergados en este portal web (incluyendo, a título enunciativo, textos editoriales, marcas comerciales, logotipos,
                  fotografías del santuario, archivos de audio sonoro, iconografía, diseños de interfaces y código fuente) son propiedad exclusiva de
                  Inner Spirit Studio o se encuentran bajo licencia legal de sus autores.
                </p>
                <p>
                  Queda expresamente prohibida la copia, reproducción, distribución, comunicación pública o transformación comercial de estos elementos sin la
                  autorización previa, expresa y por escrito de la dirección de Inner Spirit Studio.
                </p>
              </Section>

              <Section title="12. Ley Aplicable, Jurisdicción y Resolución de Controversias">
                <p>
                  Estos Términos y Condiciones se rigen e interpretan con arreglo a las leyes de la República de Colombia, en especial el Código de Comercio,
                  el Estatuto del Consumidor (Ley 1480 de 2011) y la Ley de Comercio Electrónico (Ley 527 de 1999).
                </p>
                <p>
                  Cualquier diferencia o reclamo derivado del uso de los servicios será sometido en primera instancia a una etapa de arreglo directo amistoso
                  entre las partes. En caso de no alcanzarse un acuerdo en un término de quince (15) días hábiles, las partes acudirán a los centros de conciliación
                  autorizados en la ciudad de Bogotá D.C., Colombia.
                </p>
              </Section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: POLÍTICA DE COOKIES */}
          {/* ========================================================================= */}
          {currentTab === 'cookies' && (
            <div className="space-y-12">
              <Section title="1. ¿Qué son las Cookies y por qué las usamos?">
                <p>
                  Una cookie es un pequeño archivo de texto que un sitio web almacena en tu navegador o dispositivo cuando lo visitas. Permiten que el portal
                  recuerde información sobre tu sesión, como tus preferencias de navegación o los artículos de tu carrito de compras, haciendo que tu
                  experiencia sea fluida, segura y personalizada.
                </p>
                <p>
                  En Inner Spirit Studio creemos en la calma digital: <strong>no comercializamos tu historial de navegación ni utilizamos cookies invasivas de perfilamiento masivo</strong>.
                </p>
              </Section>

              <Section title="2. Tipos de Cookies utilizadas en Inner Spirit">
                <div className="space-y-6">
                  <div className="p-4 rounded-sm border" style={{ borderColor: 'rgba(121, 132, 120, 0.25)', background: '#FAF7F2' }}>
                    <h3 className="font-heading font-semibold text-lg" style={{ color: '#2D4A4D' }}>
                      🟢 1. Cookies Técnicas y Estrictamente Necesarias
                    </h3>
                    <p className="text-sm mt-2" style={{ color: '#4D5A4D' }}>
                      Son esenciales para el funcionamiento básico del portal. Sin ellas, no podrías navegar entre páginas ni mantener tu sesión activa.
                    </p>
                    <ul className="text-xs mt-3 space-y-1 pl-4 list-disc text-stone-600">
                      <li><strong>inner_spirit_location:</strong> Recuerda la sede elegida (Bogotá, Portugal o Chicago).</li>
                      <li><strong>inner_spirit_language:</strong> Recuerda tu idioma preferido (español, portugués o inglés).</li>
                      <li><strong>inner_cart_items:</strong> Mantiene los productos y clases seleccionados en tu carrito de compras mientras navegas.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-sm border" style={{ borderColor: 'rgba(121, 132, 120, 0.25)', background: '#FAF7F2' }}>
                    <h3 className="font-heading font-semibold text-lg" style={{ color: '#2D4A4D' }}>
                      🔵 2. Cookies de Seguridad y Pasarelas de Pago
                    </h3>
                    <p className="text-sm mt-2" style={{ color: '#4D5A4D' }}>
                      Generadas por nuestros procesadores de pago seguros (Mercado Pago y Wompi de Bancolombia) durante el proceso de compra. Permiten validar la autenticidad de la transacción y prevenir intentos de fraude electrónico.
                    </p>
                  </div>

                  <div className="p-4 rounded-sm border" style={{ borderColor: 'rgba(121, 132, 120, 0.25)', background: '#FAF7F2' }}>
                    <h3 className="font-heading font-semibold text-lg" style={{ color: '#2D4A4D' }}>
                      🟡 3. Cookies de Rendimiento y Analítica Agregada
                    </h3>
                    <p className="text-sm mt-2" style={{ color: '#4D5A4D' }}>
                      Nos permiten conocer de forma anónima el número de visitantes, las secciones más leídas del blog y los tiempos de carga del servidor, con el único objetivo de mejorar la estabilidad y rapidez técnica del portal.
                    </p>
                  </div>
                </div>
              </Section>

              <Section title="3. Cómo Desactivar o Gestionar las Cookies en tu Navegador">
                <p>
                  Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones de tu navegador web habitual:
                </p>
                <ul className="space-y-2 pl-2 text-sm">
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.
                  </li>
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Apple Safari:</strong> Preferencias &gt; Privacidad &gt; Bloquear todas las cookies.
                  </li>
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Mozilla Firefox:</strong> Opciones &gt; Privacidad &amp; Seguridad &gt; Cookies y datos del sitio.
                  </li>
                  <li>
                    <strong style={{ color: '#5C6B5C' }}>Microsoft Edge:</strong> Configuración &gt; Permisos del sitio &gt; Cookies y datos del sitio.
                  </li>
                </ul>
                <p className="text-xs italic" style={{ color: '#798478' }}>
                  Nota: Si decides deshabilitar las cookies técnicas necesarias, es posible que funciones como el carrito de compras o la selección de sede no se comporten como esperas.
                </p>
              </Section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: POLÍTICA DE ENVÍOS Y DEVOLUCIONES */}
          {/* ========================================================================= */}
          {currentTab === 'devoluciones' && (
            <div className="space-y-12">
              <Section title="1. Modalidades de Entrega y Despacho en Tienda">
                <p>Para los objetos conscientes adquiridos en nuestra tienda física o virtual, ofrecemos dos alternativas:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-sm border" style={{ borderColor: 'rgba(121, 132, 120, 0.25)', background: '#FAF7F2' }}>
                    <h3 className="font-heading font-semibold text-lg" style={{ color: '#2D4A4D' }}>
                      🏠 Retiro Gratuito en el Estudio
                    </h3>
                    <p className="text-sm mt-2 text-stone-600">
                      Puedes recoger tu pedido sin ningún costo adicional en nuestra sede de La Candelaria (Transversal 1 # 17-29, Bogotá) en horarios de atención habituales (Lunes a Viernes 6:30 AM a 9:00 PM; Sábados y Domingos 8:00 AM a 9:00 PM). Te notificaremos por WhatsApp cuando tu paquete esté preparado con mimo.
                    </p>
                  </div>
                  <div className="p-4 rounded-sm border" style={{ borderColor: 'rgba(121, 132, 120, 0.25)', background: '#FAF7F2' }}>
                    <h3 className="font-heading font-semibold text-lg" style={{ color: '#2D4A4D' }}>
                      🚚 Envío a Domicilio (Bogotá y Colombia)
                    </h3>
                    <p className="text-sm mt-2 text-stone-600">
                      Despachamos mediante transportadoras aliadas certificadas (Coordinadora, Servientrega o mensajería local ecológica en Bogotá).
                    </p>
                    <ul className="text-xs mt-2 space-y-1 text-stone-600 list-disc pl-4">
                      <li><strong>Bogotá urbana:</strong> 2 a 4 días hábiles.</li>
                      <li><strong>Ciudades principales (Medellín, Cali, etc.):</strong> 3 a 6 días hábiles.</li>
                      <li><strong>Resto del país y trayectos especiales:</strong> 5 a 9 días hábiles.</li>
                    </ul>
                  </div>
                </div>
              </Section>

              <Section title="2. Ejercicio del Derecho de Retracto (Ley 1480 de 2011)">
                <HighlightBox title="Procedimiento de Retracto en 3 Pasos Simples">
                  <p>
                    De acuerdo con el artículo 47 del Estatuto del Consumidor en Colombia, si adquiriste un producto físico a través de nuestro sitio web y deseas retractarte de la compra:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 mt-2">
                    <li>
                      <strong>Notificación:</strong> Escríbenos dentro de los <strong>cinco (5) días hábiles</strong> siguientes a la fecha en que recibiste el paquete a{' '}
                      <a className="underline" href="mailto:hola@innerspirit.net">hola@innerspirit.net</a> o a nuestro WhatsApp (+57 321 224 8261), adjuntando tu número de orden y factura o comprobante de pago.
                    </li>
                    <li>
                      <strong>Estado del producto:</strong> El artículo debe encontrarse sin señales de uso, con sus sellos de seguridad intactos, accesorios completos y empaque original en perfecto estado.
                    </li>
                    <li>
                      <strong>Retorno y Reembolso:</strong> Deberás enviar el producto a nuestra sede en Bogotá asumiendo el costo del flete. Una vez verificado el perfecto estado de la mercancía, Inner Spirit Studio gestionará la devolución de la totalidad del dinero pagado por el producto en un plazo máximo de treinta (30) días calendario.
                    </li>
                  </ol>
                </HighlightBox>
              </Section>

              <Section title="3. Garantía Legal y Mercancía Averiada en Tránsito">
                <p>
                  Todos nuestros objetos conscientes (cuencos tibetanos, cristales, velas y accesorios) son inspeccionados minuciosamente y empacados con material protector biodegradable antes de salir del santuario.
                </p>
                <p>
                  Si al momento de recibir el envío notas que el paquete presenta rupturas, humedad o golpes evidentes provocados por la transportadora, o si un objeto presenta un defecto de fabricación evidente:
                </p>
                <ul className="space-y-2 pl-2 text-sm">
                  <li>
                    Toma fotografías y/o video claro del empaque exterior y del artículo afectado dentro de las <strong>primeras 48 horas</strong> de recibido el envío.
                  </li>
                  <li>
                    Envía el registro a <a className="underline font-semibold" style={{ color: '#4D6A6D' }} href="mailto:hola@innerspirit.net">hola@innerspirit.net</a> o al WhatsApp oficial.
                  </li>
                  <li>
                    Coordinaremos la reposición inmediata de la pieza sin ningún costo para ti, o el reembolso inmediato en caso de agotarse el stock disponible.
                  </li>
                </ul>
              </Section>
            </div>
          )}

          {/* Footer Contact CTA */}
          <div className="mt-16 pt-10 border-t" style={{ borderColor: 'rgba(77,106,109,0.16)' }}>
            <p className="is-copy mb-6">
              ¿Tienes alguna duda sobre nuestras políticas o necesitas asistencia personalizada con tu reserva o pedido?
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`mailto:${STUDIO_INFO.correoGeneral}`} className="is-action is-action--ghost">
                Escribir un correo
              </a>
              <a
                href="/contacto"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('contacto');
                }}
                className="is-action"
              >
                Ir a Contacto
              </a>
              <button
                type="button"
                onClick={() => navigate('privacidad')}
                className="text-xs uppercase tracking-wider underline hover:text-stone-900 transition-colors ml-auto self-center"
                style={{ color: '#5C6B5C' }}
              >
                Ver Política de Privacidad &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
