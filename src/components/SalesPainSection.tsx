import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, UserCheck, BookOpen } from 'lucide-react';

export function SalesPainSection() {
  const painPoints = [
    {
      icon: '😮‍💨',
      text: '"Saio do atendimento destruída. A última coisa que quero é criar post."'
    },
    {
      icon: '😶',
      text: '"Quando sobra tempo pra criar... some a inspiração. Tela em branco."'
    },
    {
      icon: '😤',
      text: '"Já impulsionei post, paguei R$100... e não veio um agendamento."'
    },
    {
      icon: '😒',
      text: '"Aquela profissional tem metade da minha técnica e a agenda cheia."'
    },
    {
      icon: '😔',
      text: '"Não adianta postar coisa bonita se ninguém agenda."'
    }
  ];

  return (
    <>
      {/* BLOCO 5 — AGITACAO — 'EU SEI...' (Fundo preto premium) */}
      <section 
        id="sales-pain-block" 
        className="py-12 md:py-16 px-4 md:px-8 bg-[#050505] text-white relative overflow-hidden font-sans border-t border-zinc-900"
      >
        {/* Subtle background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-red-950/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
          
          {/* Main big bold single headline */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-sans font-black tracking-tight text-white leading-tight text-center">
              Eu sei... Você tenta. Posta quando dá. Faz o que pode.{' '}
              <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 inline font-black">
                Mas lá no fundo você sabe que não tá funcionando, né?
              </span>
            </h2>
          </div>

          {/* Columns: Cards on left, image on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto pt-4 text-left">
            {/* Cards Column on the left */}
            <div className="lg:col-span-7 space-y-3 flex flex-col">
              {painPoints.map((pain, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#0F0F12]/80 border border-zinc-800/80 hover:border-zinc-700 hover:bg-[#15151A]/80 transition-all shadow-md"
                >
                  <span className="text-xl sm:text-2xl shrink-0 select-none pl-1">
                    {pain.icon}
                  </span>
                  <p className="text-[12px] sm:text-[13.5px] text-zinc-300 italic font-semibold leading-relaxed">
                    {pain.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Image Column on the right */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[288px] sm:max-w-xs md:max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl select-none border border-zinc-800 bg-[#0F0F12]">
                <img
                  src="https://i.ibb.co/1tMJCm09/Gemini-Generated-Image-h5t6c3h5t6c3h5t6.png"
                  alt="Profissional de Estética e Skincare frustrada"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter grayscale-[5%]"
                />
              </div>
            </div>
          </div>

          {/* DENI HAUT HIGHLIGHT QUOTE AT THE BOTTOM */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 max-w-4xl mx-auto text-center space-y-4"
          >
            <span className="text-rose-500 text-5xl md:text-6xl font-serif block leading-none select-none">“</span>
            
            <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-serif font-black text-zinc-150 leading-relaxed max-w-3xl mx-auto italic tracking-tight">
              Profissionais excelentes sendo engolidas por falta de estrutura e por um posicionamento que não revela a profissional incrível que elas realmente são.
            </blockquote>
            
            <cite className="text-[11px] font-black tracking-[0.3em] uppercase text-rose-500 block pt-1 not-italic">
              — Deni Haut
            </cite>
          </motion.div>

        </div>
      </section>


      {/* BLOCO 6 — CAUSA E SOLUCAO ('Isso acontece porque...' — Fundo preto) */}
      <section 
        id="sales-solution-block" 
        className="py-12 md:py-16 px-4 md:px-8 bg-[#050505] text-white overflow-hidden text-center border-t border-zinc-900"
      >
        {/* Subtle background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-950/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Main Bold Headline without pre-headline or dividers */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-white tracking-tight leading-tight">
              Isso acontece porque você ainda não tem acesso ao <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 inline font-black">método de crescimento no digital</span>.
            </h3>
          </div>

        </div>
      </section>

      {/* BLOCO 6.5 — GRADIENT STRIPE BAND (Transição perfeita entre o fundo preto e o fundo branco) */}
      <section className="bg-gradient-to-r from-[#6B21A8] via-[#B83280] to-[#F472B6] py-10 px-4 text-center select-none shadow-lg relative z-20">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3.5xl lg:text-4xl font-sans font-black text-white tracking-tight uppercase leading-tight max-w-4xl mx-auto">
            Foi por isso que a Deni Haut Cursos criou o Acelerador de Marketing e Vendas para Estética.
          </h3>
        </div>
      </section>

      {/* BLOCO 7 — COMPONENTES DO METODO (Fundo branco limpo, contraste total) */}
      <section 
        id="sales-features-block" 
        className="py-12 md:py-16 px-4 md:px-8 bg-white text-zinc-900 overflow-hidden text-center border-t border-zinc-100"
      >
        <div className="max-w-5xl mx-auto relative z-10 space-y-8">
          
          {/* New outstanding bold black headline replacing the old card */}
          <div className="max-w-4xl mx-auto text-center py-4 block">
            <h4 className="text-xl sm:text-2xl md:text-3.5xl lg:text-[28px] font-sans font-black text-zinc-950 tracking-tight leading-relaxed">
              Posts feitos por uma equipe de <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 inline font-black">designers profissionais, e estratégia de vendas validadas por especialistas de marketing e vendas</span>. Tudo reunido e adaptado pra você melhorar seu posicionamento e lotar sua agenda com isso.
            </h4>
          </div>

          {/* Pillars of beauty aesthetic digital dominance */}
          <div className="pt-2 max-w-4xl mx-auto">

            {/* Pillar grid with ultra-minimalist cards styled beautifully for light layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto font-sans">
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/60 hover:border-zinc-300 hover:bg-zinc-100/50 transition-all flex items-center justify-center gap-3.5 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#FF1E40] flex items-center justify-center font-bold shrink-0">
                  <Sparkles size={18} />
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-zinc-900 uppercase tracking-wider">Conteúdo Pronto</span>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/60 hover:border-zinc-300 hover:bg-zinc-100/50 transition-all flex items-center justify-center gap-3.5 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#f09433] flex items-center justify-center font-bold shrink-0">
                  <UserCheck size={18} />
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-zinc-900 uppercase tracking-wider">Agenda Cheia</span>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/60 hover:border-zinc-300 hover:bg-[#F2EBFD] transition-all flex items-center justify-center gap-3.5 shadow-sm animate-pulse-subtle">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#8100FF] flex items-center justify-center font-bold shrink-0">
                  <BookOpen size={18} />
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-[#8100FF] uppercase tracking-wider">Estratégia de vendas</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
