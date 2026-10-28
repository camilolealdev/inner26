import React from 'react';
import { Surface } from '../../ui';

const WHATSAPP_GREEN = '#25D366';

const WhatsAppCommunitySection: React.FC = () => {
  return (
    <section id="comunidad" className="is-section" aria-label="Comunidad de WhatsApp">
      <div className="is-shell">
        <Surface
          className="p-8 md:p-12 max-w-3xl mx-auto text-center border-2"
          style={{ borderColor: `${WHATSAPP_GREEN}55` }}
        >
          <span
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
            style={{ background: `${WHATSAPP_GREEN}1A` }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill={WHATSAPP_GREEN}>
              <path d="M17.472 14.382c-.297-.149-1.758-.868-2.03-.967-.273-.099-.47-.148-.669.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12.004 2C6.486 2 2.01 6.476 2.01 11.994c0 2.096.552 4.064 1.515 5.766L2 22l4.352-1.498a9.955 9.955 0 005.652 1.742h.004c5.517 0 9.993-4.476 9.993-9.994A9.935 9.935 0 0012.004 2zm0 18.237a8.224 8.224 0 01-4.206-1.154l-.302-.18-3.123 1.075 1.085-3.072-.198-.317a8.207 8.207 0 01-1.264-4.395c0-4.542 3.696-8.238 8.244-8.238 2.204 0 4.276.859 5.834 2.418a8.19 8.19 0 012.411 5.826c0 4.542-3.697 8.237-8.481 8.037z" />
            </svg>
          </span>

          <span className="is-eyebrow justify-center" style={{ color: WHATSAPP_GREEN }}>
            Comunidad WhatsApp
          </span>
          <h2 className="is-display text-3xl sm:text-4xl md:text-5xl mt-4">
            Únete a nuestra comunidad
          </h2>
          <p className="is-copy mt-5 max-w-xl mx-auto">
            Bienvenid@ a Inner Spirit Colombia 🏔️ aquí nuestra comunidad WhatsApp, donde compartimos toda la info
            de clases y talleres. Un grupo solamente informativo 🍃 — entérate primero de nuevos horarios, eventos
            y espacios especiales.
          </p>

          <a
            href="https://chat.whatsapp.com/Eg9vIXsfurDFJJqns7B1j8"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-2 px-8 py-4 font-heading text-lg text-white transition-all duration-300"
            style={{ background: WHATSAPP_GREEN }}
          >
            Unirme al grupo de WhatsApp
          </a>
        </Surface>
      </div>
    </section>
  );
};

export default WhatsAppCommunitySection;
