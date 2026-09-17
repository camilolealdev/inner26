import React, { useContext, useEffect } from 'react';
import type { Product } from '../../../types';
import { CartContext } from '../../../context/CartContext';
import { Illustration } from '../../../assets/Illustrations';
import { useTranslation } from '../../../i18n/useTranslation';
import { homePages } from '../../../i18n/translations/homePages';


type ShopProduct = Product & {
  description: string;
  availability: string;
};

const products: ShopProduct[] = [
  { id: 1, name: 'Cristal de Cuarzo',   price: '45.000', imageUrl: '/images/products/cristal-cuarzo.jpg',   illustrationName: 'crystal',   description: 'Pieza limpia para altar, meditación o ritual personal.', availability: 'Retiro en estudio o envío local' },
  { id: 2, name: 'Incienso Natural',    price: '22.000', imageUrl: '/images/products/incienso-natural.jpg',  illustrationName: 'incense',   description: 'Aroma suave para preparar práctica y cierre de día.', availability: 'Disponible para retiro' },
  { id: 3, name: 'Aceite Esencial',     price: '35.000', imageUrl: '/images/products/aceite-esencial.jpg',   illustrationName: 'oil',       description: 'Mezcla botánica para respiración, descanso y presencia.', availability: 'Retiro en estudio o envío local' },
  { id: 4, name: 'Diario de Gratitud',  price: '65.000', imageUrl: '/images/products/diario-gratitud.jpg',  illustrationName: 'journal',   description: 'Cuaderno para intenciones, seguimiento y journaling.', availability: 'Disponible para retiro' },
  { id: 5, name: 'Vela de Soja',        price: '48.000', imageUrl: '/images/products/vela-soja.jpg',        illustrationName: 'candle',    description: 'Vela mineral para rituales cortos y meditación guiada.', availability: 'Retiro en estudio o envío local' },
  { id: 6, name: 'Manta de Lino',       price: '120.000', imageUrl: '',                                      illustrationName: 'blanket',  description: 'Textil liviano para savasana, meditación o consultorio.', availability: 'Confirmar color por WhatsApp' },
  { id: 7, name: 'Cuenco Tibetano',     price: '160.000', imageUrl: '/images/products/cuenco-tibetano.jpg',  illustrationName: 'bowl',     description: 'Cuenco de práctica para sonido, pausa y vibración.', availability: 'Entrega coordinada' },
  { id: 8, name: 'Palo Santo',          price: '28.000', imageUrl: '',                                      illustrationName: 'palosanto', description: 'Madera aromática para limpieza consciente del espacio.', availability: 'Disponible para retiro' },
];

const ProductCard: React.FC<{ product: ShopProduct }> = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { t } = useTranslation(homePages);

  return (
    <div className="is-surface is-surface--interactive group flex flex-col overflow-hidden cursor-pointer">
      <div className="is-media-stage overflow-hidden aspect-square relative flex items-center justify-center bg-sand-light">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <Illustration
            name={product.illustrationName ?? ''}
            className="w-1/2 h-1/2 transition-all duration-700 group-hover:scale-110"
            style={{ color: '#C9ADA1' } as React.CSSProperties}
          />
        )}
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
          aria-label={(t('shop.addToCart') as (name: string) => string)(product.name)}
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
  const { t } = useTranslation(homePages);

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
            <span className="is-eyebrow justify-center">{t('shop.eyebrow') as string}</span>
            <h1 className="is-page-heading mt-5">
              {t('shop.heading') as string}
            </h1>
            <p className="is-page-lead mt-6">
              {t('shop.lead') as string}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="is-copy mb-5 max-w-xl mx-auto">
              {t('shop.helpText') as string}
            </p>
            <a
              href="https://wa.me/573212248261?text=Hola%2C%20quiero%20consultar%20sobre%20la%20tienda%20de%20Inner%20Spirit"
              target="_blank"
              rel="noopener noreferrer"
              className="is-action"
            >
              {t('shop.whatsappCta') as string}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
