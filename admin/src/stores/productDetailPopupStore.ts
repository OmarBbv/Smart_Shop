import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Datum } from '@/types/productTypes';

type ProductPopUpStore = {
    isUpdate: boolean,
    isOpen: boolean;
    selectedProduct: Datum | null;
    openPopUp: (product: Datum) => void;
    closePopUp: () => void;
    isUpdateProd: () => void
    isCloseUpdateProd: () => void
};

export const useProductPopUp = create<ProductPopUpStore>()(
    subscribeWithSelector((set) => ({
        isUpdate: false,
        isOpen: false,
        selectedProduct: null,
        isUpdateProd: () => set({ isUpdate: true }),
        isCloseUpdateProd: () => set({ isUpdate: false }),
        openPopUp: (product) => set({ isOpen: true, selectedProduct: product }),
        closePopUp: () => set({ isOpen: false, selectedProduct: null }),
    }))
);

