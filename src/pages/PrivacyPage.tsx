
import React, { useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';

/**
 * Política de Tratamiento de Datos Personales — Ley 1581 de 2012 y Decreto 1377 de 2013.
 *
 * ⚠️ PLACEHOLDERS LEGALES: los campos entre corchetes ([RAZÓN SOCIAL], [NIT],
 * [CORREO HABEAS DATA], [DIRECCIÓN LEGAL]) deben completarse con los datos reales
 * del Responsable del Tratamiento antes de publicar. El correo hola@innerspirit.co
 * se usa como canal provisional.
 */

// Datos del Responsable — COMPLETAR con la información jurídica real.
const RESPONSABLE = {
  razonSocial: '[RAZÓN SOCIAL]',
  nit: '[NIT]',
  domicilio: 'Transversal 1 # 17-29, La Candelaria, Bogotá, Colombia',
  correoHabeasData: '[CORREO HABEAS DATA]',
  correoContacto: 'hola@innerspirit.co',
  telefono: '+57 321 224 8261',
  ultimaActualizacion: '16 de junio de 2026',
} as const;

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mt-12 first:mt-0">
    <h2 className="font-heading text-2xl md:text-3xl leading-tight mb-4" style={{ color: '#2D4A4D' }}>
      {title}
    </h2>
    <div className="is-copy space-y-4">{children}</div>
  </section>
);

const PrivacyPage: React.FC = () => {
  const { navigate } = useNavigation();

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
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="is-page-section is-section--paper">
      <div className="is-shell">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <header className="mb-12">
            <span className="is-eyebrow">Legal</span>
            <h1 className="is-page-heading mt-5">Política de Tratamiento de Datos Personales</h1>
            <p className="is-page-lead mt-6">
              En cumplimiento de la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas
              concordantes sobre protección de datos personales (Habeas Data) en Colombia.
            </p>
            <p className="text-sm mt-4" style={{ color: '#798478' }}>
              Última actualización: {RESPONSABLE.ultimaActualizacion}
            </p>
          </header>

          <div className="is-luxury-rule mb-12" />

          <Section title="1. Responsable del Tratamiento">
            <p>
              El responsable del tratamiento de tus datos personales es{' '}
              <strong style={{ color: '#2D4A4D' }}>{RESPONSABLE.razonSocial}</strong>
              {' '}(en adelante, «Inner Spirit Studio»), identificada con NIT{' '}
              <strong style={{ color: '#2D4A4D' }}>{RESPONSABLE.nit}</strong>, con domicilio en{' '}
              {RESPONSABLE.domicilio}.
            </p>
            <ul className="space-y-1 pl-1">
              <li>Canal de Habeas Data: <strong style={{ color: '#2D4A4D' }}>{RESPONSABLE.correoHabeasData}</strong></li>
              <li>Correo de contacto: <a className="underline" style={{ color: '#4D6A6D' }} href={`mailto:${RESPONSABLE.correoContacto}`}>{RESPONSABLE.correoContacto}</a></li>
              <li>Teléfono / WhatsApp: <a className="underline" style={{ color: '#4D6A6D' }} href="https://wa.me/573212248261" target="_blank" rel="noopener noreferrer">{RESPONSABLE.telefono}</a></li>
            </ul>
          </Section>

          <Section title="2. Datos que recolectamos">
            <p>Según tu interacción con el sitio y nuestros servicios, podemos recolectar:</p>
            <ul className="space-y-2 pl-1">
              <li><strong style={{ color: '#5C6B5C' }}>Datos de identificación y contacto:</strong> nombre, correo electrónico y número de teléfono (al reservar clases, contactarnos o suscribirte al boletín).</li>
              <li><strong style={{ color: '#5C6B5C' }}>Datos de transacción:</strong> información necesaria para procesar compras y pagos en la tienda y eventos. Los datos de tu medio de pago son tratados directamente por las pasarelas de pago; Inner Spirit Studio no almacena números de tarjeta.</li>
              <li><strong style={{ color: '#5C6B5C' }}>Datos de navegación:</strong> información técnica y de uso (cookies, dirección IP, tipo de dispositivo) con fines de funcionamiento y analítica del sitio.</li>
            </ul>
            <p>No solicitamos datos sensibles. Si un servicio llegara a requerirlos, pediremos tu autorización expresa y previa.</p>
          </Section>

          <Section title="3. Finalidades del tratamiento">
            <p>Tus datos se tratan para las siguientes finalidades:</p>
            <ul className="space-y-1 pl-1">
              <li>Gestionar reservas de clases, sesiones de consultorio y participación en eventos.</li>
              <li>Procesar compras, pagos y entregas de la tienda.</li>
              <li>Responder solicitudes, dudas y peticiones de contacto.</li>
              <li>Enviar el boletín e información sobre clases, talleres y eventos, cuando lo autorices.</li>
              <li>Mejorar la experiencia, la seguridad y el funcionamiento del sitio.</li>
              <li>Cumplir obligaciones legales, contables y tributarias.</li>
            </ul>
          </Section>

          <Section title="4. Encargados y terceros">
            <p>
              Para operar, compartimos datos con proveedores que actúan como Encargados del
              tratamiento bajo nuestras instrucciones, entre ellos:
            </p>
            <ul className="space-y-1 pl-1">
              <li><strong style={{ color: '#5C6B5C' }}>Pasarelas de pago</strong> (p. ej. Wompi y Mercado Pago), para procesar transacciones de forma segura.</li>
              <li><strong style={{ color: '#5C6B5C' }}>Proveedores de correo y mensajería</strong>, para enviar confirmaciones y comunicaciones.</li>
              <li><strong style={{ color: '#5C6B5C' }}>Herramientas de analítica</strong>, para entender el uso del sitio.</li>
            </ul>
            <p>Cada proveedor trata los datos conforme a su propia política y a las finalidades aquí descritas.</p>
          </Section>

          <Section title="5. Derechos del Titular (Habeas Data)">
            <p>Como titular de tus datos personales tienes derecho a:</p>
            <ul className="space-y-1 pl-1">
              <li>Conocer, actualizar y rectificar tus datos.</li>
              <li>Solicitar prueba de la autorización otorgada.</li>
              <li>Ser informado sobre el uso que se da a tus datos.</li>
              <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
              <li>Revocar la autorización y/o solicitar la supresión de tus datos, cuando proceda.</li>
              <li>Acceder de forma gratuita a tus datos personales.</li>
            </ul>
          </Section>

          <Section title="6. Cómo ejercer tus derechos">
            <p>
              Puedes ejercer tus derechos enviando una solicitud al correo de Habeas Data{' '}
              <strong style={{ color: '#2D4A4D' }}>{RESPONSABLE.correoHabeasData}</strong> o por
              WhatsApp al {RESPONSABLE.telefono}, indicando tu nombre, el derecho que deseas ejercer
              y la descripción de tu solicitud. Atenderemos consultas en un máximo de diez (10) días
              hábiles y reclamos en un máximo de quince (15) días hábiles, según la ley.
            </p>
          </Section>

          <Section title="7. Autorización">
            <p>
              Al diligenciar nuestros formularios (reserva, contacto, boletín o compra) y aceptar
              esta política, otorgas tu autorización libre, previa, expresa e informada para el
              tratamiento de tus datos conforme a las finalidades aquí señaladas.
            </p>
          </Section>

          <Section title="8. Menores de edad">
            <p>
              El tratamiento de datos de niñas, niños y adolescentes solo se realiza con la
              autorización de sus representantes legales y atendiendo su interés superior. Nuestros
              servicios en línea están dirigidos a personas mayores de edad.
            </p>
          </Section>

          <Section title="9. Cookies">
            <p>
              Usamos cookies y tecnologías similares para el funcionamiento, la seguridad y la
              analítica del sitio. Puedes configurar tu navegador para limitarlas o eliminarlas;
              algunas funciones podrían verse afectadas.
            </p>
          </Section>

          <Section title="10. Seguridad y vigencia">
            <p>
              Adoptamos medidas técnicas y administrativas razonables para proteger tus datos contra
              acceso no autorizado, pérdida o alteración. Esta política rige a partir de su
              publicación y permanece vigente mientras Inner Spirit Studio preste sus servicios.
              Cualquier cambio sustancial se comunicará en este mismo sitio.
            </p>
          </Section>

          {/* Footer CTA */}
          <div className="mt-16 pt-10 border-t" style={{ borderColor: 'rgba(77,106,109,0.16)' }}>
            <p className="is-copy mb-6">¿Tienes preguntas sobre el tratamiento de tus datos? Escríbenos.</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${RESPONSABLE.correoContacto}`}
                className="is-action is-action--ghost"
              >
                Escribir un correo
              </a>
              <a
                href="/contacto"
                onClick={(e) => { e.preventDefault(); navigate('contacto'); }}
                className="is-action"
              >
                Ir a Contacto
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
