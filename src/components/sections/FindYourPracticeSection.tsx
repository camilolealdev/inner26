
import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';
import { Illustration } from '../../assets/Illustrations';
import { useTranslation } from '../../i18n/useTranslation';
import { home } from '../../i18n/translations/home';

interface PracticeItem {
  type: 'class' | 'event' | 'service' | 'blog';
  title: string;
  description: string;
  illustrationName: string;
  imageUrl?: string;
  price?: number;
  priceLabel?: string;
}

type Category = 'calma' | 'movimiento' | 'conexion';

// Estructura (tipo, precio, ilustración, imagen) fija por idioma — el texto
// (title/description/priceLabel) viene del diccionario home.practice.items.
const practiceMeta: Record<Category, { key: string; type: PracticeItem['type']; illustrationName: string; imageUrl?: string; price?: number }[]> = {
  calma: [
    { key: 'meditacion', type: 'class', illustrationName: 'meditation', imageUrl: '/images/studio/meditacion-mudra.jpg', price: 36000 },
    { key: 'sesion1a1', type: 'service', illustrationName: 'abstract-spirit', imageUrl: '/images/studio/yoga-postura-ventanas.jpg' },
  ],
  movimiento: [
    { key: 'yogaFlow', type: 'class', illustrationName: 'yoga', imageUrl: '/images/studio/yoga-clase-grupal.jpg', price: 36000 },
    { key: 'breathwork', type: 'class', illustrationName: 'breathwork', imageUrl: '/images/studio/danza-movimiento.jpg', price: 36000 },
  ],
  conexion: [
    { key: 'innerDance', type: 'event', illustrationName: 'dance', imageUrl: '/images/events/inner-dance.jpg', price: 55000 },
    { key: 'soundHealing', type: 'class', illustrationName: 'sound-healing', imageUrl: '/images/chicago/chicago-sound-movement.jpg', price: 36000 },
  ],
};

const CategoryTab: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    className={`min-h-11 pb-4 text-lg md:text-xl font-heading tracking-wide transition-all duration-300 border-b-2 ${
      active ? 'text-ink border-slate-is' : 'text-muted border-transparent'
    }`}
  >
    {label}
  </button>
);

const PracticeCard: React.FC<{ item: PracticeItem }> = ({ item }) => {
  const { openBookingModal } = useContext(CartContext);
  const { navigate } = useNavigation();

  const handleClick = () => {
    if (item.type === 'class' || item.type === 'event') {
      openBookingModal({
        type: item.type,
        title: item.title,
        price: item.price ?? 0,
        imageUrl: item.imageUrl ?? '',
        illustrationName: item.illustrationName,
      });
    } else if (item.type === 'service') navigate('consultorio');
    else if (item.type === 'blog') navigate('blog');
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
      role="button"
      tabIndex={0}
      className="group cursor-pointer focus-visible:outline-2 focus-visible:outline-slate-is focus-visible:outline-offset-4"
    >
      <div className="relative overflow-hidden aspect-[16/9] mb-5 rounded-sm flex items-center justify-center transition-colors duration-500 bg-sand-light group-hover:shadow-md">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <Illustration
            name={item.illustrationName}
            className="w-1/3 h-1/3 transition-colors duration-700"
            style={{ color: '#C9ADA1' } as React.CSSProperties}
          />
        )}
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-heading transition-colors duration-300 text-ink">
            {item.title}
          </h3>
          <p className="font-light mt-1 text-sm leading-relaxed max-w-xs text-muted-light">
            {item.description}
          </p>
          {item.priceLabel && (
            <p className="text-xs font-mono mt-2 text-muted">{item.priceLabel}</p>
          )}
        </div>
        <span className="text-xl transition-transform duration-300 group-hover:translate-x-1 text-slate-is">
          &rarr;
        </span>
      </div>
    </div>
  );
};

const FindYourPracticeSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('movimiento');
  const { t } = useTranslation(home);

  const tabs = t('practice.tabs') as { calma: string; movimiento: string; conexion: string };
  const practiceData: Record<Category, PracticeItem[]> = {
    calma: [], movimiento: [], conexion: [],
  };
  (Object.keys(practiceMeta) as Category[]).forEach((cat) => {
    const items = practiceMeta[cat] ?? [];
    practiceData[cat] = items.map((meta) => ({
      ...meta,
      ...(t(`practice.items.${cat}.${meta.key}`) as { title: string; description: string; priceLabel?: string }),
    }));
  });

  return (
    <section className="is-section bg-cream" aria-label={t('practice.ariaLabel') as string}>
      <div className="is-shell max-w-6xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="is-eyebrow">{t('practice.eyebrow') as string}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading mt-5 mb-4 text-ink">
            {t('practice.title') as string}
          </h2>
          <p className="is-copy is-visually-balanced-text mb-7">
            {t('practice.intro') as string}
          </p>
          <div
            role="group"
            aria-label={t('practice.groupAriaLabel') as string}
            className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:gap-x-12 border-b border-accent/30"
          >
            <CategoryTab label={tabs.calma}       active={activeCategory === 'calma'}       onClick={() => setActiveCategory('calma')} />
            <CategoryTab label={tabs.movimiento}  active={activeCategory === 'movimiento'}  onClick={() => setActiveCategory('movimiento')} />
            <CategoryTab label={tabs.conexion}    active={activeCategory === 'conexion'}    onClick={() => setActiveCategory('conexion')} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
          {(practiceData[activeCategory] ?? []).map((item, idx) => (
            <PracticeCard key={`${activeCategory}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FindYourPracticeSection;
