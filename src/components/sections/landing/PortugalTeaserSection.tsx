import React from 'react';
import { useNavigation } from '../../../context/NavigationContext';
import { Surface, ArrowIcon } from '../../ui';

const PortugalTeaserSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section id="portugal" className="is-section is-section--sand" aria-label="Inner Spirit Portugal">
      <div className="is-shell">
        <Surface className="p-8 md:p-14 max-w-4xl mx-auto text-center">
          <span className="is-eyebrow justify-center">Costa de Leiria, Portugal</span>
          <h2 className="is-display text-3xl sm:text-4xl md:text-5xl mt-4">
            Un nuevo santuario está naciendo cerca de Nazaré
          </h2>
          <p className="is-copy mt-5 max-w-2xl mx-auto">
            Inner Spirit Portugal apenas está sembrando sus primeros pasos: un pedazo de tierra en la costa de Leiria,
            a minutos de las playas y acantilados de Nazaré, que se está transformando en un refugio orgánico para
            retiros, sound healing, yoga y ecoturismo consciente.
          </p>
          <p className="is-copy mt-3 max-w-2xl mx-auto">
            Todavía no es un espacio abierto de prácticas — es tierra por construir. Por eso abrimos un programa de
            voluntariado consciente para quienes quieran poner las manos en la tierra: renovaciones, la futura horta
            y la construcción del espacio comunitario que viene.
          </p>
          <a
            href="/portugal"
            onClick={(e) => { e.preventDefault(); navigate('portugal'); }}
            className="mt-8 inline-flex min-h-11 items-center gap-2 px-8 py-4 font-heading text-lg bg-slate-is text-sand-dune border border-slate-is hover:bg-deep-teal transition-all duration-300"
          >
            Descubrir Inner Spirit Portugal
            <ArrowIcon className="h-4 w-4" />
          </a>
        </Surface>
      </div>
    </section>
  );
};

export default PortugalTeaserSection;
