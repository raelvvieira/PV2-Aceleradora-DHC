import React from 'react';
import { motion } from 'motion/react';

const CAROUSEL_IMAGES = [
  "https://i.ibb.co/GfjMCThp/18.png",
  "https://i.ibb.co/rRqFPZGh/27.png",
  "https://i.ibb.co/JjRsGbHL/28.png",
  "https://i.ibb.co/9kGNt3ZX/32.png",
  "https://i.ibb.co/q36MbJn8/40.png",
  "https://i.ibb.co/Mxywmz8r/49.png",
  "https://i.ibb.co/qXqfwgM/58.png",
  "https://i.ibb.co/BV7rG8Qn/62.png",
  "https://i.ibb.co/6RJWMqZQ/65.png",
  "https://i.ibb.co/8DXrVYw4/67.png",
  "https://i.ibb.co/rK2v3xvm/77.png",
  "https://i.ibb.co/gZT1Q0vy/81.png",
  "https://i.ibb.co/nqghdXdy/164.png",
  "https://i.ibb.co/1txf8wFV/195.png",
  "https://i.ibb.co/dwZ12vYK/199.png",
  "https://i.ibb.co/qMxj1MXW/256.png",
  "https://i.ibb.co/S4ZcyrLb/271.png",
  "https://i.ibb.co/DPhQvpkR/Essa-teoria-da-Gisele-B-ndchen-2.png",
  "https://i.ibb.co/GfJWSzWh/Essa-teoria-da-Gisele-B-ndchen-3.png",
  "https://i.ibb.co/ccZXHbHr/Essa-teoria-da-Gisele-B-ndchen-4.png",
  "https://i.ibb.co/TB46ckGS/Melasma-n-o-s-mancha-4.png",
  "https://i.ibb.co/MkgbjsWP/Melasma-n-o-s-mancha-5.png",
  "https://i.ibb.co/JjrrRBxJ/Melasma-n-o-s-mancha.png",
  "https://i.ibb.co/mr080dNz/Ros-cea-n-o-s-o-rubor-2.png",
  "https://i.ibb.co/tw04VYP4/Ros-cea-n-o-s-o-rubor-3.png",
  "https://i.ibb.co/wNjLf51P/Ros-cea-n-o-s-o-rubor-4.png",
  "https://i.ibb.co/ktDYqP5/Ros-cea-n-o-s-o-rubor-5.png",
  "https://i.ibb.co/Pv9mSBMd/Somente-20-do-envelhecimento-da-pele-gen-tica.png",
  "https://i.ibb.co/R8pg37r/6.png",
  "https://i.ibb.co/8nqwtXny/12.png",
  "https://i.ibb.co/qMcK8DLn/14.png"
];

const ROW_1_IMAGES = CAROUSEL_IMAGES.slice(0, 15);
const ROW_2_IMAGES = CAROUSEL_IMAGES.slice(15);

interface SalesViralCarouselProps {
  onScrollToSection: (id: string) => void;
}

export function SalesViralCarousel({ onScrollToSection }: SalesViralCarouselProps) {
  return (
    <section 
      id="galeria-posts" 
      className="relative py-16 px-4 md:px-8 bg-white overflow-hidden text-center select-normal border-t border-zinc-200/80"
    >
      {/* Premium subtle light background glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF1E40]/10 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-400/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Social Proof Star Ratings mimicking reference exactly */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 mb-4"
        >
          {/* Stars rendering */}
          <div className="flex items-center gap-1 select-none">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F59E0B" className="w-5 h-5 sm:w-6 sm:h-6">
                <path fillRule="#F59E0B" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            ))}
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-sans font-black text-zinc-900 tracking-tight leading-tight uppercase text-center max-w-4xl">
            Veja abaixo os post's virais criados com o nosso método e equipe de designers.
          </h2>
        </motion.div>

        {/* HIGH FIDELITY DUAL-ROW INFINITE SLIDING CAROUSEL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 mb-10 relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-4 max-w-[100vw]"
        >
          {/* Custom Infinite Scroll Keyframes Styles embedded dynamically */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes slideLeft {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes slideRight {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-infinite-left {
              animation: slideLeft 75s linear infinite;
            }
            .animate-infinite-right {
              animation: slideRight 75s linear infinite;
            }
            .animate-infinite-left:hover, .animate-infinite-right:hover {
              animation-play-state: paused;
            }
          `}} />

          {/* Fading Edge Gradients matching white background theme */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-44 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 sm:w-44 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

          <div className="space-y-6 bg-zinc-100/50 py-4">
            {/* ROW 1: Slides LEFT slowly */}
            <div className="flex overflow-hidden select-none animate-fade-in">
              <div className="flex gap-4 animate-infinite-left whitespace-nowrap px-4">
                {/* Duplicated list of Row 1 images to achieve seamless infinite loop */}
                {[...ROW_1_IMAGES, ...ROW_1_IMAGES].map((imgUrl, idx) => (
                  <div 
                    key={`r1-${idx}`}
                    className="w-[156px] h-[208px] sm:w-[210px] sm:h-[280px] shrink-0 rounded-2xl overflow-hidden bg-white shadow-lg border border-zinc-200/80 flex-none"
                  >
                    <img 
                      src={imgUrl} 
                      alt="Artes e posts virais validados" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2: Slides RIGHT slowly */}
            <div className="flex overflow-hidden select-none">
              <div className="flex gap-4 animate-infinite-right whitespace-nowrap px-4">
                {/* Duplicated list of Row 2 images to achieve seamless infinite loop */}
                {[...ROW_2_IMAGES, ...ROW_2_IMAGES].map((imgUrl, idx) => (
                  <div 
                    key={`r2-${idx}`}
                    className="w-[156px] h-[208px] sm:w-[210px] sm:h-[280px] shrink-0 rounded-2xl overflow-hidden bg-white shadow-lg border border-zinc-200/80 flex-none"
                  >
                    <img 
                      src={imgUrl} 
                      alt="Artes e posts virais validados" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Call Button specifically underneath the carousel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mt-6"
        >
          <button
            id="cta-hero-immediate-buy"
            onClick={() => onScrollToSection('sales-offer-block')}
            className="px-10 py-5 sm:px-12 sm:py-5.5 rounded-full text-white font-black text-sm uppercase tracking-wider bg-gradient-to-r from-[#22C55E] to-[#12A044] hover:from-[#1EAF50] hover:to-[#0F8A38] hover:shadow-[0_12px_28px_rgba(34,197,94,0.35)] transition-all cursor-pointer hover:scale-102 active:scale-98 shadow-md lg:px-14 select-none"
          >
            QUERO MEUS POSTS AGORA
          </button>
        </motion.div>
      </div>
    </section>
  );
}
