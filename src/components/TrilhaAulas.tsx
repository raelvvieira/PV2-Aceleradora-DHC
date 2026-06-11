import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  CheckCircle, 
  Circle, 
  ChevronRight, 
  ChevronLeft, 
  ArrowLeft,
  Star, 
  Tv, 
  Award,
  BookOpen,
  Layers,
  Link2,
  FileText,
  Download,
  ExternalLink,
  Paperclip
} from 'lucide-react';
import { Module, Lesson } from '../types';
import { ReviewStars } from './ReviewStars';

interface TrilhaAulasProps {
  modules: Module[];
  lessons: Lesson[];
  watchedLessonIds: string[];
  lessonRatings: Record<string, number>;
  onToggleWatched: (lessonId: string) => void;
  onRateLesson: (lessonId: string, rating: number) => void;
  theme?: 'dark' | 'light';
  
  // Controlled props for Dynamic Island sync
  selectedModuleId?: string;
  setSelectedModuleId?: (id: string) => void;
  activeLessonId?: string;
  setActiveLessonId?: (id: string) => void;
  viewStage?: 'modules' | 'lessons' | 'player';
  setViewStage?: (stage: 'modules' | 'lessons' | 'player') => void;
}

export function TrilhaAulas({
  modules,
  lessons,
  watchedLessonIds,
  lessonRatings,
  onToggleWatched,
  onRateLesson,
  theme = 'dark',
  selectedModuleId: propSelectedModuleId,
  setSelectedModuleId: propSetSelectedModuleId,
  activeLessonId: propActiveLessonId,
  setActiveLessonId: propSetActiveLessonId,
  viewStage: propViewStage,
  setViewStage: propSetViewStage
}: TrilhaAulasProps) {
  // Navigation & selection states
  const [localSelectedModuleId, setLocalSelectedModuleId] = React.useState<string>(modules[0]?.id || '');
  const [localActiveLessonId, setLocalActiveLessonId] = React.useState<string>('');
  const [localViewStage, setLocalViewStage] = React.useState<'modules' | 'lessons' | 'player'>('modules');

  const selectedModuleId = propSelectedModuleId !== undefined ? propSelectedModuleId : localSelectedModuleId;
  const setSelectedModuleId = propSetSelectedModuleId !== undefined ? propSetSelectedModuleId : setLocalSelectedModuleId;

  const activeLessonId = propActiveLessonId !== undefined ? propActiveLessonId : localActiveLessonId;
  const setActiveLessonId = propSetActiveLessonId !== undefined ? propSetActiveLessonId : setLocalActiveLessonId;

  const viewStage = propViewStage !== undefined ? propViewStage : localViewStage;
  const setViewStage = propSetViewStage !== undefined ? propSetViewStage : setLocalViewStage;
  
  const isLight = theme === 'light';

  // Sort lessons in the selected module
  const currentLessons = React.useMemo(() => {
    return lessons
      .filter((l) => l.moduleId === selectedModuleId)
      .sort((a, b) => a.order - b.order);
  }, [lessons, selectedModuleId]);

  // Set default active lesson if none is set
  React.useEffect(() => {
    if (currentLessons.length > 0) {
      const exists = currentLessons.some((l) => l.id === activeLessonId);
      if (!exists) {
        setActiveLessonId(currentLessons[0].id);
      }
    } else {
      setActiveLessonId('');
    }
  }, [currentLessons, activeLessonId]);

  const activeLesson = React.useMemo(() => {
    return lessons.find((l) => l.id === activeLessonId);
  }, [lessons, activeLessonId]);

  // Selected module metadata
  const selectedModule = React.useMemo(() => {
    return modules.find((m) => m.id === selectedModuleId);
  }, [modules, selectedModuleId]);

  // Calculations for dynamic module percentages
  const moduleCompletion = React.useMemo(() => {
    const percentages: Record<string, number> = {};
    modules.forEach((mod) => {
      const modLessons = lessons.filter((l) => l.moduleId === mod.id);
      if (modLessons.length === 0) {
        percentages[mod.id] = 0;
        return;
      }
      const watchedCount = modLessons.filter((l) => watchedLessonIds.includes(l.id)).length;
      percentages[mod.id] = Math.round((watchedCount / modLessons.length) * 100);
    });
    return percentages;
  }, [modules, lessons, watchedLessonIds]);

  // Overall statistics
  const overallProgress = React.useMemo(() => {
    if (lessons.length === 0) return 0;
    return Math.round((watchedLessonIds.length / lessons.length) * 100);
  }, [lessons, watchedLessonIds]);

  // Parse YouTube video embed ID
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;
    }
    return `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0`;
  };

  // Previous and Next control logic inside player
  const handlePrevLesson = () => {
    const currentIndex = currentLessons.findIndex((l) => l.id === activeLessonId);
    if (currentIndex > 0) {
      setActiveLessonId(currentLessons[currentIndex - 1].id);
    }
  };

  const handleNextLesson = () => {
    const currentIndex = currentLessons.findIndex((l) => l.id === activeLessonId);
    if (currentIndex < currentLessons.length - 1) {
      setActiveLessonId(currentLessons[currentIndex + 1].id);
    }
  };

  const hasPrev = React.useMemo(() => {
    const index = currentLessons.findIndex((l) => l.id === activeLessonId);
    return index > 0;
  }, [currentLessons, activeLessonId]);

  const hasNext = React.useMemo(() => {
    const index = currentLessons.findIndex((l) => l.id === activeLessonId);
    return index !== -1 && index < currentLessons.length - 1;
  }, [currentLessons, activeLessonId]);

  const nextLessonPreview = React.useMemo(() => {
    const index = currentLessons.findIndex((l) => l.id === activeLessonId);
    if (index !== -1 && index < currentLessons.length - 1) {
      return currentLessons[index + 1];
    }
    const currentModuleIndex = modules.findIndex((m) => m.id === selectedModuleId);
    if (currentModuleIndex !== -1 && currentModuleIndex < modules.length - 1) {
      const nextMod = modules[currentModuleIndex + 1];
      const nextModLessons = lessons
        .filter((l) => l.moduleId === nextMod.id)
        .sort((a, b) => a.order - b.order);
      if (nextModLessons.length > 0) {
        return nextModLessons[0];
      }
    }
    return null;
  }, [currentLessons, activeLessonId, modules, lessons, selectedModuleId]);

  return (
    <div id="trilha-aulas-root" className="space-y-8 max-w-6xl mx-auto pb-16 relative z-10">
      
      {/* Dynamic Header according to View Stage */}
      <AnimatePresence mode="wait">
        {viewStage === 'modules' && (
          <motion.div 
            key="header-modules"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4"
          >
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider font-sans shadow-xs ${
                isLight 
                  ? 'btn-gradient-border-light text-[#FF1E40]' 
                  : 'btn-gradient-border-dark text-[#FF1E40]'
              }`}>
                Trilha de Estudo
              </span>
              <h1 className={`text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight mt-1.5 sm:mt-2 font-sans ${
                isLight ? 'text-zinc-900' : 'text-white'
              }`}>
                O Conhecimento que vai elevar seu posicionamento no digital e suas vendas
              </h1>
              <p className={`text-2xs sm:text-xs md:text-sm mt-0.5 sm:mt-1 max-w-xl ${
                isLight ? 'text-zinc-500' : 'text-white/50'
              }`}>
                Escolha um dos módulos abaixo para iniciar ou continuar as suas aulas exclusivas da aceleradora.
              </p>
            </div>

            {/* Global Progress Widget */}
            <div 
              id="overall-progress-card" 
              className={`p-3 sm:p-4 flex items-center gap-3 sm:gap-4 shrink-0 min-w-0 sm:min-w-[240px] w-full md:w-auto rounded-2xl border transition-colors duration-250 ${
                isLight 
                  ? 'bg-white border-zinc-200 shadow-sm' 
                  : 'bg-white/5 border-white/10 backdrop-blur-md'
              }`}
            >
              <div className={`relative w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl border shrink-0 ${
                isLight 
                  ? 'bg-zinc-100 border-zinc-200/50' 
                  : 'bg-gradient-to-tr from-[#8100FF]/25 to-[#FF1E40]/15 border-white/10'
              }`}>
                <Award size={18} className="text-[#FF1E40]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                    isLight ? 'text-zinc-400' : 'text-white/40'
                  }`}>
                    Progresso Geral
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#FF1E40]">{overallProgress}%</span>
                </div>
                <div className={`w-full h-1.5 sm:h-2 rounded-full overflow-hidden ${
                  isLight ? 'bg-zinc-100' : 'bg-white/10'
                }`}>
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#8100FF] to-[#FF1E40]" 
                    initial={{ width: 0 }}
                    animate={{ width: `${overallProgress}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {viewStage === 'lessons' && selectedModule && (
          <motion.div 
            key="header-lessons"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4"
          >
            <div className="space-y-2 sm:space-y-3">
              <button
                id="btn-back-to-modules"
                onClick={() => setViewStage('modules')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] sm:text-xs font-semibold border transition-all active:scale-97 cursor-pointer ${
                  isLight 
                    ? 'border-zinc-200 bg-zinc-100/50 hover:bg-zinc-100 text-zinc-700 shadow-xs' 
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/90 hover:text-white'
                }`}
              >
                <ArrowLeft size={12} />
                <span>Voltar aos Módulos</span>
              </button>
              <div>
                <h1 className={`text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight font-sans ${
                  isLight ? 'text-zinc-900' : 'text-white'
                }`}>
                  {selectedModule.title}
                </h1>
                <p className={`text-[11px] sm:text-xs tracking-wide max-w-xl mt-1 leading-relaxed ${
                  isLight ? 'text-zinc-500' : 'text-white/50'
                }`}>
                  {selectedModule.description}
                </p>
              </div>
            </div>

            {/* Module Progress statistics */}
            <div 
              id="module-progress-card" 
              className={`p-3 sm:p-4 flex items-center gap-3 sm:gap-4 shrink-0 min-w-0 sm:min-w-[240px] w-full md:w-auto rounded-2xl border transition-colors duration-250 ${
                isLight 
                  ? 'bg-white border-zinc-200 shadow-sm' 
                  : 'bg-white/5 border-white/10 backdrop-blur-md'
              }`}
            >
              <div className={`relative w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl border shrink-0 ${
                isLight 
                  ? 'bg-emerald-50 border-emerald-200/50 text-emerald-650' 
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              }`}>
                <CheckCircle size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                    isLight ? 'text-zinc-400' : 'text-white/40'
                  }`}>
                    Módulo Concluído
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-500">
                    {moduleCompletion[selectedModule.id] || 0}%
                  </span>
                </div>
                <div className={`w-full h-1.5 sm:h-2 rounded-full overflow-hidden ${
                  isLight ? 'bg-zinc-100' : 'bg-white/10'
                }`}>
                  <motion.div 
                    className="h-full bg-emerald-500" 
                    initial={{ width: 0 }}
                    animate={{ width: `${moduleCompletion[selectedModule.id] || 0}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {viewStage === 'player' && activeLesson && (
          <motion.div 
            key="header-player"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between gap-3"
          >
            <button
              id="btn-back-to-lessons"
              onClick={() => setViewStage('lessons')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all active:scale-97 cursor-pointer shrink-0 ${
                isLight 
                  ? 'border-zinc-200 bg-zinc-100/50 hover:bg-zinc-100 text-zinc-700 shadow-xs' 
                  : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/90 hover:text-white'
              }`}
            >
              <ArrowLeft size={14} />
              <span>Voltar<span className="hidden sm:inline"> para as Aulas do Módulo</span></span>
            </button>
            <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border truncate max-w-[140px] sm:max-w-xs block select-none ${
              isLight 
                ? 'text-zinc-850 bg-zinc-100 border-zinc-250/55' 
                : 'text-white bg-white/10 border-white/10'
            }`} title={selectedModule?.title || 'Aula'}>
              {selectedModule?.title || 'Aula'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main stage Renderings */}
      <AnimatePresence mode="wait">
        
        {/* VIEW STAGE 1: MODULES GRID (LARGE 3:4 FORMAT GRID) */}
        {viewStage === 'modules' && (
          <motion.div
            key="stage-modules"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 px-2 sm:px-0"
          >
            {modules.map((mod) => {
              const completion = moduleCompletion[mod.id] || 0;
              const lessonsCount = lessons.filter(l => l.moduleId === mod.id).length;

               return (
                <button
                  key={mod.id}
                  id={`module-box-trigger-${mod.id}`}
                  onClick={() => {
                    setSelectedModuleId(mod.id);
                    setViewStage('lessons');
                  }}
                  className={`relative flex flex-col w-full text-left rounded-2xl md:rounded-[24px] overflow-hidden border transition-all duration-300 cursor-pointer focus:outline-hidden group hover:scale-[1.02] shadow-sm ${
                    isLight
                      ? 'border-zinc-200/80 bg-white hover:border-[#1D1D1F]'
                      : 'border-white/5 bg-white/5 hover:bg-white/8 hover:border-white/15'
                  }`}
                >
                  {/* Aspect Ratio 3:4 container for premium layout cover */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden">
                    <img 
                      src={mod.bannerUrl || 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600'} 
                      alt={mod.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    
                    {/* Dark gradient shadow inside 3:4 space only at the bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                    {/* Floating top header content */}
                    <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex items-center justify-between">
                      <span className="text-[8.5px] sm:text-[9px] font-extrabold text-zinc-200 uppercase tracking-widest bg-black/60 hospitality backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-white/10">
                        {lessonsCount} {lessonsCount === 1 ? 'Aula' : 'Aulas'}
                      </span>
                      {completion === 100 && (
                        <div className="bg-emerald-500 text-white p-0.5 sm:p-1 rounded-full shadow-lg">
                          <CheckCircle size={10} className="fill-emerald-500 text-white sm:size-[14px]" />
                        </div>
                      )}
                    </div>

                    {/* Text overlays embedded at the bottom of the 3:4 card */}
                    <div className="absolute inset-x-2.5 sm:inset-x-4 bottom-2.5 sm:bottom-4 text-white flex flex-col justify-end space-y-1 sm:space-y-2">
                      <h3 className="font-extrabold text-[12px] sm:text-base leading-snug drop-shadow-md line-clamp-2">
                        {mod.title}
                      </h3>

                      {/* Micro progress line */}
                      <div className="pt-0.5 sm:pt-2">
                        <div className="flex items-center justify-between text-[8.5px] sm:text-[10px] font-bold uppercase text-zinc-450 mb-0.5 sm:mb-1">
                          <span>Conclusão</span>
                          <span className="text-[#FF1E40]">{completion}%</span>
                        </div>
                        <div className="w-full h-0.5 sm:h-1 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${completion === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#8100FF] to-[#FF1E40]'}`}
                            style={{ width: `${completion}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}

            {modules.length === 0 && (
              <div className={`col-span-full py-16 text-center border-2 border-dashed rounded-[32px] ${
                isLight ? 'border-zinc-200 text-zinc-400 bg-zinc-50' : 'border-white/10 text-white/30 bg-white/5'
              }`}>
                <BookOpen size={48} className="mx-auto mb-3 stroke-1" />
                <p className="font-bold text-sm">Nenhum módulo cadastrado.</p>
                <p className="text-xs mt-1">Crie um novo módulo no seu Painel Administrativo de forma instantânea.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* VIEW STAGE 2: LESSONS GRID INSIDE CHOSEN MODULE (3:4 ASPECTS) */}
        {viewStage === 'lessons' && (
          <motion.div
            key="stage-lessons"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 px-2 sm:px-0">
              {currentLessons.map((lesson, index) => {
                const isWatched = watchedLessonIds.includes(lesson.id);
                const rating = lessonRatings[lesson.id] || 0;
                const rank = index + 1;

                return (
                  <button
                    key={lesson.id}
                    id={`lesson-card-visual-${lesson.id}`}
                    onClick={() => {
                      setActiveLessonId(lesson.id);
                      setViewStage('player');
                    }}
                    className={`relative flex flex-col w-full text-left rounded-2xl md:rounded-[24px] overflow-hidden border transition-all duration-300 cursor-pointer focus:outline-hidden group hover:scale-[1.02] shadow-sm ${
                      isLight
                        ? 'border-zinc-200/80 bg-white hover:border-[#1D1D1F] shadow-tiny'
                        : 'border-white/5 bg-white/5 hover:bg-white/8 hover:border-white/15'
                    }`}
                  >
                    {/* 3:4 format lesson thumbnail card representation */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-black/40">
                      <img 
                        src={lesson.bannerUrl || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=600'} 
                        alt={lesson.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      
                      {/* Deep dark cinematic backdrop mask inside 3:4 format only at the bottom */}
                      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                      {/* Central hover/focus visual play trigger indicator */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-7 h-7 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#8100FF] to-[#FF1E40] text-white border border-white/15 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 animate-pulse">
                          <Play size={10} className="fill-white ml-0.5 sm:ml-1 sm:size-[20px]" />
                        </div>
                      </div>

                      {/* Header floating elements inside the 3:4 card */}
                      <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex items-center justify-between">
                        <span className="text-[8.5px] sm:text-[10px] font-bold text-white uppercase tracking-widest bg-black/60 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-white/10 font-mono">
                          Aula Nº {rank}
                        </span>
                        {isWatched && (
                          <div className="bg-emerald-500 text-white p-0.5 sm:p-1 rounded-full shadow-lg">
                            <CheckCircle size={8} className="fill-emerald-500 text-white sm:size-[12px]" />
                          </div>
                        )}
                      </div>

                      {/* Footer text content inside the 3:4 cover container */}
                      <div className="absolute inset-x-2.5 sm:inset-x-4 bottom-2.5 sm:bottom-4 text-white flex flex-col justify-end">
                        <h3 className="font-extrabold text-[12px] sm:text-xs md:text-sm line-clamp-2 leading-snug drop-shadow-md">
                          {lesson.title}
                        </h3>
                      </div>
                    </div>
                  </button>
                );
              })}

              {currentLessons.length === 0 && (
                <div className={`col-span-full py-16 text-center border-2 border-dashed rounded-[32px] ${
                  isLight ? 'border-zinc-200 text-zinc-400 bg-zinc-50' : 'border-white/10 text-white/30 bg-white/5'
                }`}>
                  <BookOpen size={48} className="mx-auto mb-3 stroke-1" />
                  <p className="font-bold text-sm">Sem aulas cadastradas neste módulo.</p>
                  <p className="text-xs mt-1">Utilize o Painel Geral para cadastrar novos tópicos ou reordenar as aulas.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* VIEW STAGE 3: INTERACTIVE DROP PLAYER (SAME PREMIUM LAYOUT) */}
        {viewStage === 'player' && (
          <motion.div
            key="stage-player"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          >
            {/* Left Core Player Column (takes 2 cols on desktop) */}
            <div id="video-frame-container" className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="wait">
                {activeLesson ? (
                  <motion.div
                    key={activeLesson.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className={`border rounded-[32px] overflow-hidden shadow-xl transition-all ${
                      isLight 
                        ? 'bg-white border-zinc-200' 
                        : 'bg-white/5 border-white/10 backdrop-blur-md'
                    }`}
                  >
                    {/* 16:9 Aspect Video Player */}
                    <div className="relative aspect-video bg-black/45 shadow-inner group">
                      {!activeLesson.youtubeUrl ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0c0c0e] via-[#16161a] to-[#0c0c0e] rounded-t-[32px] border-b border-white/5">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#8100FF]/20 via-[#FF1E40]/20 to-[#FF1E40]/20 border border-white/10 flex items-center justify-center mb-3 sm:mb-4 select-none">
                            <BookOpen size={24} className="text-[#FF1E40] sm:size-[28px]" />
                          </div>
                          <h4 className="text-white font-extrabold text-xs sm:text-base tracking-tight mb-1 select-none">
                            Conteúdo Complementar & Prático
                          </h4>
                          <p className="text-zinc-400 text-[10px] sm:text-xs max-w-sm px-4 select-none">
                            Esta aula é em formato de script, PDF ou atividade prática. Utilize os materiais complementares ou as orientações no grupo de mentoria para executá-la.
                          </p>
                        </div>
                      ) : (
                        <iframe
                          id="youtube-player-iframe"
                          src={getYouTubeEmbedUrl(activeLesson.youtubeUrl)}
                          title={activeLesson.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full rounded-t-[32px] border-0"
                        />
                      )}
                    </div>

                    {/* Player Controller Action Bar */}
                    <div id="player-nav-controls" className={`p-4 sm:px-6 sm:py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
                      isLight ? 'bg-zinc-50/55 border-zinc-200' : 'bg-white/5 border-white/5'
                    }`}>
                      <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:items-center sm:w-auto">
                        <button
                          id="btn-prev-lesson"
                          onClick={handlePrevLesson}
                          disabled={!hasPrev}
                          className={`flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl text-xs font-bold transition-all border ${
                            hasPrev 
                              ? isLight 
                                ? 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100 cursor-pointer active:scale-95 shadow-xs'
                                : 'bg-white/10 border-white/10 text-white hover:bg-white/20 cursor-pointer active:scale-95' 
                              : isLight
                                ? 'bg-zinc-50 text-zinc-400 border-zinc-200 cursor-not-allowed opacity-50'
                                : 'bg-white/5 text-white/20 border-white/5 cursor-not-allowed opacity-50'
                          }`}
                        >
                          <ChevronLeft size={14} />
                          <span>Voltar</span>
                        </button>
                        <button
                          id="btn-next-lesson"
                          onClick={handleNextLesson}
                          disabled={!hasNext}
                          className={`flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl text-xs font-bold transition-all border ${
                            hasNext 
                              ? isLight 
                                ? 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100 cursor-pointer active:scale-95 shadow-xs'
                                : 'bg-white/10 border-white/10 text-white hover:bg-white/20 cursor-pointer active:scale-95' 
                              : isLight
                                ? 'bg-zinc-50 text-zinc-400 border-zinc-200 cursor-not-allowed opacity-50'
                                : 'bg-white/5 text-white/20 border-white/5 cursor-not-allowed opacity-50'
                          }`}
                        >
                          <span>Avançar</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>

                      {/* Toggle Watched Shortcut Button */}
                      <button
                        id="checkbox-lesson-watched-toggle"
                        onClick={() => onToggleWatched(activeLesson.id)}
                        className={`w-full sm:w-auto flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-xs font-bold transition-all border cursor-pointer active:scale-96 ${
                          watchedLessonIds.includes(activeLesson.id)
                            ? isLight 
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-emerald-500/25 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/40'
                            : isLight 
                              ? 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200/60'
                              : 'bg-white/5 border-white/10 text-white hover:bg-white/12'
                        }`}
                      >
                        {watchedLessonIds.includes(activeLesson.id) ? (
                          <>
                            <CheckCircle size={15} className="text-emerald-500 fill-emerald-500/10" />
                            <span>Aula Concluída!</span>
                          </>
                        ) : (
                          <>
                            <Circle size={15} className={isLight ? 'text-zinc-500' : 'text-white/40'} />
                            <span>Marcar como Assistida</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Info Text & Interactive Feedback */}
                    <div id="active-lesson-description-panel" className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 select-none flex-wrap">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF1E40] font-mono block">
                              ASSISTINDO AGORA
                            </span>
                            {activeLesson.attachments && activeLesson.attachments.length > 0 && (
                              <span className="flex items-center gap-1 text-[8px] font-extrabold bg-[#FF1E40]/10 text-[#FF1E40] dark:bg-[#FF1E40]/25 px-1.5 py-0.5 rounded-full animate-pulse border border-[#FF1E40]/20 font-mono">
                                <Paperclip size={10} className="stroke-[2.5px]" />
                                {activeLesson.attachments.length} {activeLesson.attachments.length === 1 ? 'ANEXO DISPONÍVEL' : 'ANEXOS DISPONÍVEIS'}
                              </span>
                            )}
                          </div>
                          <h2 className={`text-lg sm:text-xl font-extrabold tracking-tight leading-snug ${
                            isLight ? 'text-zinc-900' : 'text-white'
                          }`}>
                            {activeLesson.title}
                          </h2>
                        </div>

                        {/* Star ratings */}
                        <div className={`flex items-center justify-between sm:justify-end gap-4 p-3 sm:p-2.5 rounded-2xl border w-full sm:w-auto ${
                          isLight 
                            ? 'bg-amber-500/5 border-amber-300/40 text-amber-800' 
                            : 'bg-amber-500/10 border-amber-500/25'
                        }`}>
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${
                            isLight ? 'text-amber-600' : 'text-amber-400'
                          }`}>
                            Avaliar Aula
                          </span>
                          <ReviewStars 
                            rating={lessonRatings[activeLesson.id] || 0} 
                            onChange={(rating) => onRateLesson(activeLesson.id, rating)}
                            interactive={true}
                            size={18}
                          />
                        </div>
                      </div>

                      {/* Lesson Description */}
                      {activeLesson.description && (
                        <p className={`mt-4 text-xs sm:text-sm font-medium leading-relaxed text-left ${
                          isLight ? 'text-zinc-600' : 'text-white/70'
                        }`}>
                          {activeLesson.description}
                        </p>
                      )}

                      {/* --- SEÇÃO DE MATERIAL DE APOIO / ANEXOS --- */}
                      {activeLesson.attachments && activeLesson.attachments.length > 0 && (
                        <div className="mt-5 border-t border-zinc-200/50 dark:border-white/10 pt-4 space-y-3">
                          <div className="flex items-center gap-1.5 select-none text-left">
                            <Paperclip size={13} className="text-[#FF1E40]" />
                            <h4 className={`text-[10px] font-extrabold uppercase tracking-widest ${
                              isLight ? 'text-zinc-800' : 'text-white/80'
                            }`}>
                              Material de Apoio & Anexos ({activeLesson.attachments.length})
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {activeLesson.attachments.map((att) => {
                              const isLink = att.type === 'link';
                              let rawUrl = att.url || '';
                              if (isLink && rawUrl) {
                                const trimUrl = rawUrl.trim();
                                if (trimUrl && !/^(https?:\/\/|data:|mailto:|tel:)/i.test(trimUrl)) {
                                  rawUrl = `https://${trimUrl}`;
                                }
                              }
                              return (
                                <a
                                  key={att.id}
                                  href={rawUrl}
                                  target={isLink ? "_blank" : undefined}
                                  rel={isLink ? "noopener noreferrer" : undefined}
                                  download={!isLink ? `${att.name}.${att.type}` : undefined}
                                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all active:scale-[0.98] group cursor-pointer ${
                                    isLight
                                      ? 'bg-zinc-50/50 border-zinc-200 hover:bg-zinc-100 hover:border-[#FF1E40]/30 text-zinc-800'
                                      : 'bg-white/3 border-white/6 hover:bg-white/6 hover:border-[#FF1E40]/30 text-white'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                    <div className={`p-2 rounded-xl shrink-0 ${
                                      att.type === 'pdf' 
                                        ? 'bg-rose-500/10 text-rose-500 dark:bg-rose-500/20' 
                                        : att.type === 'doc'
                                          ? 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20'
                                          : 'bg-[#FF1E40]/10 text-[#FF1E40] dark:bg-[#FF1E40]/20'
                                    }`}>
                                      {att.type === 'pdf' && <FileText size={15} />}
                                      {att.type === 'doc' && <FileText size={15} />}
                                      {att.type === 'link' && <Link2 size={15} />}
                                    </div>

                                    <div className="min-w-0 text-left">
                                      <p className="text-xs font-bold truncate group-hover:text-[#FF1E40] transition-colors leading-snug">
                                        {att.name}
                                      </p>
                                      <p className={`text-[8px] font-extrabold tracking-widest uppercase mt-0.5 ${
                                        isLight ? 'text-zinc-400' : 'text-white/35 font-mono'
                                      }`}>
                                        {att.type === 'pdf' ? 'PDF Documento' : att.type === 'doc' ? 'DOC Word' : 'Link Externo'}
                                      </p>
                                    </div>
                                  </div>

                                  <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                                    isLight 
                                      ? 'bg-white border border-zinc-200 text-zinc-400 group-hover:text-[#FF1E40] group-hover:border-[#FF1E40]/20' 
                                      : 'bg-white/5 border border-white/5 text-white/40 group-hover:text-white group-hover:border-white/10'
                                  }`}>
                                    {isLink ? <ExternalLink size={12} /> : <Download size={12} />}
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className={`h-96 flex flex-col items-center justify-center border border-dashed rounded-[32px] p-8 text-center ${
                    isLight 
                      ? 'bg-zinc-50 border-zinc-200 text-zinc-500' 
                      : 'bg-white/5 border-white/10 text-white/40'
                  }`}>
                    <BookOpen size={48} className={`stroke-1 mb-3 ${isLight ? 'text-zinc-300' : 'text-white/20'}`} />
                    <p className="font-semibold">Nenhuma aula disponível neste módulo.</p>
                  </div>
                )}
              </AnimatePresence>

              {/* NEXT LESSON ENGAGEMENT PREVIEW */}
              {nextLessonPreview && (
                <motion.button
                  id={`next-lesson-teaser-box-${nextLessonPreview.id}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    if (nextLessonPreview.moduleId !== selectedModuleId) {
                      setSelectedModuleId(nextLessonPreview.moduleId);
                    }
                    setActiveLessonId(nextLessonPreview.id);
                  }}
                  className={`w-full flex items-center justify-between text-left p-4 rounded-2xl border transition-all cursor-pointer shadow-tiny focus:outline-hidden ${
                    isLight 
                      ? 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 shadow-sm' 
                      : 'border-white/10 bg-gradient-to-r from-[#8100FF]/10 via-transparent to-transparent hover:border-white/20 text-white'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0 bg-white/5">
                      <img src={nextLessonPreview.bannerUrl} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                        <Play size={14} className="text-white fill-white" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-[#FF1E40] uppercase tracking-widest block leading-none font-mono">PRÓXIMA AULA</span>
                      <p className={`text-sm font-bold truncate mt-1 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                        {nextLessonPreview.title}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-[#FF1E40]" />
                </motion.button>
              )}
            </div>

            {/* Right Module Lessons List Bar */}
            <div id="module-lessons-sidebar-list" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className={`text-xs font-bold uppercase tracking-widest ${
                  isLight ? 'text-zinc-400' : 'text-white/40'
                }`}>
                  Aulas do Módulo
                </h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${
                  isLight 
                    ? 'text-zinc-800 bg-zinc-100 border-zinc-200' 
                    : 'text-white bg-white/10 border-white/10'
                }`}>
                  {currentLessons.length} no total
                </span>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {currentLessons.map((lesson, index) => {
                  const isActive = activeLessonId === lesson.id;
                  const isWatched = watchedLessonIds.includes(lesson.id);
                  const rank = index + 1;

                  return (
                    <button
                      key={lesson.id}
                      id={`lesson-item-row-${lesson.id}`}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`w-full text-left rounded-2xl p-3 border flex items-start gap-3 transition-all cursor-pointer focus:outline-hidden ${
                        isActive 
                          ? isLight
                            ? 'bg-zinc-100 border-[#1D1D1F] text-zinc-950 font-bold shadow-xs'
                            : 'bg-white/15 border-white/40 text-white' 
                          : isLight
                            ? 'bg-white border-zinc-200/80 hover:bg-zinc-100/30 hover:border-zinc-300 text-zinc-700'
                            : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 text-white/80'
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {isWatched ? (
                          <CheckCircle size={18} className="text-emerald-500 fill-emerald-500/10" />
                        ) : (
                          <span className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center text-[10px] font-bold ${
                            isActive 
                              ? isLight
                                ? 'border-[#1D1D1F] text-[#1D1D1F] bg-[#1D1D1F]/5' 
                                : 'border-white text-white bg-white/10'
                              : isLight 
                                ? 'border-zinc-200 text-zinc-400 bg-zinc-50'
                                : 'border-white/10 text-white/40'
                          }`}>
                            {rank}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${
                          isActive 
                            ? isLight ? 'text-zinc-950 font-extrabold' : 'text-white' 
                            : isLight ? 'text-zinc-750 hover:text-zinc-900 font-medium' : 'text-white/80'
                        }`}>
                          {lesson.title}
                        </h4>
                        
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          {lessonRatings[lesson.id] && (
                            <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5 font-mono">
                              <Star size={10} className="fill-amber-500 text-amber-500" />
                              {lessonRatings[lesson.id]}.0
                            </span>
                          )}
                          {lesson.attachments && lesson.attachments.length > 0 && (
                            <span className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 shrink-0 ${
                              isLight 
                                ? 'bg-rose-500/10 text-[#FF1E40] border border-[#FF1E40]/25' 
                                : 'bg-[#FF1E40]/15 text-[#FF1E40] border border-[#FF1E40]/30'
                            }`} title={`${lesson.attachments.length} materiais de apoio anexados`}>
                              <Paperclip size={9.5} className="stroke-[2.5px]" />
                              {lesson.attachments.length} {lesson.attachments.length === 1 ? 'anexo' : 'anexos'}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className={`relative w-12 h-10 rounded-lg overflow-hidden shrink-0 self-center border ${
                        isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-white/5 border-white/5'
                      }`}>
                        <img src={lesson.bannerUrl} alt="" className="w-full h-full object-cover" />
                        {isActive && (
                          <div className="absolute inset-0 bg-rose-500/10 backdrop-blur-xs flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#FF1E40] animate-ping" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
