import { create } from 'zustand';

interface CategoryStore {
    categoryName: string[];
    addCategoryName: (name: string) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    categoryName: [],
    addCategoryName: (name) => set((state) => ({
        categoryName: [...state.categoryName, name]
    })),
}));
