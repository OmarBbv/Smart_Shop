import { create } from 'zustand';
import type { Datum } from '@/types/productTypes';

interface Product {
    title: 'Bax' | 'Düzəlt',
    product: Datum | null
}

interface ProductPopStore {
    isToggle: boolean;
    productIndex: number | null,
    product: Product | null;
    setProduct: (data: Datum, title: 'Bax' | 'Düzəlt') => void;
    setToggleProd: () => void;
    setSelectedProductIndex: (index: number) => void;
}

export const useProductPopStore = create<ProductPopStore>((set) => ({
    productIndex: null,
    isToggle: false,
    product: null,
    setSelectedProductIndex: (index: number) => set({ productIndex: index }),
    setProduct: (data, title) => set((state) => ({
        ...state,
        product: { title, product: data }
    })),
    setToggleProd: () => set((state) => ({ isToggle: !state.isToggle })),
}));
