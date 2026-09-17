import React, { useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useTranslation } from '../i18n/useTranslation';
import { homePages } from '../i18n/translations/homePages';
import LegalNavTabs, { LegalTabKey } from '../components/legal/LegalNavTabs';

/**
 * Política de Tratamiento de Datos Personales — Ley 1581 de 2012 y Decreto 1377 de 2013 (Colombia).
 * Alineada con estándares internacionales de privacidad (RGPD / GDPR para la sede en Portugal y visitantes de la UE).
 */

const RESPONSABLE = {
  razonSocial: 'Inner Spirit Studio S.A.S. (o persona natural titular del santuario)',
  nombreComercial: 'Inner Spirit Studio',
  nit: 'NIT en trámite de registro mercantil ante Cámara de Comercio de Bogotá',
  domicilio: 'Transversal 1 # 17-29, La Candelaria, Bogotá D.C., Colombia',
  correoHabeasData: 'privacidad@innerspirit.net',
  correoContacto: 'hola@innerspirit.net',
  telefono: '+57 321 224 8261',
  ultimaActualizacion: '17 de septiembre de 2026',
} as const;

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mt-12 first:mt-0">
    <h2 className="font-heading text-2xl md:text-3xl leading-tight mb-4" style={{ color: '#2D4A4D' }}>
      {title}
    </h2>
    <div className="is-copy space-y-4">{children}</div>
  </section>
);

const HighlightBox: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
  <div
    className="p-5 my-5 rounded-sm border"
    style={{
      background: 'rgba(139, 154, 139, 0.12)',
      borderColor: 'rgba(139, 154, 139, 0.35)',
    }}
  >
    {title && (
      <h4 className="font-heading font-semibold text-base mb-2 flex items-center gap-2" style={{ color: '#2D4A4D' }}>
        <span>🔒</span>
        <span>{title}</span>
      </h4>
    )}
    <div className="text-sm space-y-2" style={{ color: '#2A332B' }}>
      {children}
    </div>
  </div>
);

const PrivacyPage: React.FC = () => {
  const { navigate, language } = useNavigation();
  const { t } = useTranslation(homePages);

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Política de Tratamiento de Datos Personales — Inner Spirit Studio',
      url: 'https://innerspirit.net/privacidad',
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

  const handleTabChange = (tab: LegalTabKey) => {
    if (tab === 'terminos' || tab === 'cookies' || tab === 'devoluciones') {
      navigate('terminos');
    }
  };

  if (language !== 'es') {
    return (
      <div className="is-page-section is-section--paper">
        <div className="is-shell">
          <div className="max-w-3xl mx-auto text-center">
            <span className="is-eyebrow justify-center">{t('privacy.eyebrow') as string}</span>
            <h1 className="is-page-heading mt-5">{t('privacy.title') as string}</h1>
            <p className="is-page-lead mt-6">{t('privacy.notice') as string}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={`mailto:${RESPONSABLE.correoContacto}`} className="is-action is-action--ghost">
                {t('privacy.emailCta') as string}
              </a>
              <a
                href="/contacto"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('contacto');
                }}
                className="is-action"
              >
                {t('privacy.contactCta') as string}
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
            <span className="is-eyebrow">Protección de Datos &amp; Habeas Data</span>
            <h1 className="is-page-heading mt-4">Política de Tratamiento de Datos Personales</h1>
            <p className="is-page-lead mt-4">
              En Inner Spirit Studio honramos la privacidad y la confianza de nuestra comunidad con la misma delicadeza
              con la que cuidamos nuestro espacio físico. Este documento describe cómo recolectamos, protegemos y
              gestionamos tu información personal bajo la Ley 1581 de 2012 y estándares internacionales de privacidad.
            </p>
            <p className="text-xs uppercase tracking-wider mt-4" style={{ color: '#798478' }}>
              Última actualización: {RESPONSABLE.ultimaActualizacion} · Sede Principal: Bogotá, Colombia
            </p>
          </header>

          {/* Navigation Tabs */}
          <LegalNavTabs activeTab="privacidad" onTabChange={handleTabChange} />

          <div className="is-luxury-rule mb-12" />

          <Section title="1. Responsable del Tratamiento de Datos">
            <p>
              El responsable directo del tratamiento y custodia de tus datos personales es{' '}
              <strong style={{ color: '#2D4A4D' }}>{RESPONSABLE.nombreComercial}</strong>{' '}
              (en adelante, «Inner Spirit Studio»), con domicilio principal en {RESPONSABLE.domicilio}.
            </p>
            <ul className="space-y-1 pl-1 text-sm">
              <li>
                Canal exclusivo de Habeas Data:{' '}
                <a className="underline font-semibold" style={{ color: '#4D6A6D' }} href={`mailto:${RESPONSABLE.correoHabeasData}`}>
                  {RESPONSABLE.correoHabeasData}
                </a>
              </li>
              <li>
                Correo de contacto general:{' '}
                <a className="underline" style={{ color: '#4D6A6D' }} href={`mailto:${RESPONSABLE.correoContacto}`}>
                  {RESPONSABLE.correoContacto}
                </a>
              </li>
              <li>
                Atención WhatsApp:{' '}
                <a className="underline" style={{ color: '#4D6A6D' }} href="https://wa.me/573212248261" target="_blank" rel="noopener noreferrer">
                  {RESPONSABLE.telefono}
                </a>
              </li>
            </ul>
          </Section>

          <Section title="2. Datos que Recolectamos">
            <p>De acuerdo con la forma en que interactúas con nuestro santuario, podemos recopilar:</p>
            <ul className="space-y-2 pl-2">
              <li>
                <strong style={{ color: '#5C6B5C' }}>Datos de contacto e identidad básica:</strong> Nombre completo, correo electrónico,
                número de teléfono o WhatsApp y ciudad de residencia (al suscribirte al boletín «Cartas desde la Calma», enviar consultas,
                participar en la rifa del cuenco tibetano o inscribirte a clases y eventos).
              </li>
              <li>
                <strong style={{ color: '#5C6B5C' }}>Datos de facturación y despacho de tienda:</strong> Dirección física de entrega,
                documento de identificación e historial de compras. Los datos de pago (tarjetas bancarias o cuentas) son administrados
                directamente por pasarelas certificadas (Wompi y Mercado Pago); Inner Spirit nunca almacena ni tiene acceso a números de tarjetas ni claves.
              </li>
              <li>
                <strong style={{ color: '#5C6B5C' }}>Datos de bienestar y práctica (opcionales y confidenciales):</strong> En sesiones individuales de consultorio
                o talleres vivenciales, puedes compartir de manera voluntaria antecedentes de lesiones o intenciones de práctica para adaptar los ejercicios a tus necesidades.
              </li>
              <li>
                <strong style={{ color: '#5C6B5C' }}>Datos técnicos y de navegación:</strong> Dirección IP anonimizada, tipo de navegador, sistema operativo
                y preferencias de navegación (sede seleccionada e idioma), mediante cookies estrictamente necesarias.
              </li>
            </ul>
          </Section>

          <Section title="3. Finalidades del Tratamiento">
            <p>Tus datos son tratados de manera lícita, leal y transparente para:</p>
            <ul className="space-y-1.5 pl-2">
              <li>Gestionar y confirmar tus reservas de clases de yoga, meditación, ceremonias y eventos especiales.</li>
              <li>Procesar el despacho y entrega de objetos conscientes adquiridos en nuestra tienda virtual.</li>
              <li>Responder oportunamente tus consultas, mensajes de WhatsApp y solicitudes de alquiler del espacio.</li>
              <li>
                Enviar nuestro boletín informativo «Cartas desde la Calma» con fechas de rituales, artículos del blog y contenidos de valor
                (únicamente si nos has dado tu autorización previa y con enlace para darte de baja en un solo clic).
              </li>
              <li>Gestionar de forma transparente la participación y notificación de ganadores en la rifa del cuenco tibetano.</li>
              <li>Cumplir con las obligaciones legales, contables y tributarias exigidas por las autoridades colombianas.</li>
            </ul>
            <HighlightBox title="Compromiso Ético de Confidencialidad">
              <p>
                En Inner Spirit Studio <strong>no vendemos, alquilamos ni comercializamos tus datos personales con ninguna agencia de publicidad masiva ni terceros no relacionados</strong>.
                Solo compartimos información estrictamente indispensable con aliados operativos esenciales (pasarelas de pago y empresas transportadoras de mensajería).
              </p>
            </HighlightBox>
          </Section>

          <Section title="4. Derechos que te Asisten como Titular (Habeas Data)">
            <p>Como titular de tus datos personales, de acuerdo con la Ley 1581 de 2012, tienes pleno derecho a:</p>
            <ul className="space-y-1.5 pl-2">
              <li><strong style={{ color: '#5C6B5C' }}>Conocer, actualizar y rectificar</strong> tus datos frente a datos inexactos, incompletos o fraccionados.</li>
              <li><strong style={{ color: '#5C6B5C' }}>Solicitar prueba</strong> de la autorización otorgada para el tratamiento.</li>
              <li><strong style={{ color: '#5C6B5C' }}>Ser informado</strong> previa solicitud sobre el uso que se ha dado a tus datos personales.</li>
              <li><strong style={{ color: '#5C6B5C' }}>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC) de Colombia si consideras vulnerado tu derecho.</li>
              <li><strong style={{ color: '#5C6B5C' }}>Revocar la autorización</strong> y/o solicitar la supresión de tus datos cuando en el tratamiento no se respeten los principios legales o cuando ya no sean requeridos para la finalidad pactada.</li>
              <li><strong style={{ color: '#5C6B5C' }}>Acceder de forma gratuita</strong> a los datos personales objeto de tratamiento.</li>
            </ul>
          </Section>

          <Section title="5. Procedimiento para Ejercer tus Derechos ARCO">
            <p>
              Puedes ejercer tus derechos enviando una comunicación escrita al correo electrónico{' '}
              <strong style={{ color: '#2D4A4D' }}>{RESPONSABLE.correoHabeasData}</strong> o a través de nuestra línea de WhatsApp oficial{' '}
              {RESPONSABLE.telefono}, indicando:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>Tu nombre completo y documento de identificación.</li>
              <li>Descripción clara de la solicitud (consulta, actualización, rectificación o eliminación de datos).</li>
              <li>Dirección de correo o número telefónico de contacto para remitir la respuesta formal.</li>
            </ol>
            <p className="mt-2 text-sm">
              Conforme a la legislación colombiana, las <strong>consultas</strong> serán atendidas en un plazo máximo de diez (10) días hábiles,
              y los <strong>reclamos</strong> o solicitudes de supresión/modificación en un plazo máximo de quince (15) días hábiles.
            </p>
          </Section>

          <Section title="6. Alcance Internacional y Comunidad en Portugal y Chicago">
            <p>
              Inner Spirit Studio cuenta con proyectos y comunidad activa en Portugal (Costa de Leiria / Nazaré) y actividades en Chicago (EE. UU.):
            </p>
            <ul className="space-y-2 pl-2 text-sm">
              <li>
                <strong style={{ color: '#5C6B5C' }}>Visitantes de la Unión Europea (RGPD / GDPR):</strong> Los datos de personas que se
                comunican o participan en el proyecto de voluntariado en Portugal son tratados con arreglo a los principios del Reglamento (UE)
                2016/679 de licitud, lealtad, limitación del plazo de conservación y minimización de datos.
              </li>
              <li>
                <strong style={{ color: '#5C6B5C' }}>Comunidad en Chicago:</strong> Los datos recopilados para las sesiones de Static Dance
                en Chicago se conservan bajo estrictos protocolos de confidencialidad y consentimiento voluntario.
              </li>
            </ul>
          </Section>

          <Section title="7. Seguridad de la Información y Vigencia">
            <p>
              Implementamos medidas administrativas, técnicas y tecnológicas para evitar la adulteración, pérdida, consulta, uso o acceso no autorizado
              a tus datos personales. La presente política rige a partir de su publicación y se mantendrá vigente mientras Inner Spirit Studio desarrolle
              sus actividades.
            </p>
          </Section>

          {/* Footer Contact CTA */}
          <div className="mt-16 pt-10 border-t" style={{ borderColor: 'rgba(77,106,109,0.16)' }}>
            <p className="is-copy mb-6">¿Tienes alguna pregunta sobre el tratamiento de tus datos personales? Escríbenos con toda tranquilidad.</p>
            <div className="flex flex-wrap gap-4">
              <a href={`mailto:${RESPONSABLE.correoHabeasData}`} className="is-action is-action--ghost">
                Escribir a Habeas Data
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
                onClick={() => navigate('terminos')}
                className="text-xs uppercase tracking-wider underline hover:text-stone-900 transition-colors ml-auto self-center"
                style={{ color: '#5C6B5C' }}
              >
                Ver Términos y Condiciones &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
