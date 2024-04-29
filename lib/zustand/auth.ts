import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { UserType } from '../@types';

type Props = {
  user?: UserType | null;
  getUser: () => void;
  setUser: (user: UserType) => void;
  clearUser: () => void;
};
const user = JSON.parse(SecureStore.getItem('user') || '{}');
export const useAuth = create<Props>((set) => ({
  user: user || null,
  getUser: () => {
    const user = JSON.parse(SecureStore.getItem('user') || '{}');
    if (user) set({ user });
  },
  setUser: (user: UserType) => {
    set({ user });
    const stringifyUser = JSON.stringify(user);
    SecureStore.setItem('user', stringifyUser);
  },
  clearUser: async () => {
    set({ user: null });
    await SecureStore.deleteItemAsync('user');
  },
}));
