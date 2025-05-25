import { useProductPopUp } from '@/stores/productDetailPopupStore';
import { Box } from '../ui/Box';
import { CustomButton } from '../ui/CustomButton';
import { Datum } from '@/types/productTypes';

interface ActionButtonProps {
    product: Datum;
}

export default function ActionButton({ product }: ActionButtonProps) {
    const openPopUp = useProductPopUp((state) => state.openPopUp);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        openPopUp(product)
    }

    return (
        <Box className="flex items-center justify-between mt-auto gap-3">
            <CustomButton
                onClick={handleOpen}
                className="text-white flex-1 bg-green-500 px-3 py-1 text-sm font-semibold leading-5 cursor-pointer"
            >
                Bax
            </CustomButton>
            <CustomButton className="text-white flex-1 bg-blue-500 px-3 py-1 text-sm font-semibold leading-5 cursor-pointer">
                Düzəlt
            </CustomButton>
            <CustomButton
                className="text-white flex-1 bg-red-500 px-3 py-1 text-sm font-semibold leading-5 cursor-pointer text-nowrap"
            >
                Məhsulu sil
            </CustomButton>
        </Box>
    );
}
