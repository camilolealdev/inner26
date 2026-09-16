import React, { useEffect } from 'react';
import { useNavigation, type LocationChoice } from '../../context/NavigationContext';

const LocationGateModal: React.FC = () => {
  const { isLocationGateOpen, closeLocationGate, setLocation, location } = useNavigation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLocationGateOpen) {
        closeLocationGate();
      }
    };
    if (isLocationGateOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLocationGateOpen, closeLocationGate]);

  if (!isLocationGateOpen) return null;

  const handleSelect = (loc: LocationChoice) => {
    setLocation(loc);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-gate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      style={{
        backgroundColor: 'rgba(18, 18, 16, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl p-6 sm:p-10 md:p-12 text-center border shadow-2xl transition-all duration-500 animate-in fade-in zoom-in-95"
        style={{
          background: 'linear-gradient(145deg, #1A1A17 0%, #121210 100%)',
          borderColor: 'rgba(201, 173, 161, 0.25)',
          color: '#FAF7F2',
        }}
      >
        {/* Subtle close button if already chosen previously */}
        <button
          onClick={closeLocationGate}
          aria-label="Cerrar selector"
          className="absolute top-4 right-4 p-2.5 rounded-full text-stone-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Brand mark */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo.png"
            alt="Inner Spirit"
            className="w-12 h-12 object-contain"
            style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
          />
        </div>

        <span className="text-xs uppercase tracking-[0.28em] font-sans font-medium" style={{ color: '#8B9A8B' }}>
          Bienvenido / Welcome / Bem-vindo
        </span>

        <h2 id="location-gate-title" className="font-heading text-2xl sm:text-3xl md:text-4xl mt-3 mb-4 leading-snug">
          Elige tu santuario Inner Spirit
        </h2>

        <p className="text-sm sm:text-base font-light max-w-lg mx-auto mb-8 sm:mb-10 text-stone-300">
          Un espacio vivo de silencio, práctica y expansión consciente presente en dos orillas.
        </p>

        {/* Location cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left">
          {/* Colombia */}
          <button
            type="button"
            onClick={() => handleSelect('co')}
            className={`group relative p-6 rounded-xl border text-left transition-all duration-300 hover:scale-[1.02] ${
              location === 'co'
                ? 'border-[#C9ADA1] bg-white/[0.06] shadow-lg shadow-black/40 ring-1 ring-[#C9ADA1]/40'
                : 'border-white/10 bg-white/[0.02] hover:border-[#8B9A8B]/60 hover:bg-white/[0.05]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl filter drop-shadow-sm select-none" role="img" aria-label="Bandera de Colombia">
                🇨🇴
              </span>
              <span
                className="text-[11px] font-sans font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                style={{
                  borderColor: 'rgba(201, 173, 161, 0.4)',
                  color: '#C9ADA1',
                  background: 'rgba(201, 173, 161, 0.08)',
                }}
              >
                Bogotá
              </span>
            </div>

            <h3 className="font-heading text-xl text-white group-hover:text-[#FAF7F2] transition-colors mb-1.5">
              Inner Spirit Colombia
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed mb-4">
              La Candelaria — Santuario matriz. Clases diarias de yoga, sound healing, consultorio terapéutico y eventos.
            </p>

            <div className="flex items-center text-xs font-medium tracking-wide uppercase" style={{ color: '#8B9A8B' }}>
              <span>Explorar Colombia</span>
              <svg className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* Portugal */}
          <button
            type="button"
            onClick={() => handleSelect('pt')}
            className={`group relative p-6 rounded-xl border text-left transition-all duration-300 hover:scale-[1.02] ${
              location === 'pt'
                ? 'border-[#C9ADA1] bg-white/[0.06] shadow-lg shadow-black/40 ring-1 ring-[#C9ADA1]/40'
                : 'border-white/10 bg-white/[0.02] hover:border-[#8B9A8B]/60 hover:bg-white/[0.05]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl filter drop-shadow-sm select-none" role="img" aria-label="Bandeira de Portugal">
                🇵🇹
              </span>
              <span
                className="text-[11px] font-sans font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                style={{
                  borderColor: 'rgba(139, 154, 139, 0.4)',
                  color: '#8B9A8B',
                  background: 'rgba(139, 154, 139, 0.08)',
                }}
              >
                Nazaré
              </span>
            </div>

            <h3 className="font-heading text-xl text-white group-hover:text-[#FAF7F2] transition-colors mb-1.5">
              Inner Spirit Portugal
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed mb-4">
              Costa de Leiria, perto da Nazaré. Um projeto que nasce agora — voluntariado, horta e comunidade em construção.
            </p>

            <div className="flex items-center text-xs font-medium tracking-wide uppercase" style={{ color: '#C9ADA1' }}>
              <span>Explorar Portugal</span>
              <svg className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        <p className="mt-8 text-[11px] text-stone-500 font-sans">
          Puedes alternar tu santuario en cualquier momento desde el selector en la cabecera.
        </p>
      </div>
    </div>
  );
};

export default LocationGateModal;
