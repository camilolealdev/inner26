import React from 'react';
import { useNavigation } from '../context/NavigationContext';

const IG_URL = 'https://www.instagram.com/innerspirit_portugal';

const PortugalPage: React.FC = () => {
  const { setLocation, openLocationGate } = useNavigation();

  const offers = [
    'Quarto privado, banho partilhado',
    'Alimentação incluída',
    'Internet de boa qualidade',
    'Uma sessão de Sound Healing',
    'Uma sessão fotográfica profissional',
  ];

  const asks = [
    '3 horas diárias de troca, com 1 dia de descanso por semana',
    'ou 4 horas diárias de troca, com 2 dias de descanso por semana',
    'Estadia mínima: 2 semanas',
  ];

  const tasks = [
    'Remodelações básicas e pintura',
    'Trabalho de terra para a futura horta',
    'Preparação da zona de campismo',
    'Primeiros passos para a construção de cabanas (ecoturismo & bem-estar)',
  ];

  return (
    <div className="bg-[#121210] text-[#FAF7F2] min-h-screen">
      {/* Top location banner notice */}
      <div className="border-b border-white/10 bg-[#1A1A17] py-2.5 px-4 text-center text-xs tracking-wider text-stone-300 flex items-center justify-center gap-3">
        <span>Estás no espaço de <strong>Inner Spirit Portugal 🇵🇹</strong></span>
        <button
          onClick={() => {
            setLocation('co');
          }}
          className="underline hover:text-white transition-colors cursor-pointer text-[#C9ADA1]"
        >
          Mudar para Inner Spirit Colombia 🇨🇴
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden px-6 py-20 text-center">
        {/* Ambient atmospheric gradients */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(201, 173, 161, 0.15) 0%, rgba(18, 18, 16, 0.95) 75%)',
          }}
        />
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20"
          style={{ background: '#4D6A6D' }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20"
          style={{ background: '#8B9A8B' }}
        />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#8B9A8B]/30 bg-[#8B9A8B]/10 text-xs font-sans uppercase tracking-[0.25em] text-[#8B9A8B]">
            <span>🇵🇹 Costa de Leiria</span>
            <span className="opacity-40">•</span>
            <span>Perto da Nazaré</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            As primeiras <span className="italic text-[#C9ADA1]">sementes</span> de Inner Spirit em Portugal.
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-light text-stone-300 leading-relaxed mb-10 max-w-2xl">
            Começamos a semear um novo espaço na zona centro de Portugal, na costa da Nazaré. Antes de ser um espaço de práticas, é um pedaço de terra por construir — e procuramos as primeiras pessoas dispostas a construí-lo connosco através de um programa de voluntariado.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-heading text-base tracking-wide uppercase font-semibold transition-all duration-300 shadow-lg hover:opacity-95"
              style={{ background: '#C9ADA1', color: '#121210' }}
            >
              Candidatar-me ao Voluntariado
            </a>
            <button
              onClick={openLocationGate}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-heading text-base tracking-wide uppercase border border-white/20 hover:border-white/60 transition-all text-white"
            >
              Trocar de Sede
            </button>
          </div>
        </div>
      </section>

      {/* Voluntariado — o que existe hoje, sem inventar serviços ou preços que ainda não existem */}
      <section className="py-16 md:py-24 border-t border-white/10 bg-[#161614]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-sans block mb-3 text-[#8B9A8B]">
              Voluntariado Inner Spirit
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-white mb-6">
              Constrói connosco desde a primeira pedra
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              Procuramos pessoas para apoiar o início deste projeto: remodelações básicas, pintura, trabalho de terra para a futura horta e preparação da zona de campismo. O próximo passo será começar a construção de cabanas com um fim de ecoturismo e práticas de bem-estar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-[#1C1C19]">
              <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-white/15 text-stone-400 bg-white/5">Tarefas</span>
              <ul className="mt-4 space-y-2.5">
                {tasks.map((t) => (
                  <li key={t} className="text-stone-300 font-light text-sm leading-relaxed flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: '#8B9A8B' }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-[#1C1C19]">
              <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-white/15 text-stone-400 bg-white/5">Oferecemos</span>
              <ul className="mt-4 space-y-2.5">
                {offers.map((o) => (
                  <li key={o} className="text-stone-300 font-light text-sm leading-relaxed flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: '#C9ADA1' }} />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-[#1C1C19]">
              <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-white/15 text-stone-400 bg-white/5">Pedimos</span>
              <ul className="mt-4 space-y-2.5">
                {asks.map((a) => (
                  <li key={a} className="text-stone-300 font-light text-sm leading-relaxed flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: '#8B9A8B' }} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-[#8B9A8B] hover:text-[#FAF7F2] transition-colors"
            >
              <span>Candidatar-me pelo Instagram</span>
              <svg className="w-3.5 h-3.5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Comunidade em construção — honesto sobre o estágio atual, sem depoimentos fabricados */}
      <section className="py-16 md:py-24 border-t border-white/10 bg-[#121210]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-sans block mb-3 text-[#C9ADA1]">
            Comunidade & Partilha
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-white mb-5">
            Uma comunidade que está a começar agora
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Inner Spirit Portugal está nos seus primeiros passos na costa da Nazaré. Ainda não temos histórias de comunidade para partilhar aqui — mas é exatamente por isso que procuramos as primeiras pessoas dispostas a construir isto connosco.
          </p>
        </div>
      </section>

      {/* Contact Section — Instagram é o único canal real por agora */}
      <section className="py-20 border-t border-white/10 bg-[#191916] text-center px-6">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.28em] font-sans block mb-3 text-[#8B9A8B]">
            Conversas Abertas
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-white mb-4">
            Queres fazer parte deste início?
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light mb-8 leading-relaxed">
            Segue-nos e escreve-nos pelo Instagram para saber mais sobre o voluntariado e as próximas datas disponíveis.
          </p>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 rounded-full font-heading text-sm tracking-widest uppercase font-semibold text-[#121210] bg-[#FAF7F2] hover:bg-[#EAE0CC] transition-colors"
          >
            Seguir @innerspirit_portugal
          </a>
        </div>
      </section>
    </div>
  );
};

export default PortugalPage;
