import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Layers, 
  ExternalLink, 
  Search, 
  ArrowUpRight, 
  Sparkle,
  Calendar,
  Grid,
  Folder,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { InstagramPost, PostCategory } from '../types';

interface PostsViraisProps {
  posts: InstagramPost[];
  categories: string[];
  categoryLinks?: Record<string, { canva: string; drive?: string }>;
  theme?: 'dark' | 'light';
}

const getInstagramEmbedUrl = (url: string) => {
  if (!url) return '';
  try {
    const cleanUrl = url.split('?')[0];
    const baseUrl = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
    return `${baseUrl}embed/`;
  } catch (e) {
    return `${url}/embed/`;
  }
};

export function formatCategoryName(name: string): string {
  if (!name) return '';
  
  // Clean special uppercase separators/patterns like "POSTS - " or "POSTS "
  let cleaned = name.trim();
  if (cleaned.toUpperCase().startsWith('POSTS - ')) {
    cleaned = cleaned.substring(8);
  } else if (cleaned.toUpperCase().startsWith('POSTS ')) {
    cleaned = cleaned.substring(6);
  }
  
  const lowercaseWords = ['e', 'de', 'do', 'da', 'dos', 'das', 'com', 'em', 'para', 'o', 'a', 'os', 'as'];
  
  return cleaned
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      if (!word) return '';
      // Capitalize first character of the word unless it's a minor word in Portuguese
      if (lowercaseWords.includes(word) && index > 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

interface CategoryLinks {
  canva: string;
  drive?: string;
}

export function getCategoryLinks(
  category: string, 
  customLinks?: Record<string, { canva: string; drive?: string }>
): CategoryLinks {
  const norm = (category || '').trim().toUpperCase();
  
  if (customLinks) {
    if (customLinks[category]) {
      return customLinks[category];
    }
    const foundKey = Object.keys(customLinks).find(k => k.trim().toUpperCase() === norm);
    if (foundKey) {
      return customLinks[foundKey];
    }
  }
  
  if (norm.includes('MEME') || norm === 'MEME') {
    return {
      canva: 'https://www.canva.com/design/DAG7JIo1mfk/L0_3OpR8L7ZLOeW7JAkE6g/edit',
      drive: 'https://drive.google.com/drive/folders/1r9Yx189AMGUI1az2epYFxgkL3lCiPplv'
    };
  }
  if (norm.includes('MOTIVACIONAL') || norm.includes('MOTIVACIONAIS')) {
    return {
      canva: 'https://www.canva.com/design/DAG7H8n4wio/bZ1by_UxE5iwMi7NjgT9fg/edit',
      drive: 'https://drive.google.com/drive/folders/1S0aMFf37XyibMdTbE7RqBP24ukB0UFd-'
    };
  }
  if (norm.includes('MELASMA') || norm.includes('MALASMA')) {
    return {
      canva: 'https://www.canva.com/design/DAG7HyXPPSw/5-KqBvWB8mhR1qoSuaI81A/edit',
      drive: 'https://drive.google.com/drive/folders/1CwytqPyn354-t5ZVMctRVHdnXfQmR09N'
    };
  }
  if (norm.includes('MADURA')) {
    return {
      canva: 'https://www.canva.com/design/DAG7HpfFLjg/q97aq5pZrZUwAkXwu-fFag/edit',
      drive: 'https://drive.google.com/drive/folders/1PciDlC67BIgWLfdLhwn-M-7VEE2Be_8c'
    };
  }
  if (norm.includes('ACNE')) {
    return {
      canva: 'https://www.canva.com/design/DAG7HpSS6s8/0TWR4FG62nSIEsfTmvX43g/edit',
      drive: 'https://drive.google.com/drive/folders/1xSmAYGpDTVZTdfkmhzaDHH0epdX85_Bp'
    };
  }
  if (norm.includes('CUIDADOS COM A PELE') || (norm.includes('CUIDADOS') && norm.includes('PELE'))) {
    return {
      canva: 'https://www.canva.com/design/DAG7HpjxheU/zRjufu79j_ymtCMkRLZNkQ/edit',
      drive: 'https://drive.google.com/drive/folders/1glJRXUn1ewlKpOCKV-cN73Ph0l_xkT3T'
    };
  }
  if (norm.includes('AUTOCUIDADO')) {
    return {
      canva: 'https://www.canva.com/design/DAG7Him3IWA/c3ezCa0t-y6r1k9O6dR49w/edit'
    };
  }
  if (norm.includes('MICROAGULHAMENTO')) {
    return {
      canva: 'https://www.canva.com/design/DAG_K5UHc6M/FQQq-YRbJEnSLClTEqGKtQ/edit'
    };
  }
  if (norm.includes('ROSÁCEA') || norm.includes('ROSACEA') || norm.includes('SENSÍVEL') || norm.includes('SENSIVEL')) {
    return {
      canva: 'https://www.canva.com/design/DAG_JS3XNyo/iK-jZL1KwIx4zaoQCaYEIQ/edit'
    };
  }
  if (norm.includes('REELS') || norm === 'REELS') {
    return {
      canva: '',
      drive: 'https://drive.google.com/drive/folders/1jb36CgGpIiavzenMd1MFgnTIqHGNF9Nx'
    };
  }

  return {
    canva: ''
  };
}

export function PostsVirais({ posts, categories, categoryLinks, theme = 'dark' }: PostsViraisProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | 'All'>('All');
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState<boolean>(false);
  const [activeSlideIndex, setActiveSlideIndex] = React.useState<number>(0);
  const isLight = theme === 'light';
  
  const carouselRef = React.useRef<HTMLDivElement>(null);
  
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCarouselScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const itemWidth = container.scrollWidth / (featuredPosts.length || 1);
    if (itemWidth === 0) return;
    const index = Math.round(container.scrollLeft / itemWidth);
    setActiveSlideIndex(Math.min(Math.max(0, index), featuredPosts.length - 1));
  };

  // Consolidate categories list dynamically to include both predefined and any post-defined categories
  const allCategories = React.useMemo(() => {
    const postCategories = posts.map((p) => p.category).filter(Boolean);
    return Array.from(new Set([...(categories || []), ...postCategories]));
  }, [categories, posts]);

  // Active category badge styling helper (dynamic according to requested colors in MELHORIA 1)
  const getCategoryBadgeStyles = (category: string) => {
    const norm = (category || '').trim().toUpperCase();
    if (norm.includes('MEME') || norm === 'MEME') {
      return {
        bg: 'bg-[#FFF4CC]',
        text: 'text-[#5F3D00] font-black',
        border: 'border-yellow-250/50'
      };
    }
    if (norm.includes('CUIDADOS COM A PELE') || (norm.includes('CUIDADOS') && norm.includes('PELE')) || norm.includes('SKINCARE')) {
      return {
        bg: 'bg-[#E8F5E9]',
        text: 'text-[#1B5E20] font-black',
        border: 'border-emerald-250'
      };
    }
    if (norm.includes('ACNE')) {
      return {
        bg: 'bg-[#F3E5F5]',
        text: 'text-[#4A148C] font-black',
        border: 'border-purple-200'
      };
    }
    if (norm.includes('MOTIVACIONAL') || norm.includes('MOTIVACIONAIS')) {
      return {
        bg: 'bg-[#FFE8D6]',
        text: 'text-[#7D3200] font-black',
        border: 'border-orange-200'
      };
    }
    if (norm.includes('REELS') || norm === 'REELS') {
      return {
        bg: 'bg-[#E3F2FD]',
        text: 'text-[#0D47A1] font-black',
        border: 'border-blue-200'
      };
    }
    // Demais categorias = cinza suave
    return {
      bg: 'bg-[#F5F5F5]',
      text: 'text-[#1D1D1F] font-black',
      border: 'border-zinc-200'
    };
  };

  // Active category badge styling helper (dynamic and matching standard theme palette)
  const getCategoryColor = (cat: string) => {
    return { 
      bg: isLight ? 'bg-zinc-100/90' : 'bg-white/5', 
      text: isLight ? 'text-zinc-600 font-extrabold' : 'text-white/70', 
      border: isLight ? 'border-zinc-200' : 'border-white/10' 
    };
  };

  // Filter logic - MELHORIA 4 sorts featured posts to the very beginning
  const filteredPosts = React.useMemo(() => {
    const matched = posts.filter((post) => {
      const matchCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchText = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchText;
    });

    return [...matched].sort((a, b) => {
      const aFeatured = a.featured ? 1 : 0;
      const bFeatured = b.featured ? 1 : 0;
      if (aFeatured !== bFeatured) {
        return bFeatured - aFeatured;
      }
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });
  }, [posts, selectedCategory, searchTerm]);

  // Highlight featured posts (latest 6 added for carousel)
  const featuredPosts = React.useMemo(() => {
    return [...posts]
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      .slice(0, 6);
  }, [posts]);

  // MELHORIA 5 - Real-time calculation of most recent post date
  const lastUpdatedDate = React.useMemo(() => {
    if (!posts || posts.length === 0) return '';
    const sortedDates = [...posts]
      .map(p => p.dateAdded)
      .filter(Boolean)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    if (sortedDates.length === 0) return '';
    
    const dateObj = new Date(sortedDates[0] + 'T00:00:00'); // avoid timezone shifts
    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    return `${day} ${month}`;
  }, [posts]);

  return (
    <div id="posts-virais-root" className="space-y-8 max-w-6xl mx-auto pb-16 relative z-10">
           {/* Header and Explanation */}
      <div id="posts-headline-header" className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <span className={`inline-block px-3 py-1 rounded-full text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider font-sans shadow-xs ${
            isLight 
              ? 'btn-gradient-border-light text-[#FF1E40]' 
              : 'btn-gradient-border-dark text-[#FF1E40]'
          }`}>
            Postagens Virais Validadas
          </span>
          <h1 className={`text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight mt-1.5 sm:mt-2 font-sans ${
            isLight ? 'text-zinc-900' : 'text-white'
          }`}>
            Conteúdos Prontos de Alto Engajamento
          </h1>
          <p className={`text-2xs sm:text-xs md:text-sm mt-0.5 sm:mt-1 max-w-xl ${
            isLight ? 'text-zinc-500' : 'text-white/50'
          }`}>
            Acesse as tendências no Instagram para a estética, copie ganchos, formatos, textos, tudo pronto para replicar e com o link da arte editável no Canva para personalização pessoal.
          </p>
        </div>
      </div>

      {/* LAST ADDED HIGHLIGHTS SECTION */}
      <div id="featured-posts-highlights" className="space-y-3 relative group/carousel">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest pl-1 flex items-center gap-1.5 ${
              isLight ? 'text-zinc-500' : 'text-white/40'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E40] animate-pulse" />
              Últimas inserções em destaque
            </h3>
            {/* MELHORIA 6 — Navigation hint label next to title */}
            <span className={`text-[9.5px] sm:text-[10px] italic font-bold select-none ${
              isLight ? 'text-zinc-400' : 'text-white/30'
            }`}>
              Deslize para ver mais
            </span>
          </div>
          
          {/* Carousel Navigation Controller & Index indicator */}
          <div className="flex flex-col items-end gap-1 pr-1 shrink-0 select-none">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollCarousel('left')}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                  isLight 
                    ? 'bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-50 shadow-xs shadow-zinc-100' 
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
                title="Anterior"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                  isLight 
                    ? 'bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-50 shadow-xs shadow-zinc-100' 
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
                title="Próximo"
              >
                <ChevronRight size={14} />
              </button>
            </div>
            
            {/* MELHORIA 6 — Position Indicator progress trackers */}
            {featuredPosts.length > 0 && (
              <span className={`text-[9px] sm:text-[10px] font-black leading-none uppercase tracking-wider ${
                isLight ? 'text-zinc-400' : 'text-white/40'
              }`}>
                {activeSlideIndex + 1} de {featuredPosts.length}
              </span>
            )}
          </div>
        </div>

        {/* Carousel Outer Container with hidden overflow */}
        <div className="relative w-full overflow-hidden">
          {/* Snap-scroller wrapper with handle scroll event */}
          <div 
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-3.5 sm:gap-4.5 pb-4 px-3 sm:px-4 -mx-3 sm:-mx-4 md:select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {featuredPosts.map((post) => {
              const colors = getCategoryColor(post.category);
              const categoryStyles = getCategoryBadgeStyles(post.category);
              return (
                <div 
                  key={`featured-${post.id}`}
                  id={`featured-card-${post.id}`}
                  className={`w-[234px] sm:w-[270px] shrink-0 snap-start rounded-2xl md:rounded-[24px] overflow-hidden group flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] ${
                    isLight
                      ? 'card-insta-border-light shadow-md shadow-amber-500/5'
                      : 'card-insta-border-dark shadow-xl shadow-black/20'
                  }`}
                >
                  {/* Visual Card Representation designed with Premium layout */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col gap-2 sm:gap-3">
                    
                    {/* Block visual above the embed with category chip */}
                    <div className="flex items-center justify-between gap-1 px-1">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold border leading-none shrink-0 ${categoryStyles.bg} ${categoryStyles.text} ${categoryStyles.border}`}>
                        {formatCategoryName(post.category)}
                      </span>
                    </div>

                    {/* Real Instagram Embed Frame in 3:5.5 aspect ratio - max-height: 420px */}
                    <div className={`relative w-full aspect-[3/5.5] max-h-[420px] overflow-hidden rounded-xl border ${
                      isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-black/20 border-white/5'
                    }`}>
                      <iframe 
                        src={getInstagramEmbedUrl(post.instagramUrl)} 
                        className="w-full h-full border-0 rounded-xl"
                        scrolling="no"
                        allowtransparency="true"
                        title={`Instagram template by ${post.category}`}
                      />
                    </div>

                    {/* Canva edit bar (faixa clara) positioned right below embed */}
                    {(() => {
                      const resolvedLinks = getCategoryLinks(post.category, categoryLinks);
                      const finalCanvaUrl = resolvedLinks.canva || post.canvaUrl;
                      if (!finalCanvaUrl) return null;
                      return (
                        <div className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                          isLight ? 'bg-pink-50/50 border-pink-100/60' : 'bg-pink-500/5 border-pink-500/10'
                        }`}>
                          <a
                            id={`featured-canva-bar-btn-${post.id}`}
                            href={finalCanvaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 bg-[#FF1E40] hover:bg-[#E01230] text-white text-[10px] sm:text-xs font-black rounded-lg text-center shadow-md shadow-[#FF1E40]/10 hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>✏️ Editar no Canva</span>
                          </a>
                          <span className={`text-[8px] sm:text-[9px] font-bold text-center leading-none ${
                            isLight ? 'text-zinc-400' : 'text-zinc-500'
                          }`}>
                            Personalize e publique em poucos minutos
                          </span>
                        </div>
                      );
                    })()}

                    {/* Calendar date representation */}
                    <div className={`flex items-center gap-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1 mt-auto ${
                      isLight ? 'text-zinc-400' : 'text-white/40'
                    }`}>
                      <Calendar size={10} className="shrink-0" />
                      <span>{new Date(post.dateAdded).toLocaleDateString('pt-BR')}</span>
                    </div>

                  </div>

                  {/* Footer Interactive Actions */}
                  <div className="p-2.5 sm:p-3 pt-0 flex flex-col lg:flex-row items-stretch lg:items-center gap-1.5 sm:gap-2 transition-colors duration-250">
                    <a
                      id={`featured-btn-insta-${post.id}`}
                      href={post.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 border rounded-lg text-[10px] sm:text-[11px] font-extrabold whitespace-nowrap transition-all cursor-pointer active:scale-97 ${
                        isLight 
                          ? 'border-zinc-200 bg-white hover:bg-zinc-100/55 text-zinc-700 shadow-xs' 
                          : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white'
                      }`}
                    >
                      <Instagram size={11} className="text-pink-450 shrink-0" />
                      <span>Ver Post</span>
                    </a>

                    {(() => {
                      const resolvedLinks = getCategoryLinks(post.category, categoryLinks);
                      const finalDriveUrl = resolvedLinks.drive;
                      if (!finalDriveUrl) return null;
                      return (
                        <a
                          id={`featured-btn-drive-${post.id}`}
                          href={finalDriveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-extrabold whitespace-nowrap shadow-xs transition-all cursor-pointer active:scale-97 ${
                            isLight 
                              ? 'bg-zinc-800 hover:bg-zinc-950 text-white' 
                              : 'bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white'
                          }`}
                        >
                          <Folder size={11} className="shrink-0" />
                          <span>Drive</span>
                        </a>
                      );
                    })()}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH ACTIONS COMPONENT */}
      <div id="filter-search-menu-bar" className={`p-4 sm:p-5 rounded-[40px] space-y-4 border transition-all ${
        isLight 
          ? 'bg-white border-zinc-200 shadow-sm' 
          : 'bg-white/5 border border-white/10 backdrop-blur-md'
      }`}>
        <div className="flex flex-col gap-4">
          
          {/* Top header line inside search bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
            <div className="hidden sm:flex items-center gap-2">
              <span className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${
                isLight ? 'text-zinc-500' : 'text-white/40'
              }`}>
                Categorias de Conteúdo
              </span>
              <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold ${
                isLight ? 'bg-zinc-100 text-zinc-600' : 'bg-white/5 text-white/50'
              }`}>
                {allCategories.length} Filtros
              </span>
            </div>

            {/* Search box input widget and mobile filter toggle button */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80 md:w-96 shrink-0">
                <Search size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${
                  isLight ? 'text-zinc-400' : 'text-white/40'
                }`} />
                <input
                  id="search-templates-input"
                  type="text"
                  placeholder="Buscar título ou gancho..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full text-xs font-semibold pl-9 pr-4 py-2.5 rounded-xl border transition-all font-sans focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/10 ${
                    isLight 
                      ? 'bg-zinc-50 border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-[#1D1D1F]' 
                      : 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-white/55'
                  }`}
                />
              </div>

              {/* Mobile Filter Toggle Button */}
              <button
                id="mobile-filter-toggle"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className={`sm:hidden p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                  isLight
                    ? isMobileFilterOpen 
                      ? 'bg-zinc-950 border-zinc-950 text-white' 
                      : 'bg-white border-zinc-200 text-zinc-700 shadow-xs hover:bg-zinc-50'
                    : isMobileFilterOpen
                      ? 'bg-white text-zinc-950 border-white'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
                title="Filtrar por Categoria"
              >
                <SlidersHorizontal size={14} />
              </button>
            </div>
          </div>

          {/* Category Pill Filters (Responsive showing on Desktop, dropdown toggleable on Mobile) */}
          <div 
            id="category-pills-container" 
            className={`${isMobileFilterOpen ? 'block' : 'hidden sm:block'} pt-2 sm:pt-0 border-t border-dashed border-zinc-150/80 sm:border-t-0`}
          >
            {isMobileFilterOpen && (
              <p className={`text-[9px] font-black uppercase tracking-wider mb-2.5 sm:hidden ${isLight ? 'text-zinc-400' : 'text-white/30'}`}>
                Selecione uma Categoria:
              </p>
            )}
            <div id="category-pills-list" className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                id="filter-cat-all"
                onClick={() => { setSelectedCategory('All'); setIsMobileFilterOpen(false); }}
                className={`shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-extrabold transition-all border cursor-pointer ${
                  selectedCategory === 'All'
                    ? isLight
                      ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-sm'
                      : 'bg-white text-zinc-950 border-white shadow-sm'
                    : isLight 
                      ? 'bg-zinc-100 border-zinc-200 text-zinc-500 hover:text-[#1D1D1F] hover:bg-zinc-200/50'
                      : 'bg-white/5 border-transparent text-white/50 hover:text-white hover:bg-white/10'
                }`}
              >
                Todos ({posts.length})
              </button>
              {allCategories.map((cat) => {
                const count = posts.filter((p) => p.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    id={`filter-cat-${cat}`}
                    onClick={() => { setSelectedCategory(cat); setIsMobileFilterOpen(false); }}
                    className={`shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-extrabold transition-all border cursor-pointer ${
                      isSelected
                        ? isLight
                          ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-sm'
                          : 'bg-white text-zinc-950 border-white shadow-sm'
                        : isLight 
                          ? 'bg-zinc-100 border-zinc-200 text-zinc-500 hover:text-[#1D1D1F] hover:bg-zinc-200/50'
                          : 'bg-white/5 border-transparent text-white/50 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {formatCategoryName(cat)} ({count})
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* MELHORIA 5 — Dynamic indicator count & update date */}
      <div className={`flex items-center gap-2 pl-2 text-2xs sm:text-xs font-semibold select-none ${
        isLight ? 'text-zinc-500' : 'text-white/40'
      }`}>
        <span>Mostrando <span className={isLight ? 'text-zinc-800 font-extrabold' : 'text-white'}>{filteredPosts.length}</span> templates</span>
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400/50 shrink-0" />
        <span>Últimas atualizações em <span className={isLight ? 'text-zinc-800 font-extrabold' : 'text-white'}>{lastUpdatedDate || '28 mai'}</span></span>
      </div>

      {/* TEMPLATES GRID */}
      <div id="posts-templates-grid">
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 pb-12"
            >
              {filteredPosts.map((post) => {
                const colors = getCategoryColor(post.category);
                const categoryStyles = getCategoryBadgeStyles(post.category);

                return (
                  <motion.div
                    key={post.id}
                    id={`post-grid-card-${post.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`border rounded-2xl md:rounded-[24px] overflow-hidden group flex flex-col justify-between transition-all ${
                      post.featured 
                        ? isLight
                          ? 'bg-gradient-to-tr from-pink-50/30 via-white to-white border-[#FF1E40]/30 border-l-4 border-l-[#FF1E40] shadow-md shadow-[#FF1E40]/5'
                          : 'bg-gradient-to-r from-[#FF1E40]/5 via-white/3 to-white/3 border-white/20 border-l-4 border-l-[#FF1E40] shadow-xl shadow-black/20'
                        : isLight 
                          ? 'bg-white border-zinc-200 shadow-sm' 
                          : 'bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-black/30'
                    }`}
                  >
                    {/* Visual Card Representation designed with Premium layout */}
                    <div className="p-2.5 sm:p-3 flex-1 flex flex-col gap-1.5 sm:gap-2.5">
                      
                      {/* MELHORIA 4 — Small prefix visual banner highlights 'destaque' */}
                      {post.featured && (
                        <div className="flex items-center gap-1.5 px-1 py-0.5 font-sans font-black text-[9px] sm:text-[10px] uppercase tracking-wider text-[#FF1E40] select-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E40] animate-ping" />
                          <span>🌟 Em Destaque</span>
                        </div>
                      )}

                      {/* MELHORIA 1 — Block visual above the embed with category chip */}
                      <div className="flex items-center justify-between gap-1 px-1">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold border leading-none shrink-0 ${categoryStyles.bg} ${categoryStyles.text} ${categoryStyles.border}`}>
                          {formatCategoryName(post.category)}
                          {post.featured && <span className="text-amber-500 inline-block ml-0.5">⭐</span>}
                        </span>
                        
                        {post.featured && (
                          <span className="inline-flex items-center text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-[#FF1E40] shrink-0">
                            DESTAQUE
                          </span>
                        )}
                      </div>

                      {/* Real Instagram Embed Frame in 3:5.5 aspect ratio - MELHORIA 3: max-height: 420px */}
                      <div className={`relative w-full aspect-[3/5.5] max-h-[420px] overflow-hidden rounded-xl border ${
                        isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-black/20 border-white/5'
                      }`}>
                        <iframe 
                          src={getInstagramEmbedUrl(post.instagramUrl)} 
                          className="w-full h-full border-0 rounded-xl"
                          scrolling="no"
                          allowtransparency="true"
                          title={`Instagram template by ${post.category}`}
                        />
                      </div>

                      {/* MELHORIA 2 — Canva edit bar (faixa clara) positioned right below embed */}
                      {(() => {
                        const resolvedLinks = getCategoryLinks(post.category, categoryLinks);
                        const finalCanvaUrl = resolvedLinks.canva || post.canvaUrl;
                        if (!finalCanvaUrl) return null;
                        return (
                          <div className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                            isLight ? 'bg-pink-50/50 border-pink-100/60' : 'bg-pink-500/5 border-pink-500/10'
                          }`}>
                            <a
                              id={`post-canva-bar-btn-${post.id}`}
                              href={finalCanvaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2 bg-[#FF1E40] hover:bg-[#E01230] text-white text-[10px] sm:text-xs font-black rounded-lg text-center shadow-md shadow-[#FF1E40]/10 hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span>✏️ Editar no Canva</span>
                            </a>
                            <span className={`text-[8px] sm:text-[9px] font-bold text-center leading-none ${
                              isLight ? 'text-zinc-400' : 'text-zinc-500'
                            }`}>
                              Personalize e publique em poucos minutos
                            </span>
                          </div>
                        );
                      })()}

                      {/* Calendar date representation */}
                      <div className={`flex items-center gap-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1 mt-auto ${
                        isLight ? 'text-zinc-400' : 'text-white/40'
                      }`}>
                        <Calendar size={10} className="shrink-0" />
                        <span>{new Date(post.dateAdded).toLocaleDateString('pt-BR')}</span>
                      </div>

                    </div>

                    {/* Footer Interactive Actions */}
                    <div className="p-2.5 sm:p-3 pt-0 flex flex-col lg:flex-row items-stretch lg:items-center gap-1.5 sm:gap-2 transition-colors duration-250">
                      <a
                        id={`post-btn-insta-${post.id}`}
                        href={post.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 border rounded-lg text-[10px] sm:text-[11px] font-extrabold whitespace-nowrap transition-all cursor-pointer active:scale-97 ${
                          isLight 
                            ? 'border-zinc-200 bg-white hover:bg-zinc-100/55 text-zinc-700 shadow-xs' 
                            : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white'
                        }`}
                      >
                        <Instagram size={11} className="text-pink-450 shrink-0" />
                        <span>Ver Post</span>
                      </a>

                      {(() => {
                        const resolvedLinks = getCategoryLinks(post.category, categoryLinks);
                        const finalDriveUrl = resolvedLinks.drive;
                        if (!finalDriveUrl) return null;
                        return (
                          <a
                            id={`post-btn-drive-${post.id}`}
                            href={finalDriveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-extrabold whitespace-nowrap shadow-xs transition-all cursor-pointer active:scale-97 ${
                              isLight 
                                ? 'bg-zinc-800 hover:bg-zinc-950 text-white' 
                                : 'bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white'
                            }`}
                          >
                            <Folder size={11} className="shrink-0" />
                            <span>Drive</span>
                          </a>
                        );
                      })()}
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`h-80 flex flex-col items-center justify-center border border-dashed rounded-[32px] p-8 text-center ${
                isLight 
                  ? 'bg-zinc-50 border-zinc-200 text-zinc-400' 
                  : 'bg-white/5 border-white/10 text-white/40'
              }`}
            >
              <Grid size={40} className={`stroke-1 mb-3 animate-bounce ${isLight ? 'text-zinc-300' : 'text-white/20'}`} />
              <p className="font-semibold">Nenhum template encontrado.</p>
              <p className="text-xs mt-1">Experimente remover filtros ou alterar o termo de busca.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
