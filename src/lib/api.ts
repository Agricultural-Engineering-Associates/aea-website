import axios from 'axios';
import type { ContactFormData, Section, StaffMember, Project, SiteSettings } from '../types';

const api = axios.create({
  baseURL: 'https://aea-backend.onrender.com/api',
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
    api.get(`/public/pages/${pageName}`),
  submitContact: (data: ContactFormData) =>
    api.post('/public/contact', data),
  getStaff: () =>
    api.get<StaffMember[]>('/public/staff'),
  getProjects: () =>
    api.get<Project[]>('/public/projects'),
  getSettings: () =>
    api.get<SiteSettings>('/public/settings'),
};

export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ token: string; user: { id: string; email: string; name: string } }>(
      '/auth/login',
      { email, password }
    ),
};

export const adminApi = {
  getDashboard: () =>
    api.get('/admin/dashboard'),

  getPages: () =>
    api.get('/admin/pages'),
  getPage: (pageName: string) =>
    api.get<{ sections: Section[] }>(`/admin/pages/${pageName}`),
  updatePage: (pageName: string, data: { sections: Section[] }) =>
    api.put(`/admin/pages/${pageName}`, data),

  getStaff: () =>
    api.get<StaffMember[]>('/admin/staff'),
  createStaff: (data: Omit<StaffMember, 'id'>) =>
    api.post('/admin/staff', data),
  updateStaff: (id: string, data: Partial<StaffMember>) =>
    api.put(`/admin/staff/${id}`, data),
  deleteStaff: (id: string) =>
    api.delete(`/admin/staff/${id}`),

  getProjects: () =>
    api.get<Project[]>('/admin/projects'),
  createProject: (data: Omit<Project, 'id'>) =>
    api.post('/admin/projects', data),
  updateProject: (id: string, data: Partial<Project>) =>
    api.put(`/admin/projects/${id}`, data),
  deleteProject: (id: string) =>
    api.delete(`/admin/projects/${id}`),

  getSettings: () =>
    api.get<SiteSettings>('/admin/settings'),
  updateSettings: (data: SiteSettings) =>
    api.put('/admin/settings', data),

  getContacts: () =>
    api.get('/admin/contacts'),
  getContact: (id: string) =>
    api.get(`/admin/contacts/${id}`),
  deleteContact: (id: string) =>
    api.delete(`/admin/contacts/${id}`),
  markContactRead: (id: string) =>
    api.patch(`/admin/contacts/${id}/read`),

  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post<{ url: string }>('/admin/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default api;
