import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

// Modular block imports for high conversion sales structure
import { SalesHero } from './components/SalesHero';
import { SalesViralCarousel } from './components/SalesViralCarousel';
import { SalesStatsSection } from './components/SalesStatsSection';
import { SalesPainSection } from './components/SalesPainSection';
import { SalesTestimonials } from './components/SalesTestimonials';
import { SalesPillarsAndModules } from './components/SalesPillarsAndModules';
import { SalesComparisonAndProcess } from './components/SalesComparisonAndProcess';
import { SalesOfferAndFAQ } from './components/SalesOfferAndFAQ';

export default function App() {
  // Smooth scroll transitions triggered by CTA clicks
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-zinc-900 font-sans tracking-tight antialiased select-normal">
      
      {/* BLOCK 1 & 2: Navbar & Hero Section */}
      <SalesHero 
        onScrollToSection={scrollToSection} 
      />

      {/* BLOCK 2.5: Separate Viral Gallery Carousel Section */}
      <SalesViralCarousel 
        onScrollToSection={scrollToSection} 
      />

      {/* BLOCK 3: Video engagement stats and follow ratio banner */}
      <SalesStatsSection />

      {/* BLOCK 4: WhatsApp Screenshots and Reviews star grid */}
      <SalesTestimonials onScrollToSection={scrollToSection} />

      {/* BLOCK 5 & 6: Pain Objections Agitation Section ("Eu sei...") and Cause & Solution transitions */}
      <SalesPainSection />

      {/* BLOCK 8: Breakdown of Pillar 1 (Drives), Pillar 2 (WhatsApp/Direct scripts), and Pillar 3 (Interactive course modules curriculum viewer) */}
      <SalesPillarsAndModules onScrollToSection={scrollToSection} />

      {/* BLOCK 9 & 10: Comparison Tables (SEM DHC vs COM DHC) and structural 4 Steps guide */}
      <SalesComparisonAndProcess onScrollToSection={scrollToSection} />

      {/* BLOCK 11, 12, 13, 14, & FAQ accordions */}
      <SalesOfferAndFAQ />

      {/* FOOTER BLOCK (Zero distraction, highly standardized) */}
      <footer id="sales-footer" className="relative bg-white text-zinc-500 py-12 px-4 md:px-8 text-center select-none">
        {/* Instagram top border gradient line */}
        <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE]"></div>

        <div className="max-w-5xl mx-auto space-y-6 pt-2">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest font-extrabold bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent">Aceleradora DHC — Todos os Direitos Reservados</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
            <span>Privacidade</span>
            <div className="hidden sm:inline w-1 h-1 bg-zinc-200 rounded-full"></div>
            <span>Termos de Uso</span>
            <div className="hidden sm:inline w-1 h-1 bg-zinc-200 rounded-full"></div>
            <span>Suporte Kiwify</span>
          </div>

          <p className="text-[9.5px] text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A Aceleradora DHC é de titularidade de estúdio de soluções digitais corporativas. Kiwify é uma marca pertencente à empresa processadora terceirizada de pagamentos recorrentes e recorrência mensal segura. Imprevistos e cancelamentos podem ser efetuados sem taxas no painel de compras.
          </p>

          <div className="pt-2 flex items-center justify-center gap-1 text-[9px] text-zinc-450 font-mono">
            <span>Made with</span>
            <Heart size={9} className="text-[#D304D1] fill-[#D304D1]" />
            <span>by DHC Creative Studio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
