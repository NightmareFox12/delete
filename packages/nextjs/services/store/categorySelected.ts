import { create } from 'zustand';

type CategorySelected = {
  category: string;
  setCategory: (category: string) => void;
};

export const useCategorySelected = create<CategorySelected>((set) => ({
  category: '',
  setCategory: (category: string) => set(() => ({ category })),
}));
