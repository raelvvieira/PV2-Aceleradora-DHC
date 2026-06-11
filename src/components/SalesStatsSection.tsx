import React from 'react';
import { motion } from 'motion/react';

export function SalesStatsSection() {
  return (
    <section 
      id="sales-stats-block" 
      className="py-10 md:py-16 px-4 md:px-8 bg-[#050505] text-white border-t border-zinc-900 relative overflow-hidden font-sans"
    >
      {/* Dynamic background glow decoration to tie into the dark theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-10">
        
        {/* Main big bold single headline */}
        <div className="max-w-4xl mx-auto text-center px-2">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-sans font-black tracking-tight text-white leading-tight">
            <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 block font-black">
              +11 milhões
            </span>
            <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 block font-black">
              de visualizações geradas.
            </span>{' '}
            <span className="text-base sm:text-lg md:text-xl font-bold text-zinc-300 block mt-4 max-w-2xl mx-auto leading-relaxed">
              93% de não seguidores. Essas são as postagens que vão estar no seu perfil toda semana.
            </span>
          </h2>
        </div>

        {/* Dynamic Image Display with stylish premium black glass container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-800 bg-[#0F0F12]/80 p-2 sm:p-3"
        >
          <img 
            src="https://i.ibb.co/r2PVm5n8/Gemini-Generated-Image-hbv4pzhbv4pzhbv4.png" 
            alt="Gemini Generated Image hbv4pzhbv4pzhbv4" 
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover rounded-xl sm:rounded-2xl border border-zinc-900 shadow-inner"
          />
        </motion.div>

      </div>
    </section>
  );
}
