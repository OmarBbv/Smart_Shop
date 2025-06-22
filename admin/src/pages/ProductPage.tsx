import { Error } from "@/components/error";
import { Loading } from "@/components/loading";
import NotFoundElement from "@/components/NotFoundElement";
import ProductCard from "@/components/product/ProductCard";
import { ProductDetailPopUp } from "@/components/product/ProductDetailPopup";
import ProductGrid from "@/components/product/ProductGrid";
import { Box } from "@/components/ui/Box";
import { CustomButton } from "@/components/ui/CustomButton";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { productService } from "@/services/productService";
import { useProductPopStore } from "@/stores/productDetailPopupStore";
import { useRefresh } from "@/stores/refreshStore";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, List } from 'lucide-react'
import { useEffect, useState } from "react";

export default function ProductPage() {
    const prodIndex = useRefresh(state => state.prodRefIndex);
    const isToggle = useProductPopStore(state => state.isToggle)

    const [isGrid, setIsGrid] = useState<boolean>(false);

    function handleGrid(str: string) {
        const value = str === 'grid';
        setIsGrid(value);
        localStorage.setItem('grid', String(value));
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['get/products', prodIndex],
        queryFn: () => productService.getAllProducts(),
    });

    const productData = data?.data;
    const dataGrid = !!productData && productData.length < 0;

    useEffect(() => {
        const stored = localStorage.getItem('grid');
        if (stored === "true") {
            setIsGrid(true);
        } else {
            setIsGrid(false);
        }
    }, []);

    if (isLoading) return <Loading />
    if (isError) return <Error />


    return (
        <Box className="container mx-auto relative">
            <Box className="flex justify-between flex-1 items-center mb-4">
                <Typography component="h2" className="text-xl">Məhsullar</Typography>
                <Box className="flex items-center gap-2">
                    <CustomButton
                        onClick={() => handleGrid('')}
                        className={cn('border border-gray-200 p-1 rounded-md cursor-pointer', !isGrid && 'bg-blue-500')}>
                        <List className={cn('w-5 h-5 rotate-90', !isGrid && 'text-white')} />
                    </CustomButton>
                    <CustomButton
                        onClick={() => handleGrid('grid')}
                        className={cn('border border-gray-200 p-1 rounded-md cursor-pointer', isGrid && 'bg-blue-500')}>
                        <LayoutGrid className={cn('w-5 h-5', isGrid && 'text-white')} />
                    </CustomButton>
                </Box>
            </Box>
            <ProductGrid grid={dataGrid}>
                {productData && productData.length > 0 ?
                    productData?.map(prod => {
                        return <ProductCard key={prod.id} prod={prod} grid={isGrid} />
                    })
                    : <NotFoundElement url="/mehsullar/yeni" title="Məhsul tapılmadı" desc="Sistemdə heç bir məhsul tapılmadı. Yeni məhsul əlavə etmək istəyirsiniz?" buttonContent="Yeni Məhsul Əlavə Et" />
                }
            </ProductGrid>

            {isToggle && <ProductDetailPopUp />}
        </Box>
    )
}

