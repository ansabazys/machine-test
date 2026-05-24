export interface Hero {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  heroImage?: {
    url: string;
  };
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  id: number;
  label: string;
  value: string;
  icon: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface Announcement {
  id: number;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
}

export interface Homepage {
  hero: Hero;
  features: Feature[];
  stats: Stat[];
  faq: Faq[];
  announcements: Announcement[];
}