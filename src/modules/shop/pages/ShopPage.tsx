import React, { useContext, useEffect } from 'react';
import type { Product } from '../../../types';
import { CartContext } from '../../../context/CartContext';
import { Illustration } from '../../../assets/Illustrations';





type ShopProduct = Product & {
  description: string;
  availability: string;
};

const products: ShopProduct[] = [
  { id: 1, name: 'Cristal de Cuarzo',   price: '45.000', imageUrl: '', illustrationName: 'crystal',   description: 'Pieza limpia para altar, meditacion o ritual personal.', availability: 'Retiro en estudio o envio local' },
  { id: 2, name: 'Incienso Natural',    price: '22.000', imageUrl: '', illustrationName: 'incense',   description: 'Aroma suave para preparar practica y cierre de dia.', availability: 'Disponible para retiro' },
  { id: 3, name: 'Aceite Esencial',     price: '35.000', imageUrl: '', illustrationName: 'oil',       description: 'Mezcla botanica para respiracion, descanso y presencia.', availability: 'Retiro en estudio o envio local' },
  { id: 4, name: 'Diario de Gratitud',  price: '65.000', imageUrl: '', illustrationName: 'journal',   description: 'Cuaderno para intenciones, seguimiento y journaling.', availability: 'Disponible para retiro' },
  { id: 5, name: 'Vela de Soja',        price: '48.000', imageUrl: '', illustrationName: 'candle',    description: 'Vela mineral para rituales cortos y meditacion guiada.', availability: 'Retiro en estudio o envio local' },
  { id: 6, name: 'Manta de Lino',       price: '120.000', imageUrl: '', illustrationName: 'blanket',  description: 'Textil liviano para savasana, meditacion o consultorio.', availability: 'Confirmar color por WhatsApp' },
  { id: 7, name: 'Cuenco Tibetano',     price: '160.000', imageUrl: '', illustrationName: 'bowl',     description: 'Cuenco de practica para sonido, pausa y vibracion.', availability: 'Entrega coordinada' },
  { id: 8, name: 'Palo Santo',          price: '28.000', imageUrl: '', illustrationName: 'palosanto', description: 'Madera aromatica para limpieza consciente del espacio.', availability: 'Disponible para retiro' },
];

const ProductCard: React.FC<{ product: ShopProduct }> = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="is-surface is-surface--interactive group flex flex-col overflow-hidden cursor-pointer">
      <div className="is-media-stage overflow-hidden aspect-square relative flex items-center justify-center">
        <Illustration
          name={product.illustrationName ?? ''}
          className="w-1/2 h-1/2 transition-all duration-700 group-hover:scale-110"
          style={{ color: '#C9ADA1' } as React.CSSProperties}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart({
              id: `prod-${product.id}`,
              name: product.name,
              price: parseFloat(product.price.replace('.', '')),
              imageUrl: product.imageUrl,
              illustrationName: product.illustrationName,
              quantity: 1,
              type: 'product',
            });
          }}
          className="absolute bottom-4 right-4 min-h-11 min-w-11 rounded-full flex items-center justify-center text-white text-lg font-bold md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 transition-all duration-300 shadow-lg bg-slate-is"
          aria-label={`Añadir ${product.name} al carrito`}
        >
          +
        </button>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-heading leading-tight text-ink transition-colors group-hover:text-slate-is">{product.name}</h3>
          <p className="is-metric font-mono text-sm whitespace-nowrap text-muted">${product.price}</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-light flex-grow">{product.description}</p>
        <p className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-is">
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full" style={{ background: '#8B9A8B' }} />
          {product.availability}
        </p>
      </div>
    </div>
  );
};

const shopSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Tienda Inner Spirit Studio — Objetos Conscientes',
  url: 'https://innerspirit.net/tienda',
  itemListElement: products.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      name: product.name,
      description: product.description,
      offers: {
        '@type': 'Offer',
        price: parseFloat(product.price.replace('.', '')),
        priceCurrency: 'COP',
        availability: 'https://schema.org/InStock',
        url: 'https://innerspirit.net/tienda',
      },
    },
  })),
};

const ShopPage: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(shopSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="animate-fade-in-up">
      <section id="tienda-page" className="is-page-section is-section--paper">
        <div className="is-shell">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="is-eyebrow justify-center">La Tienda · Objetos conscientes</span>
            <h1 className="is-page-heading mt-5">
              Herramientas para la Presencia
            </h1>
            <p className="is-page-lead mt-6">
              Objetos conscientes para acompañar tu práctica y tus rituales diarios. Retiro en el estudio de La Candelaria o envío local — escríbenos para coordinar.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="is-copy mb-5 max-w-xl mx-auto">
              ¿Buscas algo en particular o quieres confirmar disponibilidad? Cuéntanos qué quieres traer a tu espacio.
            </p>
            <a
              href="https://wa.me/573212248261?text=Hola%2C%20quiero%20consultar%20sobre%20la%20tienda%20de%20Inner%20Spirit"
              target="_blank"
              rel="noopener noreferrer"
              className="is-action"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
