import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface SalesHeroProps {
  onScrollToSection: (id: string) => void;
}

export function SalesHero({
  onScrollToSection,
}: SalesHeroProps) {
  return (
    <>
      {/* SALES HERO SECTION - Fully focused on the hook and visual presentation */}
      <section 
        id="sales-hero" 
        className="relative pt-12 pb-14 px-4 md:px-8 bg-[#050505] overflow-hidden text-center select-normal"
      >
        {/* Subtle background glow effect using standard tailwind classes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* Centered Brand Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-10 select-none"
          >
            <img 
              src="https://i.ibb.co/3yDc9kS8/logo.png" 
              alt="Logo" 
              referrerPolicy="no-referrer"
              className="h-[49px] sm:h-[61px] md:h-[73px] w-auto object-contain"
            />
          </motion.div>

          {/* Central main high-converting headline copy - single line high-fidelity hook */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-sans font-black text-white tracking-tight leading-[125%] max-w-6xl mx-auto"
          >
            Copie conteúdos altamente virais para estética,{' '}
            <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent font-black">
              100% testados, focados em atração, engajamento, vendas imediatas, e construir uma presença profissional no Instagram.
            </span>
          </motion.h1>

          {/* Subheadline matching reference layout, in bright typography */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl lg:text-[21px] text-zinc-200 max-w-3xl mx-auto leading-relaxed font-semibold"
          >
            Mesmo que você não saiba nada sobre <span className="font-extrabold text-white">design, marketing ou não tenha tempo</span>,{' '}
            <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent font-black inline">você poderá copiar e publicar em menos de 3 minutos.</span>
          </motion.p>

          {/* USER SPECIFIED GEMINI GENERATED IMAGE RIGHT AFTER SUBHEADLINE */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="my-8 flex justify-center"
          >
            <img 
              src="https://i.ibb.co/PzZJPyT1/Gemini-Generated-Image-d24gvnd24gvnd24g.png" 
              alt="Gemini Generated Image d24gvnd24gvnd24g" 
              referrerPolicy="no-referrer"
              className="max-w-full md:max-w-2xl h-auto rounded-3xl shadow-2xl border border-zinc-800"
            />
          </motion.div>

          {/* Second bouncy down arrow styled exactly like the violet reference circle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => onScrollToSection('galeria-posts')}
            className="my-8 flex justify-center cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700 text-white flex items-center justify-center shadow-lg animate-bounce transition-colors">
              <ArrowDown size={22} strokeWidth={2.5} />
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
