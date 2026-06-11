import React, { ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Phone, 
  Mail, 
  Save, 
  CheckCircle,
  Camera,
  AlertCircle,
  Building2
} from 'lucide-react';
import { UserProfile } from '../types';

interface UserProfileSectionProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  watchedCount: number;
  totalLessons: number;
  totalTemplates: number;
  onReplayTour: () => void;
}

export function UserProfileSection({
  user,
  onUpdateUser,
  onReplayTour
}: UserProfileSectionProps) {
  // Local edit states
  const [formName, setFormName] = React.useState(user.name);
  const [formPhone, setFormPhone] = React.useState(user.phone);
  const [formEmail, setFormEmail] = React.useState(user.email);
  const [formSalonName, setFormSalonName] = React.useState(user.salonName || '');
  const [formPhoto, setFormPhoto] = React.useState(user.photo || '');

  // Validation feedback
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [validationError, setValidationError] = React.useState<string | null>(null);

  // Sync state if prop changes
  React.useEffect(() => {
    setFormName(user.name);
    setFormPhone(user.phone);
    setFormEmail(user.email);
    setFormSalonName(user.salonName || '');
    setFormPhoto(user.photo || '');
  }, [user]);

  // Handle avatar upload converting to Base64
  const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        setValidationError('Avatar muito pesado! Escolha uma imagem de até 1.5MB.');
        setTimeout(() => setValidationError(null), 4000);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormPhoto(reader.result);
          // Auto save photo directly for fluid modern feedback
          onUpdateUser({
            ...user,
            photo: reader.result,
            theme: 'light'
          });
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 2500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setValidationError('Por favor insira um nome válido.');
      setTimeout(() => setValidationError(null), 4500);
      return;
    }

    onUpdateUser({
      name: formName,
      phone: formPhone,
      email: formEmail,
      photo: formPhoto,
      salonName: formSalonName,
      theme: 'light'
    });

    setValidationError(null);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  const isLight = true;

  const mainCardClass = isLight
    ? "bg-white border border-zinc-200/80 p-6 rounded-[32px] text-center space-y-4 shadow-xs"
    : "bg-white/5 border border-white/10 p-6 rounded-[32px] text-center space-y-4 backdrop-blur-md";

  const formCardClass = isLight
    ? "md:col-span-2 bg-white border border-zinc-200/80 p-6 rounded-[32px] shadow-xs"
    : "md:col-span-2 bg-white/5 border border-white/10 p-6 rounded-[32px] backdrop-blur-md shadow-3xs";

  const inputClass = isLight
    ? "w-full text-xs font-bold pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-[#1D1D1F]/20 focus:border-[#1D1D1F] transition-all font-sans"
    : "w-full text-xs font-bold pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-hidden focus:ring-2 focus:ring-white/10 focus:border-white/40 transition-all font-sans";

  const inputLabelClass = isLight
    ? "text-[10px] font-bold text-zinc-500 uppercase tracking-widest block"
    : "text-[10px] font-bold text-white/40 uppercase tracking-widest block";

  const inputIconClass = isLight ? "text-zinc-400" : "text-white/40";

  return (
    <div id="user-profile-root" className="max-w-4xl mx-auto space-y-8 pb-16 relative z-10">
      
      {/* Toast Notifications inline inside card */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 p-4 border rounded-2xl shadow-2xl flex items-center gap-2 backdrop-blur-xl ${
              isLight 
                ? 'bg-white border-zinc-200 text-zinc-900 shadow-zinc-200/50' 
                : 'bg-zinc-900 border-white/10 text-white shadow-black/80'
            }`}
          >
            <CheckCircle size={16} className="text-emerald-500" />
            <span className="text-xs font-bold font-sans">Perfil salvo com sucesso!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header text */}
      <div>
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
          isLight 
            ? 'bg-zinc-100 text-zinc-800 border-zinc-200' 
            : 'bg-white/10 text-white border-white/10'
        }`}>
          Dados do Estudante
        </span>
        <h1 className={`text-3xl font-extrabold tracking-tight mt-2 font-sans ${isLight ? 'text-zinc-900' : 'text-white'}`}>
          Meu Perfil
        </h1>
        <p className={`text-sm mt-1 mb-2 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
          Mantenha seus dados atualizados.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left column Avatar display */}
        <div className={mainCardClass}>
          <span className={`text-[10px] font-bold uppercase tracking-wider block ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>Sua Foto de Perfil</span>
          
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={formPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
              alt={formName}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${formName}`;
              }}
              className={`w-full h-full rounded-2xl object-cover border shadow-inner ${isLight ? 'border-zinc-200' : 'border-white/20'}`}
            />
            
            {/* Camera Overlay button to upload file immediately */}
            <label 
              htmlFor="avatar-upload-file"
              className={`absolute -bottom-2 -right-2 p-2.5 hover:scale-105 active:scale-95 border rounded-xl shadow-lg cursor-pointer transition-all shrink-0 backdrop-blur-md ${
                isLight 
                  ? 'bg-zinc-100/90 border-zinc-200 text-zinc-800 hover:bg-zinc-200' 
                  : 'bg-white/15 border-white/15 text-white hover:bg-white/25'
              }`}
              title="Mudar foto"
            >
              <Camera size={14} />
              <input
                id="avatar-upload-file"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <h4 className={`font-bold text-md ${isLight ? 'text-zinc-900' : 'text-white'}`}>{formName || 'Estudante Deni Haut'}</h4>
            <span className={`text-[11px] font-mono tracking-tight ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>{formEmail || 'estudante@denihaut.com.br'}</span>
          </div>
        </div>

        {/* Right column Form Edit information */}
        <div className={formCardClass}>
          <h3 className={`font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b ${isLight ? 'text-zinc-800 border-zinc-100' : 'text-white border-white/5'}`}>Dados da Conta</h3>
          
          {validationError && (
            <div className="mb-4 p-3 bg-rose-500/20 border border-rose-500/30 text-rose-300 rounded-xl text-xs font-bold flex items-center gap-2">
              <AlertCircle size={14} />
              <span>{validationError}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1 font-sans">
              <label className={inputLabelClass}>Nome Completo</label>
              <div className="relative">
                <User size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${inputIconClass}`} />
                <input
                  id="profile-name-input"
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Nome do aluno..."
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-1 font-sans">
              <label className={inputLabelClass}>Nome do Salão / Empresa</label>
              <div className="relative">
                <Building2 size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${inputIconClass}`} />
                <input
                  id="profile-salon-input"
                  type="text"
                  value={formSalonName}
                  onChange={(e) => setFormSalonName(e.target.value)}
                  placeholder="Nome do seu salão, clínica ou negócio..."
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className={inputLabelClass}>WhatsApp / Telefone</label>
                <div className="relative">
                  <Phone size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${inputIconClass}`} />
                  <input
                    id="profile-phone-input"
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="ex: 47999887766"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={inputLabelClass}>Endereço de Email</label>
                <div className="relative">
                  <Mail size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${inputIconClass}`} />
                  <input
                    id="profile-email-input"
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                    className={inputClass}
                  />
                </div>
              </div>

            </div>

            {/* Save Buttons action */}
            <div className={`pt-6 border-t flex justify-end ${isLight ? 'border-zinc-100' : 'border-white/5'}`}>
              <button
                id="save-profile-btn"
                type="submit"
                className={`px-5 py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-97 cursor-pointer ${
                  isLight 
                    ? 'btn-gradient-border-light text-[#FF1E40]' 
                    : 'btn-gradient-border-dark text-[#FF1E40]'
                }`}
              >
                <Save size={14} />
                <span>Salvar Alterações</span>
              </button>
            </div>

          </form>

        </div>

      </div>

      {/* Replay Onboarding Tour Section */}
      <div className={`pt-8 border-t text-center ${isLight ? 'border-zinc-200' : 'border-white/10'}`}>
        <button
          onClick={onReplayTour}
          className={`px-6 py-3 rounded-2xl text-xs font-black tracking-wide shadow-xs transition-all cursor-pointer active:scale-98 ${
            isLight 
              ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-900'
              : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          🎓 Rever tutorial da plataforma
        </button>
      </div>

    </div>
  );
}
