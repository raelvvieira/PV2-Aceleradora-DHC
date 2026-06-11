import { Module, Lesson, InstagramPost, UserProfile, AppState } from './types';

export const INITIAL_MODULES: Module[] = [
  {
    id: 'mod-1',
    title: '1. Presença Digital com Deni Haut',
    description: 'Boas-vindas à nossa mentoria! Compreenda o papel fundamental de uma presença digital de elite e o Instagram como canal educacional.',
    bannerUrl: 'https://i.ibb.co/TM9nTFcZ/Gemini-Generated-Image-9w7w059w7w059w7w.png',
    order: 1
  },
  {
    id: 'mod-2',
    title: '2. O Instagram',
    description: 'Estruture sua biografia do Instagram de forma magnética, domine constância, reels, áudios em alta e proteja sua conta de invasões.',
    bannerUrl: 'https://i.ibb.co/4ZTMd6QT/2.png',
    order: 2
  },
  {
    id: 'mod-3',
    title: '3. Usando a plataforma da mentoria',
    description: 'Como funciona todo o suporte, cronogramas, materiais e ferramentas da nossa plataforma exclusiva.',
    bannerUrl: 'https://i.ibb.co/LKxvmRG/3.png',
    order: 3
  },
  {
    id: 'mod-4',
    title: '4. Primeiros passos no Canva',
    description: 'Crie layouts refinados para o Instagram e posts de estética usando celular ou computador com facilidade.',
    bannerUrl: 'https://i.ibb.co/F4TH0dTm/4.png',
    order: 4
  },
  {
    id: 'mod-5',
    title: '5. Capcut para iniciantes',
    description: 'Curso rápido sobre edição no Capcut focado em vídeos elegantes de tratamentos, cortes e posts em vídeo.',
    bannerUrl: 'https://i.ibb.co/LzJv9VwC/5.png',
    order: 5
  },
  {
    id: 'mod-6',
    title: '6. Rotina Comercial',
    description: 'Passo a passo da cadência comercial e fluxo diário para acompanhamento de leads interessados.',
    bannerUrl: 'https://i.ibb.co/JwNFXRnr/6.png',
    order: 6
  },
  {
    id: 'mod-7',
    title: '7. Script de Vendas de Alta Conversão',
    description: 'Exemplos e aplicação prática da metodologia Spin Selling e como abordar no direct/WhatsApp com alta conversão.',
    bannerUrl: 'https://i.ibb.co/Dfh0V5N6/7.png',
    order: 7
  },
  {
    id: 'mod-8',
    title: '8. Impulsionamento de Instagram',
    description: 'Principais estratégias sobre como turbinar de modo profissional e as diferenças cruciais no gerenciador de anúncios.',
    bannerUrl: 'https://i.ibb.co/zhtwwNWB/8.png',
    order: 8
  },
  {
    id: 'mod-9',
    title: '9. Resgate e Reativação de Contatos',
    description: 'Ações imediatas e campanhas para reatar contato com ex-pacientes e leads frios da sua clínica ou espaço.',
    bannerUrl: 'https://i.ibb.co/7J8xyZq1/9.png',
    order: 9
  },
  {
    id: 'mod-10',
    title: '10. Campanhas de Disparo',
    description: 'Disparos em lote com estratégia e roteiros validados para despertar o interesse da sua lista.',
    bannerUrl: 'https://i.ibb.co/hJ55zB6V/10.png',
    order: 10
  },
  {
    id: 'mod-11',
    title: '11. Como Aparecer no Google',
    description: 'Aprenda a cadastrar, gerenciar e impulsionar o seu Google Meu Negócio de forma otimizada para leads locais.',
    bannerUrl: 'https://i.ibb.co/tMTbD46B/11.png',
    order: 11
  },
  {
    id: 'mod-12',
    title: '12. CRM e Organização de Leads',
    description: 'Diga adeus ao papel e planilhas confusas. Como configurar um CRM na prática para monitorar seus funis de agendamento.',
    bannerUrl: 'https://i.ibb.co/dsC0Qw8f/12.png',
    order: 12
  },
  {
    id: 'mod-13',
    title: '13. WhatsApp como Ferramenta de Vendas',
    description: 'Desbloqueie todos os recursos comerciais da conta business e evite perder dados na migração de aplicativos.',
    bannerUrl: 'https://i.ibb.co/cchsBWxV/13.png',
    order: 13
  },
  {
    id: 'mod-14',
    title: '14. Previsibilidade e Métricas de Sucesso',
    description: 'Controle de conversões, engenharia reversa para bater metas e identificação de gargalos de conversão no seu negócio.',
    bannerUrl: 'https://i.ibb.co/hFL9RF6K/14-1.png',
    order: 14
  }
];

export const INITIAL_LESSONS: Lesson[] = [
  // Module 1: Presença Digital com Deni Haut
  {
    id: 'les-1-1',
    moduleId: 'mod-1',
    title: 'Boas-vindas',
    description: 'Introdução e boas-vindas oficiais à mentoria Acelerador de Marketing e Vendas para Estética.',
    youtubeUrl: 'https://youtu.be/2KGIST4fLUw',
    bannerUrl: 'https://i.ibb.co/nMMKYk91/1.png',
    duration: '10:00',
    order: 1
  },
  {
    id: 'les-1-2',
    moduleId: 'mod-1',
    title: 'Importância da Presença Digital',
    description: 'Compreenda por que se posicionar de forma profissional no digital é o divisor de águas da sua autoridade.',
    youtubeUrl: 'https://youtu.be/IVEQ18dAAwo',
    bannerUrl: 'https://i.ibb.co/nMMKYk91/1.png',
    duration: '12:30',
    order: 2
  },
  {
    id: 'les-1-3',
    moduleId: 'mod-1',
    title: 'O Instagram como Canal Educacional',
    description: 'Mude sua mentalidade e passe a usar o seu perfil como canal educativo de alto valor para seus seguidores.',
    youtubeUrl: 'https://youtu.be/EZ4Xm9eZ0-k',
    bannerUrl: 'https://i.ibb.co/nMMKYk91/1.png',
    duration: '15:15',
    order: 3
  },

  // Module 2: O Instagram
  {
    id: 'les-2-1',
    moduleId: 'mod-2',
    title: 'Introdução, Instagram e Bio',
    description: 'Como configurar sua biografia, foto de perfil e estrutura essencial de posicionamento de elite.',
    youtubeUrl: '',
    bannerUrl: 'https://i.ibb.co/4ZTMd6QT/2.png',
    duration: 'Material',
    order: 1
  },
  {
    id: 'les-2-2',
    moduleId: 'mod-2',
    title: 'Constância e tipos de posts',
    description: 'Principais formatos de conteúdo que geram identificação, engajamento e agendamentos diretos.',
    youtubeUrl: 'https://youtu.be/j7_SH7eSSrA',
    bannerUrl: 'https://i.ibb.co/4ZTMd6QT/2.png',
    duration: '08:45',
    order: 2
  },
  {
    id: 'les-2-3',
    moduleId: 'mod-2',
    title: 'Fazendo seu primeiro post e programando posts',
    description: 'Passo a passo prático para criar suas postagens e deixá-las agendadas com a automação do próprio Instagram.',
    youtubeUrl: 'https://youtu.be/tvBSLyqFHoU',
    bannerUrl: 'https://i.ibb.co/4ZTMd6QT/2.png',
    duration: '14:20',
    order: 3
  },
  {
    id: 'les-2-4',
    moduleId: 'mod-2',
    title: 'Reels e áudios em alta',
    description: 'Como explorar o formato de entrega em massa do Instagram utilizando áudios e transições estratégicas.',
    youtubeUrl: 'https://youtu.be/23U-BA1HriI',
    bannerUrl: 'https://i.ibb.co/4ZTMd6QT/2.png',
    duration: '11:10',
    order: 4
  },
  {
    id: 'les-2-5',
    moduleId: 'mod-2',
    title: 'Segurança da conta',
    description: 'Evite invasões, verifique sua conta em duas etapas e mantenha sua vitrine de trabalho perfeitamente protegida.',
    youtubeUrl: 'https://youtu.be/5b7JtSzEhKY',
    bannerUrl: 'https://i.ibb.co/4ZTMd6QT/2.png',
    duration: '09:30',
    order: 5
  },

  // Module 3: Usando a plataforma da mentoria
  {
    id: 'les-3-1',
    moduleId: 'mod-3',
    title: 'Introdução',
    description: 'Entenda como tirar suas dúvidas e encontrar aulas, bônus e modelos de posts de forma simples.',
    youtubeUrl: 'https://youtu.be/bSTXfvpiPwA',
    bannerUrl: 'https://i.ibb.co/LKxvmRG/3.png',
    duration: '07:20',
    order: 1
  },

  // Module 4: Primeiros passos no Canva
  {
    id: 'les-4-1',
    moduleId: 'mod-4',
    title: 'Canvas pelo celular e computador',
    description: 'Domine a ferramenta de design mais simples do mundo para estruturar posts refinados com paleta premium.',
    youtubeUrl: 'https://youtu.be/lA3JrnyjN2Q',
    bannerUrl: 'https://i.ibb.co/F4TH0dTm/4.png',
    duration: '16:40',
    order: 1
  },

  // Module 5: Capcut para iniciantes
  {
    id: 'les-5-1',
    moduleId: 'mod-5',
    title: 'Capcut do zero ao vídeo pronto',
    description: 'Corte, adicione legendas automáticas, aplique trilha sonora e exporte na resolução máxima para redes sociais.',
    youtubeUrl: 'https://youtu.be/UqSEoENEeEs',
    bannerUrl: 'https://i.ibb.co/LzJv9VwC/5.png',
    duration: '18:50',
    order: 1
  },

  // Module 6: Rotina Comercial
  {
    id: 'les-6-1',
    moduleId: 'mod-6',
    title: 'Introdução à Rotina Comercial',
    description: 'A mentalidade de vendas diária obrigatória para o crescimento estruturado da sua marca.',
    youtubeUrl: 'https://youtu.be/E01s2L5MMqI',
    bannerUrl: 'https://i.ibb.co/JwNFXRnr/6.png',
    duration: '13:10',
    order: 1
  },
  {
    id: 'les-6-2',
    moduleId: 'mod-6',
    title: 'O que é a Cadência Comercial',
    description: 'A régua de relacionamento perfeita para nutrir novos contatos sem se tornar inconveniente ou invasivo.',
    youtubeUrl: 'https://youtu.be/mEhWJATxk3s',
    bannerUrl: 'https://i.ibb.co/JwNFXRnr/6.png',
    duration: '11:45',
    order: 2
  },
  {
    id: 'les-6-3',
    moduleId: 'mod-6',
    title: 'Apresentação Cadência comercial completa',
    description: 'Diagrama e passo a passo explicativo da cadência de toques comerciais que mais convertem leads frios.',
    youtubeUrl: 'https://youtu.be/fnIoQzjRwZw',
    bannerUrl: 'https://i.ibb.co/JwNFXRnr/6.png',
    duration: '21:05',
    order: 3
  },

  // Module 7: Script de Vendas de Alta Conversão
  {
    id: 'les-7-1',
    moduleId: 'mod-7',
    title: 'Instrução ao script e spin selling',
    description: 'A metodologia mundial de perguntas baseadas em Situação, Problema, Implicação e Necessidade adaptada para estética.',
    youtubeUrl: 'https://youtu.be/UEJkgoUxv4M',
    bannerUrl: 'https://i.ibb.co/Dfh0V5N6/7.png',
    duration: '19:40',
    order: 1
  },
  {
    id: 'les-7-2',
    moduleId: 'mod-7',
    title: 'Script de abordagem comercial completo',
    description: 'Script literal em PDF e guia passo a passo estruturado para fechar consultas em alta conversão.',
    youtubeUrl: '',
    bannerUrl: 'https://i.ibb.co/Dfh0V5N6/7.png',
    duration: 'Escrito',
    order: 2
  },

  // Module 8: Impulsionamento de Instagram
  {
    id: 'les-8-1',
    moduleId: 'mod-8',
    title: 'Diferenças entre Turbinar Post e Gerenciador de Anúncios',
    description: 'Desmistifique mitos e compreenda exatamente quando usar cada uma das ferramentas.',
    youtubeUrl: '',
    bannerUrl: 'https://i.ibb.co/zhtwwNWB/8.png',
    duration: 'Conceito',
    order: 1
  },
  {
    id: 'les-8-2',
    moduleId: 'mod-8',
    title: 'Como turbinar uma publicação de forma estratégica',
    description: 'Mostrando a tela de configurações para obter maior alcance de pessoas qualificadas na sua região.',
    youtubeUrl: 'https://youtu.be/J2HquKfpVOs',
    bannerUrl: 'https://i.ibb.co/zhtwwNWB/8.png',
    duration: '16:20',
    order: 2
  },
  {
    id: 'les-8-3',
    moduleId: 'mod-8',
    title: 'Como turbinar uma publicação de forma estratégica (Celular)',
    description: 'O exato de passo a passo para fazer o impulsionamento diretamente pelo seu smartphone de forma otimizada.',
    youtubeUrl: 'https://youtu.be/x5ky_VFlKEM',
    bannerUrl: 'https://i.ibb.co/zhtwwNWB/8.png',
    duration: '12:15',
    order: 3
  },

  // Module 9: Resgate e Reativação de Contatos
  {
    id: 'les-9-1',
    moduleId: 'mod-9',
    title: 'A lógica por trás dos resgates',
    description: 'Por que reativar antigos clientes custa até 7 vezes menos do que trazer novos, e como bolar abordagens tranquilas.',
    youtubeUrl: 'https://youtu.be/rGBaaXzEEs8',
    bannerUrl: 'https://i.ibb.co/7J8xyZq1/9.png',
    duration: '11:50',
    order: 1
  },
  {
    id: 'les-9-2',
    moduleId: 'mod-9',
    title: 'Exemplos práticos de Resgate (Tela Gravada)',
    description: 'Abordagens reais na tela do direct e WhatsApp exemplificando como fazer propostas de resgate atrativas.',
    youtubeUrl: 'https://youtu.be/_pMfd1B-Now',
    bannerUrl: 'https://i.ibb.co/7J8xyZq1/9.png',
    duration: '15:35',
    order: 2
  },

  // Module 10: Campanhas de Disparo
  {
    id: 'les-10-1',
    moduleId: 'mod-10',
    title: 'Os 3 tipos de disparo',
    description: 'Tipos de campanhas em lote estruturadas por temas festivos, ofertas de tratamento estrela e escassez.',
    youtubeUrl: 'https://youtu.be/I-oDW_87J_I',
    bannerUrl: 'https://i.ibb.co/hJ55zB6V/10.png',
    duration: '13:40',
    order: 1
  },
  {
    id: 'les-10-2',
    moduleId: 'mod-10',
    title: 'Modelos prontos de disparo (Tela Gravada)',
    description: 'Copiando e colando copies de enorme engajamento de leads convertidas com tela gravada ativa.',
    youtubeUrl: 'https://youtu.be/D48M8B_R_Gc',
    bannerUrl: 'https://i.ibb.co/hJ55zB6V/10.png',
    duration: '17:10',
    order: 2
  },

  // Module 11: Como Aparecer no Google
  {
    id: 'les-11-1',
    moduleId: 'mod-11',
    title: 'Introdução ao Google Meu Negócio',
    description: 'Por que o mecanismo de pesquisa do Google é o tráfego orgânico mais valioso para profissionais locais.',
    youtubeUrl: 'https://youtu.be/gh3k1f9Etq8',
    bannerUrl: 'https://i.ibb.co/tMTbD46B/11.png',
    duration: '09:50',
    order: 1
  },
  {
    id: 'les-11-2',
    moduleId: 'mod-11',
    title: 'Como configurar sua página profissional',
    description: 'Configuração dos seus dados, fotos de alta qualidade, avaliações e posts semanais para otimizar SEO local.',
    youtubeUrl: 'https://www.youtube.com/watch?v=q1Chu0_sqrE',
    bannerUrl: 'https://i.ibb.co/tMTbD46B/11.png',
    duration: '22:15',
    order: 2
  },

  // Module 12: CRM e Organização de Leads
  {
    id: 'les-12-1',
    moduleId: 'mod-12',
    title: 'O que é CRM?',
    description: 'A metodologia de gerenciar a jornada de negociação do cliente, dividindo em etapas lógicas do funil.',
    youtubeUrl: 'https://youtu.be/76fQRdghT6M',
    bannerUrl: 'https://i.ibb.co/dsC0Qw8f/12.png',
    duration: '08:15',
    order: 1
  },
  {
    id: 'les-12-2',
    moduleId: 'mod-12',
    title: 'Configurando um CRM na prática (Tela Gravada)',
    description: 'Como usar ferramentas simples de pipeline visual para arrastar e acompanhar clientes interessados até o agendamento.',
    youtubeUrl: '',
    bannerUrl: 'https://i.ibb.co/dsC0Qw8f/12.png',
    duration: 'Prática',
    order: 2
  },

  // Module 13: WhatsApp como Ferramenta de Vendas
  {
    id: 'les-13-1',
    moduleId: 'mod-13',
    title: 'Desbloqueando o WhatsApp Business',
    description: 'Recursos avançados de etiquetas, catálogo digital e mensagens rápidas para reter leads com rapidez.',
    youtubeUrl: 'https://youtu.be/kanZGYv19bw',
    bannerUrl: 'https://i.ibb.co/cchsBWxV/13.png',
    duration: '11:00',
    order: 1
  },
  {
    id: 'les-13-2',
    moduleId: 'mod-13',
    title: 'Como configurar seu WhatsApp para vender (Tela Gravada)',
    description: 'Preenchendo horários de atendimento, mensagens automáticas de recepção e link curto profissional.',
    youtubeUrl: '',
    bannerUrl: 'https://i.ibb.co/cchsBWxV/13.png',
    duration: 'Prática',
    order: 2
  },
  {
    id: 'les-13-3',
    moduleId: 'mod-13',
    title: 'Como mudar de WhatsApp normal para Business',
    description: 'Backup completo passo a passo para mudar de aplicativo com total tranquilidade e zero perda de conversas.',
    youtubeUrl: 'https://www.youtube.com/watch?v=EcBAOFwTFRk',
    bannerUrl: 'https://i.ibb.co/cchsBWxV/13.png',
    duration: '12:40',
    order: 3
  },

  // Module 14: Previsibilidade e Métricas de Sucesso
  {
    id: 'les-14-1',
    moduleId: 'mod-14',
    title: 'O que significa ter previsibilidade',
    description: 'Compreensão matemática do seu fluxo de caixa e entrada de leads para projetar faturamento.',
    youtubeUrl: 'https://youtu.be/JkuSo0HeiLM',
    bannerUrl: 'https://i.ibb.co/hFL9RF6K/14-1.png',
    duration: '14:10',
    order: 1
  },
  {
    id: 'les-14-2',
    moduleId: 'mod-14',
    title: 'Engenharia reversa de metas',
    description: 'Quantas mensagens você precisa enviar ou quantos cliques para bater sua meta semanal de lucros líquidos.',
    youtubeUrl: '',
    bannerUrl: 'https://i.ibb.co/hFL9RF6K/14-1.png',
    duration: 'Teoria',
    order: 2
  },
  {
    id: 'les-14-3',
    moduleId: 'mod-14',
    title: 'Gargalos',
    description: 'Analise onde os leads estão parando: se é na abordagem, se é na oferta ou no pós-venda, consertando-os rapidamente.',
    youtubeUrl: 'https://youtu.be/Yv8iWxIWrpc',
    bannerUrl: 'https://i.ibb.co/hFL9RF6K/14-1.png',
    duration: '13:00',
    order: 3
  }
];

export const DEFAULT_CATEGORIES: string[] = [
  'ROSÁCEA E PELE SENSÍVEL',
  'MICROAGULHAMENTO',
  'POSTS AUTOCUIDADO E ESTILO DE VIDA',
  'POSTS - CUIDADOS COM A PELE',
  'POSTS ACNE',
  'POSTS PELE MADURA',
  'POSTS MELASMA',
  'POSTS MOTIVACIONAIS',
  'MEMES',
  'Reels'
];

export const DEFAULT_CATEGORY_LINKS: Record<string, { canva: string; drive?: string }> = {
  'ROSÁCEA E PELE SENSÍVEL': {
    canva: 'https://www.canva.com/design/DAG_JS3XNyo/iK-jZL1KwIx4zaoQCaYEIQ/edit'
  },
  'MICROAGULHAMENTO': {
    canva: 'https://www.canva.com/design/DAG_K5UHc6M/FQQq-YRbJEnSLClTEqGKtQ/edit'
  },
  'POSTS AUTOCUIDADO E ESTILO DE VIDA': {
    canva: 'https://www.canva.com/design/DAG7Him3IWA/c3ezCa0t-y6r1k9O6dR49w/edit'
  },
  'POSTS - CUIDADOS COM A PELE': {
    canva: 'https://www.canva.com/design/DAG7HpjxheU/zRjufu79j_ymtCMkRLZNkQ/edit',
    drive: 'https://drive.google.com/drive/folders/1glJRXUn1ewlKpOCKV-cN73Ph0l_xkT3T'
  },
  'POSTS ACNE': {
    canva: 'https://www.canva.com/design/DAG7HpSS6s8/0TWR4FG62nSIEsfTmvX43g/edit',
    drive: 'https://drive.google.com/drive/folders/1xSmAYGpDTVZTdfkmhzaDHH0epdX85_Bp'
  },
  'POSTS PELE MADURA': {
    canva: 'https://www.canva.com/design/DAG7HpfFLjg/q97aq5pZrZUwAkXwu-fFag/edit',
    drive: 'https://drive.google.com/drive/folders/1PciDlC67BIgWLfdLhwn-M-7VEE2Be_8c'
  },
  'POSTS MELASMA': {
    canva: 'https://www.canva.com/design/DAG7HyXPPSw/5-KqBvWB8mhR1qoSuaI81A/edit',
    drive: 'https://drive.google.com/drive/folders/1CwytqPyn354-t5ZVMctRVHdnXfQmR09N'
  },
  'POSTS MOTIVACIONAIS': {
    canva: 'https://www.canva.com/design/DAG7H8n4wio/bZ1by_UxE5iwMi7NjgT9fg/edit',
    drive: 'https://drive.google.com/drive/folders/1S0aMFf37XyibMdTbE7RqBP24ukB0UFd-'
  },
  'MEMES': {
    canva: 'https://www.canva.com/design/DAG7JIo1mfk/L0_3OpR8L7ZLOeW7JAkE6g/edit',
    drive: 'https://drive.google.com/drive/folders/1r9Yx189AMGUI1az2epYFxgkL3lCiPplv'
  },
  'Reels': {
    canva: '',
    drive: 'https://drive.google.com/drive/folders/1jb36CgGpIiavzenMd1MFgnTIqHGNF9Nx'
  }
};

export const INITIAL_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    title: '3 Frases Magnéticas para Unhas/Cílios de Luxo',
    description: 'Gancho poderoso voltado a esteticistas que querem valorizar a durabilidade, o autocuidado e o status da cliente de alta performance.',
    instagramUrl: 'https://www.instagram.com/p/C6_3X1-uX54/',
    canvaUrl: 'https://www.canva.com/design/play-demo-template',
    category: 'POSTS MOTIVACIONAIS',
    bannerUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
    dateAdded: '2026-05-20'
  },
  {
    id: 'post-2',
    title: 'Storytelling: "A Diferença que Poucos Explicam sobre Harmonização"',
    description: 'Explicação visual elegante comparando procedimentos exagerados versus naturalidade sofisticada. Ativa o desejo pela naturalidade.',
    instagramUrl: 'https://www.instagram.com/p/CzX-LdNu6Z_/',
    canvaUrl: 'https://www.canva.com/design/play-demo-template',
    category: 'POSTS AUTOCUIDADO E ESTILO DE VIDA',
    bannerUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600',
    dateAdded: '2026-05-24'
  },
  {
    id: 'post-3',
    title: 'Template Carrossel: Passo a Passo do Protocolo Glow',
    description: 'Tutorial com design refinado, fontes serenas e espaços delimitados para explicar o tratamento estético sem poluição visual.',
    instagramUrl: 'https://www.instagram.com/p/C-X-asNuY6_/',
    canvaUrl: 'https://www.canva.com/design/play-demo-template',
    category: 'POSTS - CUIDADOS COM A PELE',
    bannerUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600',
    dateAdded: '2026-05-25'
  },
  {
    id: 'post-4',
    title: 'Mockup de Depoimento Minimalista',
    description: 'Prova social clean. Um balão de conversa simulando direct altamente satisfeito, estruturado sobre um fundo estético de clínica.',
    instagramUrl: 'https://www.instagram.com/p/C7_3Y1-pD9w/',
    canvaUrl: 'https://www.canva.com/design/play-demo-template',
    category: 'MICROAGULHAMENTO',
    bannerUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
    dateAdded: '2026-05-26'
  },
  {
    id: 'post-5',
    title: 'Anúncio de Campanha Exclusiva de Lábios de Seda',
    description: 'Uma oferta irresistível de inverno formatada para capturar leads elegantes sem parecer promoção de mercado popular.',
    instagramUrl: 'https://www.instagram.com/p/C8_3Z1-rT9o/',
    canvaUrl: 'https://www.canva.com/design/play-demo-template',
    category: 'ROSÁCEA E PELE SENSÍVEL',
    bannerUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600',
    dateAdded: '2026-05-26'
  }
];

export const INITIAL_USER: UserProfile = {
  name: 'Deni Haut',
  phone: '47999887766',
  email: 'denihaut@exemplo.com.br',
  photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  theme: 'light'
};

export const LOCAL_STORAGE_KEY = 'plataforma_deni_haut_state_v1';

export function loadState(): AppState {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure the loaded user has a theme and force light theme
      const loadedUser = parsed.user || INITIAL_USER;
      loadedUser.theme = 'light';
      // Ensure all keys are defined
      return {
        modules: parsed.modules || INITIAL_MODULES,
        lessons: parsed.lessons || INITIAL_LESSONS,
        posts: parsed.posts || INITIAL_POSTS,
        user: loadedUser,
        watchedLessonIds: parsed.watchedLessonIds || [],
        lessonRatings: parsed.lessonRatings || {},
        categories: parsed.categories || DEFAULT_CATEGORIES,
        categoryLinks: parsed.categoryLinks || DEFAULT_CATEGORY_LINKS
      };
    }
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
  }
  return {
    modules: INITIAL_MODULES,
    lessons: INITIAL_LESSONS,
    posts: INITIAL_POSTS,
    user: INITIAL_USER,
    watchedLessonIds: [],
    lessonRatings: {},
    categories: DEFAULT_CATEGORIES,
    categoryLinks: DEFAULT_CATEGORY_LINKS
  };
}

export function saveState(state: AppState) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
}
