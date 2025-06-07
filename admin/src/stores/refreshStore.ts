import { create } from "zustand";

interface RefreshProps {
    prodRefIndex: number;
    refreshProduct: () => void;
}

export const useRefresh = create<RefreshProps>((set) => ({
    prodRefIndex: 0,
    refreshProduct: () =>
        set((state) => ({
            prodRefIndex: state.prodRefIndex + 1,
        })),
}));
