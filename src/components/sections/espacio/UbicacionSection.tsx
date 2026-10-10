import React from 'react';

interface VisitStep {
  readonly index: string;
  readonly title: string;
  readonly description: string;
}

const visitSteps: readonly VisitStep[] = [
  {
    index: '01',
    title: 'Antes de llegar',
    description:
      'Coordinamos horario, acceso y recomendaciones para caminar el centro histórico con calma.',
  },
  {
    index: '02',
    title: 'Durante el evento',
    description:
      'El espacio queda listo y acompañado: tú sostienes la experiencia, nosotros los detalles.',
  },
  {
    index: '03',
    title: 'Después',
    description:
      'Cierre, seguimiento y un mapa de La Candelaria para seguir habitando el barrio con pausa.',
  },
];

const UbicacionSection: React.FC = () => {
  return (
    <section
      aria-labelledby="espacio-ubicacion-title"
      className="is-page-section is-section--sand"
    >
      <div className="is-shell">
        <div className="max-w-2xl">
          <span className="is-eyebrow" style={{ color: '#4D6A6D' }}>
            La Candelaria, Bogotá
          </span>
          <h2
            id="espacio-ubicacion-title"
            className="is-display mt-6 text-4xl sm:text-5xl"
          >
            Una pausa inesperada en el centro
          </h2>
          <p className="is-copy mt-6">
            Para turistas y locales, la ubicación aporta contexto: historia,
            caminabilidad, cultura y una pausa inesperada dentro del centro de Bogotá.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          {/* Real embedded map — same verified Google Business Profile listing
              linked from TestimonialsSection's "ver reseñas" CTA */}
          <div className="is-surface relative overflow-hidden min-h-[20rem]">
            <iframe
              src="https://maps.google.com/maps?cid=12076127393282276532&output=embed"
              title="Mapa de ubicación de Inner Spirit Studio en La Candelaria, Bogotá"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>

          {/* Visit panel */}
          <div className="flex flex-col justify-center">
            <ol className="flex flex-col gap-4">
              {visitSteps.map((step) => (
                <li key={step.index} className="is-surface flex gap-5 p-6">
                  <span
                    className="is-metric font-heading text-3xl leading-none"
                    style={{ color: '#C9ADA1' }}
                    aria-hidden="true"
                  >
                    {step.index}
                  </span>
                  <div>
                    <h3
                      className="font-heading text-xl"
                      style={{ color: '#1A1A18' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="mt-2 text-sm font-light leading-relaxed"
                      style={{ color: '#5E675D' }}
                    >
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UbicacionSection;
