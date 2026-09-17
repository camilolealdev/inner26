import React from 'react';
import { useNavigation } from '../../../context/NavigationContext';
import { Illustration } from '../../../assets/Illustrations';
import { useTranslation } from '../../../i18n/useTranslation';
import { home } from '../../../i18n/translations/home';

// Nota: no usamos el tipo BlogPost compartido aquí porque su campo `category`
// está tipado como unión literal en español; con traducción el valor varía
// por idioma, así que este componente usa su propio tipo local con `category: string`.
interface LocalBlogPost {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  illustrationName?: string;
  minutes: number;
}

// Estructura (imagen, ilustración, minutos de lectura) fija por idioma — el
// texto (title/category/excerpt) viene de home.blog.posts.<key>.
const postMeta: { id: number; key: 'meditation' | 'yoga' | 'abstract-spirit' | 'ritual' | 'breathwork'; imageUrl: string; illustrationName: string; minutes: number }[] = [
  { id: 1, key: 'meditation', imageUrl: '/images/studio/meditacion-mudra.jpg', illustrationName: 'meditation', minutes: 4 },
  { id: 2, key: 'yoga', imageUrl: '/images/studio/yoga-postura-ventanas.jpg', illustrationName: 'yoga', minutes: 5 },
  { id: 3, key: 'abstract-spirit', imageUrl: '/images/products/cristal-cuarzo.jpg', illustrationName: 'abstract-spirit', minutes: 6 },
  { id: 4, key: 'ritual', imageUrl: '/images/events/circulo-luna.jpg', illustrationName: 'ritual', minutes: 5 },
  { id: 5, key: 'breathwork', imageUrl: '/images/studio/danza-movimiento.jpg', illustrationName: 'breathwork', minutes: 6 },
];

const BlogSection: React.FC = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation(home);
  const goToBlog = (e: React.MouseEvent) => { e.preventDefault(); navigate('blog'); };

  const readingTimeFn = t('blog.readingTime') as (min: number) => string;
  const blogPosts: LocalBlogPost[] = postMeta.map((meta) => ({
    id: meta.id,
    imageUrl: meta.imageUrl,
    illustrationName: meta.illustrationName,
    minutes: meta.minutes,
    ...(t(`blog.posts.${meta.key}`) as { title: string; category: string; excerpt: string }),
  }));

  const [featured, ...rest] = blogPosts;
  const secondary = rest.slice(0, 4);

  return (
    <section id="blog" className="is-section is-section--paper">
      <div className="is-shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-12 md:mb-16">
          <div className="max-w-xl">
            <span className="is-eyebrow">{t('blog.eyebrow') as string}</span>
            <h2 className="is-display text-4xl md:text-5xl mt-5">
              {t('blog.title') as string}
            </h2>
            <p className="is-copy mt-4 max-w-md">
              {t('blog.description') as string}
            </p>
          </div>
          <a
            href="/blog"
            onClick={goToBlog}
            className="is-action is-action--ghost self-start sm:self-auto shrink-0"
          >
            {t('blog.ctaViewAll') as string} &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured — dark surface */}
          {featured && (
            <a
              href="/blog"
              onClick={goToBlog}
              className="is-surface is-surface--dark is-surface--interactive group lg:col-span-7 flex flex-col overflow-hidden no-underline"
            >
              <div className="is-media-stage aspect-[16/10] w-full relative overflow-hidden bg-[#181512]">
                {featured.imageUrl ? (
                  <img
                    src={featured.imageUrl}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <Illustration
                    name={featured.illustrationName ?? 'meditation'}
                    className="w-1/3 h-1/3 transition-transform duration-700 group-hover:scale-110"
                    style={{ color: '#C9ADA1' } as React.CSSProperties}
                  />
                )}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(18,18,16,0.6) 0%, transparent 60%)' }}
                />
              </div>
              <div className="p-7 md:p-9">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: '#C9ADA1' }}>
                    {t('blog.featuredLabel') as string}
                  </span>
                  <span className="is-luxury-rule" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: '#8B9A8B' }}>
                    {featured.category}
                  </span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl leading-tight mb-3" style={{ color: '#FAF7F2' }}>
                  {featured.title}
                </h3>
                <p className="font-light leading-relaxed mb-6" style={{ color: 'rgba(234,224,204,0.72)' }}>
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-[12px] tracking-wide" style={{ color: '#798478' }}>
                  <span className="is-metric">{readingTimeFn(featured.minutes)}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold transition-colors group-hover:text-white" style={{ color: '#C9ADA1' }}>
                    {t('blog.readArticle') as string} &rarr;
                  </span>
                </div>
              </div>
            </a>
          )}

          {/* Secondary — compact editorial list */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {secondary.map((post) => (
              <a
                key={post.id}
                href="/blog"
                onClick={goToBlog}
                className="is-surface is-surface--interactive group flex items-center gap-4 p-4 no-underline"
              >
                <div className="is-media-stage shrink-0 w-20 h-20 rounded-sm overflow-hidden flex items-center justify-center relative bg-sand-light">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <Illustration
                      name={post.illustrationName ?? 'meditation'}
                      className="w-2/5 h-2/5 transition-transform duration-700 group-hover:scale-110"
                      style={{ color: '#C9ADA1' } as React.CSSProperties}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-1 text-slate-is">
                    {post.category}
                  </p>
                  <h3 className="font-heading text-lg leading-snug text-ink transition-colors group-hover:text-slate-is">
                    {post.title}
                  </h3>
                  <p className="is-metric text-[11px] mt-1.5" style={{ color: '#798478' }}>
                    {readingTimeFn(post.minutes)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
