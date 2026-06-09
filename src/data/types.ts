export interface Experience {
  id: string;
  role: { en: string; zh: string };
  company: { en: string; zh: string };
  startDate: string;         // 'YYYY.M'
  endDate: string | null;    // null = present
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
  longDescription: { en: string; zh: string };
  role: { en: string; zh: string };
  client: { en: string; zh: string };
  attribution: { en: string; zh: string };
  tags: string[];
  highlights: { en: string[]; zh: string[] };
  href: string;
}

export interface Service {
  id: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  tags: string[];
}
