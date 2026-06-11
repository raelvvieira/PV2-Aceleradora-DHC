import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_MODULES, INITIAL_LESSONS } from '../initialData';
import { Sparkles, Clipboard, Copy, Check, ChevronDown, BookOpen, Smartphone, ShieldCheck, PlayCircle, HelpCircle, MessageSquare, MapPin, RotateCcw, Rocket, Calendar, Megaphone, Palette, Syringe, Flower2, Hourglass, Lightbulb, Video, Smile } from 'lucide-react';

export function SalesPillarsAndModules({ onScrollToSection }: { onScrollToSection: (id: string) => void }) {
  const [copiedScript, setCopiedScript] = useState<string | null>(null);
  const [selectedScriptTab, setSelectedScriptTab] = useState<'reativacao' | 'direct' | 'spin'>('reativacao');
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  // High converting sales copies for the simulator
  const scriptsInfo = {
    reativacao: {
      title: 'Campanha de Reativação (WhatsApp)',
      desc: 'Perfeito para disparar individualmente para ex-clientes que sumiram nos últimos 3 a 6 meses.',
      copy: `Olá [Nome], tudo bem? Sabia que hoje faz exatamente 3 meses que completamos o seu último protocolo facial aqui no nosso espaço?

Para manter o rejuvenescimento celular ativo e evitar que as manchas de melasma voltem no inverno, a Deni separou uma cortesia especial para a sua próxima sessão agendada até sexta-feira.

Restam apenas 3 vagas nessa ação de resgate. Posso mandar os horários livres? 😊`
    },
    direct: {
      title: 'Abordagem Comercial (Direct)',
      desc: 'Ideal para responder de forma magnética quando alguém interagir ou perguntar preços no Reels.',
      copy: `Olá, excelente escolha! O Microagulhamento de Luxo é realmente incrível para preencher linhas finas.

Para poder te recomendar o protocolo ideal (temos focado em peles com cicatrizes de acne ou rejuvenescimento geral?), posso te fazer duas perguntas rápidas antes de passar o valor exato? 🌸`
    },
    spin: {
      title: 'Spin Selling Estética',
      desc: 'Mensagem para contornar a objeção clássica de "está caro" direcionando à necessidade imediata.',
      copy: `Entendo perfeitamente, [Nome]. Investir no autocuidado exige planejamento.

Mas deixa eu te fazer uma pergunta: se continuarmos adiando o tratamento desse melasma inflamatório, quanto mais de maquiagem pesada ou de ativos caros de farmácia você acha que vai precisar gastar nos próximos meses tentando ocultar o problema sem tratá-lo na raiz?

Nosso protocolo resolve a inflamação e garante proteção duradoura. Vamos iniciar?`
    }
  };

  const handleCopyScript = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(type);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  const toggleModuleCurriculum = (moduleId: string) => {
    if (expandedModuleId === moduleId) {
      setExpandedModuleId(null);
    } else {
      setExpandedModuleId(moduleId);
    }
  };

  return (
    <>
      {/* BLOCO 8 — O QUE VOCE RECEBE (Apresentação detalhada dos 3 pilares) */}
      <section id="sales-pillars-block" className="text-zinc-900">
        
        {/* PILAR 1 — O QUE CHEGA NO SEU DRIVE TODA SEMANA */}
        <div className="py-10 md:py-14 px-4 md:px-8 bg-white text-center">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Headline and No sub-headlines */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-zinc-950 tracking-tight leading-tight max-w-4xl mx-auto">
              Posts novos toda semana. Só abrir, <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 inline-block font-black">adaptar e publicar</span>.
            </h3>

            {/* Premium, Simple Subheadline highlighting the benefits */}
            <p className="text-zinc-600 text-xs sm:text-sm md:text-base max-w-3xl mx-auto font-medium leading-relaxed font-sans">
              Aproveite toda semana a vantagem de ter postagens sempre atualizadas e organizadas por temas específicos, permitindo consultas personalizadas de acordo com o interesse e objetivo de cada cliente.
            </p>

            {/* Minimalist Cards representing the various post categories */}
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto pt-6">
              {[
                { name: 'Acne' },
                { name: 'Melasma e Manchas' },
                { name: 'Microagulhamento' },
                { name: 'Rosácea e Sensibilidade' },
                { name: 'Pele madura' },
                { name: 'Motivacionais e Frases' },
                { name: 'Memes e Humor' }
              ].map((cat) => (
                <div 
                  key={cat.name} 
                  className="bg-[#FAF9F6] border border-zinc-200/50 hover:border-zinc-300 py-4 sm:py-5 px-4 rounded-2xl text-center flex items-center justify-center min-h-[72px] flex-grow flex-shrink-0 basis-[45%] sm:basis-[30%] md:basis-[22%] xl:basis-[13%] min-w-[140px] max-w-[220px] hover:shadow-xs hover:bg-white transition-all cursor-default"
                >
                  <p className="text-[10px] sm:text-[11px] md:text-[11.5px] font-black text-zinc-900 uppercase tracking-wider leading-snug whitespace-normal break-keep">
                    {cat.name}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* PILAR 2 — O QUE PREENCHE SUA AGENDA */}
        <div className="py-12 md:py-16 px-4 md:px-8 bg-[#050505] text-center relative overflow-hidden border-t border-zinc-900">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-rose-950/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-5xl mx-auto relative z-10 space-y-6">
            
            {/* Headline and Sub-headline */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
              Tudo isso é o básico bem feito, mas queremos ir além, queremos que você lote sua agenda com a <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 inline-block font-black">estratégia de vendas certa!</span>
            </h3>

            <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-3xl mx-auto font-bold leading-relaxed font-sans">
              Conteúdo completo sobre vendas e gestão comercial
            </p>

            {/* Minimalist Cards highlighting what is included (no sub-texts, super clean grid) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-6">
              {[
                { name: 'Atração Local', icon: <Megaphone className="w-5 h-5 text-[#FF1E40]" /> },
                { name: 'Scripts de WhatsApp', icon: <MessageSquare className="w-5 h-5 text-[#f09433]" /> },
                { name: 'Resgate de Clientes', icon: <RotateCcw className="w-5 h-5 text-[#8100FF]" /> },
                { name: 'Anúncios Turbinados', icon: <Rocket className="w-5 h-5 text-[#FF1E40]" /> },
                { name: 'Abordagem Comercial', icon: <Smartphone className="w-5 h-5 text-[#f09433]" /> },
                { name: 'Gestão de Agenda', icon: <Calendar className="w-5 h-5 text-[#8100FF]" /> }
              ].map((item) => (
                <div 
                  key={item.name} 
                  className="bg-[#0F0F12]/80 border border-zinc-800/80 hover:border-zinc-700 hover:bg-[#15151A]/80 transition-all p-5 rounded-2xl flex items-center justify-center gap-3.5 hover:shadow-lg cursor-default"
                >
                  <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 shadow-2xs">
                    {item.icon}
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-black text-zinc-100 uppercase tracking-wider text-left">{item.name}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* PILAR 3 — O QUE GARANTE SUA AUTONOMIA (14 Módulos) */}
        <div className="py-10 md:py-14 bg-white text-center overflow-hidden">
          <div className="space-y-8 select-none">
            
            {/* Headline with the prompt's exact copy requested (in a single headline without "+") */}
             <h3 className="text-xl sm:text-2xl md:text-3.5xl font-sans font-black text-[#1D1D1F] tracking-tight leading-tight max-w-5xl mx-auto px-4">
              <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 inline font-black">14 módulos com ensinos práticos</span> para você crescer mais rápido. Com 33 aulas estratégicas sobre posicionamento, marketing, anúncios, vendas no whatsapp e muito mais.
            </h3>

            {/* Custom Infinite Scroll Keyframes Styles created specifically for the Modules */}
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes slideLeftModules {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-modules-left {
                animation: slideLeftModules 75s linear infinite;
              }
              .animate-modules-left:hover {
                animation-play-state: paused;
              }
            `}} />

            {/* Fading Edge Gradients representing highly polished layout */}
            <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-4 max-w-[100vw]">
              <div className="absolute inset-y-0 left-0 w-16 sm:w-44 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-16 sm:w-44 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

              {/* Seamless Single-Row Pass Carousel */}
              <div className="flex overflow-hidden select-none">
                <div className="flex gap-4 animate-modules-left whitespace-nowrap px-4">
                  {/* Duplicated list of modules to achieve seamless infinite loop */}
                  {[...INITIAL_MODULES, ...INITIAL_MODULES].map((mod, idx) => (
                    <div 
                      key={`${mod.id}-${idx}`}
                      className="aspect-[3/4] w-[180px] sm:w-[220px] rounded-3xl overflow-hidden shadow-xs hover:shadow-md border border-zinc-200/80 bg-white relative hover:border-zinc-350 transition-all duration-300 cursor-default shrink-0 flex-none group"
                    >
                      {/* Image - covers the whole card now */}
                      <div className="w-full h-full overflow-hidden bg-zinc-50">
                        <img 
                          src={mod.bannerUrl} 
                          alt={mod.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>

                      {/* Overlapping title absolute at bottom with dark gradient background for legibility */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3.5 sm:p-4 text-left whitespace-normal z-20">
                        <h4 className="text-[10px] sm:text-[11px] font-black text-white uppercase tracking-wider leading-snug whitespace-normal break-words font-sans">
                          {mod.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium action button at the end of the Pillars & Modules presentation */}
            <div className="pt-10 max-w-md mx-auto px-4">
              <button
                onClick={() => onScrollToSection('sales-offer-block')}
                className="w-full py-4.5 rounded-full text-white font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#22C55E] to-[#12A044] hover:from-[#1EAF50] hover:to-[#0F8A38] hover:shadow-[0_12px_28px_rgba(34,197,94,0.35)] transition-all cursor-pointer shadow-md select-none transform hover:scale-[1.01]"
              >
                QUERO ENCHER MINHA AGENDA AGORA
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
