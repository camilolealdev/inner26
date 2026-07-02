
import React, { useState } from 'react';
import { InstagramIcon, WhatsAppIcon } from '../../constants';
import { useContactForm } from '../../hooks/useContactForm';

const ContactSection: React.FC = () => {
  const { formState, handleInputChange, setConsent, handleSubmit } = useContactForm();
  const [focus, setFocus] = useState<string | null>(null);
  
  const inputClasses = (fieldName: string) => `
    w-full bg-transparent border-b py-4 text-lg text-base-text transition-all duration-300 outline-none rounded-none appearance-none
    ${focus === fieldName ? 'border-accent placeholder-accent/50' : 'border-stone-300 placeholder-stone-400'}
  `;

  return (
    <section id="contacto" className="is-section is-section--paper">
      <div className="is-shell">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20">

          {/* Left Column: Map card + contact details */}
          <div className="lg:w-5/12 space-y-10">
            <div>
              <span className="is-eyebrow">Contacto</span>
              <h2 className="is-display text-4xl sm:text-5xl md:text-6xl mt-5 leading-[0.95]">
                Cruza el <br/><span className="italic" style={{ color: '#C9ADA1' }}>umbral</span>.
              </h2>
              <p className="is-copy mt-5 max-w-md">
                Nos encontramos en La Candelaria, Bogotá. Un refugio de silencio en medio del movimiento del centro histórico.
              </p>
            </div>

            {/* Stylized location card (grid-line background + pin, no external embed) */}
            <div className="is-surface overflow-hidden">
              <div
                className="relative aspect-[4/3]"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(77,106,109,0.10) 1px, transparent 1px), linear-gradient(180deg, rgba(77,106,109,0.08) 1px, transparent 1px), linear-gradient(135deg, rgba(201,173,161,0.18), rgba(77,106,109,0.10)), #F3EDE2',
                  backgroundSize: '2rem 2rem, 2rem 2rem, auto, auto',
                }}
                role="img"
                aria-label="Mapa ilustrado de la ubicación de Inner Spirit en La Candelaria, Bogotá"
              >
                {/* Diagonal 'street' accent */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(115deg, transparent 46%, rgba(139,154,139,0.28) 46%, rgba(139,154,139,0.28) 49%, transparent 49%)' }} />
                {/* Pin */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
                  <span aria-hidden="true" className="block w-3.5 h-3.5 rounded-full ring-4" style={{ background: '#4D6A6D', boxShadow: '0 6px 16px rgba(45,74,77,0.35)' }} />
                  <span aria-hidden="true" className="block w-px h-5" style={{ background: '#4D6A6D' }} />
                </div>
                {/* Floating label card */}
                <div className="absolute left-4 bottom-4 right-4 sm:right-auto sm:max-w-[16rem] px-4 py-3 rounded-sm" style={{ background: 'rgba(250,247,242,0.92)', backdropFilter: 'blur(4px)', border: '1px solid rgba(77,106,109,0.16)' }}>
                  <p className="font-heading text-lg leading-tight" style={{ color: '#2D4A4D' }}>Inner Spirit Studio</p>
                  <p className="text-sm font-light mt-0.5" style={{ color: '#5E675D' }}>Transversal 1 #17-29 · La Candelaria</p>
                </div>
              </div>
            </div>

            {/* Structured details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
              <div>
                <p className="is-eyebrow mb-3">Visítanos</p>
                <p className="is-copy" style={{ lineHeight: 1.6 }}>
                  Transversal 1 #17-29<br />La Candelaria, Bogotá
                </p>
              </div>
              <div>
                <p className="is-eyebrow mb-3">Horario</p>
                <p className="is-copy is-metric" style={{ lineHeight: 1.6 }}>
                  Lun–Vie · 6:30 AM – 9:00 PM<br />Sáb–Dom · 8:00 AM – 9:00 PM
                </p>
              </div>
              <div>
                <p className="is-eyebrow mb-3">Escríbenos</p>
                <a href="https://wa.me/573212248261" target="_blank" rel="noopener noreferrer" className="is-copy block transition-colors hover:text-slate-is">+57 321 224 8261</a>
                <a href="mailto:hola@innerspirit.co" className="is-copy block transition-colors hover:text-slate-is">hola@innerspirit.co</a>
              </div>
              <div>
                <p className="is-eyebrow mb-3">Síguenos</p>
                <div className="flex gap-5">
                  <a href="https://instagram.com/innerspirit_studio" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-slate-is transition-colors transform hover:-translate-y-0.5 duration-300" aria-label="Instagram @innerspirit_studio">
                    <InstagramIcon />
                  </a>
                  <a href="https://wa.me/573212248261" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-slate-is transition-colors transform hover:-translate-y-0.5 duration-300" aria-label="WhatsApp +57 321 224 8261">
                    <WhatsAppIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* Antes de tu visita */}
            <div className="is-surface p-5" style={{ background: 'linear-gradient(180deg, rgba(139,154,139,0.10), rgba(139,154,139,0.03)), #FAF7F2' }}>
              <p className="is-eyebrow mb-2">Antes de tu visita</p>
              <p className="is-copy" style={{ fontSize: '0.95rem' }}>
                Llega 10 minutos antes para acomodarte sin prisa. Trae ropa cómoda; mat, mantas y props los tenemos en el estudio. Si es tu primera vez, escríbenos por WhatsApp y te orientamos con gusto.
              </p>
            </div>
          </div>

          {/* Right Column: Minimalist Form */}
          <div className="lg:w-7/12">
            <div className="mb-10">
              <p className="is-eyebrow">Inicia una conversación</p>
              <h3 className="is-display text-3xl md:text-4xl mt-4">
                Cuéntanos qué quieres <span className="italic" style={{ color: '#C9ADA1' }}>traer al espacio</span>.
              </h3>
              <p className="is-copy mt-4 max-w-lg">
                Una clase, un evento, una intención que aún no tiene nombre. Déjanos un mensaje y seguimos por WhatsApp.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <input type="text" name="honeypot" value={formState.honeypot} onChange={handleInputChange} className="hidden" aria-hidden="true" tabIndex={-1} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <label htmlFor="home-contact-name" className="sr-only">Tu Nombre</label>
                   <input 
                    id="home-contact-name"
                    type="text" 
                    name="name" 
                    value={formState.name} 
                    onChange={handleInputChange} 
                    onFocus={() => setFocus('name')}
                    onBlur={() => setFocus(null)}
                    placeholder="Tu Nombre" 
                    className={inputClasses('name')} 
                    required 
                   />
                </div>

                <div className="relative">
                  <label htmlFor="home-contact-email" className="sr-only">Tu Email</label>
                   <input 
                    id="home-contact-email"
                    type="email" 
                    name="email" 
                    value={formState.email} 
                    onChange={handleInputChange} 
                    onFocus={() => setFocus('email')}
                    onBlur={() => setFocus(null)}
                    placeholder="Tu Email" 
                    className={inputClasses('email')} 
                    required 
                   />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="home-contact-type" className="sr-only">Motivo de consulta</label>
                <select 
                  id="home-contact-type"
                  name="type" 
                  value={formState.type} 
                  onChange={handleInputChange}
                  onFocus={() => setFocus('type')}
                  onBlur={() => setFocus(null)}
                  className={`${inputClasses('type')} cursor-pointer`}
                >
                  <option value="clase">Consulta sobre Clases</option>
                  <option value="evento">Consulta sobre Eventos</option>
                  <option value="producto">Consulta sobre Tienda</option>
                  <option value="otro">Otro motivo</option>
                </select>
              </div>

              <div className="relative">
                <label htmlFor="home-contact-message" className="sr-only">Mensaje</label>
                <textarea 
                  id="home-contact-message"
                  name="message" 
                  value={formState.message} 
                  onChange={handleInputChange} 
                  onFocus={() => setFocus('message')}
                  onBlur={() => setFocus(null)}
                  placeholder="¿En qué podemos acompañarte?" 
                  rows={4} 
                  className={`${inputClasses('message')} resize-none`} 
                  required
                ></textarea>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="home-contact-consent"
                  type="checkbox"
                  name="consent"
                  checked={formState.consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-accent"
                  required
                />
                <label htmlFor="home-contact-consent" className="text-sm text-stone-500 leading-relaxed">
                  Autorizo el tratamiento de mis datos según la{' '}
                  <a href="/privacidad" className="underline hover:text-accent">política de privacidad</a>.
                </label>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  className="group relative w-full sm:w-auto px-10 py-4 bg-base-text text-white overflow-hidden transition-all duration-500 hover:bg-accent"
                >
                  <span className="relative z-10 font-heading text-xl tracking-wide">Enviar Mensaje</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
