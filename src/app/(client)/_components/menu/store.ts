import { create } from "zustand";
import { TUseClientStore } from "./types";

export const useClientMenuStore = create<TUseClientStore>((set) => ({
  activeTab: "",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
