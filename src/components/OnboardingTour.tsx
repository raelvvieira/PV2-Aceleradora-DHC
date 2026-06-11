import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, X, ChevronRight, Sparkles } from 'lucide-react';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: (completed: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

interface TourStep {
  title: string;
  text: string;
  targetId: string;
  mobileTargetId?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Menu Lateral',
    text: 'Este é o seu menu principal. Aqui você acessa todas as seções da plataforma.',
    targetId: 'app-sidebar',
    mobileTargetId: 'mobile-nav-header',
  },
  {
    title: 'Trilha de Aulas',
    text: 'Na Trilha de Aulas você encontra todos os módulos de marketing e vendas para estética. Assista no seu ritmo.',
    targetId: 'sidebar-nav-aulas',
    mobileTargetId: 'mobile-tab-aulas',
  },
  {
    title: 'Banco de Postagens',
    text: 'Aqui ficam as postagens virais validadas. Copie o gancho, acesse o link do Canva e personalize com a sua marca.',
    targetId: 'sidebar-nav-posts',
    mobileTargetId: 'mobile-tab-posts',
  },
  {
    title: 'Meu Perfil',
    text: 'Em Meu Perfil você atualiza seus dados e pode rever este tutorial quando quiser.',
    targetId: 'sidebar-nav-profile',
    mobileTargetId: 'mobile-tab-profile',
  },
  {
    title: 'Boas-vindas!',
    text: 'Tudo pronto! Agora é só começar. Sua jornada no digital começa aqui. 🚀',
    targetId: '', // Central pop-up - no target
  }
];

export function OnboardingTour({
  isOpen,
  onClose,
  activeTab,
  setActiveTab
}: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [targetRect, setTargetRect] = React.useState<DOMRect | null>(null);

  // Update target bounding box size when step or window changes
  const updateTargetRect = React.useCallback(() => {
    if (!isOpen) return;
    
    const step = TOUR_STEPS[currentStep];
    if (!step.targetId) {
      setTargetRect(null);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const elementId = isMobile ? (step.mobileTargetId || step.targetId) : step.targetId;
    const element = document.getElementById(elementId);
    
    if (element) {
      setTargetRect(element.getBoundingClientRect());
    } else {
      setTargetRect(null);
    }
  }, [currentStep, isOpen]);

  // Handle activeTab changes for highlighting specific elements
  React.useEffect(() => {
    if (!isOpen) return;

    // Proactively switch tabs in background to match step navigation context to make sure target exists!
    if (currentStep === 1 && activeTab !== 'aulas') {
      setActiveTab('aulas');
    } else if (currentStep === 2 && activeTab !== 'posts') {
      setActiveTab('posts');
    } else if (currentStep === 3 && activeTab !== 'profile') {
      setActiveTab('profile');
    }
  }, [currentStep, isOpen, activeTab, setActiveTab]);

  React.useEffect(() => {
    updateTargetRect();
    window.addEventListener('resize', updateTargetRect);
    window.addEventListener('scroll', updateTargetRect);
    
    // Check periodically as sidebar or DOM transitions happen
    const interval = setInterval(updateTargetRect, 200);

    return () => {
      window.removeEventListener('resize', updateTargetRect);
      window.removeEventListener('scroll', updateTargetRect);
      clearInterval(interval);
    };
  }, [updateTargetRect]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Finished
      onClose(true);
      setActiveTab('home');
      setCurrentStep(0);
    }
  };

  const handleSkip = () => {
    onClose(true);
    setActiveTab('home');
    setCurrentStep(0);
  };

  if (!isOpen) return null;

  const rect = targetRect;
  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  // Smart floating coordinate solver to avoid overlay overflow clipping
  const getPopoverStyle = () => {
    if (!rect) {
      // Centered fallback
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'fixed' as const
      };
    }

    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // On mobile, keep it floating symmetrically at bottom
      return {
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        position: 'fixed' as const,
        width: 'calc(100% - 32px)',
        maxWidth: '380px'
      };
    }

    // Desktop float positioning near rect cutout
    const popoverHeight = 220;
    const popoverWidth = 350;
    let top = rect.top + rect.height / 2 - popoverHeight / 2;
    let left = rect.right + 20;

    // Ensure within viewport bounds
    if (left + popoverWidth > window.innerWidth) {
      left = rect.left - popoverWidth - 20;
    }
    if (top + popoverHeight > window.innerHeight) {
      top = window.innerHeight - popoverHeight - 20;
    }
    if (top < 20) {
      top = 20;
    }

    return {
      top: `${top}px`,
      left: `${left}px`,
      position: 'fixed' as const,
      width: `${popoverWidth}px`
    };
  };

  return (
    <div id="onboarding-tour-portal" className="fixed inset-0 z-50 overflow-hidden font-sans pointer-events-none">
      {/* 1. TRANSLUCENT MASK CUTOUT */}
      <svg className="absolute inset-0 w-full h-full pointer-events-auto z-30">
        <defs>
          <mask id="cutout-svg-mask">
            {/* White color lets underlying layers through */}
            <rect width="100%" height="100%" fill="white" />
            {/* Black color cuts a hole out of the mask */}
            {rect && (
              <rect
                x={rect.left - 6}
                y={rect.top - 6}
                width={rect.width + 12}
                height={rect.height + 12}
                rx={16}
                ry={16}
                fill="black"
              />
            )}
          </mask>
        </defs>
        {/* Fill screen with translucency masked by our cutout */}
        <rect
          width="100%"
          height="100%"
          fill="rgba(5, 5, 7, 0.75)"
          mask="url(#cutout-svg-mask)"
        />
      </svg>

      {/* 2. GLOWING HIGHLIGHT BORDER TARGET RING */}
      {rect && (
        <div
          className="absolute border-2 border-[#FF1E40] rounded-2xl shadow-[0_0_24px_rgba(255,30,64,0.4)] transition-all duration-300 z-30 animate-pulse pointer-events-none"
          style={{
            top: rect.top - 6,
            left: rect.left - 6,
            width: rect.width + 12,
            height: rect.height + 12,
          }}
        />
      )}

      {/* 3. ASSISTANT FLOATING POPOVER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          style={getPopoverStyle()}
          className="pointer-events-auto bg-neutral-900 border border-white/10 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-white text-left flex flex-col justify-between z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#8100FF] to-[#FF1E40] flex items-center justify-center">
                <Sparkles size={11} className="text-white fill-white animate-spin-slow" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#FF1E40]">
                {TOUR_STEPS[currentStep].title}
              </h3>
            </div>
            
            <button 
              onClick={handleSkip}
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {/* Description */}
          <div className="flex-1">
            <p className="text-xs font-medium text-zinc-300 leading-relaxed min-h-[50px]">
              {TOUR_STEPS[currentStep].text}
            </p>
          </div>

          {/* Footer Controls */}
          <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
            {/* Step Counter */}
            <span className="text-[10px] font-bold text-white/40 font-mono">
              etapa {currentStep + 1} de {TOUR_STEPS.length}
            </span>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              {!isLastStep && (
                <button
                  onClick={handleSkip}
                  className="text-[10px] font-bold text-white/50 hover:text-white transition-all cursor-pointer hover:underline"
                >
                  Pular tutorial
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-[#FF1E40] text-white hover:bg-[#FF1E40]/90 select-none shadow-md shadow-rose-900/20 active:scale-[0.98] transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>{isLastStep ? 'Começar agora' : 'Próximo'}</span>
                {!isLastStep && <ChevronRight size={12} />}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
