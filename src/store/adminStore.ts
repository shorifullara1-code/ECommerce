import { create } from 'zustand';

interface AdminState {
  role: string | null;
  setRole: (role: string) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  role: localStorage.getItem('adminRole') || null,
  setRole: (role: string) => {
    localStorage.setItem('adminRole', role);
    set({ role });
  },
  logout: () => {
    localStorage.removeItem('adminRole');
    set({ role: null });
  }
}));
