import { create } from "zustand";

export const useFavoriteStore = create((set) => ({
  favoriteIds: [],

  clearFavorites: () => set({ favoriteIds: [] }),

  toggleFavorite: (id) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(id)
        ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
        : [...state.favoriteIds, id],
    })),
}));
