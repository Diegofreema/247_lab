import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

type Props = {
  id?: string;
  getUser: () => void;
  setUser: (id: string) => void;
  clearUser: () => void;
};
const id = SecureStore.getItem("id") || "";
export const useAuth = create<Props>((set) => ({
  id,
  getUser: () => {
    const storedId = SecureStore.getItem("id");

    if (storedId) {
      set({ id: storedId });
    } else {
      set({ id: "" });
    }
  },
  setUser: (id: string) => {
    set({ id });
    SecureStore.setItem("id", id);
  },
  clearUser: async () => {
    set({ id: "" });
    await SecureStore.deleteItemAsync("id");
  },
}));
