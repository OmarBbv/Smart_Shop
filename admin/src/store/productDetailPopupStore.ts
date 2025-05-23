import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Datum } from '@/types/productTypes';

type ProductPopUpStore = {
    isOpen: boolean;
    selectedProduct: Datum | null;
    openPopUp: (product: Datum) => void;
    closePopUp: () => void;
};

export const useProductPopUp = create<ProductPopUpStore>()(
    subscribeWithSelector((set) => ({
        isOpen: false,
        selectedProduct: null,
        openPopUp: (product: Datum) =>
            set({ isOpen: true, selectedProduct: product }),
        closePopUp: () =>
            set({ isOpen: false, selectedProduct: null }),
    }))
);

