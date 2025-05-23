import { create } from 'zustand';

interface ImageSelectionState {
    selectedIndex: number | 0;
    setSelectedIndex: (index: number) => void;
    clearSelection: () => void;
}

export const useImageSelectionStore = create<ImageSelectionState>((set) => ({
    selectedIndex: 0,
    setSelectedIndex: (index: number) => set({ selectedIndex: index }),
    clearSelection: () => set({ selectedIndex: 0 }),
}));
