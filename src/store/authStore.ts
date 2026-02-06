import { create } from 'zustand';
import { authApi } from '../lib/api';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('aea_token'),
  isAuthenticated: !!localStorage.getItem('aea_token'),

  login: async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    const { token, user } = response.data;
    localStorage.setItem('aea_token', token);
    localStorage.setItem('aea_user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('aea_token');
    localStorage.removeItem('aea_user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const token = localStorage.getItem('aea_token');
    const userStr = localStorage.getItem('aea_user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ user, token, isAuthenticated: true });
      } catch {
        set({ user: null, token: null, isAuthenticated: false });
      }
    } else {
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
}));
