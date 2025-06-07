import { useProductPopUp } from '@/stores/productDetailPopupStore';
import { Box } from '../ui/Box';
import { CustomButton } from '../ui/CustomButton';
import { Datum } from '@/types/productTypes';
import { productService } from '@/services/productService';
import React from 'react';
import { useRefresh } from '@/stores/refreshStore';
import { useShallow } from 'zustand/shallow';
import { useMutation } from '@tanstack/react-query';

interface ActionButtonProps {
    product: Datum;
}

export default function ActionButton({ product }: ActionButtonProps) {
    const refreshProduct = useRefresh((state) => state.refreshProduct);

    const { openPopUp, isUpdateProd } = useProductPopUp(useShallow((state) => ({
        openPopUp: state.openPopUp,
        isUpdateProd: state.isUpdateProd,
    })));



    function handleOpen(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        openPopUp(product)
    }

    function updateProduct(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        isUpdateProd();
    }

    const mutate = useMutation({
        mutationKey: ['remove/product'],
        mutationFn: (id: string) => productService.removeProduct(String(id)),
        onSuccess: () => refreshProduct()
    })

    function handleRemoveProduct(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        const id = product.id;

        if (!id) return;
        mutate.mutate(String(id));
    }

    return (
        <Box className="flex items-center justify-between mt-auto gap-3">
            <CustomButton
                onClick={handleOpen}
                className="text-white flex-1 bg-green-500 px-3 py-1 text-sm font-semibold leading-5 cursor-pointer"
            >
                Bax
            </CustomButton>
            <CustomButton
                onClick={updateProduct}
                className="text-white flex-1 bg-blue-500 px-3 py-1 text-sm font-semibold leading-5 cursor-pointer">
                Düzəlt
            </CustomButton>
            <CustomButton
                onClick={(e) => handleRemoveProduct(e)}
                className="text-white flex-1 bg-red-500 px-3 py-1 text-sm font-semibold leading-5 cursor-pointer text-nowrap"
            >
                Məhsulu sil
            </CustomButton>
        </Box>
    );
}
