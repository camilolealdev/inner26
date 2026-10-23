import React from 'react';
import { useNavigation } from '../../../context/NavigationContext';
import { Surface, ArrowIcon } from '../../ui';

const categories = ['Cristales', 'Incienso', 'Aceites esenciales', 'Cuencos tibetanos'];

const TiendaTeaserSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section id="tienda" className="is-section" aria-label="Tienda Inner Spirit">
      <div className="is-shell">
        <Surface className="p-8 md:p-12 max-w-4xl mx-auto text-center">
          <span className="is-eyebrow justify-center">Objetos conscientes</span>
          <h2 className="is-display text-3xl sm:text-4xl md:text-5xl mt-4">
            Lleva la práctica a casa
          </h2>
          <p className="is-copy mt-5 max-w-2xl mx-auto">
            Cristales, inciensos, aceites esenciales, cuencos tibetanos y otros objetos conscientes elegidos para
            acompañar tu respiración, tu altar y tu descanso entre una clase y la siguiente.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
            {categories.map((cat) => (
              <span
                key={cat}
                className="text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border"
                style={{ borderColor: '#C9ADA166', color: '#798478', background: '#C9ADA114' }}
              >
                {cat}
              </span>
            ))}
          </div>

          <a
            href="/tienda"
            onClick={(e) => { e.preventDefault(); navigate('tienda'); }}
            className="mt-8 inline-flex min-h-11 items-center gap-2 px-8 py-4 font-heading text-lg bg-slate-is text-sand-dune border border-slate-is hover:bg-deep-teal transition-all duration-300"
          >
            Ver la tienda
            <ArrowIcon className="h-4 w-4" />
          </a>
        </Surface>
      </div>
    </section>
  );
};

export default TiendaTeaserSection;
