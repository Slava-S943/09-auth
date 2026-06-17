import { create } from 'zustand';

import type { User } from '@/types/user';

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;

  setUser: (user: User) => void;
  setInitialUser: (user: User | null) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()(set => ({
  isAuthenticated: false,
  user: null,

  setUser: (user: User) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setInitialUser: (user: User | null) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  clearIsAuthenticated: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
