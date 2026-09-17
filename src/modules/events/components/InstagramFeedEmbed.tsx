import { useEffect } from 'react';

declare global {
  interface Window {
    __bhldScript?: boolean;
  }
}

const BEHOLD_ID = 'Wx9YNETXsBknuwzmzlj5';

// ponytail: Behold.so hosts the widget script; this only injects it once per page.
const InstagramFeedEmbed: React.FC = () => {
  useEffect(() => {
    if (window.__bhldScript) return;
    window.__bhldScript = true;
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://w.behold.so/widget.js';
    setTimeout(() => document.head.append(script), 0);
  }, []);

  return (
    <section className="mt-12" aria-label="Publicaciones recientes de Instagram">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: '#4D6A6D' }}>
            Instagram
          </span>
          <h4 className="text-2xl md:text-3xl font-heading mt-2" style={{ color: '#252520' }}>
            Lo último en @innerspirit_studio
          </h4>
        </div>
        <a
          href="https://instagram.com/innerspirit_studio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-widest"
          style={{ color: '#798478' }}
        >
          Ver perfil completo
        </a>
      </div>
      <div data-behold-id={BEHOLD_ID} />
    </section>
  );
};

export default InstagramFeedEmbed;
