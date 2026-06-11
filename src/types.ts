export interface Module {
  id: string;
  title: string;
  description: string;
  bannerUrl: string;
  order: number;
}

export interface LessonAttachment {
  id: string;
  name: string;
  type: 'link' | 'doc' | 'pdf';
  url: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  youtubeUrl: string;
  bannerUrl: string;
  duration: string;
  order: number;
  attachments?: LessonAttachment[];
}

export type PostCategory = string;

export interface InstagramPost {
  id: string;
  instagramUrl: string;
  canvaUrl: string;
  category: PostCategory;
  title: string;
  description: string;
  bannerUrl?: string;
  dateAdded: string;
  featured?: boolean;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  photo?: string;
  theme?: 'dark' | 'light';
  salonName?: string;
}

export interface AppState {
  modules: Module[];
  lessons: Lesson[];
  posts: InstagramPost[];
  user: UserProfile;
  watchedLessonIds: string[];
  lessonRatings: Record<string, number>;
  categories?: string[];
  categoryLinks?: Record<string, { canva: string; drive?: string }>;
}
