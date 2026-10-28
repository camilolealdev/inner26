import React from 'react';
import { useNavigation } from '../../../context/NavigationContext';
import { Surface, ArrowIcon } from '../../ui';

const categories = ['Cristales', 'Incienso', 'Aceites esenciales', 'Cuencos tibetanos'];

const DestinosYTiendaSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section id="portugal" className="is-section is-section--paper" aria-label="Inner Spirit Portugal y tienda">
      <div className="is-shell">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="is-eyebrow justify-center">Más allá de la danza</span>
          <h2 className="is-display text-4xl sm:text-5xl md:text-6xl mt-4">
            El ecosistema Inner Spirit
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
          <Surface className="p-7 md:p-9 text-left flex flex-col">
            <span className="is-eyebrow">Costa de Leiria, Portugal</span>
            <h3 className="font-heading text-2xl md:text-3xl text-ink mt-3 mb-3">
              Un nuevo santuario está naciendo cerca de Nazaré
            </h3>
            <p className="is-copy text-sm flex-1">
              Tierra en construcción en la costa de Leiria para retiros, sound healing y ecoturismo
              consciente. Abrimos un programa de voluntariado para quienes quieran poner las manos
              en la tierra.
            </p>
            <a
              href="/portugal"
              onClick={(e) => { e.preventDefault(); navigate('portugal'); }}
              className="group mt-6 inline-flex min-h-11 w-fit items-center gap-2 font-heading text-lg"
              style={{ color: '#4D6A6D' }}
            >
              Descubrir Inner Spirit Portugal
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Surface>

          <Surface id="tienda" className="p-7 md:p-9 text-left flex flex-col">
            <span className="is-eyebrow">Objetos conscientes</span>
            <h3 className="font-heading text-2xl md:text-3xl text-ink mt-3 mb-3">
              Lleva la práctica a casa
            </h3>
            <p className="is-copy text-sm">
              Cristales, inciensos, aceites esenciales y cuencos tibetanos elegidos para acompañar
              tu respiración, tu altar y tu descanso entre una sesión y la siguiente.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                  style={{ borderColor: '#C9ADA166', color: '#798478', background: '#C9ADA114' }}
                >
                  {cat}
                </span>
              ))}
            </div>
            <a
              href="/tienda"
              onClick={(e) => { e.preventDefault(); navigate('tienda'); }}
              className="group mt-6 inline-flex min-h-11 w-fit items-center gap-2 font-heading text-lg"
              style={{ color: '#4D6A6D' }}
            >
              Ver la tienda
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Surface>
        </div>
      </div>
    </section>
  );
};

export default DestinosYTiendaSection;
