import React from 'react';
import { Surface, ArrowIcon } from '../../ui';

interface ExperienceStep {
  number: string;
  title: string;
  copy: string;
  accent: string;
}

const steps: ExperienceStep[] = [
  {
    number: '01',
    title: 'Apertura y respiración',
    copy: 'Llegamos, nos descalzamos y bajamos el ritmo juntos. Una breve guía de respiración nos ayuda a soltar el día y a llegar por completo al cuerpo.',
    accent: '#4D6A6D',
  },
  {
    number: '02',
    title: 'Movimiento libre guiado por sonido en vivo',
    copy: 'Música y voz en vivo marcan el pulso de la sesión. No hay coreografía ni pasos que seguir: cada quien se mueve como su cuerpo lo pida, a su propio ritmo.',
    accent: '#C9ADA1',
  },
  {
    number: '03',
    title: 'Integración y silencio compartido',
    copy: 'El movimiento baja de intensidad y entramos en quietud. Un espacio de silencio para habitar lo que surgió, sin necesidad de explicarlo.',
    accent: '#798478',
  },
  {
    number: '04',
    title: 'Círculo de cierre',
    copy: 'Cerramos en círculo, con la palabra como puente de vuelta a lo cotidiano. Compartimos lo que queramos, en comunidad y sin juicio.',
    accent: '#4D6A6D',
  },
];

const ExperienciasSection: React.FC = () => {
  return (
    <section id="experiencias" className="is-section is-section--sand">
      <div className="is-shell">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="is-eyebrow justify-center">La experiencia</span>
          <h2 className="is-display text-4xl sm:text-5xl md:text-6xl mt-4">
            Un ritual de movimiento, no una clase
          </h2>
          <p className="is-copy mt-5">
            Cada sesión de Inner Dance se vive descalza, sin alcohol y sin
            experiencia previa. Es un espacio abierto a todos los cuerpos, donde
            lo único que se pide es presencia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
          {steps.map((step) => (
            <Surface key={step.number} className="p-6 md:p-8 text-left">
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: step.accent }}
              >
                {step.number}
              </span>
              <h3 className="font-heading text-2xl text-ink mt-3 mb-2">{step.title}</h3>
              <p className="is-copy text-sm">{step.copy}</p>
            </Surface>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://wa.me/573212248261?text=Hola%2C%20quiero%20saber%20la%20pr%C3%B3xima%20fecha%20de%20Inner%20Dance"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-2 px-9 py-4 font-heading text-lg bg-slate-is text-sand-dune border border-slate-is hover:bg-deep-teal transition-all duration-300"
          >
            Consultar próxima fecha
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExperienciasSection;
