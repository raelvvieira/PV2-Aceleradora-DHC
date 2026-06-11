import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, Edit3, ArrowRight, Check, Sparkle, Laptop, Smartphone, Wand2 } from 'lucide-react';

interface PostItem {
  id: string;
  title: string;
  category: string;
  hook: string;
  bannerUrl: string;
}

export function SalesPostGallery({ onScrollToOffer }: { onScrollToOffer: () => void }) {
  const [activeCategory, setActiveCategory] = useState('ACNE');
  const [canvaSimulatePost, setCanvaSimulatePost] = useState<PostItem | null>(null);
  const [userSalonName, setUserSalonName] = useState('Dra. Amanda Silva | Estética');

  // Unified Categories for the filter (Matching the PDF)
  const categories = [
    'ACNE', 'MELASMA', 'MICROAGULHAMENTO', 'ROSÁCEA', 'PELE MADURA', 'MOTIVACIONAIS', 'REELS', 'MEMES'
  ];

  // Curated list of 16 highly realistic premium Instagram skincare posts (using gorgeous Unsplash resources)
  const postsList: PostItem[] = [
    // Acne
    {
      id: 'p-acne-1',
      title: '3 Mitos Sobre Acne',
      category: 'ACNE',
      hook: 'Parar de comer chocolate resolve a Acne? Descubra o verdadeiro vilão inflamatório.',
      bannerUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'p-acne-2',
      title: 'A Solução para Pele Oleosa',
      category: 'ACNE',
      hook: 'Sua pele produz óleo demais? O segredo do ácido salicílico na proporção exata.',
      bannerUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400'
    },
    // Melasma
    {
      id: 'p-mel-1',
      title: 'Melasma: Sem Rebote',
      category: 'MELASMA',
      hook: 'Por que clareadores agressivos escurecem ainda mais suas manchas. Conheça a via segura.',
      bannerUrl: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'p-mel-2',
      title: 'Proteção Fator 50+',
      category: 'MELASMA',
      hook: 'Como as luzes artificiais do seu computador ativam a melanogênese no seu melasma silenciosamente.',
      bannerUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400'
    },
    // Microagulhamento
    {
      id: 'p-mic-1',
      title: 'Indução de Colágeno',
      category: 'MICROAGULHAMENTO',
      hook: 'A ciência microscópica que renova as camadas profundas e remove cicatrizes e rugas.',
      bannerUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'p-mic-2',
      title: 'Pós-Microagulhamento',
      category: 'MICROAGULHAMENTO',
      hook: 'O que passar nas primeiras 24 horas para acelerar a cicatrização e potencializar o glow.',
      bannerUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400'
    },
    // Rosácea
    {
      id: 'p-ros-1',
      title: 'Skincare para Rosácea',
      category: 'ROSÁCEA',
      hook: 'Vermelhidão estressante que não passa? Ativos calmantes que devolvem a paz ao seu rosto.',
      bannerUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'p-ros-2',
      title: 'Controle de Sensibilidade',
      category: 'ROSÁCEA',
      hook: 'Evite esses 3 alimentos se você sofre com Rosácea ativa e crises frequentes.',
      bannerUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400'
    },
    // Pele Madura
    {
      id: 'p-mad-1',
      title: 'Nutrição Pele Madura',
      category: 'PELE MADURA',
      hook: 'Flacidez tissular e densidade: o papel dos peptídeos estruturantes após os 45 anos.',
      bannerUrl: 'https://images.unsplash.com/photo-1440133595383-94e6cd7d6a50?auto=format&fit=crop&q=80&w=400'
    },
    // Motivacionais
    {
      id: 'p-mot-1',
      title: 'Ritual de Autocuidado',
      category: 'MOTIVACIONAIS',
      hook: 'Seu corpo é seu único templo físico. Trate sua pele como o tecido precioso que ela realmente é.',
      bannerUrl: 'https://images.unsplash.com/photo-1590439472477-cf5e10398f8e?auto=format&fit=crop&q=80&w=400'
    },
    // Reels
    {
      id: 'p-reel-1',
      title: 'Bastidores Clínicos',
      category: 'REELS',
      hook: 'Como arrumamos a sala entre uma consulta e outra usando áudios tranquilos e ritmo estético.',
      bannerUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400'
    },
    // Memes
    {
      id: 'p-meme-1',
      title: 'Dia de Botox Extravasado',
      category: 'MEMES',
      hook: 'Eu calculando quanto de creme vou precisar passar para recuperar a desidratação pós fds.',
      bannerUrl: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=400'
    }
  ];

  const secondGalleryFiltered = postsList.filter(p => p.category === activeCategory)
    .concat(postsList.filter(p => p.category !== activeCategory))
    .slice(0, 6); // Priority to active category

  return (
    <>
      {/* BLOCO 7 — SEGUNDA GALERIA POR CATEGORIA (O principal bloco de galeria interativo) */}
      <section 
        id="sales-category-gallery" 
        className="py-10 md:py-14 px-4 md:px-8 bg-[#FAF9F6] text-zinc-900 text-center"
      >
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Titles */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-rose-500 text-xs font-extrabold uppercase tracking-widest pl-1 block">Variedade e Abrangência</span>
            <h2 className="text-2xl md:text-3.5xl font-sans font-extrabold text-[#1D1D1F] tracking-tight leading-tight">
              Posts para cada procedimento que você realiza.
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
              Acne, Melasma, Microagulhamento, Rosácea, Pele Madura, Autocuidado, Motivacionais, Reels e mais — todos feitos especificamente para estética.
            </p>
          </div>

          {/* Interactive Horizontal Scroll Category Filter Bar */}
          <div className="w-full flex justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 pb-4 px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-[10.5px] font-extrabold tracking-wider transition-all uppercase whitespace-nowrap shrink-0 border cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1D1D1F] text-white border-transparent shadow-md'
                    : 'bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-50 hover:text-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 3x2 Grid display of categorized premium posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {secondGalleryFiltered.map((post) => (
              <div 
                key={post.id}
                className="bg-white rounded-3xl border border-zinc-200/60 p-4 shadow-xs hover:shadow-lg hover:border-zinc-300 transition-all group flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div className="space-y-3">
                  <div className="aspect-square w-full rounded-2xl overflow-hidden relative border border-zinc-100 bg-[#FAF9F6]">
                    <img
                      src={post.bannerUrl}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-102"
                    />

                    {/* Instagram overlay mock badge */}
                    <div className="absolute top-3 left-3 bg-[#1D1D1F]/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] text-white font-extrabold uppercase tracking-widest pl-1 leading-none shadow-xs">
                      {post.category}
                    </div>
                  </div>

                  <div className="space-y-1.5 px-1">
                    <h4 className="text-sm font-extrabold text-zinc-900 tracking-tight leading-tight">
                      {post.title}
                    </h4>
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                      {post.hook}
                    </p>
                  </div>
                </div>

                {/* Interactive button that triggers our live Canva simulator */}
                <div className="mt-5 pt-3 border-t border-zinc-100 px-1">
                  <button
                    onClick={() => setCanvaSimulatePost(post)}
                    className="w-full py-2.5 rounded-xl bg-rose-50 text-[#FF1E40] border border-rose-100 hover:bg-[#FF1E40] hover:text-white transition-all text-[10px] font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 size={12} />
                    <span>Editar no Canva</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-zinc-400 font-medium">
            Posts novos toda semana — sempre atualizados com os temas mais buscados na estética.
          </p>
        </div>
      </section>

      {/* LIVE INTERACTIVE CANVA CUSTOMIZER MODAL */}
      <AnimatePresence>
        {canvaSimulatePost && (
          <div id="canva-simulator-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
            <div className="fixed inset-0 bg-black/75 backdrop-blur-xs" onClick={() => setCanvaSimulatePost(null)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#18181C] text-white rounded-[28px] border border-zinc-800 p-5 sm:p-7 w-full max-w-2xl shadow-2xl relative z-10 font-sans flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Left Side: Drag-and-drop / Custom input panel */}
              <div className="flex-1 space-y-5 text-left md:max-w-[280px]">
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold text-[#FF1E40] tracking-widest uppercase block pl-0.5">Editor Simulador Canva ✕ DHC</span>
                  <h3 className="text-base font-extrabold text-[#FAF9F5] leading-tight">
                    Veja como é simples colocar sua marca:
                  </h3>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">
                  Insira abaixo o nome da sua clínica, espaço de beleza ou seu próprio nome profissional para ver a mágica acontecer ao vivo:
                </p>

                <div className="space-y-1.5">
                  <label className="text-[9px] text-[#8100FF] font-extrabold uppercase tracking-widest block pl-0.5">
                    Seu Nome ou Logotipo
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={40}
                      value={userSalonName}
                      onChange={(e) => setUserSalonName(e.target.value)}
                      placeholder="Dra. Seunome | Estética"
                      className="w-full text-[11px] text-white font-semibold pl-3 pr-8 py-3 bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-[#FF1E40] focus:ring-1 focus:ring-[#FF1E40]/30 rounded-xl transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600">
                      <Wand2 size={12} className="animate-pulse text-[#FF1E40]" />
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-zinc-900 rounded-xl border border-zinc-800/80 text-[10.5px] text-emerald-400 font-medium leading-relaxed">
                  👋 <strong>Em um clique de verdade no Canva:</strong> Nos bastidores todos os textos, paletas, imagens, cores e logos são 100% editáveis no celular ou computador.
                </div>

                <button
                  onClick={() => setCanvaSimulatePost(null)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF1E40] to-[#8100FF] hover:opacity-90 text-white text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  OK, Fechar Editor
                </button>
              </div>

              {/* Right Side: Visual live preview phone mockup with the overlay */}
              <div className="flex-1 flex flex-col items-center justify-center bg-zinc-900 p-4 rounded-2xl border border-zinc-800 relative min-h-[300px]">
                {/* iPhone style notch device border top */}
                <div className="absolute top-2 w-16 h-3.5 bg-[#18181C] rounded-full border border-zinc-850 flex items-center justify-center z-10">
                  <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></span>
                </div>

                {/* Simulated Post Square Frame with live binding text overlay! */}
                <div className="relative w-64 aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-zinc-950 mt-2">
                  <img
                    src={canvaSimulatePost.bannerUrl}
                    alt={canvaSimulatePost.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[70%] contrast-[105%]"
                  />

                  {/* Gradient to ground aesthetic overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/25"></div>

                  {/* Instagram-style Logo or Header simulation */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center shadow-xs">
                      DHC
                    </div>
                    <div className="leading-none text-left">
                      <span className="text-[8px] font-bold text-white uppercase tracking-wider block">Aceleradora DHC</span>
                      <span className="text-[6.5px] text-zinc-400 block font-sans">Template Editado</span>
                    </div>
                  </div>

                  {/* Dynamic bound text container (representing client's business name placeholder!) */}
                  <div className="absolute bottom-12 inset-x-4 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 text-center shadow-lg animate-pulse-subtle">
                    <span className="text-[7.5px] tracking-widest font-extrabold uppercase text-rose-400 pl-0.5 block">
                      PROFISSIONAL EXCLUSIVO
                    </span>
                    <h5 className="text-[9.5px] text-white font-extrabold mt-1 truncate uppercase tracking-tight">
                      {userSalonName || 'SUA CLÍNICA DE LUXO'}
                    </h5>
                  </div>

                  {/* Aesthetic label watermark */}
                  <div className="absolute bottom-4 inset-x-4 text-center">
                    <span className="text-[6.5px] text-zinc-400 font-mono tracking-widest uppercase">
                      Procedimento: {canvaSimulatePost.category} ■ Clique para Abrir
                    </span>
                  </div>
                </div>

                <span className="text-[9px] text-[#FF1E40] font-extrabold tracking-widest uppercase mt-4 block pl-0.5">
                  Mockup Interativo
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
