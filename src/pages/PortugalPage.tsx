import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';

const IG_URL = 'https://www.instagram.com/innerspirit_portugal';

interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  category: string;
  tag?: string;
}

const PortugalPage: React.FC = () => {
  const { setLocation, openLocationGate } = useNavigation();
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

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

  const territoryPhotos: GalleryPhoto[] = [
    {
      src: '/images/portugal/regiao-nazare-leiria.jpg',
      alt: 'Nazaré ondas gigantes e farol, castelo de Leiria e canais de Aveiro',
      category: 'Costa & História',
      tag: 'Nazaré • Leiria',
      caption: 'Do farol das maiores ondas do mundo ao castelo medieval de Leiria e aos canais da costa centro.',
    },
    {
      src: '/images/portugal/lagoa-ervedeira.jpg',
      alt: 'Lagoa da Ervedeira com praia de areia branca e passadiços entre pinheiros',
      category: 'Natureza & Água Doce',
      tag: 'Ervedeira, Leiria',
      caption: 'Lagoa de água doce com passadiços de madeira em pleno pinhal, ideal para banhos e meditação.',
    },
    {
      src: '/images/portugal/serras-aire-candeeiros.jpg',
      alt: 'Cascatas, grutas e vales verdes do Parque Natural das Serras de Aire e Candeeiros',
      category: 'Parque Natural',
      tag: 'Serras de Aire e Candeeiros',
      caption: 'Cascatas secretas, grutas subterrâneas e vales calcários preservados a curta distância.',
    },
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

      {/* Hero Section with Nazaré Coastal Atmosphere */}
      <section className="relative min-h-[80vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden px-6 py-24 text-center">
        {/* Background Image of Nazaré Coast */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: "url('/images/portugal/nazare-hero.jpg')" }}
        />

        {/* Ambient deep dark gradient overlay for luxury contrast & legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121210]/80 via-[#121210]/85 to-[#121210]" />
        
        {/* Radial ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 35%, rgba(201, 173, 161, 0.22) 0%, rgba(18, 18, 16, 0.95) 75%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-8">
          <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#8B9A8B]/40 bg-[#8B9A8B]/15 text-xs font-sans uppercase tracking-[0.25em] text-[#8B9A8B] backdrop-blur-md">
            <span>🇵🇹 Costa de Leiria</span>
            <span className="opacity-40">•</span>
            <span>Perto da Nazaré</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            As primeiras <span className="italic text-[#C9ADA1]">sementes</span> de Inner Spirit em Portugal.
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-light text-stone-300 leading-relaxed mb-10 max-w-2xl">
            Começamos a semear um novo santuário na zona centro de Portugal, na costa da Nazaré. Antes de ser um espaço de práticas abertas, é um pedaço de terra por construir — e procuramos as primeiras pessoas dispostas a construí-lo connosco através de um programa de voluntariado consciente.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-heading text-base tracking-wide uppercase font-semibold transition-all duration-300 shadow-lg hover:opacity-95 hover:scale-[1.02]"
              style={{ background: '#C9ADA1', color: '#121210' }}
            >
              Candidatar-me ao Voluntariado
            </a>
            <button
              onClick={openLocationGate}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-heading text-base tracking-wide uppercase border border-white/25 hover:border-white/70 transition-all text-white backdrop-blur-sm bg-white/5"
            >
              Trocar de Sede
            </button>
          </div>
        </div>
      </section>

      {/* Visão do Projeto: Cabanas, Glamping & Bem-Estar */}
      <section className="py-16 md:py-24 border-t border-white/10 bg-[#151513]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual concept render */}
            <div className="lg:col-span-7">
              <div 
                className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group cursor-pointer"
                onClick={() => setActivePhoto({
                  src: '/images/portugal/projeto-cabanas-glamping.jpg',
                  alt: 'Render conceptual do terreno com cabana de madeira e tendas glamping',
                  caption: 'Conceito arquitetónico do terreno: cabanas sustentáveis integradas com deck panorâmico e tendas glamping sob os pinhais da Nazaré.',
                  category: 'O Projeto',
                  tag: 'Visão Futura',
                })}
              >
                <img
                  src="/images/portugal/projeto-cabanas-glamping.jpg"
                  alt="Conceito do projeto Inner Spirit Portugal — Cabanas sustentáveis e glamping na terra"
                  className="w-full h-[320px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] uppercase tracking-widest px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#C9ADA1]">
                    Visão Arquitetónica
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-xs font-mono uppercase text-stone-300 tracking-wider block mb-1">
                    Conceito do Terreno
                  </span>
                  <p className="text-sm text-stone-200 font-light">
                    Cabanas ecológicas em madeira com painéis solares, tendas glamping e caminhos rústicos integrados na flora atlântica.
                  </p>
                </div>
              </div>
            </div>

            {/* Context and Roadmap description */}
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-[0.25em] font-sans block mb-3 text-[#8B9A8B]">
                Fase 0 — A Fundação
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-white mb-5 leading-tight">
                Da terra bruta ao santuário na natureza
              </h2>
              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                Este pedaço de terra na costa de Leiria, a minutos das praias e falésias da Nazaré, foi escolhido pelo seu silêncio e potência regenerativa. O objetivo é criar um refúgio orgânico para retiros,sound healing, yoga e ecoturismo consciente.
              </p>
              <div className="space-y-4 border-l-2 border-[#8B9A8B]/40 pl-4 py-1">
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Hoje: Mãos na terra & Voluntariado</h3>
                  <p className="text-xs text-stone-400 font-light mt-1">Limpeza e cultivo do solo para a futura horta, pequenas obras rústicas e estruturação do espaço de campismo.</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#C9ADA1] tracking-wide uppercase">Próximo passo: Cabanas & Glamping</h3>
                  <p className="text-xs text-stone-400 font-light mt-1">Instalação de cabanas ecológicas em madeira e tendas bell para acolher praticantes e viajantes do mundo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voluntariado — Tarefas com fotos reais de apoio */}
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
              Procuramos pessoas para apoiar o início deste projeto: remodelações básicas, pintura, trabalho de terra para a futura horta e preparação da zona de campismo.
            </p>
          </div>

          {/* Visual tasks row: Terra vs Remodelação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div 
              className="relative rounded-xl overflow-hidden border border-white/10 group cursor-pointer h-56 sm:h-64"
              onClick={() => setActivePhoto({
                src: '/images/portugal/nazare-terreno.jpg',
                alt: 'Preparação do solo e horta no terreno de Portugal',
                caption: 'Trabalho de terra: abertura dos primeiros canteiros para a futura horta biológica e zona agroecológica.',
                category: 'A Terra',
                tag: 'Horta & Cultivo',
              })}
            >
              <img
                src="/images/portugal/nazare-terreno.jpg"
                alt="Trabalho de terra para a futura horta biológica"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] uppercase tracking-widest text-[#8B9A8B] font-semibold block mb-1">
                  Trabalho de Terra & Horta
                </span>
                <p className="text-xs text-stone-300 font-light">
                  Abertura de canteiros, compostagem e regeneração do solo entre oliveiras e pinheiros.
                </p>
              </div>
            </div>

            <div 
              className="relative rounded-xl overflow-hidden border border-white/10 group cursor-pointer h-56 sm:h-64"
              onClick={() => setActivePhoto({
                src: '/images/portugal/nazare-remodelacao.jpg',
                alt: 'Remodelação rústica e carpintaria com voluntários',
                caption: 'Remodelações: restauro da estrutura rústica existente, pintura a cal e carpintaria de madeira de pinho.',
                category: 'A Estrutura',
                tag: 'Obras & Carpintaria',
              })}
            >
              <img
                src="/images/portugal/nazare-remodelacao.jpg"
                alt="Remodelação rústica de estrutura de pedra e carpintaria de madeira"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] uppercase tracking-widest text-[#C9ADA1] font-semibold block mb-1">
                  Restauro & Pintura
                </span>
                <p className="text-xs text-stone-300 font-light">
                  Pintura a cal, carpintaria básica em pinho e montagem de infraestrutura comunitária.
                </p>
              </div>
            </div>
          </div>

          {/* Cards of details */}
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

      {/* Onde Estamos & O Território da Nazaré / Costa de Leiria */}
      <section className="py-16 md:py-24 border-t border-white/10 bg-[#131311]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-sans block mb-3 text-[#C9ADA1]">
              A Região
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-white mb-5">
              A envolvente mágica da Costa de Leiria
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              O projeto situa-se no coração da região centro de Portugal. Entre a força oceânica da Nazaré, as lagoas de pinhal e as serras calcárias, este é o cenário onde vivem e descansam os voluntários.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {territoryPhotos.map((photo) => (
              <div 
                key={photo.src}
                className="group rounded-2xl overflow-hidden border border-white/10 bg-[#1A1A17] flex flex-col cursor-pointer transition-all duration-300 hover:border-white/30 hover:translate-y-[-2px]"
                onClick={() => setActivePhoto(photo)}
              >
                <div className="relative h-64 overflow-hidden bg-black/40">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[#8B9A8B]">
                      {photo.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-2 font-mono">
                      {photo.category}
                    </span>
                    <p className="text-sm text-stone-300 font-light leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-stone-400 group-hover:text-[#C9ADA1] transition-colors">
                    <span>Ver ampliado</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comunidade em construção — honesto sobre o estágio atual */}
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

      {/* Contact Section — Instagram é o canal oficial */}
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

      {/* Lightbox Modal for Photo viewing */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.alt}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#181815] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center text-sm border border-white/20 transition-all cursor-pointer"
              aria-label="Fechar fotografia"
            >
              ✕
            </button>
            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="p-5 sm:p-6 bg-[#181815] border-t border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest text-[#8B9A8B] font-mono">
                  {activePhoto.category}
                </span>
                {activePhoto.tag && (
                  <span className="text-xs text-stone-400">• {activePhoto.tag}</span>
                )}
              </div>
              <p className="text-sm text-stone-200 font-light">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortugalPage;
