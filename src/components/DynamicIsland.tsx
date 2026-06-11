import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles
} from 'lucide-react';
import { Lesson, Module, UserProfile } from '../types';

interface DynamicIslandProps {
  modules: Module[];
  lessons: Lesson[];
  watchedLessonIds: string[];
  lessonRatings: Record<string, number>;
  onToggleWatched: (lessonId: string) => void;
  onRateLesson: (lessonId: string, rating: number) => void;
  user: UserProfile;
  activeLessonId: string;
  setActiveLessonId: (id: string) => void;
  viewStage: 'modules' | 'lessons' | 'player';
  setViewStage: (stage: 'modules' | 'lessons' | 'player') => void;
  selectedModuleId: string;
  setSelectedModuleId: (id: string) => void;
  activeTab: string;
  setActiveTab: (tab: 'home' | 'aulas' | 'posts' | 'admin' | 'profile') => void;
}

// 1. Estímulo / Motivação
const ESTIMULOS = [
  "Você não precisa ser perfeita, precisa ser consistente. E você já está aqui. ✨",
  "Cada aula que você assiste é um passo que sua concorrente não deu hoje.",
  "Aprender é o primeiro ato de quem decide crescer. Você já decidiu.",
  "Não existe esteticista de sucesso que não passou por esse momento de aprender do zero.",
  "O desconforto que você sente agora é o crescimento acontecendo.",
  "Uma coisa de cada vez. Você está no ritmo certo.",
  "Toda cliente fiel que você tem hoje começou com uma primeira conversa. Esse conhecimento vai criar muitas novas.",
  "Você não está atrasada. Você está começando, e isso já é muito.",
  "As profissionais que mais faturam não são as mais talentosas. São as mais preparadas.",
  "Confie no processo. Deni construiu tudo isso pensando em você."
];

// 2. Dicas de Como Estudar
const DICAS_ESTUDO = [
  "💡 Assista com o celular na mão. Já vai treinando ao mesmo tempo em que aprende.",
  "💡 Não precisa anotar tudo, só o que você vai aplicar essa semana.",
  "💡 Assista uma aula, aplique. Depois volte para a próxima. Conhecimento sem prática não transforma.",
  "💡 Se travar em algo, avança. Muitas dúvidas se resolvem nos módulos seguintes.",
  "💡 Reveja uma aula quantas vezes precisar. Não existe limite aqui.",
  "💡 Separe 30 minutinhos por dia. Em um mês você terá transformado seu negócio.",
  "💡 Salva o conteúdo que você quer revisitar. Você vai agradecer depois.",
  "💡 O melhor horário para estudar é o que cabe na sua rotina. Não existe horário errado.",
  "💡 Se você não entendeu na primeira vez, não é falta de capacidade. É parte do processo.",
  "💡 Compartilhe o que está aprendendo. Ensinar fixa o conhecimento e ainda inspira outras."
];

// 3. Avisos de Continuidade
const AVISOS_CONTINUIDADE = [
  "👋 Que bom te ver de volta! Você tinha parado em {{NOME_AULA}}, quer continuar de onde parou?",
  "Você estava assistindo {{NOME_MODULO}}. Falta pouco para terminar! ▶️",
  "Olá! Faz alguns dias que você não aparecia por aqui. Bora retomar?",
  "Sua última aula foi {{NOME_AULA}}. Ela te espera quando você estiver pronta. 🌷",
  "Você pausou no meio de uma aula importante. Tudo bem, a aula guardou seu lugar.",
  "Seu progresso no {{NOME_MODULO}} está em andamento. Continue de onde parou! 💪",
  "Lembra que você começou o {{NOME_MODULO}}? Ele ainda está esperando por você.",
  "Você está quase terminando esse módulo! Só mais uma aulinha e você passa para o próximo nível.",
  "Sentimos sua falta! Sua mentoria continua te esperando aqui. 🤍",
  "Cada dia que você retorna é uma prova de compromisso com o seu negócio."
];

// 4. Celebração de Progresso (Aula)
const CELEBRACOES_AULA = [
  "🎉 Aula concluída! Você está construindo algo incrível, uma aula de cada vez.",
  "Mais uma aula concluída. O negócio que você sonha está sendo construído agora.",
  "Cada ✅ na sua lista é uma versão mais preparada de você. Continue assim."
];

// Soft Synthesized audio feedback for gamified actions (Web Audio API)
const triggerWebAudioCue = (type: 'check' | 'star' | 'expand') => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if (type === 'check') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.08); // E5
      osc.frequency.exponentialRampToValueAtTime(880.00, audioCtx.currentTime + 0.2); // A5
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.32);
    } else if (type === 'star') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880.00, audioCtx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1318.51, audioCtx.currentTime + 0.15); // E6
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.42);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.16);
    }
  } catch (e) {
    // Graceful fallback for browsers block autoplay
  }
};

export function DynamicIsland({
  modules,
  lessons,
  watchedLessonIds,
  lessonRatings,
  onToggleWatched,
  onRateLesson,
  user,
  activeLessonId,
  setActiveLessonId,
  viewStage,
  setViewStage,
  selectedModuleId,
  setSelectedModuleId,
  activeTab,
  setActiveTab
}: DynamicIslandProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [currentPrompt, setCurrentPrompt] = React.useState("");

  // Safely touch variables to satisfy ESLint
  React.useEffect(() => {
    const _touch = [lessonRatings, onToggleWatched, onRateLesson, user, setActiveLessonId, setViewStage, setSelectedModuleId, activeTab, setActiveTab];
    if (!_touch[0]) return;
  }, [lessonRatings, onToggleWatched, onRateLesson, user, setActiveLessonId, setViewStage, setSelectedModuleId, activeTab, setActiveTab]);

  // Keep track of active content to populate continuity placeholders
  React.useEffect(() => {
    if (activeLessonId) {
      const lesson = lessons.find(l => l.id === activeLessonId);
      if (lesson) {
        localStorage.setItem('last_active_lesson_title', lesson.title);
      }
    }
  }, [activeLessonId, lessons]);

  React.useEffect(() => {
    if (selectedModuleId) {
      const mod = modules.find(m => m.id === selectedModuleId);
      if (mod) {
        localStorage.setItem('last_selected_module_title', mod.title);
      }
    }
  }, [selectedModuleId, modules]);

  // General state triggers on load
  React.useEffect(() => {
    const now = new Date();

    // Check / set first access date
    let firstAccess = localStorage.getItem('first_access_date');
    if (!firstAccess) {
      firstAccess = now.toISOString();
      localStorage.setItem('first_access_date', firstAccess);
    }

    const firstAccessTime = new Date(firstAccess).getTime();
    const daysSinceFirstAccess = (now.getTime() - firstAccessTime) / (1000 * 60 * 60 * 24);

    // 1. Primeiras semanas (daysSinceFirstAccess < 7): Dicas de estudo diariamente (com chance de 40%)
    if (daysSinceFirstAccess < 7) {
      const todayStr = now.toISOString().split('T')[0];
      const lastDailyTip = localStorage.getItem('last_daily_tip_date');

      if (lastDailyTip !== todayStr) {
        if (Math.random() < 0.4) {
          const randomIndex = Math.floor(Math.random() * DICAS_ESTUDO.length);
          setCurrentPrompt(DICAS_ESTUDO[randomIndex]);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
        localStorage.setItem('last_daily_tip_date', todayStr);
        localStorage.setItem('last_user_access_time', now.toISOString());
        return;
      }
    }

    // 2. Login após 3+ dias ausente: Avisos de continuidade (com chance de 35%)
    const lastAccessTimeStr = localStorage.getItem('last_user_access_time');
    const lastAccessTime = lastAccessTimeStr ? new Date(lastAccessTimeStr).getTime() : 0;
    const daysSinceLastAccess = lastAccessTime ? (now.getTime() - lastAccessTime) / (1000 * 60 * 60 * 24) : 0;

    if (daysSinceLastAccess >= 3) {
      if (Math.random() < 0.35) {
        const lastActiveLesson = localStorage.getItem('last_active_lesson_title');
        const lastActiveMod = localStorage.getItem('last_selected_module_title');

        const genericAvisos = AVISOS_CONTINUIDADE.map(phrase => {
          return phrase
            .replace('{{NOME_AULA}}', lastActiveLesson ? `"${lastActiveLesson}"` : 'sua última aula')
            .replace('{{NOME_MODULO}}', lastActiveMod ? `"${lastActiveMod}"` : 'seu último módulo');
        });

        const randomIndex = Math.floor(Math.random() * genericAvisos.length);
        setCurrentPrompt(genericAvisos[randomIndex]);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    } else {
      // General fallbacks: Estímulos (apenas 10% de chance para não sobrecarregar)
      if (Math.random() < 0.10) {
        const randomIndex = Math.floor(Math.random() * ESTIMULOS.length);
        setCurrentPrompt(ESTIMULOS[randomIndex]);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    // Always update last access time to now
    localStorage.setItem('last_user_access_time', now.toISOString());
  }, []);

  // 3. Monitoramento de Sessões Longas (30+ minutos), 1 de cada 10 vezes mostrar Dica
  const isSessionTipShown = React.useRef(false);
  React.useEffect(() => {
    const sessionStart = Date.now();
    const interval = setInterval(() => {
      const elapsedMinutes = (Date.now() - sessionStart) / (1000 * 60);
      if (elapsedMinutes >= 30 && !isSessionTipShown.current) {
        isSessionTipShown.current = true;
        if (Math.random() < 0.10) {
          const randomIndex = Math.floor(Math.random() * DICAS_ESTUDO.length);
          setCurrentPrompt(DICAS_ESTUDO[randomIndex]);
          setIsVisible(true);
          triggerWebAudioCue('expand');
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // 4. Mudança de Módulo: Estímulo (1 de cada 20 vezes) ou Lembrete de Ferramentas (15% das vezes)
  const previousModuleId = React.useRef<string>('');
  React.useEffect(() => {
    if (selectedModuleId && selectedModuleId !== previousModuleId.current) {
      if (previousModuleId.current) {
        let matchedToolMessage = '';

        if (selectedModuleId === 'mod-4') {
          matchedToolMessage = '📱 Antes de assistir essa aula, já deixa o Canva aberto no celular ou computador.';
        } else if (selectedModuleId === 'mod-5') {
          matchedToolMessage = '🎬 Essa aula usa o CapCut. Se ainda não tem instalado, vale baixar agora, é gratuito!';
        } else if (selectedModuleId === 'mod-13') {
          matchedToolMessage = '💬 Você já configurou seu WhatsApp Business? O Módulo 13 te ensina tudo sobre isso.';
        } else if (selectedModuleId === 'mod-8') {
          matchedToolMessage = '📊 Depois dessa aula, acessa o Gerenciador de Anúncios e dá uma olhada, vai fazer mais sentido.';
        } else if (selectedModuleId === 'mod-11') {
          matchedToolMessage = '🌐 Abre o Google Meu Negócio em outra aba enquanto assiste. Já vai praticando.';
        } else if (selectedModuleId === 'mod-12') {
          matchedToolMessage = '🗂️ Já tem seu CRM configurado? O Módulo 12 é rápido e vai organizar sua lista de clientes de vez.';
        } else if (selectedModuleId === 'mod-7') {
          matchedToolMessage = '📋 Antes de avançar: você já baixou o Script de Vendas da aula anterior? Ele vai ser usado aqui.';
        } else if (selectedModuleId === 'mod-2') {
          matchedToolMessage = '📸 Essa aula é sobre o Instagram. Vale abrir o perfil do seu salão para acompanhar na prática.';
        }

        if (matchedToolMessage) {
          if (Math.random() < 0.15) {
            setCurrentPrompt(matchedToolMessage);
            setIsVisible(true);
            triggerWebAudioCue('expand');
          }
        } else {
          // Normal stimuli with frequency: 1 in 20 times (0.05)
          if (Math.random() < 0.05) {
            const randomIndex = Math.floor(Math.random() * ESTIMULOS.length);
            setCurrentPrompt(ESTIMULOS[randomIndex]);
            setIsVisible(true);
            triggerWebAudioCue('expand');
          }
        }
      }
      previousModuleId.current = selectedModuleId;
    }
  }, [selectedModuleId]);

  // 5. Saída da aula (Pausar no Meio): Aviso de continuidade na volta (apenas 5% de chance)
  const previousViewStage = React.useRef<'modules' | 'lessons' | 'player'>('modules');
  React.useEffect(() => {
    if (previousViewStage.current === 'player' && viewStage !== 'player') {
      if (Math.random() < 0.05) {
        setCurrentPrompt("Você pausou no meio de uma aula importante. Tudo bem, a aula guardou seu lugar.");
        setIsVisible(true);
        triggerWebAudioCue('expand');
      }
    }
    previousViewStage.current = viewStage;
  }, [viewStage]);

  // 6. Conclusões e Marcos de Porcentagem
  const previousWatchedIds = React.useRef<string[]>([]);
  React.useEffect(() => {
    // Skip initial load
    if (previousWatchedIds.current.length === 0) {
      previousWatchedIds.current = watchedLessonIds;
      return;
    }

    const currentLen = watchedLessonIds.length;
    const prevLen = previousWatchedIds.current.length;

    if (currentLen > prevLen) {
      // Core calculation
      const newlyCompletedId = watchedLessonIds.find(id => !previousWatchedIds.current.includes(id));
      const newlyCompletedLesson = newlyCompletedId ? lessons.find(l => l.id === newlyCompletedId) : null;
      const percentage = lessons.length > 0 ? Math.round((currentLen / lessons.length) * 100) : 0;

      // Classify if fully complete a module
      let completedModule: Module | null = null;
      if (newlyCompletedLesson) {
        const mId = newlyCompletedLesson.moduleId;
        const moduleLessons = lessons.filter(l => l.moduleId === mId);
        const isAllWatched = moduleLessons.every(l => watchedLessonIds.includes(l.id));
        const wasAllWatchedBefore = moduleLessons.every(l => previousWatchedIds.current.includes(l.id));

        if (isAllWatched && !wasAllWatchedBefore) {
          completedModule = modules.find(m => m.id === mId) || null;
        }
      }

      // Routing triggers for progress celebrations
      if (completedModule) {
        // Sales/script module check
        if (completedModule.id === 'mod-7' || completedModule.title.toLowerCase().includes('vendas')) {
          setCurrentPrompt("Módulo de Vendas concluído! Agora você tem um script que realmente converte. Vai testar hoje?");
        } else {
          const selection = [
            `✅ Módulo finalizado! Isso merece uma pausa para se orgulhar.`,
            `🏆 Uau! Você terminou o ${completedModule.title}. A Deni ficaria orgulhosa de te ver aqui.`
          ];
          const rIndex = Math.floor(Math.random() * selection.length);
          setCurrentPrompt(selection[rIndex]);
        }
      } else if ([25, 50, 75, 100].includes(percentage)) {
        if (percentage === 50) {
          setCurrentPrompt("50% da mentoria concluída! Você já está na metade do caminho, e o melhor ainda está por vir.");
        } else if (percentage === 100) {
          setCurrentPrompt("Parabéns! Você finalizou a mentoria. Mas isso não é o fim, é o começo de um negócio diferente. 🏆🚀🎉");
        } else {
          const selection = [
            `Você completou ${percentage}% da mentoria. Já dá para sentir a diferença, né?`,
            "🌟 Você chegou até aqui. Isso diz muito sobre quem você é e o que você quer."
          ];
          const rIndex = Math.floor(Math.random() * selection.length);
          setCurrentPrompt(selection[rIndex]);
        }
      } else {
        const rIndex = Math.floor(Math.random() * CELEBRACOES_AULA.length);
        setCurrentPrompt(CELEBRACOES_AULA[rIndex]);
      }

      setIsVisible(true);
      triggerWebAudioCue('check');
    }

    previousWatchedIds.current = watchedLessonIds;
  }, [watchedLessonIds, lessons, modules]);

  return (
    <>
      {/* Dynamic Island Container - Fixed Center */}
      <div 
        className="fixed top-5 left-1/2 -translate-x-1/2 z-[45] pointer-events-none w-full max-w-[92%] sm:max-w-max flex justify-center"
      >
        <AnimatePresence>
          {isVisible && (
            <motion.div
              id="apple-dynamic-island"
              initial={{
                opacity: 0,
                scaleY: 0.1,
                scaleX: 0.3,
                y: -50,
                borderRadius: "100px",
                transformOrigin: "top center",
              }}
              animate={{
                opacity: 1,
                scaleY: 1,
                scaleX: 1,
                y: 0,
                borderRadius: "40px",
              }}
              exit={{
                opacity: 0,
                scaleY: 0.2,
                scaleX: 0.4,
                y: -30,
                transition: { duration: 0.22, ease: "easeIn" }
              }}
              transition={{
                type: "spring",
                stiffness: 165,
                damping: 13,
                mass: 0.95
              }}
              className="pointer-events-auto rounded-[32px] border border-white/15 bg-neutral-950/75 text-white shadow-[0_12px_44px_rgba(0,0,0,0.45)] backdrop-blur-xl px-5 py-2.5 flex items-center justify-between gap-4 w-full sm:w-auto"
            >
              <div className="w-7 h-7 rounded-full bg-[#FF1E40]/20 flex items-center justify-center shrink-0">
                <Sparkles size={14} className="text-[#FF1E40]" />
              </div>

              <div className="flex-1 min-w-0 text-left py-0.5">
                <p className="text-[11px] font-bold text-zinc-100 leading-normal whitespace-normal">
                  {currentPrompt}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisible(false);
                  triggerWebAudioCue('expand');
                }}
                className="p-1 hover:bg-white/10 rounded-full text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer shrink-0"
                title="Fechar Aviso"
              >
                <X size={13} strokeWidth={2.5} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
