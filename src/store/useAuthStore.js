import { create } from 'zustand';
import { mockUsers } from '../constants/mockData';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    // Искусственная задержка, чтобы эмулятор успел отрисовать спиннер
    await new Promise((r) => setTimeout(r, 800));
    
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    
    if (!found) {
      set({ loading: false, error: 'Неверный email или пароль' });
      return false;
    }
    
    set({ user: found, isAuthenticated: true, loading: false });
    return true;
  },

  logout: () => set({ user: null, isAuthenticated: false }),

  clearError: () => set({ error: null }),
}));
