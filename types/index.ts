export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface TechGroup {
  label: string;
  items: string[];
}

export type ServiceId = "landing" | "systems" | "chatbot";
