export interface Experience {
  id: string;
  role: { en: string; zh: string };
  company: { en: string; zh: string };
  date: { en: string; zh: string };
  description: { en: string; zh: string };
}

export interface Education {
  id: string;
  school: { en: string; zh: string };
  degree: { en: string; zh: string };
  date: { en: string; zh: string };
}

export interface Project {
  id: string;
  category: { en: string; zh: string };
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  attribution: { en: string; zh: string };
  tags: string[];
  href: string;
}

export interface Service {
  id: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  tags: string[];
}
