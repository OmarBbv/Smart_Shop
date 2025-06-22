import { productService } from "@/services/productService";
import { usePostStore } from "@/stores/productPostStore";
import { useMutation } from "@tanstack/react-query";
import { useShallow } from "zustand/shallow";
import { CustomButton } from "../ui/CustomButton";
import { Box } from "../ui/Box";

export function ProductShare() {
    const { currentPost } = usePostStore(
        useShallow((state) => ({
            currentPost: state.currentPost
        }))
    );
    const { mutate } = useMutation({
        mutationKey: ['post/products'],
        mutationFn: async () => {
            if (currentPost.categoryId !== undefined) {
                return productService.getCreateProduct(currentPost)
            }
        },
        onSuccess: () => {
            alert('Mehsul gonderildi')
        },
        onError: () => {
            alert('mehsul gonderilmedi!')
        }
    })
    const handlePostProduct = () => {
        mutate();
    }

    return <Box className="mt-4">
        <CustomButton
            onClick={handlePostProduct}
            className="cursor-pointer bg-green-500 p-2 rounded-sm text-white text-sm"
        >
            Məhsulu Paylaş
        </CustomButton>
    </Box>
}