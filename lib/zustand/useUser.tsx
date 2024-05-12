import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { UserType } from '../@types';

type Props = {
  user: UserType | null;
  getUser: (user: UserType) => void;
  clearUser: () => void;
};
const user = JSON.parse(SecureStore.getItem('user') || '{}');
export const useUser = create<Props>((set) => ({
  user: user,
  getUser: (user: UserType) => {
    set({ user });
    SecureStore.setItem('user', JSON.stringify(user));
  },
  clearUser: async () => {
    set({ user: null });
    await SecureStore.deleteItemAsync('user');
  },
}));
