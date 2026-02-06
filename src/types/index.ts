export interface Section {
  id: string;
  name: string;
  title: string;
  content: string;
  imageUrl?: string;
  order: number;
}

export interface PageContent {
  id: string;
  pageName: string;
  sections: Section[];
}

export interface StaffMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  photoUrl?: string;
  displayOrder: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  imageUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface SiteSettings {
  businessName: string;
  address: string;
  phone: string;
  email: string;
  facebookUrl: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface DashboardStats {
  totalPages: number;
  totalStaff: number;
  totalProjects: number;
  totalMessages: number;
  unreadMessages: number;
}
