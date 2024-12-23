import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: String,
  login: (user: User, token: String) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  token: "",
  login: (user, token) => {
    set({ user, isAuthenticated: true, token })
    window.localStorage.setItem("user", JSON.stringify(user));
    window.localStorage.setItem("token", JSON.stringify(token));
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));