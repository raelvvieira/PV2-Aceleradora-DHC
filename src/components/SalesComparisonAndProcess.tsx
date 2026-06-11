import React from 'react';
import { motion } from 'motion/react';
import { MinusCircle, CheckCircle2, ShieldCheck, HelpCircle, StepForward, ArrowRight, Wand2 } from 'lucide-react';

export function SalesComparisonAndProcess({ onScrollToSection }: { onScrollToSection: (id: string) => void }) {
  const comparisonNoPlatform = [
    'Postagens irregulares e sem consistência.',
    'Horas travada tentando criar conteúdo do zero.',
    'Agenda oscilando e sem previsibilidade financeira.',
    'Dinheiro perdido com anúncios sem rumo.',
    'Queda drástica no faturamento em meses frios.',
    'Invisível na região mesmo sendo ótima profissional.'
  ];

  const comparisonWithPlatform = [
    'Posts virais para estética toda semana.',
    'Edições fáceis no Canva em poucos minutos.',
    'Instagram profissional que transmite autoridade real.',
    'Rotina de vendas para agendamentos diários.',
    'Aprenda a fazer impulsionamento e anúncios que convertem.',
    'Saiba criar campanhas de reativação de clientes.'
  ];

  return (
    <>
      {/* BLOCO 9 — ANTES / DEPOIS VISUAL (Prova de transformação sem precisar de depoimento) */}
      <section id="sales-comparison" className="py-10 md:py-14 px-4 md:px-8 bg-zinc-50 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Headline - No pre-headlines / sub-headlines as per layout rules */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-[#1D1D1F] tracking-tight max-w-4xl mx-auto leading-tight text-center">
            A diferença de quem usa e quem não usa a <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 inline-block font-black">Aceleradora DHC</span>.
          </h2>

          {/* Two Columns Side-by-Side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left pt-6">
            
            {/* Left Column: Problem Scenario */}
            <div className="bg-white border border-red-100 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 select-none">
                  <div className="p-2 rounded-full bg-rose-50 text-rose-500 shrink-0">
                    <MinusCircle size={16} />
                  </div>
                  <h3 className="text-sm font-extrabold text-zinc-400 uppercase tracking-wider pl-1 leading-none">Sem a Aceleradora DHC</h3>
                </div>

                <div className="space-y-4">
                  {comparisonNoPlatform.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-rose-500 text-sm sm:text-base font-black leading-none shrink-0 mt-1 select-none">✕</span>
                      <p className="text-sm sm:text-base md:text-[17px] lg:text-[18px] text-zinc-650 font-semibold leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Solution Scenario with instagram color border */}
            <div className="card-insta-border-light bg-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-[9px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">Recomendado</div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 select-none">
                  <div className="p-2 rounded-full bg-emerald-50 text-emerald-600 shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#FF1E40] uppercase tracking-wider pl-1 leading-none">Com a Aceleradora DHC</h3>
                </div>

                <div className="space-y-4 font-bold text-zinc-900">
                  {comparisonWithPlatform.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <span className="text-emerald-500 text-sm sm:text-base font-black leading-none shrink-0 mt-1 select-none">✓</span>
                      <p className="text-sm sm:text-base md:text-[17px] lg:text-[18px] text-zinc-900 font-extrabold leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Elegant Button (QUERO TER O RECOMENDADO) */}
          <div className="pt-6 max-w-sm mx-auto px-4 select-none">
            <button
              onClick={() => onScrollToSection('sales-offer-block')}
              className="w-full py-4 rounded-full text-white font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#22C55E] to-[#12A044] hover:from-[#1EAF50] hover:to-[#0F8A38] hover:shadow-[0_12px_28px_rgba(34,197,94,0.35)] transition-all cursor-pointer shadow-md select-none transform hover:scale-[1.01]"
            >
              QUERO TER O RECOMENDADO
            </button>
          </div>

          {/* Visual Arrow Separator */}
          <div className="flex justify-center pt-8">
            <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shadow-md select-none">
              <svg className="w-5 h-5 stroke-[2.5]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* BLOCO 10 — COMO FUNCIONA — 3 PASSOS (Simplicidade extrema) */}
      <section 
        id="como-funciona" 
        className="py-10 md:py-14 px-4 md:px-8 bg-white overflow-hidden text-center"
      >
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Headline - No pre-headlines as per layout guidelines */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-zinc-950 tracking-tight leading-tight max-w-4xl mx-auto text-center">
            Comece a postar hoje em <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 inline-block font-black">3 passos simples</span>.
          </h2>

          {/* 3-Step Desktop View Container (Hidden on mobile) */}
          <div className="relative w-full max-w-3xl mx-auto hidden md:block mt-10 mb-6 select-none">
            {/* Horizontal Winding/Dashed Connective Line */}
            <div className="absolute top-[32px] left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-[#7B2FBE]/30 -z-10"></div>

            <div className="grid grid-cols-3 gap-6 relative z-10">
              {[
                { id: '01', title: 'Copie um post', text: 'text-[#8100FF]', bg: 'bg-purple-50', hover: 'hover:border-purple-300' },
                { id: '02', title: 'Adapte se quiser', text: 'text-[#8100FF]', bg: 'bg-purple-50', hover: 'hover:border-purple-300' },
                { id: '03', title: 'Publique em 3 minutos', text: 'text-[#8100FF]', bg: 'bg-purple-50', hover: 'hover:border-purple-300' },
              ].map((step) => (
                <div 
                  key={step.id}
                  className={`bg-white border border-zinc-200/60 ${step.hover} rounded-2xl px-5 py-4 flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-all h-[68px] cursor-default`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`text-[16px] font-sans font-black tracking-tight ${step.text}/25`}>{step.id}</span>
                    <h4 className="text-[12px] sm:text-[13px] font-black text-zinc-700 uppercase tracking-wider leading-tight whitespace-normal">
                      {step.title}
                    </h4>
                  </div>
                  <div className={`w-6 h-6 ${step.bg} ${step.text} rounded-full flex items-center justify-center font-bold text-[11px] shrink-0`}>✓</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3-Step Serpentine Mobile View (Hidden on Desktop) */}
          <div className="relative max-w-xs mx-auto text-left space-y-6 md:hidden py-6 select-none pl-8">
            {/* Vertical timeline connector */}
            <div className="absolute left-[15px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-[#7B2FBE]/30"></div>

            {[
              { id: '01', title: 'Copie um post', border: 'hover:border-purple-300', text: 'text-[#8100FF]', bg: 'bg-purple-50', dot: 'bg-purple-500' },
              { id: '02', title: 'Adapte se quiser', border: 'hover:border-purple-300', text: 'text-[#8100FF]', bg: 'bg-purple-50', dot: 'bg-purple-500' },
              { id: '03', title: 'Publique em 3 minutos', border: 'hover:border-purple-300', text: 'text-[#8100FF]', bg: 'bg-purple-50', dot: 'bg-purple-500' },
            ].map((step) => (
              <div 
                key={step.id}
                className="flex items-center gap-4 relative group"
              >
                {/* Visual marker pinned on the dashed timeline */}
                <div className={`w-2.5 h-2.5 rounded-full ${step.dot} absolute left-[-29px] top-1/2 -translate-y-1/2 z-10 border border-white ring-4 ring-[#FAF9F6]`} />
                
                {/* Pill content */}
                <div 
                  className={`flex-1 bg-white border border-zinc-200/60 ${step.border} rounded-2xl px-4 py-3 flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-all h-[64px]`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`text-[14px] font-sans font-black tracking-tight ${step.text}/25`}>{step.id}</span>
                    <h4 className="text-[11.5px] sm:text-[12.5px] font-black text-zinc-700 uppercase tracking-wider leading-tight whitespace-normal">
                      {step.title}
                    </h4>
                  </div>
                  <div className={`w-5.5 h-5.5 ${step.bg} ${step.text} rounded-full flex items-center justify-center font-bold text-[10px] shrink-0`}>✓</div>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Arrow Separator */}
          <div className="flex justify-center pt-5">
            <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shadow-md select-none">
              <svg className="w-5 h-5 stroke-[2.5]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
