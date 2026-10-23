import React from 'react';
import InstagramFeedEmbed from '../../../modules/events/components/InstagramFeedEmbed';

const LandingIGSection: React.FC = () => {
  return (
    <section id="instagram" className="is-section is-section--sand">
      <div className="is-shell">
        <div className="text-center max-w-2xl mx-auto mb-2">
          <span className="is-eyebrow justify-center">Síguenos</span>
          <h2 className="is-display text-4xl sm:text-5xl md:text-6xl mt-4">
            La comunidad en Instagram
          </h2>
          <p className="is-copy mt-5">
            Momentos reales de nuestros círculos de danza consciente, compartidos
            por quienes ya se atrevieron a moverse.
          </p>
        </div>

        <InstagramFeedEmbed />
      </div>
    </section>
  );
};

export default LandingIGSection;
