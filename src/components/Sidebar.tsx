import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  Settings2, 
  User, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Home
} from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarProps {
  activeTab: 'home' | 'aulas' | 'posts' | 'admin' | 'profile';
  setActiveTab: (tab: 'home' | 'aulas' | 'posts' | 'admin' | 'profile') => void;
  user: UserProfile;
  onLogout: () => void;
}

export function Sidebar({
  activeTab,
  setActiveTab,
  user,
  onLogout
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const topMenuItems = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: Home
    },
    {
      id: 'aulas' as const,
      label: 'Trilha de Aulas',
      icon: BookOpen
    },
    {
      id: 'posts' as const,
      label: 'Banco de Postagens',
      icon: Sparkles
    }
  ];

  const bottomMenuItems = [
    {
      id: 'profile' as const,
      label: 'Meus Dados',
      icon: User
    },
    {
      id: 'admin' as const,
      label: 'Painel Admin',
      icon: Settings2
    }
  ];

  const isLight = true;

  return (
    <motion.div
      id="app-sidebar"
      animate={{ width: isCollapsed ? 76 : 280 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`relative shrink-0 hidden md:flex flex-col h-screen z-30 transition-all duration-350 ${
        isLight 
          ? 'bg-white border-r border-zinc-200 shadow-sm' 
          : 'bg-[#0a0a0c]/60 border-r border-white/10 backdrop-blur-3xl'
      }`}
    >
      {/* Brand Logo Header */}
      <div 
        id="sidebar-brand-header"
        className={`h-20 flex items-center px-4 border-b transition-all duration-300 overflow-hidden ${
          isCollapsed ? 'justify-center border-b-transparent' : 'justify-start'
        } ${
          isLight ? 'border-zinc-200/80 font-semibold' : 'border-white/10'
        }`}
      >
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex items-center justify-start select-none pl-1"
          >
            <img 
              src="https://i.ibb.co/R424CQrC/Design-sem-nome.png" 
              alt="DHC Logo" 
              referrerPolicy="no-referrer"
              className="h-[42px] w-auto max-w-full object-contain"
            />
          </motion.div>
        )}
      </div>

      {/* Collapse Toggle Button (Translucent glass style) */}
      <button
        id="sidebar-collapse-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -right-3 top-[68px] w-6 h-6 rounded-full flex items-center justify-center shadow-md cursor-pointer focus:outline-hidden hover:scale-105 active:scale-95 transition-all border ${
          isLight 
            ? 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:bg-white hover:text-[#1D1D1F]' 
            : 'bg-white/10 backdrop-blur-md border-white/15 text-white hover:text-zinc-300'
        }`}
      >
        {isCollapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
      </button>

      {/* Top Navigation Links */}
      <div 
        id="sidebar-nav-container-top" 
        className={`py-6 space-y-2 transition-all duration-300 ${
          isCollapsed ? 'px-2' : 'px-4'
        }`}
      >
        {topMenuItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              id={`sidebar-nav-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full group flex items-center rounded-2xl text-left transition-all relative border ${
                isCollapsed 
                  ? 'justify-center p-2' 
                  : 'gap-3 px-4 py-3'
              } ${
                isActive 
                  ? isLight
                    ? 'bg-[#1D1D1F]/5 border-[#1D1D1F]/20 text-[#1D1D1F] font-extrabold shadow-xs'
                    : 'bg-white/10 border-white/10 text-white font-medium shadow-inner' 
                  : isLight
                    ? 'text-zinc-500 hover:text-[#1D1D1F] hover:bg-zinc-200/40 border-transparent'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all shrink-0 ${
                isActive 
                  ? 'bg-gradient-to-tr from-[#8100FF] to-[#FF1E40] text-white shadow-lg' 
                  : isLight
                    ? 'bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200 group-hover:text-zinc-600'
                    : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white'
              }`}>
                <Icon size={16} />
              </div>

              {!isCollapsed && (
                <span className={`text-sm font-semibold truncate leading-none ${
                  isActive 
                    ? isLight ? 'text-[#1D1D1F]' : 'text-white' 
                    : isLight ? 'text-zinc-700 group-hover:text-zinc-900' : 'text-white/70 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Flexible Spacer to push bottom items down */}
      <div className="flex-1" />

      {/* Bottom Navigation Links */}
      <div 
        id="sidebar-nav-container-bottom" 
        className={`space-y-2 transition-all duration-300 ${
          isCollapsed ? 'px-2' : 'px-4'
        }`}
      >
        {bottomMenuItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              id={`sidebar-nav-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full group flex items-center rounded-2xl text-left transition-all relative border ${
                isCollapsed 
                  ? 'justify-center p-2' 
                  : 'gap-3 px-4 py-3'
              } ${
                isActive 
                  ? isLight
                    ? 'bg-[#1D1D1F]/5 border-[#1D1D1F]/20 text-[#1D1D1F] font-extrabold shadow-xs'
                    : 'bg-white/10 border-white/10 text-white font-medium shadow-inner' 
                  : isLight
                    ? 'text-zinc-500 hover:text-[#1D1D1F] hover:bg-zinc-200/40 border-transparent'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all shrink-0 ${
                isActive 
                  ? 'bg-gradient-to-tr from-[#8100FF] to-[#FF1E40] text-white shadow-lg' 
                  : isLight
                    ? 'bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200 group-hover:text-zinc-600'
                    : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white'
              }`}>
                <Icon size={16} />
              </div>

              {!isCollapsed && (
                <span className={`text-sm font-semibold truncate leading-none ${
                  isActive 
                    ? isLight ? 'text-[#1D1D1F]' : 'text-white' 
                    : isLight ? 'text-zinc-700 group-hover:text-zinc-900' : 'text-white/70 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Logged-in User Profile Summary in Liquid Glass Box */}
      <div 
        id="sidebar-footer-profile"
        className={`transition-all duration-300 flex flex-col gap-3 ${
          isCollapsed 
            ? 'p-0 mx-auto my-4 border-transparent bg-transparent' 
            : `p-4 rounded-3xl border m-4 ${
                isLight 
                  ? 'border-zinc-200/65 bg-zinc-50 shadow-xs' 
                  : 'border-white/10 bg-white/5'
              }`
        }`}
      >
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <img
            id="sidebar-user-avatar"
            src={user.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
            alt={user.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`;
            }}
            className={`w-10 h-10 rounded-full object-cover shrink-0 border transition-all ${
              isLight ? 'border-zinc-200/80 shadow-xs' : 'border-white/20'
            }`}
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h4 className={`text-xs font-semibold truncate leading-none mb-1 ${
                isLight ? 'text-zinc-800' : 'text-white'
              }`}>
                {user.name}
              </h4>
              <p className={`text-[10px] truncate leading-none ${
                isLight ? 'text-zinc-400' : 'text-white/40'
              }`}>
                Perfil de Aluno
              </p>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button
            id="sidebar-logout-btn"
            onClick={onLogout}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 border rounded-xl text-[11px] font-bold cursor-pointer transition-all duration-200 active:scale-97 ${
              isLight 
                ? 'border-zinc-200 bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-zinc-500 shadow-xs' 
                : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'
            }`}
          >
            <LogOut size={12} />
            <span>Sair do Aplicativo</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
