import React from 'react';
import { motion } from 'motion/react';

export function SalesTestimonials({ onScrollToSection }: { onScrollToSection: (id: string) => void }) {
  const whatsappFeedback = [
    {
      student: 'Júlia M.',
      role: 'Esteticista em Curitiba',
      text: 'Deni, publiquei o post de melasma ontem à tarde e em menos de 15 minutos recebi direct de uma cliente fria que agendou o peeling de R$ 380! Sem palavras para esse banco de posts, economiza horas 😍'
    },
    {
      student: 'Rafaela S.',
      role: 'Biomédica Estetista',
      text: 'Meninas do grupo, o script de reativação de clientes realmente funciona demais! Estava com a agenda mega parada essa semana. Mandei pras clientes antigas de manhã e fechei 4 agendamentos de toxina botulínica hoje!'
    },
    {
      student: 'Carla F.',
      role: 'Fisioterapeuta Dermatofuncional',
      text: 'Os posts no Canva economizam tanto tempo de trabalho. Só troco o nome e posto. Meus stories agora parecem de clínica de altíssimo luxo de revista de marca, a percepção de valor na minha cidade mudou completamente.'
    }
  ];

  return (
    <section id="sales-testimonials" className="py-10 md:py-14 px-4 md:px-8 bg-zinc-50 text-center">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Headline strictly alone with no pre-headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-[#1D1D1F] tracking-tight max-w-4xl mx-auto leading-tight text-center">
          Quem está dentro já está <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 inline-block font-black">vendo resultado</span>.
        </h2>

        {/* Crisp grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {whatsappFeedback.map((fb, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-3xl border border-zinc-200/60 p-6 shadow-xs flex flex-col justify-between hover:shadow-sm transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-100 text-zinc-700 font-bold text-xs flex items-center justify-center font-mono select-none">
                    {fb.student.charAt(0)}
                  </div>
                  <div className="leading-none">
                    <h4 className="text-xs font-black text-zinc-900">{fb.student}</h4>
                    <span className="text-[10px] text-zinc-400 font-sans block mt-1">{fb.role}</span>
                  </div>
                </div>

                <p className="text-[12px] sm:text-[13px] text-zinc-650 leading-relaxed font-sans italic pt-2 border-t border-zinc-50">
                  "{fb.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Elegant Button (EU TAMBEM QUERO ESSES RESULTADOS) */}
        <div className="pt-2 max-w-md mx-auto px-4 select-none">
          <button
            onClick={() => onScrollToSection('sales-offer-block')}
            className="w-full py-4.5 rounded-full text-white font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#22C55E] to-[#12A044] hover:from-[#1EAF50] hover:to-[#0F8A38] hover:shadow-[0_12px_28px_rgba(34,197,94,0.35)] transition-all cursor-pointer shadow-md select-none transform hover:scale-[1.01]"
          >
            EU TAMBEM QUERO ESSES RESULTADOS
          </button>
        </div>

        {/* Visual arrow separator */}
        <div className="flex justify-center pt-6">
          <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shadow-md select-none">
            <svg className="w-5 h-5 stroke-[2.5]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
