import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReviewStars } from './ReviewStars';
import { Check, ShieldCheck, Mail, Phone, Lock, CreditCard, Sparkles, ChevronDown, ChevronUp, Star, Award, Sparkle, AlertCircle, HelpCircle, Gift } from 'lucide-react';

export function SalesOfferAndFAQ() {
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState("https://pay.kiwify.com.br/saaL1nC");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const utmParamQueryString = new URLSearchParams(window.location.search);
      if (utmParamQueryString.toString()) {
        const urlObj = new URL(checkoutUrl);
        utmParamQueryString.forEach((value, key) => {
          urlObj.searchParams.set(key, value);
        });
        setCheckoutUrl(urlObj.toString());
      }
    }
  }, []);

  const paraQuemE = [
    'Não tem tempo de criar post do zero todo dia.',
    'Quer um Instagram com cara de clínica premium, sem contratar designers caros.',
    'Está começando e quer construir autoridade rápido na sua região.',
    'Sente que seu Instagram não mostra o nível técnico que você realmente tem.',
    'Quer parar de depender só de indicação para lotar a agenda.',
    'Sente que pode vender muito mais pelo WhatsApp.'
  ];

  const faqItems = [
    {
      q: 'Preciso pagar a assinatura do Canva Pro para conseguir editar?',
      a: 'Absolutamente não! Todas as nossas criações, tipografias emparelhadas e elementos visuais são cuidadosamente selecionados e projetados utilizando recursos 100% inclusos na versão gratuita do Canva. Você edita tudo de graça.'
    },
    {
      q: 'Não entendo nada de marketing. As aulas explicam o básico?',
      a: 'Sim, a plataforma acompanha 14 módulos rápidos de capacitação digital prático. Te ensinamos do absoluto zero a configurar suas pastas, mexer no Canva pelo celular, configurar anúncios locais de botão e as rotinas comerciais de reativação.'
    },
    {
      q: 'Qual é o período mínimo de fidelidade contratual?',
      a: 'Nenhum! É uma mensalidade de recorrência contínua idêntica ao funcionamento da Netflix. Você pode cancelar sua assinatura em um clique com um e-mail simples diretamente na Kiwify, sem qualquer burocracia ou taxas de quebra.'
    },
    {
      q: 'Tenho garantia se por acaso eu não gostar do material?',
      a: 'Sim, você tem a nossa garantia incondicional de 7 dias de satisfação total. Se entrar na plataforma e achar que os materiais da semana não combinam com a excelência do seu consultório, basta solicitar o estorno na central της Kiwify e devolvemos 100% do seu dinheiro sem perguntas.'
    },
    {
      q: 'Como funciona o suporte técnico tira-dúvidas?',
      a: 'Temos um canal oficial dedicado exclusivamente para dúvidas de alunas. Você pode registrar qualquer pergunta sobre Canva, anúncios, gravação de reels ou cópias técnicas diretamente na nossa plataforma, respondidas por profissionais toda semana.'
    }
  ];

  return (
    <>
      {/* BLOCO 11 — PARA QUEM É (Auto-identificação comportamental) */}
      <section id="sales-for-who" className="py-10 md:py-14 px-4 md:px-8 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Headline - No pre-headlines / sub-headlines */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-[#1D1D1F] tracking-tight leading-tight max-w-4xl mx-auto">
            A Aceleradora DHC é <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 inline-block font-black">para você que...</span>
          </h2>

          <div className="space-y-4 pt-6 max-w-3xl mx-auto text-left">
            {paraQuemE.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-3.5 bg-zinc-50 rounded-2xl border border-zinc-100">
                <div className="p-1.5 rounded-full bg-rose-50 text-[#FF1E40] shrink-0 mt-0.5">
                  <Check size={15} className="stroke-[3]" />
                </div>
                <p className="text-base sm:text-lg text-zinc-800 font-black leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Visual Arrow Separator */}
          <div className="flex justify-center pt-4">
            <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shadow-md select-none">
              <svg className="w-5 h-5 stroke-[2.5]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* BLOCO 12 — OFERTA COMPLETA + BONUS + PRECO */}
      <section 
        id="sales-offer-block" 
        className="py-10 md:py-14 px-4 md:px-8 bg-gradient-to-tr from-[#FCFAF8] via-white to-[#F2EBFD] text-center relative overflow-hidden"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-rose-200/20 via-purple-200/20 to-[#8100FF]/10 blur-[90px] rounded-full pointer-events-none z-0"></div>

        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          
          {/* Headline - No pre-headlines as per layout guidelines */}
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-[#1D1D1F] tracking-tight leading-tight">
              Comece <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 inline-block font-black">agora mesmo</span>.
            </h2>
          </div>

          <div className="flex flex-col gap-8 text-left pt-6 max-w-3xl mx-auto">
            {/* Listagem de coisas inclusas - Stacked design with the lists at the top */}
            <div className="bg-white/90 backdrop-blur-xs border border-zinc-200/80 p-6 md:p-8 rounded-[28px] shadow-sm space-y-6">
              <div>
                <h3 className="text-sm sm:text-base font-black text-zinc-900 uppercase tracking-widest pl-0.5 border-b border-zinc-100 pb-3 block mb-4">
                  Estão inclusos na sua assinatura:
                </h3>

                {/* Highly complete grid cards representing unique, non-repeating assets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    "Banco de artes prontas toda semana",
                    "Reels prontos para publicar",
                    "Scripts de vendas no WhatsApp",
                    "33 aulas em 14 módulos",
                    "Rotina de vendas e CRM",
                    "Impulsionamento e anúncios"
                  ].map((title, idx) => (
                    <div 
                      key={idx} 
                      className="bg-[#FAF9F6] border border-zinc-200/70 rounded-xl p-4 flex items-center gap-3.5 hover:border-pink-500/30 hover:shadow-2xs transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] p-[1.5px] shrink-0">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-rose-500">
                          <Check size={13} className="stroke-[3.5]" />
                        </div>
                      </div>
                      <span className="text-sm sm:text-[15px] font-black text-zinc-800 uppercase tracking-wider leading-snug">
                        {title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bonus Group - Detailed layout of products, values, and kits as requested */}
              <div className="pt-6 border-t border-zinc-150 mt-1 space-y-4">
                <span className="text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] font-black uppercase tracking-widest pl-0.5 block">
                  BÔNUS EXCLUSIVOS DE HOJE
                </span>
                
                <div className="grid grid-cols-1 gap-5">
                  {/* Kit Agenda Cheia */}
                  <div className="bg-white border border-zinc-200/85 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start gap-4.5 hover:border-pink-500/40 hover:shadow-xs transition-all duration-300 relative overflow-hidden">
                    <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-[#FF1E40] via-[#D304D1] to-[#7B2FBE]"></div>
                    
                    {/* Contorno degradê do instagram com fundo branco */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] p-[2px] shrink-0 flex items-center justify-center shadow-xs">
                      <div className="w-full h-full bg-white rounded-[13px] flex items-center justify-center text-[#D304D1]">
                        <Gift size={24} className="stroke-[2.5]" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 space-y-3.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-zinc-100 pb-2.5">
                        <h4 className="text-[16px] sm:text-[17px] font-black text-zinc-950 uppercase tracking-wide leading-snug">
                          Kit Agenda Cheia
                        </h4>
                        <span className="text-[13px] sm:text-sm font-black flex items-center gap-2 shrink-0">
                          <span className="text-zinc-400 line-through">De R$ 236,00</span>
                          <span className="text-[#22C55E] uppercase tracking-wider">Grátis</span>
                        </span>
                      </div>
                      
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-zinc-800 font-bold leading-relaxed">
                          <span className="text-emerald-500 font-extrabold text-[15px] leading-none select-none shrink-0 mt-0.5">✓</span>
                          <span>Scripts de Abordagem no WhatsApp <span className="text-zinc-400 font-black line-through text-[11px] ml-1.5">R$ 147</span></span>
                        </div>
                        <div className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-zinc-800 font-bold leading-relaxed">
                          <span className="text-emerald-500 font-extrabold text-[15px] leading-none select-none shrink-0 mt-0.5">✓</span>
                          <span>Pack com 20 Campanhas de Reativação <span className="text-zinc-400 font-black line-through text-[11px] ml-1.5">R$ 89</span></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kit Presença Digital */}
                  <div className="bg-white border border-zinc-200/85 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start gap-4.5 hover:border-pink-500/40 hover:shadow-xs transition-all duration-300 relative overflow-hidden">
                    <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-[#FF1E40] via-[#D304D1] to-[#7B2FBE]"></div>
                    
                    {/* Contorno degradê do instagram com fundo branco */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] p-[2px] shrink-0 flex items-center justify-center shadow-xs">
                      <div className="w-full h-full bg-white rounded-[13px] flex items-center justify-center text-[#D304D1]">
                        <Gift size={24} className="stroke-[2.5]" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 space-y-3.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-zinc-100 pb-2.5">
                        <h4 className="text-[16px] sm:text-[17px] font-black text-zinc-950 uppercase tracking-wide leading-snug">
                          Kit Presença Digital
                        </h4>
                        <span className="text-[13px] sm:text-sm font-black flex items-center gap-2 shrink-0">
                          <span className="text-zinc-400 line-through">De R$ 243,00</span>
                          <span className="text-[#22C55E] uppercase tracking-wider">Grátis</span>
                        </span>
                      </div>
                      
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-zinc-800 font-bold leading-relaxed">
                          <span className="text-emerald-500 font-extrabold text-[15px] leading-none select-none shrink-0 mt-0.5">✓</span>
                          <span>Mapa Mental da Rotina de Vendas <span className="text-zinc-400 font-black line-through text-[11px] ml-1.5">R$ 97</span></span>
                        </div>
                        <div className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-zinc-800 font-bold leading-relaxed">
                          <span className="text-emerald-500 font-extrabold text-[15px] leading-none select-none shrink-0 mt-0.5">✓</span>
                          <span>Como Aparecer Mais no Google <span className="text-zinc-400 font-black line-through text-[11px] ml-1.5">R$ 67</span></span>
                        </div>
                        <div className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-zinc-800 font-bold leading-relaxed">
                          <span className="text-emerald-500 font-extrabold text-[15px] leading-none select-none shrink-0 mt-0.5">✓</span>
                          <span>Checklist de Organização de Leads <span className="text-zinc-400 font-black line-through text-[11px] ml-1.5">R$ 79</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total de bônus feedback */}
                <div className="mt-4 p-4.5 bg-rose-50/50 border border-rose-100/60 rounded-2xl text-center flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                  <div className="text-left">
                    <span className="text-sm font-black text-zinc-750 uppercase tracking-widest block">Total em bônus se vendidos separadamente</span>
                    <span className="text-xs text-zinc-500 font-bold leading-none block mt-1">Inclusos gratuitamente na sua inscrição hoje.</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-2xl sm:text-3xl font-black text-zinc-400 line-through tracking-wider">R$ 479,00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Box & Green CTA trigger - Styled with Instagram Gradient Border container */}
            <div className="w-full max-w-xl mx-auto rounded-[32px] bg-gradient-to-tr from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] p-[2px] shadow-xl shadow-purple-500/10 flex flex-col justify-between">
              <div className="bg-white text-zinc-900 rounded-[30px] p-6 sm:p-8 h-full flex flex-col justify-between relative overflow-hidden">
                
                <div>
                  {/* Visual Top Badge emphasizing discount - Instagram Gradient border! */}
                  <div className="flex justify-center mb-5 mt-1">
                    <div className="rounded-full bg-gradient-to-tr from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] p-[1.5px] shadow-2xs">
                      <div className="px-4 py-1.5 rounded-full bg-white flex items-center gap-1.5">
                        <Sparkles size={11.5} className="text-[#D304D1] fill-[#D304D1] shrink-0" />
                        <span className="text-[10px] sm:text-[11.5px] font-black uppercase tracking-widest bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent">
                          90% de Desconto Ativo
                        </span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-[11px] font-black text-zinc-500 uppercase tracking-widest text-center leading-none">
                    MENSALIDADE RECORRENTE
                  </h4>

                  <div className="text-center py-6 my-4 space-y-2 bg-zinc-50/70 p-6 rounded-2xl border border-zinc-200/50">
                    {/* Highly evident crossed out price */}
                    <p className="text-xs sm:text-sm text-zinc-400 line-through uppercase font-bold tracking-widest leading-none">
                      De R$ 897,00/mês
                    </p>
                    
                    <p className="text-xs text-emerald-600 font-black uppercase tracking-widest leading-none">
                      Por Apenas
                    </p>

                    {/* Highly prominent current price numbers */}
                    <div className="flex items-baseline justify-center gap-1.5 py-1 font-sans">
                      <span className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">R$</span>
                      <span className="text-6xl sm:text-7xl font-sans font-black tracking-tight text-zinc-950 leading-none">97</span>
                      <span className="text-2xl sm:text-3xl font-black text-zinc-950">,00</span>
                      <span className="text-sm sm:text-base font-bold text-zinc-500 ml-1">/mês</span>
                    </div>

                    <p className="text-[11.5px] text-zinc-600 font-semibold leading-relaxed max-w-xs mx-auto">
                      Cancele quando quiser • Sem carência contratual ou taxas extras
                    </p>
                  </div>

                  {/* Big GREEN CTA with glowing animation (MOVED UP AND UPGRADED TO POLISHED GRADIENT) */}
                  <div className="mt-4 mb-5 space-y-3">
                    <a
                      href={checkoutUrl}
                      className="w-full py-4.5 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#12A044] hover:from-[#1EAF50] hover:to-[#0F8A38] hover:shadow-[0_12px_28px_rgba(34,197,94,0.35)] hover:scale-101 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-md select-none block text-center"
                    >
                      GARANTIR ACESSO POR R$97/MES
                    </a>

                    <div className="flex items-center justify-center gap-4 text-[9px] text-[#A1A1AA] opacity-95 uppercase tracking-widest pl-0.5">
                      <div className="flex items-center gap-0.5">
                        <ShieldCheck size={11} className="text-emerald-500" />
                        <span>Compra 100% Segura</span>
                      </div>
                      <div className="w-1 h-1 bg-zinc-200 rounded-full"></div>
                      <div className="flex items-center gap-0.5">
                        <Star size={11} className="text-amber-500 fill-amber-500" />
                        <span>7 Dias de Garantia</span>
                      </div>
                    </div>
                  </div>

                  {/* Inside card assurances */}
                  <div className="py-4 space-y-2.5 border-t border-zinc-150/70">
                    {[
                      "Acesso imediato à central com os links do Canva",
                      "Novas fotos, legendas e pastas toda semana",
                      "Aulas gravadas passo a passo inclusas na assinatura"
                    ].map((bullet, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-[11px] sm:text-[12px] text-zinc-650 font-semibold leading-relaxed">
                        <Check size={12} className="text-[#22C55E] shrink-0 stroke-[3] mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Payment Brands & Checkout Badge - (MOVED DOWN TO FOOTER OF CARD) */}
                  <div className="flex justify-center mt-4 pt-4 border-t border-zinc-100 px-1.5 w-full">
                    <img 
                      src="https://i.ibb.co/BHvDQ1rG/Design-sem-nome.png" 
                      alt="Bases de Pagamento e Segurança" 
                      referrerPolicy="no-referrer"
                      className="w-full max-w-[380px] sm:max-w-full h-auto object-contain"
                    />
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO — AGORA VOCÊ TEM DUAS OPÇÕES (Design Moderno, Fundo Branco, Copy Adaptada, Alta Conversão) */}
      <section 
        id="sales-two-options" 
        className="py-12 md:py-16 px-4 md:px-8 bg-white text-zinc-900 overflow-hidden text-center"
      >
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight leading-tight text-zinc-950">
              Agora você tem <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 inline-block font-black">duas opções</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto items-stretch">
            {/* Opção 01 — Sem o método */}
            <div className="p-6 sm:p-8 rounded-[24px] bg-zinc-50 border border-zinc-200/80 flex flex-col justify-between">
              <div>
                <div className="text-center pb-4 border-b border-zinc-200/60">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-black block mb-1">Opção 01</span>
                  <h4 className="text-base font-black text-zinc-850 uppercase tracking-wide">Sem o método DHC</h4>
                </div>
                
                <div className="space-y-4 text-left w-full mt-6 max-w-sm mx-auto">
                  {[
                    "Ignorar tudo o que você viu até aqui",
                    "Continuar sofrendo sem posts estéticos",
                    "Não atrair clientes com o seu perfil",
                    "Ter um Instagram amador de clínica local"
                  ].map((text, index) => (
                    <div key={index} className="flex items-start gap-3.5">
                      <span className="text-red-500 font-extrabold text-[15px] leading-none select-none shrink-0 mt-1">✕</span>
                      <p className="text-sm sm:text-base md:text-[17px] text-zinc-650 font-semibold leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Opção 02 — Com a Aceleradora DHC (Branco com contorno degrade instagram) */}
            <div className="rounded-[24px] bg-gradient-to-tr from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] p-[2px] shadow-xl shadow-purple-500/10 flex flex-col justify-between relative transform hover:scale-[1.01] transition-transform duration-300">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] text-white px-3.5 py-1 rounded-full uppercase tracking-widest font-black shadow-md">
                Recomendado
              </span>
              <div className="bg-white rounded-[22px] p-6 sm:p-8 h-full flex flex-col justify-between text-zinc-900">
                <div>
                  <div className="text-center pb-4 border-b border-zinc-200/60">
                    <span className="text-purple-600 text-[10px] uppercase tracking-widest font-black block mb-1">Opção 02</span>
                    <h4 className="text-base font-black text-zinc-950 uppercase tracking-wide">Com a Aceleradora DHC</h4>
                  </div>
                  
                  <div className="space-y-4 text-left w-full mt-6 max-w-sm mx-auto">
                    {[
                      "Posts virais para estética toda semana.",
                      "Edições fáceis no Canva em poucos minutos.",
                      "Instagram profissional que transmite autoridade real.",
                      "Rotina de vendas para agendamentos diários.",
                      "Aprenda a fazer impulsionamento e anúncios que convertem.",
                      "Saiba criar campanhas de reativação de clientes."
                    ].map((text, index) => (
                      <div key={index} className="flex items-start gap-3.5">
                        <span className="text-emerald-500 font-extrabold text-[15px] leading-none select-none shrink-0 mt-1">✓</span>
                        <p className="text-sm sm:text-base md:text-[17px] text-zinc-750 font-bold leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Micro Quote & Elegant Button (UPGRADED TO GREEN DEGRADE TYPE WITH EMPTY/CLEAN BG) */}
          <div className="pt-6 max-w-md mx-auto space-y-6 text-center">
            <button
              onClick={() => document.getElementById('sales-offer-block')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-4.5 rounded-xl text-white font-black text-xs sm:text-sm uppercase tracking-widest bg-gradient-to-r from-[#22C55E] to-[#12A044] hover:from-[#1EAF50] hover:to-[#0F8A38] hover:shadow-[0_12px_28px_rgba(34,197,94,0.35)] transition-all cursor-pointer shadow-md select-none transform hover:scale-[1.01]"
            >
              ENTRAR NA PLATAFORMA DHC AGORA
            </button>
          </div>
        </div>
      </section>

      {/* BLOCO 13 — QUEM E DENI HAUT (Retira a barreira da aprovação da mentora) */}
      <section id="sales-about-mentor" className="py-10 md:py-14 px-4 md:px-8 bg-white text-zinc-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Denny's photo - explicitly 3x4 aspect ratio as requested, and 15% smaller on mobile */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full max-w-[289px] sm:max-w-[340px] aspect-[3/4] rounded-[28px] overflow-hidden border border-zinc-200/80 shadow-md">
              <img
                src="https://i.ibb.co/8L5ygD7t/Design-sem-nome-3.png"
                alt="Deni Haut — Mentora e Fundadora"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[98%]"
              />
            </div>
          </div>

          {/* Right Column: Bio texts and inspiring Quote card */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Headline - No pre-headlines as per layout rules */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-[#1D1D1F] tracking-tight leading-tight">
              Criado para resolver a dor que eu <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 inline-block font-black">vivi na pele</span>.
            </h2>

            <p className="text-zinc-650 text-xs sm:text-[14px] leading-relaxed font-semibold text-justify">
              Deni Haut é CEO e proprietária da Deni Haut Cursos. Mentora e pesquisadora reconhecida nacionalmente, Deni acumula uma trajetória de sucesso conduzindo protocolos avançados, aprimorando técnicas e elevando o padrão de excelência no setor.
            </p>
          </div>

        </div>
      </section>



      {/* BLOCO EXTRA — PERGUNTAS FREQUENTES (FAQ) ACCORDIONS */}
      <section id="sales-faq" className="py-10 md:py-14 px-4 md:px-8 bg-[#FAF9F5] text-zinc-900 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Headline - No pre-headlines as per layout guidelines */}
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-[#1D1D1F] tracking-tight">
              Tudo o que você <span className="bg-gradient-to-r from-[#FF1E40] via-[#D304D1] to-[#7B2FBE] bg-clip-text text-transparent px-1 inline-block font-black">precisa saber</span>.
            </h2>
          </div>

          {/* Collapsible Accordions list */}
          <div className="space-y-3.5 text-left pt-6">
            {faqItems.map((item, idx) => {
              const isOpen = activeFaqIdx === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-zinc-200/85 p-4 sm:p-5 transition-all shadow-xs hover:border-zinc-300"
                >
                  <button
                    onClick={() => setActiveFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="font-extrabold text-zinc-800 text-xs sm:text-sm uppercase tracking-wide leading-snug pl-0.5">
                      {item.q}
                    </span>
                    <span className="text-zinc-400 shrink-0 ml-4 font-bold text-xs select-none">
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 pt-3 border-t border-zinc-100 text-[11.5px] sm:text-xs text-zinc-500 leading-relaxed font-normal">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
