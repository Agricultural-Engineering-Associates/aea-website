import axios from 'axios';
import type { ContactFormData, Section, StaffMember, Project, SiteSettings } from '../types';

const api = axios.create({
  baseURL: 'https://aea-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('aea_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('aea_token');
      localStorage.removeItem('aea_user');
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const publicApi = {
  getPageContent: (pageName: string) =>
    api.get(`/api/public/pages/${pageName}`),
  submitContact: (data: ContactFormData) =>
    api.post('/api/public/contact', data),
  getStaff: () =>
    api.get<StaffMember[]>('/api/public/staff'),
  getProjects: () =>
    api.get<Project[]>('/api/public/projects'),
  getSettings: () =>
    api.get<SiteSettings>('/api/public/settings'),
};

export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ token: string; user: { id: string; email: string; name: string } }>(
      '/api/auth/login',
      { email, password }
    ),
};

export const adminApi = {
  getDashboard: () =>
    api.get('/api/admin/dashboard'),

  getPages: () =>
    api.get('/api/admin/pages'),
  getPage: (pageName: string) =>
    api.get<{ sections: Section[] }>(`/api/admin/pages/${pageName}`),
  updatePage: (pageName: string, data: { sections: Section[] }) =>
    api.put(`/api/admin/pages/${pageName}`, data),

  getStaff: () =>
    api.get<StaffMember[]>('/api/admin/staff'),
  createStaff: (data: Omit<StaffMember, 'id'>) =>
    api.post('/api/admin/staff', data),
  updateStaff: (id: string, data: Partial<StaffMember>) =>
    api.put(`/api/admin/staff/${id}`, data),
  deleteStaff: (id: string) =>
    api.delete(`/api/admin/staff/${id}`),

  getProjects: () =>
    api.get<Project[]>('/api/admin/projects'),
  createProject: (data: Omit<Project, 'id'>) =>
    api.post('/api/admin/projects', data),
  updateProject: (id: string, data: Partial<Project>) =>
    api.put(`/api/admin/projects/${id}`, data),
  deleteProject: (id: string) =>
    api.delete(`/api/admin/projects/${id}`),

  getSettings: () =>
    api.get<SiteSettings>('/api/admin/settings'),
  updateSettings: (data: SiteSettings) =>
    api.put('/api/admin/settings', data),

  getContacts: () =>
    api.get('/api/admin/contacts'),
  getContact: (id: string) =>
    api.get(`/api/admin/contacts/${id}`),
  deleteContact: (id: string) =>
    api.delete(`/api/admin/contacts/${id}`),
  markContactRead: (id: string) =>
    api.patch(`/api/admin/contacts/${id}/read`),

  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post<{ url: string }>('/api/admin/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default api;
