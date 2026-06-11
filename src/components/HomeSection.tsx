import React from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  BookOpen, 
  Sparkles, 
  Award, 
  ArrowRight, 
  Zap, 
  ChevronRight, 
  Compass, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Module, Lesson, InstagramPost, UserProfile } from '../types';
import { getCategoryLinks, formatCategoryName } from './PostsVirais';

interface HomeSectionProps {
  user: UserProfile;
  modules: Module[];
  lessons: Lesson[];
  posts: InstagramPost[];
  watchedLessonIds: string[];
  categoryLinks: Record<string, { canva: string; drive?: string }>;
  setActiveTab: (tab: 'home' | 'aulas' | 'posts' | 'admin' | 'profile') => void;
  setSelectedModuleId: (id: string) => void;
  setActiveLessonId: (id: string) => void;
  setViewStage: (stage: 'modules' | 'lessons' | 'player') => void;
  onReplayTour: () => void;
}

// Map each category to a highly polished and distinct skincare/aesthetic image if it doesn't have a customized one.
// This ensures that the home carousel has dynamic, beautiful, and realistic visuals instead of all displaying the same treatment image.
export const getCategoryBanner = (category: string, currentUrl?: string): string => {
  const isDefault = !currentUrl || currentUrl.includes('photo-1512290923902-8a9f81dc236c') || currentUrl.includes('photo-1576091160550');
  if (!isDefault) return currentUrl;
  
  const cat = (category || '').trim().toUpperCase();
  if (cat.includes('ROSÁCEA') || cat.includes('SENSÍVEL')) {
    return 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600'; // Beige clean cosmetics aesthetic with leaf
  }
  if (cat.includes('MICROAGULHAMENTO')) {
    return 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600'; // Premium cosmetic packaging and lab tubes
  }
  if (cat.includes('AUTOCUIDADO') || cat.includes('ESTILO')) {
    return 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=600'; // Clean luxurious personal care bathroom mockup
  }
  if (cat.includes('CUIDADOS') || cat.includes('SKINCARE')) {
    return 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600'; // Premium white jars and serums
  }
  if (cat.includes('ACNE')) {
    return 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600'; // Flatlay beauty desk and treatment oils
  }
  if (cat.includes('MADURA')) {
    return 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600'; // Pipette clinical skin care setup
  }
  if (cat.includes('MELASMA')) {
    return 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600'; // Modern bottle and flowers
  }
  if (cat.includes('MOTIVACIONAL') || cat.includes('MOTIVACIONAIS')) {
    return 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600'; // Mindfulness serene nature scene
  }
  if (cat.includes('MEME')) {
    return 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600'; // Smiling fresh woman close up
  }
  if (cat.includes('REELS')) {
    return 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=600'; // Stylized content setup
  }
  return 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600'; // Elegant clinical background placeholder
};

export function HomeSection({
  user,
  modules,
  lessons,
  posts,
  watchedLessonIds,
  categoryLinks,
  setActiveTab,
  setSelectedModuleId,
  setActiveLessonId,
  setViewStage,
  onReplayTour
}: HomeSectionProps) {
  const isLight = true;

  // 1. Calculate the next unfinished module & lesson
  const getNextUnfinishedModule = () => {
    if (modules.length === 0 || lessons.length === 0) return null;
    
    for (const mod of modules) {
      const modLessons = lessons.filter(l => l.moduleId === mod.id);
      if (modLessons.length === 0) continue;
      
      const watchedInMod = modLessons.filter(l => watchedLessonIds.includes(l.id));
      if (watchedInMod.length < modLessons.length) {
        // Found unfinished module! Find first unwatched lesson in it
        const nextLesson = modLessons.find(l => !watchedLessonIds.includes(l.id)) || modLessons[0];
        return { module: mod, lesson: nextLesson };
      }
    }
    
    // Fallback to absolute first lesson if complete or none found
    return { module: modules[0], lesson: lessons[0] };
  };

  const nextTarget = getNextUnfinishedModule();

  // 2. Metrics calculators
  const totalLessons = lessons.length;
  const watchedCount = watchedLessonIds.length;
  const completionPercent = totalLessons > 0 ? Math.round((watchedCount / totalLessons) * 100) : 0;
  const totalTemplates = posts.length;

  // 3. Carousel items: 3 most recent posts from columns
  const latestPosts = posts.slice(0, 3);

  const handleContinue = () => {
    if (nextTarget) {
      setSelectedModuleId(nextTarget.module.id);
      setActiveLessonId(nextTarget.lesson.id);
      setViewStage('player');
      setActiveTab('aulas');
    } else {
      setActiveTab('aulas');
    }
  };

  // Theme helper styles
  const cardBgClass = isLight
    ? "bg-white border border-zinc-200/85 shadow-xs rounded-[32px] p-6"
    : "bg-[#0c0c0e]/60 border border-white/10 backdrop-blur-3xl rounded-[32px] p-6";

  const miniCardBgClass = isLight
    ? "bg-zinc-50 border border-zinc-200/60 rounded-2xl p-5"
    : "bg-white/5 border border-white/5 rounded-2xl p-5";

  return (
    <div id="home-root-section" className="space-y-8 pb-16 relative z-10 font-sans">
      
      {/* SECTION 1: Personal Welcome & Sticky Next Lesson Highlight */}
      <div className="space-y-4">
        <div>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
            isLight ? 'bg-zinc-100 text-zinc-500 border-zinc-200' : 'bg-white/10 text-white border-white/10'
          }`}>
            Acesso Premium
          </span>
          <h1 className={`text-2xl sm:text-3xl font-black tracking-tight mt-2 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
            Oi, {user.name || 'Aluna'}! 👋 Continue de onde parou.
          </h1>
        </div>

        {nextTarget && (
          <div 
            className={`group relative overflow-hidden transition-all duration-300 hover:border-[#FF1E40]/30 hover:shadow-md ${cardBgClass}`}
          >
            {/* Visual highlight accent */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FF1E40]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-[#FF1E40]/10 transition-all duration-500" />
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="flex gap-4 items-center">
                {/* Module Cover Tiny Thumbnail preview */}
                <div className="w-14 h-14 rounded-2xl bg-zinc-100 shrink-0 overflow-hidden border border-zinc-200/50 hidden sm:block">
                  <img 
                    src={nextTarget.module.bannerUrl || 'https://i.ibb.co/nMMKYk91/1.png'} 
                    alt={nextTarget.module.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#FF1E40] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E40] animate-ping" />
                    PRÓXIMO MÓDULO EM ANDAMENTO
                  </span>
                  <h3 className={`text-sm sm:text-base font-black truncate leading-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    {nextTarget.module.title}
                  </h3>
                  <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-white/40'} max-w-xl truncate`}>
                    Aula restante: <span className="font-bold">{nextTarget.lesson.title}</span> • ({nextTarget.lesson.duration})
                  </p>
                </div>
              </div>

              <button
                id="home-continue-lesson-btn"
                onClick={handleContinue}
                className="w-full md:w-auto px-6 py-3.5 text-xs font-black rounded-2xl bg-[#FF1E40] text-white hover:bg-[#FF1E40]/90 select-none shadow-md shadow-rose-900/10 active:scale-97 cursor-pointer transition-all flex items-center justify-center gap-2 shrink-0 group"
              >
                <Play size={12} className="fill-white" />
                <span>Continuar aula</span>
                <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: Evolutionary Bento Dashboard Metrics Panels */}
      <div className="space-y-3">
        <h3 className={`text-[11px] font-black uppercase tracking-widest ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
          Seu Painel de Evolução
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Aulas Assistidas with progress bar */}
          <div className={`${miniCardBgClass} flex flex-col justify-between h-[115px]`}>
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${isLight ? 'text-zinc-400' : 'text-white/30'}`}>Aulas Assistidas</span>
                <span className={`text-xl font-black tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  {watchedCount} <span className={`text-xs font-semibold ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>/ {totalLessons}</span>
                </span>
              </div>
              <div className={`p-1.5 rounded-lg ${isLight ? 'bg-zinc-200/50 text-zinc-600' : 'bg-white/5 text-white/50'}`}>
                <BookOpen size={14} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-zinc-200/50' : 'bg-white/5'}`}>
                <div 
                  className="h-full bg-gradient-to-r from-[#8100FF] to-[#FF1E40] rounded-full transition-all duration-500" 
                  style={{ width: `${completionPercent}%` }} 
                />
              </div>
              <span className={`text-[8.5px] font-bold block ${isLight ? 'text-zinc-400' : 'text-white/35'}`}>
                {completionPercent}% concluído do total da trilha
              </span>
            </div>
          </div>

          {/* Card 2: Canva templates available */}
          <div className={`${miniCardBgClass} flex flex-col justify-between h-[115px]`}>
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${isLight ? 'text-zinc-400' : 'text-white/30'}`}>Templates Disponibilizados</span>
                <span className={`text-xl font-black tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  {totalTemplates} <span className={`text-xs font-semibold ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Canva</span>
                </span>
              </div>
              <div className={`p-1.5 rounded-lg ${isLight ? 'bg-pink-100 text-[#FF1E40]' : 'bg-pink-950/20 text-[#FF1E40]'}`}>
                <Sparkles size={14} />
              </div>
            </div>
            <p className={`text-[9.5px] leading-tight ${isLight ? 'text-zinc-400' : 'text-white/30'}`}>
              Modelos validados prontos para você duplicar com sua própria logo.
            </p>
          </div>

          {/* Card 3: Próxima Aula */}
          <div className={`${miniCardBgClass} flex flex-col justify-between h-[115px]`}>
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${isLight ? 'text-zinc-400' : 'text-white/30'}`}>Próxima Aula</span>
                <span className={`text-xs sm:text-sm font-black block mt-1 tracking-tight truncate max-w-[200px] ${
                  isLight ? 'text-zinc-800 font-extrabold' : 'text-zinc-200'
                }`}>
                  {nextTarget ? nextTarget.lesson.title : 'Tudo assistido! 🎉'}
                </span>
              </div>
              <div className={`p-1.5 rounded-lg ${isLight ? 'bg-amber-100 text-amber-600' : 'bg-amber-950/20 text-amber-400'}`}>
                <Play size={14} className="fill-current" />
              </div>
            </div>
            <p className={`text-[9px] leading-tight ${isLight ? 'text-zinc-400' : 'text-white/35'} truncate`}>
              {nextTarget ? `Módulo ${nextTarget.module.title.split('.')[0] || ''}` : 'Você concluiu 100% da trilha!'}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Novidades do Banco de Postagens (Carousel horizontal) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`text-[11px] font-black uppercase tracking-widest ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
            Últimas postagens adicionadas
          </h3>
          
          <button
            onClick={() => setActiveTab('posts')}
            className={`text-[10px] font-bold flex items-center gap-1 hover:underline cursor-pointer transition-colors ${
              isLight ? 'text-zinc-650 hover:text-zinc-900' : 'text-[#FF1E40] hover:text-pink-400'
            }`}
          >
            <span>Ver todos os templates</span>
            <ArrowRight size={10} />
          </button>
        </div>

        {/* Carousel elements container */}
        <div 
          id="home-latest-posts-carousel" 
          className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin scroll-smooth -mx-3 px-3 sm:mx-0 sm:px-0"
        >
          {latestPosts.length > 0 ? (
            latestPosts.map((post) => {
              // Resolve real Canva URLs from CategoryLinks
              const resolvedLinks = getCategoryLinks(post.category, categoryLinks);
              const finalCanvaUrl = resolvedLinks.canva || post.canvaUrl;
              
              // Resolve beautiful category customized banner image instead of the same treatment image
              const resolvedBannerUrl = getCategoryBanner(post.category, post.bannerUrl);

              // Resolve human friendly template title
              const resolvedTitle = !post.title || post.title === 'Criativo' 
                ? `Template de ${formatCategoryName(post.category)}` 
                : post.title;

              // Resolve realistic template description
              const resolvedDesc = !post.description 
                ? `Modelo completo com design estético e paleta refinada para postar em poucos minutos.` 
                : post.description;

              return (
                <div 
                  key={post.id}
                  className={`snap-center shrink-0 w-[270px] sm:w-[325px] flex flex-col justify-between border md:select-none transition-all duration-300 hover:scale-[1.01] rounded-2xl ${
                    isLight 
                      ? 'bg-white border-zinc-200/80 shadow-xs hover:border-zinc-300' 
                      : 'bg-[#0f0f11]/60 border-white/5 backdrop-blur-md hover:border-white/10'
                  }`}
                >
                  {/* Visual Cover Banner preview */}
                  <div className="relative h-36 rounded-t-2xl overflow-hidden border-b border-zinc-100 bg-zinc-100">
                    <img 
                      src={resolvedBannerUrl} 
                      alt={resolvedTitle}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Category overlay label decoration */}
                    <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-full px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wide">
                      {formatCategoryName(post.category)}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className={`text-xs sm:text-sm font-extrabold tracking-tight line-clamp-1 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                        {resolvedTitle}
                      </h4>
                      <p className={`text-[10px] line-clamp-2 mt-1 leading-relaxed ${isLight ? 'text-zinc-500' : 'text-white/45'}`}>
                        {resolvedDesc}
                      </p>
                    </div>

                    <a
                      href={finalCanvaUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 rounded-xl text-[10px] font-extrabold flex items-center justify-center gap-1 shadow-sm transition-all focus:outline-hidden ${
                        isLight 
                          ? 'bg-pink-100 text-[#FF1E40] border border-pink-200 hover:bg-[#FF1E40] hover:text-white hover:border-[#FF1E40]' 
                          : 'bg-white/5 text-zinc-350 border border-white/10 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      <span>Editar no Canva</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={`p-6 text-center w-full text-xs font-semibold ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
              Nenhum template cadastrado no momento.
            </div>
          )}
        </div>
      </div>

      {/* SECTION 4: Atalhos rápidos buttons */}
      <div className="space-y-3">
        <h3 className={`text-[11px] font-black uppercase tracking-widest ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
          Atalhos Rápidos
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            id="home-shortcut-trilha"
            onClick={() => setActiveTab('aulas')}
            className={`flex items-center justify-between p-4 rounded-2xl border text-xs font-extrabold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${
              isLight 
                ? 'bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-800' 
                : 'bg-white/5 border-white/5 hover:bg-white/10 text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`p-1.5 rounded-xl ${isLight ? 'bg-zinc-100' : 'bg-white/5'}`}>
                <Compass size={14} className="text-[#8100FF]" />
              </div>
              <span>Trilha de Aulas</span>
            </div>
            <ArrowRight size={12} className="text-zinc-400" />
          </button>

          <button
            id="home-shortcut-banco"
            onClick={() => setActiveTab('posts')}
            className={`flex items-center justify-between p-4 rounded-2xl border text-xs font-extrabold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${
              isLight 
                ? 'bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-800' 
                : 'bg-white/5 border-white/5 hover:bg-white/10 text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`p-1.5 rounded-xl ${isLight ? 'bg-zinc-100' : 'bg-white/5'}`}>
                <Sparkles size={14} className="text-[#FF1E40]" />
              </div>
              <span>Banco de Postagens</span>
            </div>
            <ArrowRight size={12} className="text-zinc-400" />
          </button>

          <button
            id="home-shortcut-tutorial"
            onClick={onReplayTour}
            className={`flex items-center justify-between p-4 rounded-2xl border text-xs font-extrabold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${
              isLight 
                ? 'bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-800' 
                : 'bg-white/5 border-white/5 hover:bg-white/10 text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`p-1.5 rounded-xl ${isLight ? 'bg-zinc-100' : 'bg-white/5'}`}>
                <HelpCircle size={14} className="text-primary" />
              </div>
              <span>Rever tutorial da plataforma</span>
            </div>
            <ArrowRight size={12} className="text-zinc-400" />
          </button>
        </div>
      </div>

    </div>
  );
}
