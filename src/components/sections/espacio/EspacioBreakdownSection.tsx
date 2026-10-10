import React, { useState } from 'react';

interface SpaceItem {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly capacity: string;
}

const spaces: readonly SpaceItem[] = [
  {
    id: 'estudio',
    label: 'Estudio',
    title: 'Sala principal de movimiento',
    description:
      'Un salón amplio y luminoso para clases, talleres y prácticas grupales. Piso cálido, acústica cuidada y luz natural filtrada del centro histórico.',
    capacity: '105 m² · Hasta 20 personas',
  },
  {
    id: 'consultorio',
    label: 'Consultorios',
    title: 'Sesiones íntimas y terapias',
    description:
      'Un espacio recogido para acompañamientos individuales, terapias y conversaciones que piden silencio, confidencialidad y presencia.',
    capacity: '1 a 4 personas',
  },
  {
    id: 'produccion',
    label: 'Producción',
    title: 'Acompañamiento operativo',
    description:
      'Logística, montaje y producción de tu encuentro, coordinados desde el patio interior — para que solo tengas que sostener la experiencia.',
    capacity: 'Equipo dedicado',
  },
  {
    id: 'jardin',
    label: 'Jardín Exterior',
    title: 'Vista a Monserrate',
    description:
      'Un jardín al aire libre con vista a Monserrate, pensado para experiencias con fuego, agua y otros rituales elementales.',
    capacity: 'Experiencias especiales',
  },
];

const EspacioBreakdownSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(spaces[0]?.id ?? 'estudio');
  const active = spaces.find((s) => s.id === activeId) ?? spaces[0];

  return (
    <section
      aria-labelledby="espacio-breakdown-title"
      className="is-page-section is-section--sand"
    >
      <div className="is-shell">
        <div className="max-w-2xl">
          <span className="is-eyebrow" style={{ color: '#4D6A6D' }}>
            El espacio por dentro
          </span>
          <h2
            id="espacio-breakdown-title"
            className="is-display mt-6 text-4xl sm:text-5xl"
          >
            Cuatro ambientes, un mismo cuidado
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          {/* Media stage — real photo for the main studio room (the only
              space we have actual photography of today); the other 3
              environments (consultorios/producción/jardín) still use the
              icon placeholder until there's real photography for them. */}
          <div className="is-frame is-media-stage min-h-[20rem] lg:min-h-full relative overflow-hidden">
            {active?.id === 'estudio' ? (
              <>
                <img
                  src="/images/studio/yoga-clase-grupal.jpg"
                  alt="Sala principal de Inner Spirit Studio, luminosa y amplia, con clase de yoga grupal"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
                <div className="relative z-[3] flex h-full flex-col items-center justify-end px-8 pb-8 text-center">
                  <p className="font-heading text-2xl text-white">{active.label}</p>
                  <p className="is-metric mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                    {active.capacity}
                  </p>
                </div>
              </>
            ) : (
              <div className="relative z-[3] flex h-full flex-col items-center justify-center px-8 text-center">
                <span
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full border"
                  style={{
                    borderColor: 'rgba(234, 224, 204, 0.7)',
                    background: 'rgba(255, 255, 255, 0.35)',
                    color: '#2D4A4D',
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="14" rx="2" />
                    <path d="M3 9h18M9 18v2M15 18v2" />
                  </svg>
                </span>
                <p
                  className="font-heading mt-5 text-2xl"
                  style={{ color: '#1A1A18' }}
                >
                  {active?.label}
                </p>
                <p
                  className="is-metric mt-2 text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ color: '#4D6A6D' }}
                >
                  {active?.capacity}
                </p>
              </div>
            )}
          </div>

          {/* List */}
          <ul className="flex flex-col gap-4">
            {spaces.map((space) => {
              const isActive = space.id === activeId;
              return (
                <li key={space.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(space.id)}
                    aria-pressed={isActive}
                    className="is-surface w-full text-left p-6 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-is"
                    style={
                      isActive
                        ? { borderColor: 'rgba(77, 106, 109, 0.4)' }
                        : undefined
                    }
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3
                        className="font-heading text-2xl"
                        style={{ color: '#1A1A18' }}
                      >
                        {space.label}
                      </h3>
                      <span
                        className="is-metric text-xs font-bold uppercase tracking-[0.16em]"
                        style={{ color: '#A0A083' }}
                      >
                        {space.capacity}
                      </span>
                    </div>
                    <p
                      className="mt-1 text-sm font-semibold"
                      style={{ color: '#4D6A6D' }}
                    >
                      {space.title}
                    </p>
                    <p
                      className="mt-3 text-sm font-light leading-relaxed"
                      style={{ color: '#5E675D' }}
                    >
                      {space.description}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EspacioBreakdownSection;
