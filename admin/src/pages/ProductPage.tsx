import ProductCard from "@/components/product/ProductCard";
import ProductGrid from "@/components/product/ProductGrid";
import { Box } from "@/components/ui/Box";
import { CustomButton } from "@/components/ui/CustomButton";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { productService } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, List } from 'lucide-react'
import { useEffect, useState } from "react";

export default function ProductPage() {
    const [isGrid, setIsGrid] = useState<boolean>(false);

    function handleGrid(str: string) {
        const value = str === 'grid';
        setIsGrid(value);
        localStorage.setItem('grid', String(value));
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['get/products'],
        queryFn: () => productService.getAllProducts(),
    });

    const productData = data?.data;

    console.log(productData)

    useEffect(() => {
        const stored = localStorage.getItem('grid');
        if (stored === "true") {
            setIsGrid(true);
        } else {
            setIsGrid(false);
        }
    }, []);

    if (isLoading) return <div>loading..</div>
    if (isError) {
        console.log('Error detay:', error);
        return <div>error data</div>;
    }


    return (
        <Box className="container mx-auto">
            <Box className="flex justify-between flex-1 items-center mb-4">
                <Typography component="h2" className="text-xl">Məhsullar</Typography>
                <ul className="flex items-center gap-2">
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
                </ul>
            </Box>
            <ProductGrid grid={isGrid}>
                {productData?.map(prod => {
                    return <ProductCard key={prod.id} prod={prod} grid={isGrid} />
                })}
            </ProductGrid>
        </Box>
    )
}

