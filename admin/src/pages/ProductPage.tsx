import { mockProductData } from "@/api/mockData";
import ProductCard from "@/components/product/ProductCard";
import ProductGrid from "@/components/product/ProductGrid";
import { Box } from "@/components/ui/Box";
import { Typography } from "@/components/ui/Typography";

export default function ProductPage() {
    const data = mockProductData();

    return (
        <Box className="container mx-auto">
            <Box className="flex justify-between flex-1 items-center">
                <Typography component="h2" className="text-xl pb-2">Məhsullar</Typography>
                <ul className="flex items-center gap-2">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </Box>
            <ProductGrid>
                {data?.map(prod => {
                    return <ProductCard prod={prod} />
                })}
            </ProductGrid>
        </Box>
    )
}

