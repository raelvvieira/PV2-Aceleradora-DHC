import React, { ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  BookOpen, 
  Tv, 
  Sparkles, 
  Layers, 
  FileImage, 
  AlertCircle, 
  CheckCircle,
  X,
  PlusCircle,
  Maximize2,
  Instagram,
  Play,
  Settings2,
  Paperclip,
  FileText,
  Link2,
  Download,
  ExternalLink
} from 'lucide-react';
import { Module, Lesson, InstagramPost, PostCategory, LessonAttachment } from '../types';
import { formatCategoryName, getCategoryLinks } from './PostsVirais';

interface AdminPanelProps {
  modules: Module[];
  lessons: Lesson[];
  posts: InstagramPost[];
  categories: string[];
  categoryLinks?: Record<string, { canva: string; drive?: string }>;
  onUpdateModules: (modules: Module[]) => void;
  onUpdateLessons: (lessons: Lesson[]) => void;
  onUpdatePosts: (posts: InstagramPost[]) => void;
  onUpdateCategories: (categories: string[]) => void;
  onUpdateCategoryLinks?: (links: Record<string, { canva: string; drive?: string }>) => void;
  theme?: 'dark' | 'light';
}

export function AdminPanel({
  modules,
  lessons,
  posts,
  categories,
  categoryLinks = {},
  onUpdateModules,
  onUpdateLessons,
  onUpdatePosts,
  onUpdateCategories,
  onUpdateCategoryLinks,
  theme = 'dark'
}: AdminPanelProps) {
  const isLight = theme === 'light';
  // Tabs within admin panel
  const [adminTab, setAdminTab] = React.useState<'modules' | 'lessons' | 'posts'>('modules');

  // Consolidate categories list dynamically to include both predefined and any post-defined categories,
  // preventing out-of-sync or missing categories (e.g. Hooks) from failing to display/render.
  const allAdminCategories = React.useMemo(() => {
    const postCategories = posts.map((p) => p.category).filter(Boolean);
    return Array.from(new Set([...(categories || []), ...postCategories]));
  }, [categories, posts]);

  // Success / error toast notification state
  const [notification, setNotification] = React.useState<{ text: string; type: 'success' | 'err' } | null>(null);

  const triggerNotification = (text: string, type: 'success' | 'err' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Custom confirmation modal state
  const [confirmModal, setConfirmModal] = React.useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  const requestConfirmation = (
    title: string, 
    message: string, 
    onConfirm: () => void,
    confirmText: string = 'Confirmar',
    cancelText: string = 'Cancelar'
  ) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      confirmText,
      cancelText,
      onConfirm: () => {
        onConfirm();
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      }
    });
  };

  // State for managing categories dynamic popup
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = React.useState(false);
  const [newCatName, setNewCatName] = React.useState('');
  const [newCatCanva, setNewCatCanva] = React.useState('');
  const [editingCatKey, setEditingCatKey] = React.useState<string | null>(null);
  const [editingCatName, setEditingCatName] = React.useState('');
  const [editingCatCanva, setEditingCatCanva] = React.useState('');

  const handleAddCategory = () => {
    const trimmedName = newCatName.trim();
    if (!trimmedName) {
      triggerNotification('O nome da categoria é obrigatório.', 'err');
      return;
    }
    const normalizedNameCaps = trimmedName.toUpperCase();
    if (categories.some(c => c.trim().toUpperCase() === normalizedNameCaps)) {
      triggerNotification('Esta categoria já existe.', 'err');
      return;
    }

    const updatedCategories = [...categories, trimmedName];
    onUpdateCategories(updatedCategories);

    if (onUpdateCategoryLinks) {
      const updatedLinks = { ...categoryLinks };
      updatedLinks[trimmedName] = { canva: newCatCanva.trim() };
      onUpdateCategoryLinks(updatedLinks);
    }

    setNewCatName('');
    setNewCatCanva('');
    triggerNotification('Categoria adicionada com sucesso!');
  };

  const handleSaveCategoryEdit = (originalKey: string) => {
    const trimmedNewName = editingCatName.trim();
    if (!trimmedNewName) {
      triggerNotification('O nome da categoria não pode ser vazio.', 'err');
      return;
    }

    let updatedCategories = categories.map(c => c === originalKey ? trimmedNewName : c);
    const updatedPosts = posts.map(p => p.category === originalKey ? { ...p, category: trimmedNewName } : p);
    
    onUpdateCategories(updatedCategories);
    onUpdatePosts(updatedPosts);

    if (onUpdateCategoryLinks) {
      const updatedLinks = { ...categoryLinks };
      const oldVal = updatedLinks[originalKey] || { canva: '' };
      delete updatedLinks[originalKey];
      updatedLinks[trimmedNewName] = { 
        ...oldVal, 
        canva: editingCatCanva.trim() 
      };
      onUpdateCategoryLinks(updatedLinks);
    }

    setEditingCatKey(null);
    triggerNotification('Categoria atualizada com sucesso!');
  };

  const handleDeleteCategoryWithConfirmation = (catToDelete: string) => {
    const remaining = categories.filter(c => c !== catToDelete);
    if (remaining.length === 0) {
      triggerNotification('Você não pode excluir todas as categorias. Deve haver pelo menos uma.', 'err');
      return;
    }

    const targetCategory = remaining[0];
    const postsToMigrate = posts.filter(p => p.category === catToDelete);
    const migrateMessage = postsToMigrate.length > 0 
      ? ` Existem ${postsToMigrate.length} postagens nesta categoria que serão migradas automaticamente para "${formatCategoryName(targetCategory)}".`
      : '';

    requestConfirmation(
      'Confirmar Exclusão',
      `Tem certeza de que deseja excluir a categoria "${formatCategoryName(catToDelete)}"?${migrateMessage}`,
      () => {
        const updatedPosts = posts.map(p => p.category === catToDelete ? { ...p, category: targetCategory } : p);
        onUpdatePosts(updatedPosts);
        onUpdateCategories(remaining);

        if (onUpdateCategoryLinks) {
          const updatedLinks = { ...categoryLinks };
          delete updatedLinks[catToDelete];
          onUpdateCategoryLinks(updatedLinks);
        }
        triggerNotification('Categoria excluída com sucesso!');
      },
      'Sim, Excluir',
      'Cancelar'
    );
  };

  // Base64 File Reader helper
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        triggerNotification('Imagem muito pesada! Escolha uma menor de 2MB.', 'err');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
          triggerNotification('Imagem importada com sucesso!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // YouTube URL Validation helper
  const isValidYouTubeUrl = (url: string): boolean => {
    if (!url) return false;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? true : false;
  };

  // State to hold the lesson being previewed in the pop-up
  const [previewLesson, setPreviewLesson] = React.useState<Lesson | null>(null);

  // Parse YouTube video embed ID for Preview Player
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    }
    return `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0`;
  };

  // ==========================================
  // 1. MODULES CRUD STATE & HANDLERS
  // ==========================================
  const [isModuleModalOpen, setIsModuleModalOpen] = React.useState(false);
  const [editingModule, setEditingModule] = React.useState<Module | null>(null);
  const [moduleForm, setModuleForm] = React.useState({
    title: '',
    description: '',
    bannerUrl: ''
  });

  const openNewModuleModal = () => {
    setEditingModule(null);
    setModuleForm({
      title: '',
      description: '',
      bannerUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    });
    setIsModuleModalOpen(true);
  };

  const openEditModuleModal = (mod: Module) => {
    setEditingModule(mod);
    setModuleForm({
      title: mod.title,
      description: mod.description,
      bannerUrl: mod.bannerUrl
    });
    setIsModuleModalOpen(true);
  };

  const saveModule = () => {
    if (!moduleForm.title.trim()) {
      triggerNotification('O título do módulo é obrigatório.', 'err');
      return;
    }

    if (editingModule) {
      // Update
      const updated = modules.map((m) => 
        m.id === editingModule.id 
          ? { ...m, title: moduleForm.title, description: moduleForm.description, bannerUrl: moduleForm.bannerUrl }
          : m
      );
      onUpdateModules(updated);
      triggerNotification('Módulo atualizado com sucesso!');
    } else {
      // Create
      const newMod: Module = {
        id: `mod-${Date.now()}`,
        title: moduleForm.title,
        description: moduleForm.description,
        bannerUrl: moduleForm.bannerUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
        order: modules.length + 1
      };
      onUpdateModules([...modules, newMod]);
      triggerNotification('Novo módulo criado com sucesso!');
    }
    setIsModuleModalOpen(false);
  };

  const deleteModule = (id: string) => {
    const relatedLessons = lessons.filter((l) => l.moduleId === id);
    const performDeletion = () => {
      // Filter modules
      const updatedModules = modules.filter((m) => m.id !== id);
      // Filter out related lessons
      const updatedLessons = lessons.filter((l) => l.moduleId !== id);
      
      onUpdateModules(updatedModules);
      onUpdateLessons(updatedLessons);
      triggerNotification('Módulo e aulas vinculadas deletados.');
    };

    if (relatedLessons.length > 0) {
      requestConfirmation(
        'Deletar Módulo e Aulas?',
        `Tem certeza? Excluir este módulo também excluirá todas as ${relatedLessons.length} aulas vinculadas a ele! Atualmente são ${relatedLessons.length} aulas.`,
        performDeletion,
        'Sim, Deletar Tudo',
        'Cancelar'
      );
    } else {
      requestConfirmation(
        'Deletar Módulo?',
        'Tem certeza que deseja excluir esse módulo do curso?',
        performDeletion,
        'Deletar',
        'Cancelar'
      );
    }
  };

  const [newAttachment, setNewAttachment] = React.useState<{
    name: string;
    type: 'link' | 'doc' | 'pdf';
    url: string;
  }>({
    name: '',
    type: 'link',
    url: ''
  });

  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string, filename: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) { // 8MB limit for documents
        triggerNotification('Arquivo muito pesado! Limite de 8MB.', 'err');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result, file.name);
          triggerNotification('Arquivo importado com sucesso!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // ==========================================
  // 2. LESSONS CRUD STATE & HANDLERS
  // ==========================================
  const [isLessonModalOpen, setIsLessonModalOpen] = React.useState(false);
  const [editingLesson, setEditingLesson] = React.useState<Lesson | null>(null);
  const [localAttachmentSuccess, setLocalAttachmentSuccess] = React.useState<string>("");
  const [lessonForm, setLessonForm] = React.useState<{
    moduleId: string;
    title: string;
    description: string;
    youtubeUrl: string;
    bannerUrl: string;
    duration: string;
    attachments: LessonAttachment[];
  }>({
    moduleId: '',
    title: '',
    description: '',
    youtubeUrl: '',
    bannerUrl: '',
    duration: '15:00',
    attachments: []
  });

  const openNewLessonModal = () => {
    setEditingLesson(null);
    setLocalAttachmentSuccess("");
    setNewAttachment({ name: '', type: 'link', url: '' });
    setLessonForm({
      moduleId: modules[0]?.id || '',
      title: '',
      description: '',
      youtubeUrl: '',
      bannerUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800',
      duration: '10:00',
      attachments: []
    });
    setIsLessonModalOpen(true);
  };

  const openEditLessonModal = (les: Lesson) => {
    setEditingLesson(les);
    setLocalAttachmentSuccess("");
    setNewAttachment({ name: '', type: 'link', url: '' });
    setLessonForm({
      moduleId: les.moduleId,
      title: les.title,
      description: les.description,
      youtubeUrl: les.youtubeUrl,
      bannerUrl: les.bannerUrl,
      duration: les.duration,
      attachments: les.attachments || []
    });
    setIsLessonModalOpen(true);
  };

  const saveLesson = () => {
    if (!lessonForm.title.trim()) {
      triggerNotification('O título da aula é obrigatório.', 'err');
      return;
    }
    if (!lessonForm.moduleId) {
      triggerNotification('Associe a aula a um módulo.', 'err');
      return;
    }
    if (!lessonForm.youtubeUrl.trim() || !isValidYouTubeUrl(lessonForm.youtubeUrl)) {
      triggerNotification('Insira uma URL de vídeo válida do YouTube.', 'err');
      return;
    }

    if (editingLesson) {
      // Update
      const updated = lessons.map((l) => 
        l.id === editingLesson.id 
          ? { 
              ...l, 
              moduleId: lessonForm.moduleId,
              title: lessonForm.title, 
              description: lessonForm.description, 
              youtubeUrl: lessonForm.youtubeUrl,
              bannerUrl: lessonForm.bannerUrl,
              duration: lessonForm.duration,
              attachments: lessonForm.attachments
            }
          : l
      );
      onUpdateLessons(updated);
      triggerNotification('Aula atualizada!');
    } else {
      // Create
      const sameModuleLessons = lessons.filter((l) => l.moduleId === lessonForm.moduleId);
      const newLes: Lesson = {
        id: `les-${Date.now()}`,
        moduleId: lessonForm.moduleId,
        title: lessonForm.title,
        description: lessonForm.description,
        youtubeUrl: lessonForm.youtubeUrl,
        bannerUrl: lessonForm.bannerUrl || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800',
        duration: lessonForm.duration || '12:00',
        order: sameModuleLessons.length + 1,
        attachments: lessonForm.attachments
      };
      onUpdateLessons([...lessons, newLes]);
      triggerNotification('Aula inserida com sucesso na trilha!');
    }
    setIsLessonModalOpen(false);
  };

  const deleteLesson = (id: string) => {
    requestConfirmation(
      'Deletar Aula?',
      'Tem certeza que deseja remover esta aula da trilha de cursos?',
      () => {
        const updated = lessons.filter((l) => l.id !== id);
        onUpdateLessons(updated);
        triggerNotification('Aula removida da trilha.');
      },
      'Deletar',
      'Cancelar'
    );
  };

  // Drag and Drop (Reordenação) Simulation utilizing UP / DOWN swappers
  const moveLesson = (lessonId: string, direction: 'up' | 'down') => {
    const lessonToMove = lessons.find((l) => l.id === lessonId);
    if (!lessonToMove) return;

    // Filter siblings in the exact same module ordered by current list
    const moduleSiblings = lessons
      .filter((l) => l.moduleId === lessonToMove.moduleId)
      .sort((a, b) => a.order - b.order);

    const currentIndex = moduleSiblings.findIndex((l) => l.id === lessonId);
    
    if (direction === 'up' && currentIndex === 0) return; // already top
    if (direction === 'down' && currentIndex === moduleSiblings.length - 1) return; // already bottom

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const targetLesson = moduleSiblings[targetIndex];

    // Swap orders representation
    const updatedLessons = lessons.map((l) => {
      if (l.id === lessonToMove.id) {
        return { ...l, order: targetLesson.order };
      }
      if (l.id === targetLesson.id) {
        return { ...l, order: lessonToMove.order };
      }
      return l;
    });

    onUpdateLessons(updatedLessons);
    triggerNotification('Ordem das aulas alterada!');
  };

  // ==========================================
  // 3. VIRAL POSTS CRUD STATE & HANDLERS
  // ==========================================
  const [isPostModalOpen, setIsPostModalOpen] = React.useState(false);
  const [editingPost, setEditingPost] = React.useState<InstagramPost | null>(null);
  const [postForm, setPostForm] = React.useState({
    title: '',
    description: '',
    category: (categories && categories.length > 0 ? categories[0] : 'ROSÁCEA E PELE SENSÍVEL') as PostCategory,
    instagramUrl: '',
    canvaUrl: '',
    bannerUrl: '',
    featured: false
  });
  const [newCategoryName, setNewCategoryName] = React.useState('');

  const openNewPostModal = () => {
    setEditingPost(null);
    setPostForm({
      title: '',
      description: '',
      category: categories && categories.length > 0 ? categories[0] : 'ROSÁCEA E PELE SENSÍVEL',
      instagramUrl: '',
      canvaUrl: '',
      bannerUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600',
      featured: false
    });
    setNewCategoryName('');
    setIsPostModalOpen(true);
  };

  const openEditPostModal = (post: InstagramPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      description: post.description,
      category: post.category,
      instagramUrl: post.instagramUrl,
      canvaUrl: post.canvaUrl,
      bannerUrl: post.bannerUrl || '',
      featured: post.featured || false
    });
    setIsPostModalOpen(true);
  };

  const savePost = () => {
    if (!postForm.instagramUrl.trim()) {
      triggerNotification('A URL do post no Instagram é obrigatória.', 'err');
      return;
    }

    let finalCategory = postForm.category;

    // Handle the case where they selected "__NEW__" but might have written a custom name
    if (finalCategory === '__NEW__') {
      const trimmedName = newCategoryName.trim().toUpperCase();
      if (trimmedName) {
        finalCategory = trimmedName;
        if (!categories.includes(trimmedName)) {
          const updatedCategories = [...categories, trimmedName];
          onUpdateCategories(updatedCategories);
        }
      } else {
        finalCategory = categories[0] || 'ROSÁCEA E PELE SENSÍVEL';
      }
    } else {
      // Ensure it is added to the categories list if it is not already present
      if (finalCategory && !categories.includes(finalCategory)) {
        onUpdateCategories([...categories, finalCategory]);
      }
    }

    if (editingPost) {
      // Update
      const updated = posts.map((p) => 
        p.id === editingPost.id 
          ? { 
              ...p, 
              title: postForm.title || `Criativo`, 
              description: postForm.description || '',
              category: finalCategory,
              instagramUrl: postForm.instagramUrl,
              canvaUrl: postForm.canvaUrl,
              bannerUrl: postForm.bannerUrl || p.bannerUrl,
              featured: postForm.featured
            }
          : p
      );
      onUpdatePosts(updated);
      triggerNotification('Template atualizado!');
    } else {
      // Create
      const newPost: InstagramPost = {
        id: `post-${Date.now()}`,
        title: postForm.title || `Criativo`,
        description: postForm.description || '',
        category: finalCategory,
        instagramUrl: postForm.instagramUrl,
        canvaUrl: postForm.canvaUrl,
        bannerUrl: postForm.bannerUrl || 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600',
        dateAdded: new Date().toISOString().split('T')[0],
        featured: postForm.featured
      };
      onUpdatePosts([...posts, newPost]);
      triggerNotification('Template cadastrado no Banco de Postagens!');
    }
    setIsPostModalOpen(false);
  };

  const deletePost = (id: string) => {
    requestConfirmation(
      'Excluir Postagem?',
      'Deseja realmente remover essa postagem do seu Banco de Postagens?',
      () => {
        const updated = posts.filter((p) => p.id !== id);
        onUpdatePosts(updated);
        triggerNotification('Template removido.');
      },
      'Excluir',
      'Cancelar'
    );
  };

  return (
    <div id="admin-panel-root" className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {notification && !isPostModalOpen && !isModuleModalOpen && !isLessonModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-[200] p-4 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-xl transition-all ${
              notification.type === 'err' 
                ? 'bg-rose-950/80 border-rose-500/20 text-rose-200' 
                : isLight 
                  ? 'bg-white border-zinc-200 text-zinc-800 shadow-[0_8px_32px_rgba(0,0,0,0.08)]' 
                  : 'bg-zinc-900/90 border-white/10 text-white'
            }`}
          >
            {notification.type === 'err' ? <AlertCircle size={18} className="text-rose-455" /> : <CheckCircle size={18} className="text-emerald-500" />}
            <span className="text-xs font-bold font-sans">{notification.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Title & Danger Zone actions */}
      <div id="admin-header-row" className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
            isLight 
              ? 'bg-zinc-100 text-zinc-800 border-zinc-200' 
              : 'bg-white/10 text-white border-white/10'
          }`}>
            Console de Gestão
          </span>
          <h1 className={`text-3xl font-extrabold tracking-tight mt-2 font-sans ${
            isLight ? 'text-zinc-900' : 'text-white'
          }`}>
            Gerenciar Plataforma
          </h1>
          <p className={`text-sm mt-1 max-w-xl ${
            isLight ? 'text-zinc-500' : 'text-white/50'
          }`}>
            Adicione novas aulas na trilha de cursos, gerencie layouts de módulos e insira ganchos e templates do Canva instantaneamente.
          </p>
        </div>
      </div>

      {/* Admin Tabs Bar Layout in Liquid Glass */}
      <div id="admin-tabs" className={`p-1.5 rounded-2xl flex items-center gap-1 relative z-10 transition-all border ${
        isLight 
          ? 'bg-zinc-100/80 border-zinc-200' 
          : 'bg-white/5 border-white/10 backdrop-blur-md'
      }`}>
        <button
          id="admin-tab-modules"
          onClick={() => setAdminTab('modules')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border-[1.5px] ${
            adminTab === 'modules'
              ? isLight
                ? 'btn-gradient-border-light text-[#FF1E40] shadow-sm'
                : 'btn-gradient-border-dark text-[#FF4E00] shadow-md shadow-[#8100FF]/5'
              : isLight 
                ? 'border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50' 
                : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'
          }`}
        >
          <BookOpen size={11} className={adminTab === 'modules' ? 'text-[#FF1E40]' : ''} />
          <span>Módulos ({modules.length})</span>
        </button>

        <button
          id="admin-tab-lessons"
          onClick={() => setAdminTab('lessons')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border-[1.5px] ${
            adminTab === 'lessons'
              ? isLight
                ? 'btn-gradient-border-light text-[#FF1E40] shadow-sm'
                : 'btn-gradient-border-dark text-[#FF4E00] shadow-md shadow-[#8100FF]/5'
              : isLight 
                ? 'border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50' 
                : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'
          }`}
        >
          <Tv size={11} className={adminTab === 'lessons' ? 'text-[#FF1E40]' : ''} />
          <span>Aulas da Trilha ({lessons.length})</span>
        </button>

        <button
          id="admin-tab-posts"
          onClick={() => setAdminTab('posts')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border-[1.5px] ${
            adminTab === 'posts'
              ? isLight
                ? 'btn-gradient-border-light text-[#FF1E40] shadow-sm'
                : 'btn-gradient-border-dark text-[#FF4E00] shadow-md shadow-[#8100FF]/5'
              : isLight 
                ? 'border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50' 
                : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sparkles size={11} className={adminTab === 'posts' ? 'text-[#FF1E40]' : ''} />
          <span>Banco de Templates ({posts.length})</span>
        </button>
      </div>

      {/* ADMIN VIEWS ROOT */}
      <div 
        id="admin-views-root" 
        className={`rounded-[32px] p-6 shadow-xl min-h-[400px] relative z-10 transition-colors border ${
          isLight 
            ? 'bg-white border-zinc-200 text-zinc-800 shadow-sm' 
            : 'bg-white/5 border border-white/10 backdrop-blur-md text-white'
        }`}
      >
        
        {/* ==========================================
            VIEW A: MODULES LIST TABLE
            ========================================== */}
        {adminTab === 'modules' && (
          <div id="admin-modules-tab" className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className={`text-md font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>Módulos Carrossel</h3>
                <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>Arraste para as pontas na tela principal. Excluir um módulo remove suas aulas.</p>
              </div>
              <button
                id="btn-new-module"
                onClick={openNewModuleModal}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl shadow-md transition-all active:scale-97 cursor-pointer ${
                  isLight 
                    ? 'btn-gradient-border-light text-[#FF1E40]' 
                    : 'btn-gradient-border-dark text-[#FF4E00]'
                }`}
              >
                <Plus size={15} />
                <span>Novo Módulo</span>
              </button>
            </div>

            <div className={`border rounded-2xl overflow-hidden transition-all ${
              isLight 
                ? 'divide-y divide-zinc-200 border-zinc-200 bg-zinc-50/10' 
                : 'divide-y divide-white/5 border border-white/10 bg-white/3'
            }`}>
              {modules.map((mod) => (
                <div key={mod.id} className={`p-4 flex items-center justify-between flex-wrap gap-4 transition-all ${
                  isLight ? 'hover:bg-zinc-100/30' : 'hover:bg-white/5'
                }`}>
                  <div className="flex items-center gap-4">
                    <img 
                      src={mod.bannerUrl} 
                      alt="" 
                      className={`w-16 h-12 rounded-xl object-cover border ${
                        isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-white/5 border-white/10'
                      }`}
                    />
                    <div>
                      <h4 className={`font-bold text-sm ${isLight ? 'text-zinc-800' : 'text-white'}`}>{mod.title}</h4>
                      <p className={`text-xs line-clamp-1 max-w-sm md:max-w-md ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>{mod.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id={`edit-mod-${mod.id}`}
                      onClick={() => openEditModuleModal(mod)}
                      className={`p-2 border rounded-xl transition-all cursor-pointer bg-transparent ${
                        isLight 
                          ? 'border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900' 
                          : 'border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                      title="Editar módulo"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      id={`delete-mod-${mod.id}`}
                      onClick={() => deleteModule(mod.id)}
                      className={`p-2 border rounded-xl transition-all cursor-pointer bg-transparent ${
                        isLight 
                          ? 'border-rose-200 text-rose-600 hover:bg-rose-50' 
                          : 'border-rose-500/20 text-rose-455 hover:bg-rose-500/10'
                      }`}
                      title="Excluir módulo"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {modules.length === 0 && (
                <div className={`p-8 text-center italic ${isLight ? 'text-zinc-400' : 'text-white/30'}`}>Nenhum módulo registrado. Insira seu primeiro módulo.</div>
              )}
            </div>
          </div>
        )}

             {/* ==========================================
            VIEW B: LESSONS LIST TABLE WITH SWAPPERS
            ========================================== */}
        {adminTab === 'lessons' && (
          <div id="admin-lessons-tab" className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className={`text-md font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>Aulas da Trilha</h3>
                <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>Reordene usando <ArrowUp size={11} className="inline"/> e <ArrowDown size={11} className="inline"/> para alternar sequência de aprendizado imediato.</p>
              </div>
              <button
                id="btn-new-lesson"
                onClick={openNewLessonModal}
                disabled={modules.length === 0}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer ${
                  modules.length === 0 
                    ? isLight
                      ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200 opacity-60'
                      : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5 opacity-40' 
                    : isLight
                      ? 'btn-gradient-border-light text-[#FF1E40]'
                      : 'btn-gradient-border-dark text-[#FF4E00]'
                }`}
              >
                <Plus size={15} />
                <span>Nova Aula</span>
              </button>
            </div>

            {/* Organize Lessons by Modules visually in management screen */}
            {modules.map((mod) => {
              const modLessons = lessons
                .filter((l) => l.moduleId === mod.id)
                .sort((a, b) => a.order - b.order);

              return (
                <div key={`manage-section-${mod.id}`} className={`space-y-3 p-4 border rounded-2xl transition-all ${
                  isLight ? 'border-zinc-200 bg-zinc-50/20' : 'border-white/10 bg-white/2'
                }`}>
                  <div className={`flex justify-between items-center p-2 px-3 rounded-xl border transition-all ${
                    isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-800' : 'bg-white/5 border-white/10'
                  }`}>
                    <span className="text-xs font-bold uppercase tracking-wider">{mod.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all ${
                      isLight ? 'bg-zinc-200/60 border-zinc-300 text-zinc-700' : 'bg-white/10 text-white/80 border-white/10'
                    }`}>{modLessons.length} Aulas</span>
                  </div>

                  <div className="space-y-2">
                    {modLessons.map((les, index) => (
                      <div 
                        key={les.id} 
                        className={`p-3.5 rounded-xl border flex items-center justify-between flex-wrap gap-4 transition-all ${
                          isLight 
                            ? 'bg-white border-zinc-200/90 hover:border-zinc-300 hover:shadow-xs' 
                            : 'bg-white/2 border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="relative group/thumb cursor-pointer shrink-0"
                            onClick={() => setPreviewLesson(les)}
                            title="Preview no Pop-up"
                          >
                            <img src={les.bannerUrl} alt="" className={`w-14 h-10 rounded-lg object-cover border transition-all ${
                              isLight ? 'bg-zinc-100 border-zinc-200 group-hover/thumb:opacity-85' : 'bg-white/5 border-white/5 group-hover/thumb:opacity-85'
                            }`} />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 bg-black/40 rounded-lg transition-all">
                              <Play size={12} className="text-white fill-white" />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h5 className={`font-bold text-xs line-clamp-1 ${isLight ? 'text-zinc-800' : 'text-white'}`}>{les.title}</h5>
                              <button
                                id={`preview-btn-${les.id}`}
                                onClick={() => setPreviewLesson(les)}
                                className={`p-1 rounded-full cursor-pointer transition-all hover:scale-110 flex items-center justify-center shrink-0 ${
                                  isLight 
                                    ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50 bg-orange-100/30' 
                                    : 'text-orange-400 hover:text-orange-300 hover:bg-white/10 bg-white/5'
                                }`}
                                title="Visualizar Vídeo"
                              >
                                <Play size={8} className="fill-current ml-0.5" />
                              </button>
                            </div>
                            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border inline-block mt-1 transition-all ${
                              isLight ? 'text-zinc-500 bg-zinc-100 border-zinc-200' : 'text-white/40 bg-white/5 border-white/5'
                            }`}>
                              Ordem: {les.order}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Up/Down sorting and actions */}
                        <div className="flex items-center gap-1.5">
                          <button
                            id={`move-up-${les.id}`}
                            onClick={() => moveLesson(les.id, 'up')}
                            disabled={index === 0}
                            className={`p-1.5 border rounded-lg transition-all ${
                              index === 0 
                                ? isLight ? 'text-zinc-300 border-zinc-200 bg-transparent' : 'text-white/20 border-white/5' 
                                : isLight 
                                  ? 'border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 cursor-pointer bg-white' 
                                  : 'border-white/10 text-white/60 hover:text-white cursor-pointer hover:bg-white/10 bg-transparent'
                            }`}
                            title="Subir na ordem"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            id={`move-down-${les.id}`}
                            onClick={() => moveLesson(les.id, 'down')}
                            disabled={index === modLessons.length - 1}
                            className={`p-1.5 border rounded-lg transition-all ${
                              index === modLessons.length - 1 
                                ? isLight ? 'text-zinc-300 border-zinc-200 bg-transparent' : 'text-white/20 border-white/5' 
                                : isLight 
                                  ? 'border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 cursor-pointer bg-white' 
                                  : 'border-white/10 text-white/60 hover:text-white cursor-pointer hover:bg-white/10 bg-transparent'
                            }`}
                            title="Descer na ordem"
                          >
                            <ArrowDown size={12} />
                          </button>
                          
                          <span className={`w-[1px] h-4 mx-2 inline-block ${isLight ? 'bg-zinc-200' : 'bg-white/10'}`} />

                          <button
                            id={`edit-les-${les.id}`}
                            onClick={() => openEditLessonModal(les)}
                            className={`p-1.5 border rounded-lg cursor-pointer transition-all bg-transparent ${
                              isLight 
                                ? 'border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900' 
                                : 'border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <Edit3 size={12} />
                          </button>
                          <button
                            id={`delete-les-${les.id}`}
                            onClick={() => deleteLesson(les.id)}
                            className={`p-1.5 border rounded-lg cursor-pointer transition-all bg-transparent ${
                              isLight 
                                ? 'border-rose-200 text-rose-600 hover:bg-rose-50' 
                                : 'border-rose-500/20 text-rose-455 hover:bg-rose-500/10'
                            }`}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {modLessons.length === 0 && (
                      <p className={`text-[11px] italic text-center py-4 bg-transparent rounded-xl border border-dashed transition-all ${
                        isLight ? 'text-zinc-400 border-zinc-200' : 'text-white/30 border-white/10'
                      }`}>Sem aulas associadas a este módulo. Crie uma acima!</p>
                    )}
                  </div>
                </div>
              );
            })}

            {modules.length === 0 && (
              <div className={`p-8 text-center italic ${isLight ? 'text-zinc-400' : 'text-white/30'}`}>Crie un módulo antes de poder associar aulas trilhadas.</div>
            )}
          </div>
        )}

        {/* ==========================================
            VIEW C: VIRAL POSTS LIST TABLE
            ========================================== */}
        {adminTab === 'posts' && (
          <div id="admin-posts-tab" className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className={`text-md font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>Banco de Postagens & Ganchos</h3>
                <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>Cadastre posts virais para inspiração imediata e associe links duplicáveis do Canva.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  id="btn-edit-categories"
                  onClick={() => setIsCategoriesModalOpen(true)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition-all active:scale-97 cursor-pointer ${
                    isLight 
                      ? 'border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 shadow-sm' 
                      : 'border-white/10 bg-white/5 hover:bg-white/10 text-white shadow-md'
                  }`}
                >
                  <Settings2 size={14} />
                  <span>Editar Categorias</span>
                </button>
                <button
                  id="btn-new-post"
                  onClick={openNewPostModal}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl shadow-md transition-all active:scale-97 cursor-pointer ${
                    isLight 
                      ? 'btn-gradient-border-light text-[#FF1E40]' 
                      : 'btn-gradient-border-dark text-[#FF4E00]'
                  }`}
                >
                  <Plus size={15} />
                  <span>Novo Criativo</span>
                </button>
              </div>
            </div>

            <div className={`border rounded-2xl overflow-hidden ${
              isLight 
                ? 'divide-y divide-zinc-200 border-zinc-200 bg-zinc-50/10' 
                : 'divide-y divide-white/5 border border-white/10 bg-white/3'
            }`}>
              {posts.map((post) => (
                <div key={post.id} className={`p-4 flex items-center justify-between flex-wrap gap-4 transition-all ${
                  isLight ? 'hover:bg-zinc-100/30' : 'hover:bg-white/5'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                      isLight ? 'bg-zinc-100 border-zinc-200 text-pink-600' : 'bg-white/5 border-white/10 text-pink-400'
                    }`}>
                      <Instagram size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                          isLight 
                            ? 'bg-zinc-100 text-zinc-700 border-zinc-200' 
                            : 'bg-white/10 text-white border-white/10'
                        }`}>
                          {formatCategoryName(post.category)}
                        </span>
                        <h4 className={`font-bold text-sm ${isLight ? 'text-zinc-800' : 'text-white'}`}>
                          {post.title && post.title !== 'Criativo' ? post.title : `Criativo - ${formatCategoryName(post.category)}`}
                        </h4>
                      </div>
                      <p className={`text-xs font-mono line-clamp-1 max-w-sm md:max-w-md mt-1 mb-0.5 ${
                        isLight ? 'text-zinc-500' : 'text-white/40'
                      }`}>{post.instagramUrl}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id={`edit-post-${post.id}`}
                      onClick={() => openEditPostModal(post)}
                      className={`p-2 border rounded-xl transition-all cursor-pointer bg-transparent ${
                        isLight 
                          ? 'border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900' 
                          : 'border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      id={`delete-post-${post.id}`}
                      onClick={() => deletePost(post.id)}
                      className={`p-2 border rounded-xl transition-all cursor-pointer bg-transparent ${
                        isLight 
                          ? 'border-rose-200 text-rose-600 hover:bg-rose-50' 
                          : 'border-rose-500/20 text-rose-455 hover:bg-rose-500/10'
                      }`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {posts.length === 0 && (
                <div className={`p-8 text-center italic ${isLight ? 'text-zinc-400' : 'text-white/30'}`}>Nenhum criativo viral cadastrado no momento.</div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================================
          MODALS / SHEETS SECTION FOR EDITING (FOLLOWING APPLE 2026 MODAL ARCHITECTURE CONSTRAINTS)
          ========================================================================================= */}
      
      {/* 1. MODULE MODAL FORM */}
      <AnimatePresence>
        {isModuleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Ambient Darkened Backdrop with high blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModuleModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Body styled with Liquid Glass Vibe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-lg border rounded-[32px] p-6 shadow-2xl transition-colors max-h-[90vh] overflow-y-auto ${
                isLight 
                  ? 'bg-white border-zinc-200 text-zinc-900 shadow-[0_24px_64px_rgba(0,0,0,0.12)]' 
                  : 'bg-slate-955/90 border-white/15 text-white backdrop-blur-2xl'
              }`}
            >
              <div className="flex justify-between items-center pb-2 mb-6">
                <h3 className={`font-extrabold text-lg ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  {editingModule ? 'Editar Módulo' : 'Novo Módulo'}
                </h3>
                <button 
                  id="close-module-modal"
                  onClick={() => setIsModuleModalOpen(false)}
                  className={`p-1 rounded-full cursor-pointer bg-transparent transition-all ${
                    isLight ? 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100' : 'text-white/40 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {notification && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-3.5 rounded-2xl flex items-center gap-2.5 border text-xs font-bold leading-relaxed font-sans ${
                      notification.type === 'err' 
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' 
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                    }`}
                  >
                    {notification.type === 'err' ? <AlertCircle size={14} className="shrink-0" /> : <CheckCircle size={14} className="shrink-0" />}
                    <span>{notification.text}</span>
                  </motion.div>
                )}
                <div className="space-y-1">
                  <label className={`text-xs font-bold uppercase tracking-wider block ${
                    isLight ? 'text-zinc-500' : 'text-white/40'
                  }`}>Título do Módulo</label>
                  <input
                    id="module-title-input"
                    type="text"
                    placeholder="ex: Posicionamento Avançado"
                    value={moduleForm.title}
                    onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                    className={`w-full text-sm font-medium p-3 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/20 transition-all font-sans ${
                      isLight 
                        ? 'bg-zinc-100/70 border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-[#1D1D1F]' 
                        : 'bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-white/40'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-xs font-bold uppercase tracking-wider block ${
                    isLight ? 'text-zinc-500' : 'text-white/40'
                  }`}>Descrição Detalhada</label>
                  <textarea
                    id="module-desc-input"
                    placeholder="Do que se trata esse módulo e o que os alunos irão aprender..."
                    value={moduleForm.description}
                    onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })}
                    rows={3}
                    className={`w-full text-sm font-medium p-3 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/20 transition-all font-sans resize-none ${
                      isLight 
                        ? 'bg-zinc-100/70 border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-[#1D1D1F]' 
                        : 'bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-white/40'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-xs font-bold uppercase tracking-wider block ${
                    isLight ? 'text-zinc-500' : 'text-white/40'
                  }`}>Imagem de Banner / Capa</label>
                  <div className="flex gap-3">
                    <input
                      id="module-banner-url-input"
                      type="text"
                      placeholder="URL pública da imagem..."
                      value={moduleForm.bannerUrl}
                      onChange={(e) => setModuleForm({ ...moduleForm, bannerUrl: e.target.value })}
                      className={`flex-1 text-xs font-medium p-3 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/20 transition-all font-sans ${
                        isLight 
                          ? 'bg-zinc-100/70 border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-[#1D1D1F]' 
                          : 'bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-white/40'
                      }`}
                    />
                    
                    {/* Raw file uploader doing base64 reading */}
                    <div className="relative shrink-0">
                      <input
                        type="file"
                        accept="image/*"
                        id="module-file-input"
                        onChange={(e) => handleImageUpload(e, (base64) => setModuleForm({ ...moduleForm, bannerUrl: base64 }))}
                        className="hidden"
                      />
                      <label 
                        htmlFor="module-file-input" 
                        className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${
                          isLight 
                            ? 'border-zinc-200 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900' 
                            : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'
                        }`}
                        title="Fazer upload de arquivo local"
                      >
                        <FileImage size={18} />
                      </label>
                    </div>
                  </div>
                  <p className={`text-[10px] ${isLight ? 'text-zinc-400' : 'text-white/30'}`}>Você pode colar uma URL externa da Unsplash ou enviar um arquivo local até 2MB.</p>
                </div>

                {/* Banner Preview layout */}
                {moduleForm.bannerUrl && (
                  <div className="pt-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                      isLight ? 'text-zinc-400' : 'text-white/30'
                    }`}>Preview do Banner</span>
                    <div className={`relative h-18 rounded-xl overflow-hidden border ${
                      isLight ? 'bg-zinc-50 border-zinc-200/80' : 'bg-white/5 border-white/15'
                    }`}>
                      <img src={moduleForm.bannerUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons footer */}
              <div className="flex items-center gap-3 pt-4 mt-4">
                <button
                  id="btn-cancel-module"
                  onClick={() => setIsModuleModalOpen(false)}
                  className={`flex-1 py-3 border rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-97 text-center bg-transparent ${
                    isLight 
                      ? 'border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900' 
                      : 'border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  id="btn-save-module"
                  onClick={saveModule}
                  className={`flex-1 py-3 text-xs font-bold rounded-xl shadow-md transition-all active:scale-97 flex items-center justify-center gap-2 cursor-pointer ${
                    isLight 
                      ? 'btn-gradient-border-light text-[#FF1E40]' 
                      : 'btn-gradient-border-dark text-[#FF4E00]'
                  }`}
                >
                  <Save size={13} />
                  <span>Salvar Módulo</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. LESSON MODAL FORM */}
      <AnimatePresence>
        {isLessonModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Ambient Darkened Backdrop with high blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLessonModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Body loaded */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-lg border rounded-[32px] p-6 shadow-2xl transition-colors max-h-[90vh] overflow-y-auto ${
                isLight 
                  ? 'bg-white border-zinc-200 text-zinc-900 shadow-[0_24px_64px_rgba(0,0,0,0.12)]' 
                  : 'bg-slate-955/90 border-white/15 text-white backdrop-blur-2xl'
              }`}
            >
              <div className="flex justify-between items-center pb-2 mb-6">
                <h3 className={`font-extrabold text-lg ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  {editingLesson ? 'Editar Aula da Trilha' : 'Nova Aula'}
                </h3>
                <button 
                  id="close-lesson-modal"
                  onClick={() => setIsLessonModalOpen(false)}
                  className={`p-1 rounded-full cursor-pointer bg-transparent transition-all ${
                    isLight ? 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100' : 'text-white/40 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {notification && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-3.5 rounded-2xl flex items-center gap-2.5 border text-xs font-bold leading-relaxed font-sans ${
                      notification.type === 'err' 
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' 
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                    }`}
                  >
                    {notification.type === 'err' ? <AlertCircle size={14} className="shrink-0" /> : <CheckCircle size={14} className="shrink-0" />}
                    <span>{notification.text}</span>
                  </motion.div>
                )}
                
                {/* Module Association selector */}
                <div className="space-y-1">
                  <label className={`text-xs font-bold uppercase tracking-wider block ${
                    isLight ? 'text-zinc-500' : 'text-white/40'
                  }`}>Vincular ao Módulo</label>
                  <select
                    id="lesson-module-select"
                    value={lessonForm.moduleId}
                    onChange={(e) => setLessonForm({ ...lessonForm, moduleId: e.target.value })}
                    className={`w-full text-xs font-bold p-3 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/20 transition-all font-sans ${
                      isLight 
                        ? 'bg-zinc-100 border-zinc-200 text-zinc-800 focus:bg-white focus:border-[#1D1D1F]' 
                        : 'bg-white/5 border-white/10 text-white focus:border-white/40'
                    }`}
                  >
                    {modules.map((m) => (
                      <option key={m.id} value={m.id} className={isLight ? 'bg-white text-zinc-800 font-bold' : 'bg-slate-950 text-white font-bold'}>
                        {m.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className={`text-xs font-bold uppercase tracking-wider block ${
                    isLight ? 'text-zinc-500' : 'text-white/40'
                  }`}>Título da Aula</label>
                  <input
                    id="lesson-title-input"
                    type="text"
                    placeholder="ex: Script de Alto Ticket para WhastsApp"
                    value={lessonForm.title}
                    onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                    className={`w-full text-sm font-medium p-3 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/20 transition-all font-sans ${
                      isLight 
                        ? 'bg-zinc-100 border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-[#1D1D1F]' 
                        : 'bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-white/40'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-xs font-bold uppercase tracking-wider block ${
                    isLight ? 'text-zinc-500' : 'text-white/40'
                  }`}>Descrição ou Meta Aprendizado</label>
                  <textarea
                    id="lesson-desc-input"
                    placeholder="Resuma o conteúdo dessa aula para incentivar a jogada do player..."
                    value={lessonForm.description}
                    onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                    rows={3}
                    className={`w-full text-sm font-medium p-3 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/20 transition-all font-sans resize-none ${
                      isLight 
                        ? 'bg-zinc-100 border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-[#1D1D1F]' 
                        : 'bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-white/40'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  
                  {/* YouTube link with interactive validate visual badge */}
                  <div className="space-y-1 col-span-2">
                    <label className={`text-xs font-bold uppercase tracking-wider block ${
                      isLight ? 'text-zinc-500' : 'text-white/40'
                    }`}>URL do YouTube</label>
                    <input
                      id="lesson-youtube-url-input"
                      type="text"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={lessonForm.youtubeUrl}
                      onChange={(e) => setLessonForm({ ...lessonForm, youtubeUrl: e.target.value })}
                      className={`w-full text-xs font-medium p-3 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/20 transition-all font-sans ${
                        isLight 
                          ? 'bg-zinc-100 border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-[#1D1D1F]' 
                          : 'bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-white/40'
                      }`}
                    />
                    {lessonForm.youtubeUrl && (
                      <div className="mt-1 flex items-center gap-1">
                        {isValidYouTubeUrl(lessonForm.youtubeUrl) ? (
                          <span className={`text-[9px] font-extrabold flex items-center gap-0.5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`}>
                            <CheckCircle size={10} /> Link Válido
                          </span>
                        ) : (
                          <span className="text-[9px] text-rose-500 font-extrabold flex items-center gap-0.5 animate-pulse">
                            <AlertCircle size={10} /> Link inválido YouTube
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                </div>

                {/* Banner Thumbnail representation upload */}
                <div className="space-y-1">
                  <label className={`text-xs font-bold uppercase tracking-wider block ${
                    isLight ? 'text-zinc-500' : 'text-white/40'
                  }`}>Thumbnail / Capa da Aula</label>
                  <div className="flex gap-3">
                    <input
                      id="lesson-banner-url-input"
                      type="text"
                      placeholder="URL pública da capa da aula..."
                      value={lessonForm.bannerUrl}
                      onChange={(e) => setLessonForm({ ...lessonForm, bannerUrl: e.target.value })}
                      className={`flex-1 text-xs font-medium p-3 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/20 transition-all font-sans ${
                        isLight 
                          ? 'bg-zinc-100 border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-[#1D1D1F]' 
                          : 'bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-white/40'
                      }`}
                    />
                    
                    <div className="relative shrink-0">
                      <input
                        type="file"
                        accept="image/*"
                        id="lesson-file-input"
                        onChange={(e) => handleImageUpload(e, (base64) => setLessonForm({ ...lessonForm, bannerUrl: base64 }))}
                        className="hidden"
                      />
                      <label 
                        htmlFor="lesson-file-input" 
                        className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${
                          isLight 
                            ? 'border-zinc-200 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900' 
                            : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'
                        }`}
                        title="Fazer upload de arquivo local"
                      >
                        <FileImage size={18} />
                      </label>
                    </div>
                  </div>
                </div>

                {lessonForm.bannerUrl && (
                  <div className="pt-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                      isLight ? 'text-zinc-400' : 'text-white/30'
                    }`}>Preview da Capa</span>
                    <div className={`relative h-18 rounded-xl overflow-hidden border ${
                      isLight ? 'bg-zinc-50 border-zinc-200/80' : 'bg-white/5 border-white/15'
                    }`}>
                      <img src={lessonForm.bannerUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}

                {/* --- SEÇÃO DE MATERIAL DE APOIO / ANEXOS --- */}
                <div className="border-t border-zinc-200/50 dark:border-white/10 pt-4 mt-2 space-y-3">
                  <label className={`text-xs font-bold uppercase tracking-wider block ${
                    isLight ? 'text-zinc-500' : 'text-white/40'
                  }`}>Anexos / Material de Apoio</label>

                  {/* Lista de anexos existentes no formulário */}
                  {lessonForm.attachments && lessonForm.attachments.length > 0 ? (
                    <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                      {lessonForm.attachments.map((att) => (
                        <div key={att.id} className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium ${
                          isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-800' : 'bg-white/5 border-white/10 text-white'
                        }`}>
                          <div className="flex items-center gap-2 truncate">
                            {att.type === 'link' && <Link2 size={14} className="text-[#FF4E00]" />}
                            {att.type === 'pdf' && <FileText size={14} className="text-red-500" />}
                            {att.type === 'doc' && <FileText size={14} className="text-blue-500" />}
                            <span className="font-semibold truncate">{att.name}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full select-none ${
                              isLight ? 'bg-zinc-200/80 text-zinc-600' : 'bg-white/10 text-white/60'
                            }`}>
                              {att.type.toUpperCase()}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setLessonForm({
                                ...lessonForm,
                                attachments: lessonForm.attachments.filter(a => a.id !== att.id)
                              });
                              triggerNotification('Anexo removido!');
                            }}
                            className="p-1.5 hover:bg-red-500/10 rounded-lg text-rose-500 transition-colors"
                            title="Remover anexo"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-[11px] italic py-1 ${isLight ? 'text-zinc-400' : 'text-white/35'}`}>
                      Nenhum material de apoio anexado a esta aula ainda.
                    </p>
                  )}

                  {/* Adicionador de novo anexo */}
                  <div className={`p-3 rounded-2xl border space-y-3 ${
                    isLight ? 'bg-zinc-50/50 border-zinc-200/80' : 'bg-white/2 border-white/5'
                  }`}>
                    <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                      isLight ? 'text-zinc-400 font-extrabold' : 'text-white/30'
                    }`}>Conectar Novo Anexo</span>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      {/* Nome do anexo */}
                      <div className="space-y-1">
                        <label className={`text-[9px] font-extrabold uppercase tracking-wider block ${
                          isLight ? 'text-zinc-400' : 'text-white/30'
                        }`}>Nome do Recurso</label>
                        <input
                          type="text"
                          placeholder="Ex: Script de Vendas..."
                          value={newAttachment.name}
                          onChange={(e) => setNewAttachment({ ...newAttachment, name: e.target.value })}
                          className={`w-full text-xs font-semibold p-2.5 rounded-xl border focus:outline-hidden ${
                            isLight 
                              ? 'bg-white border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:border-[#FF4E00]' 
                              : 'bg-neutral-900 border-white/10 text-white placeholder-white/20 focus:border-[#FF4E00]'
                          }`}
                        />
                      </div>

                      {/* Tipo canva/pdf/doc */}
                      <div className="space-y-1">
                        <label className={`text-[9px] font-extrabold uppercase tracking-wider block ${
                          isLight ? 'text-zinc-400' : 'text-white/30'
                        }`}>Tipo</label>
                        <select
                          value={newAttachment.type}
                          onChange={(e) => setNewAttachment({ ...newAttachment, type: e.target.value as 'link' | 'doc' | 'pdf' })}
                          className={`w-full text-xs font-semibold p-2.5 rounded-xl border focus:outline-hidden ${
                            isLight 
                              ? 'bg-white border-zinc-200 text-zinc-800' 
                              : 'bg-neutral-900 border-white/10 text-white focus:bg-neutral-950'
                          }`}
                        >
                          <option value="link">🌐 Link Externo</option>
                          <option value="pdf">📄 PDF Documento</option>
                          <option value="doc">📝 DOC Word/Texto</option>
                        </select>
                      </div>

                      {/* URL e Campo File Opcional */}
                      <div className="space-y-1">
                        <label className={`text-[9px] font-extrabold uppercase tracking-wider block ${
                          isLight ? 'text-zinc-400' : 'text-white/30'
                        }`}>Endereço / Arquivo</label>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            placeholder={newAttachment.type === 'link' ? "https://exemplo.com" : "URL ou Upload..."}
                            value={newAttachment.url}
                            onChange={(e) => setNewAttachment({ ...newAttachment, url: e.target.value })}
                            className={`flex-1 min-w-0 text-xs font-semibold p-2.5 rounded-xl border focus:outline-hidden ${
                              isLight 
                                ? 'bg-white border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:border-[#FF4E00]' 
                                : 'bg-neutral-900 border-white/10 text-white placeholder-white/20 focus:border-[#FF4E00]'
                            }`}
                          />
                          {newAttachment.type !== 'link' && (
                            <div className="relative shrink-0 flex items-center">
                              <input
                                type="file"
                                accept={newAttachment.type === 'pdf' ? 'application/pdf' : '.doc,.docx,.txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'}
                                id="attachment-file-input"
                                onChange={(e) => {
                                  handleAttachmentUpload(e, (base64, filename) => {
                                    setNewAttachment({
                                      ...newAttachment,
                                      name: newAttachment.name || filename.replace(/\.[^/.]+$/, ""),
                                      url: base64
                                    });
                                  });
                                }}
                                className="hidden"
                              />
                              <label
                                htmlFor="attachment-file-input"
                                className={`flex items-center justify-center p-2.5 rounded-xl border cursor-pointer hover:scale-105 transition-all ${
                                  isLight
                                    ? 'border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'
                                    : 'border-white/10 bg-neutral-900 hover:bg-white/5 text-white/60 hover:text-white'
                                }`}
                                title="Anexar arquivo localmente"
                              >
                                <Paperclip size={15} />
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (!newAttachment.name.trim()) {
                          triggerNotification('Por favor, defina um nome para o anexo!', 'err');
                          return;
                        }
                        if (!newAttachment.url.trim()) {
                          triggerNotification('Por favor, informe a URL ou faça upload do arquivo!', 'err');
                          return;
                        }

                        const freshAtt: LessonAttachment = {
                          id: `att-${Date.now()}`,
                          name: newAttachment.name.trim(),
                          type: newAttachment.type,
                          url: newAttachment.url.trim()
                        };

                        setLessonForm({
                          ...lessonForm,
                          attachments: [...lessonForm.attachments, freshAtt]
                        });

                        setNewAttachment({
                          name: '',
                          type: 'link',
                          url: ''
                        });

                        // Set the local success notification message
                        setLocalAttachmentSuccess(`Anexo "${freshAtt.name}" adicionado à lista com sucesso!`);
                        
                        triggerNotification('Anexo adicionado à lista!');
                      }}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 active:scale-98 cursor-pointer ${
                        isLight 
                          ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
                          : 'bg-[#FF4E00] text-white hover:bg-[#FF4E00]/90'
                      }`}
                    >
                      <PlusCircle size={14} /> Adicionar Novo ao Menu
                    </button>

                    {/* Animated local confirmation message */}
                    <AnimatePresence>
                      {localAttachmentSuccess && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, scale: 0.95 }}
                          animate={{ opacity: 1, height: "auto", scale: 1 }}
                          exit={{ opacity: 0, height: 0, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="rounded-2xl p-3 border bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-left mt-2"
                        >
                          <div className="flex items-start gap-2">
                            <CheckCircle size={15} className="shrink-0 mt-0.5" />
                            <div className="space-y-0.5">
                              <p className="text-xs font-bold leading-snug">
                                {localAttachmentSuccess}
                              </p>
                              <p className="text-[10px] leading-relaxed text-emerald-600/80 dark:text-emerald-400/80 font-medium">
                                Ele agora aparece listado como anexo desta aula. Lembre-se de clicar em <strong className="font-extrabold uppercase text-[9px] px-1 py-0.5 rounded-sm bg-emerald-500/15">Salvar Aula</strong> abaixo para gravar definitivamente.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Save changes buttons */}
              <div className="flex items-center gap-3 pt-4 mt-4">
                <button
                  id="btn-cancel-lesson"
                  onClick={() => setIsLessonModalOpen(false)}
                  className={`flex-1 py-3 border rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-97 text-center bg-transparent ${
                    isLight 
                      ? 'border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900' 
                      : 'border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  id="btn-save-lesson"
                  onClick={saveLesson}
                  className={`flex-1 py-3 text-xs font-bold rounded-xl shadow-md transition-all active:scale-97 flex items-center justify-center gap-2 cursor-pointer ${
                    isLight 
                      ? 'btn-gradient-border-light text-[#FF1E40]' 
                      : 'btn-gradient-border-dark text-[#FF4E00]'
                  }`}
                >
                  <Save size={13} />
                  <span>Salvar Aula</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. VIRAL POST MODAL FORM */}
      <AnimatePresence>
        {isPostModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPostModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-lg border rounded-[32px] p-6 shadow-2xl transition-colors max-h-[90vh] overflow-y-auto ${
                isLight 
                  ? 'bg-white border-zinc-200 text-zinc-900 shadow-[0_24px_64px_rgba(0,0,0,0.12)]' 
                  : 'bg-slate-955/90 border-white/15 text-white backdrop-blur-2xl'
              }`}
            >
              <div className="flex justify-between items-center pb-2 mb-6">
                <h3 className={`font-extrabold text-lg ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  {editingPost ? 'Editar Template Viral' : 'Novo Template do Canva'}
                </h3>
                <button 
                  id="close-post-modal"
                  onClick={() => setIsPostModalOpen(false)}
                  className={`p-1 rounded-full cursor-pointer bg-transparent transition-all ${
                    isLight ? 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100' : 'text-white/40 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {notification && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-3.5 rounded-2xl flex items-center gap-2.5 border text-xs font-bold leading-relaxed font-sans ${
                      notification.type === 'err' 
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' 
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                    }`}
                  >
                    {notification.type === 'err' ? <AlertCircle size={14} className="shrink-0" /> : <CheckCircle size={14} className="shrink-0" />}
                    <span>{notification.text}</span>
                  </motion.div>
                )}
                
                {/* Instagram Post Link */}
                <div className="space-y-1">
                  <label className={`text-xs font-bold uppercase tracking-wider block ${
                    isLight ? 'text-zinc-500' : 'text-white/40'
                  }`}>URL Original do Instagram (Link do Post)</label>
                  <input
                    id="post-instagram-url-input"
                    type="text"
                    placeholder="https://www.instagram.com/p/..."
                    value={postForm.instagramUrl}
                    onChange={(e) => setPostForm({ ...postForm, instagramUrl: e.target.value })}
                    className={`w-full text-xs font-medium p-3 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/20 transition-all font-sans ${
                      isLight 
                        ? 'bg-zinc-100 border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-[#1D1D1F]' 
                        : 'bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-white/40'
                    }`}
                  />
                </div>

                {/* Category selector */}
                <div className="space-y-1">
                  <label className={`text-xs font-bold uppercase tracking-wider block ${
                    isLight ? 'text-zinc-500' : 'text-white/40'
                  }`}>Categoria</label>
                  <select
                    id="post-category-select"
                    value={postForm.category}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPostForm({ ...postForm, category: val });
                      if (val === '__NEW__') {
                        setNewCategoryName('');
                      }
                    }}
                    className={`w-full text-xs font-bold p-3 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/20 transition-all font-sans ${
                      isLight 
                        ? 'bg-zinc-100 border-zinc-200 text-zinc-800 focus:bg-white focus:border-[#1D1D1F]' 
                        : 'bg-white/5 border-white/10 text-white focus:border-white/40'
                    }`}
                  >
                    {allAdminCategories.map((cat) => (
                      <option key={cat} value={cat} className={isLight ? 'bg-white text-zinc-800 font-bold' : 'bg-slate-950 text-white font-bold'}>
                        {formatCategoryName(cat)}
                      </option>
                    ))}
                    <option value="__NEW__" className="text-orange-500 font-bold bg-orange-500/10">
                      + Adicionar nova categoria...
                    </option>
                  </select>

                  {postForm.category === '__NEW__' && (
                    <div className="mt-3 p-3 rounded-xl border border-dashed border-orange-500/30 bg-orange-500/5 space-y-2">
                      <label className={`text-[10px] font-bold uppercase tracking-wider block ${
                        isLight ? 'text-zinc-500' : 'text-white/40'
                      }`}>Nome da Nova Categoria</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="EX: PELE MADURA ACNEICA"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value.toUpperCase())}
                          className={`flex-1 text-xs font-bold p-2.5 rounded-lg border focus:outline-hidden transition-all ${
                            isLight 
                              ? 'bg-white border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:border-[#1D1D1F]' 
                              : 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-white/40'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const trimmed = newCategoryName.trim();
                            if (trimmed) {
                              if (categories.includes(trimmed)) {
                                setPostForm({ ...postForm, category: trimmed });
                                triggerNotification('Categoria já existe!', 'err');
                                return;
                              }
                              const updated = [...categories, trimmed];
                              onUpdateCategories(updated);
                              setPostForm({ ...postForm, category: trimmed });
                              setNewCategoryName('');
                              triggerNotification('Nova categoria criada!', 'success');
                            } else {
                              setPostForm({ ...postForm, category: categories[0] || '' });
                            }
                          }}
                          className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold rounded-lg transition-all"
                        >
                          Salvar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPostForm({ ...postForm, category: categories[0] || '' });
                            setNewCategoryName('');
                          }}
                          className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                            isLight ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-500' : 'bg-white/5 hover:bg-white/10 text-white/50'
                          }`}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Destaque / Feature Post toggle */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    id="post-featured-checkbox"
                    type="checkbox"
                    checked={postForm.featured}
                    onChange={(e) => setPostForm({ ...postForm, featured: e.target.checked })}
                    className="w-4 h-4 text-pink-600 border-zinc-300 rounded focus:ring-pink-500 cursor-pointer"
                  />
                  <label htmlFor="post-featured-checkbox" className={`text-xs font-bold uppercase tracking-wider select-none cursor-pointer ${
                    isLight ? 'text-zinc-600' : 'text-white/70'
                  }`}>
                    🌟 Marcar como Destaque (Exibir em destaque no topo)
                  </label>
                </div>

              </div>

              {/* Action Buttons footer */}
              <div className="flex items-center gap-3 pt-4 mt-4">
                <button
                  id="btn-cancel-post"
                  onClick={() => setIsPostModalOpen(false)}
                  className={`flex-1 py-3 border rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-97 text-center bg-transparent ${
                    isLight 
                      ? 'border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900' 
                      : 'border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  id="btn-save-post"
                  onClick={savePost}
                  className={`flex-1 py-3 text-xs font-bold rounded-xl shadow-md transition-all active:scale-97 flex items-center justify-center gap-2 cursor-pointer ${
                    isLight 
                      ? 'btn-gradient-border-light text-[#FF1E40]' 
                      : 'btn-gradient-border-dark text-[#FF4E00]'
                  }`}
                >
                  <Save size={13} />
                  <span>Salvar Template</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. CUSTOM CONFIRMATION MODAL */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-sm border rounded-[32px] p-6 shadow-2xl transition-all ${
                isLight 
                  ? 'bg-white border-zinc-200 text-zinc-900 shadow-[0_24px_64px_rgba(0,0,0,0.16)]' 
                  : 'bg-zinc-950/95 border-white/10 text-white backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8)]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl shrink-0 border ${
                  isLight 
                    ? 'bg-rose-50 border-rose-100 text-rose-600' 
                    : 'bg-rose-500/10 border-rose-500/20 text-rose-450'
                }`}>
                  <AlertCircle size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className={`font-extrabold text-base leading-snug ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    {confirmModal.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-500' : 'text-white/60'}`}>
                    {confirmModal.message}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-6 mt-2">
                <button
                  id="confirm-modal-cancel"
                  onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                  className={`flex-1 py-3 border rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-97 text-center bg-transparent ${
                    isLight 
                      ? 'border-zinc-200 text-zinc-650 hover:bg-zinc-50 hover:text-zinc-900' 
                      : 'border-white/10 text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {confirmModal.cancelText || 'Cancelar'}
                </button>
                <button
                  id="confirm-modal-action"
                  onClick={confirmModal.onConfirm}
                  className="flex-1 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-extrabold shadow-lg transition-all active:scale-97 flex items-center justify-center cursor-pointer"
                >
                  {confirmModal.confirmText || 'Confirmar'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. QUICK VIDEO PREVIEW MODAL */}
      <AnimatePresence>
        {previewLesson && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewLesson(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className={`relative w-full max-w-2xl border rounded-3xl overflow-hidden shadow-2xl transition-all ${
                isLight 
                  ? 'bg-white border-zinc-200 text-zinc-900 shadow-[0_24px_64px_rgba(0,0,0,0.2)]' 
                  : 'bg-zinc-950/98 border-white/10 text-white shadow-[0_24px_64px_rgba(0,0,0,0.9)]'
              }`}
            >
              <div className={`p-4 sm:p-5 flex items-center justify-between border-b ${
                isLight ? 'border-zinc-100 bg-zinc-50/50' : 'border-white/5 bg-white/1'
              }`}>
                <div>
                  <span className="text-[10px] font-bold text-[#FF4E00] uppercase tracking-widest block mb-0.5">
                    Visualização Rápida
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-1">
                    {previewLesson.title}
                  </h3>
                </div>
                <button
                  onClick={() => setPreviewLesson(null)}
                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                    isLight 
                      ? 'hover:bg-zinc-200/80 text-zinc-500 hover:text-zinc-800' 
                      : 'hover:bg-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Responsive 16:9 Container */}
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  id="preview-youtube-iframe"
                  src={getYouTubeEmbedUrl(previewLesson.youtubeUrl)}
                  title={previewLesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              <div className={`p-4 text-center text-[11px] font-semibold tracking-wide ${
                isLight ? 'text-zinc-500 bg-zinc-50/50' : 'text-white/40 bg-white/2'
              }`}>
                Visualizando link do YouTube adicionado na aula.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. EDIT/MANAGE CATEGORIES MODAL (FULLY CUSTOMIZED APPLE 2026 DESIGN) */}
      <AnimatePresence>
        {isCategoriesModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            
            {/* Ambient Darkened Backdrop with high blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsCategoriesModalOpen(false);
                setEditingCatKey(null);
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Body with Liquid Glass Vibe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-2xl border rounded-[32px] p-6 shadow-2xl transition-colors max-h-[85vh] overflow-y-auto ${
                isLight 
                  ? 'bg-white border-zinc-200 text-zinc-900 shadow-[0_24px_64px_rgba(0,0,0,0.12)]' 
                  : 'bg-[#18181C] border-[#ffffff]/10 text-white backdrop-blur-2xl'
              }`}
            >
              <div className="flex justify-between items-center pb-2 mb-4 border-b border-white/10">
                <div>
                  <h3 className={`font-extrabold text-base md:text-lg ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    Gerenciar Categorias de Criativos
                  </h3>
                  <p className={`text-xs mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                    Adicione, renomeie, delete ou edite os links de Canva padrões das categorias.
                  </p>
                </div>
                <button 
                  id="close-categories-modal"
                  onClick={() => {
                    setIsCategoriesModalOpen(false);
                    setEditingCatKey(null);
                  }}
                  className={`p-1.5 rounded-full cursor-pointer bg-transparent transition-all ${
                    isLight ? 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100' : 'text-white/40 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <X size={18} />
                </button>
              </div>

              {/* SECTION: ADD NEW CATEGORY */}
              <div className={`p-4 rounded-2xl border mb-6 ${
                isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/10'
              }`}>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isLight ? 'text-zinc-700' : 'text-white/75'}`}>
                  + Nova Categoria
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="space-y-1">
                    <label className={`text-[10px] font-bold uppercase tracking-wider block ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>
                      Nome da Categoria
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: POSTS LABIAIS"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      className={`w-full text-xs font-medium p-2.5 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/20 transition-all ${
                        isLight 
                          ? 'bg-white border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:border-[#1D1D1F]' 
                          : 'bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-white/40'
                      }`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={`text-[10px] font-bold uppercase tracking-wider block ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>
                      Link Canva Padrão
                    </label>
                    <input
                      type="text"
                      placeholder="https://www.canva.com/design/..."
                      value={newCatCanva}
                      onChange={(e) => setNewCatCanva(e.target.value)}
                      className={`w-full text-xs font-medium p-2.5 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/20 transition-all ${
                        isLight 
                          ? 'bg-white border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:border-[#1D1D1F]' 
                          : 'bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-white/40'
                      }`}
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddCategory}
                  className={`w-full flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl shadow-sm transition-all active:scale-97 cursor-pointer ${
                    isLight 
                      ? 'btn-gradient-border-light text-[#FF1E40]' 
                      : 'btn-gradient-border-dark text-[#FF4E00]'
                  }`}
                >
                  <Plus size={14} />
                  <span>Adicionar Categoria</span>
                </button>
              </div>

              {/* SECTION: CATEGORIES LIST */}
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${isLight ? 'text-zinc-605' : 'text-white/60'}`}>
                Categorias Cadastradas
              </h4>

              <div className="space-y-2 max-h-[35vh] overflow-y-auto pr-1">
                {categories.map((catKey) => {
                  const resolvedLinks = getCategoryLinks(catKey, categoryLinks);
                  const isEditing = editingCatKey === catKey;

                  return (
                    <div 
                      key={catKey} 
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isLight 
                          ? 'bg-zinc-50/50 border-zinc-200/80 hover:bg-zinc-100/30' 
                          : 'bg-white/3 border-white/5 hover:bg-white/5'
                      }`}
                    >
                      {isEditing ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className={`text-[9px] font-bold uppercase ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>Nome da Categoria</label>
                              <input
                                type="text"
                                value={editingCatName}
                                onChange={(e) => setEditingCatName(e.target.value)}
                                className={`w-full text-xs font-medium p-2 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/20 transition-all ${
                                  isLight 
                                    ? 'bg-white border-zinc-200 text-zinc-800' 
                                    : 'bg-white/5 border-white/10 text-white'
                                }`}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className={`text-[9px] font-bold uppercase ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>Link Canva</label>
                              <input
                                type="text"
                                value={editingCatCanva}
                                onChange={(e) => setEditingCatCanva(e.target.value)}
                                className={`w-full text-xs font-medium p-2 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/20 transition-all ${
                                  isLight 
                                    ? 'bg-white border-zinc-200 text-zinc-800' 
                                    : 'bg-white/5 border-white/10 text-white'
                                }`}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-1.5 border-t border-white/5">
                            <button
                              onClick={() => setEditingCatKey(null)}
                              className={`px-3 py-1.5 text-[10px] font-bold rounded-xl border transition-all active:scale-97 cursor-pointer ${
                                isLight 
                                  ? 'border-zinc-200 text-zinc-500 hover:bg-zinc-100' 
                                  : 'border-white/10 text-white/60 hover:bg-white/10'
                              }`}
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={() => handleSaveCategoryEdit(catKey)}
                              className="px-3 py-1.5 text-[10px] font-extrabold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-all active:scale-97 cursor-pointer"
                            >
                              Salvar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <div className="space-y-1 flex-1 min-w-[200px]">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full bg-gradient-to-tr from-[#8100FF] to-[#FF4E00]`} />
                              <span className={`text-xs font-extrabold ${isLight ? 'text-zinc-800' : 'text-white'}`}>
                                {formatCategoryName(catKey)}
                              </span>
                            </div>
                            <p className="text-[10px] text-zinc-500 font-mono break-all line-clamp-1">
                              {resolvedLinks.canva ? resolvedLinks.canva : 'Sem link Canva cadastrado'}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 self-end sm:self-center">
                            <button
                              onClick={() => {
                                setEditingCatKey(catKey);
                                setEditingCatName(catKey);
                                setEditingCatCanva(resolvedLinks.canva || '');
                              }}
                              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                                isLight 
                                  ? 'border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-600' 
                                  : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white'
                              }`}
                              title="Editar"
                            >
                              <Edit3 size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteCategoryWithConfirmation(catKey)}
                              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                                isLight 
                                  ? 'border-rose-200 bg-rose-500/5 hover:bg-rose-500/10 text-rose-600' 
                                  : 'border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400'
                              }`}
                              title="Excluir"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
