import { useQuery } from "@tanstack/react-query"
import { productService } from '@/services/productService'
import { useParams } from "react-router-dom"
import { Loading } from "@/components/loading";
import { Error } from "../components/error";
import CustomSwiper from "../components/Swiper";
import { useImageSelectionStore } from "@/stores/imageSelectStore";
import { Box } from "../components/ui/Box";
import { Typography } from "../components/ui/Typography";
import { formatISOToReadable } from "@/lib/dateTime";
import { FeatureRenderer } from "@/components/product/FeatureRenderer";

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const selectedIndex = useImageSelectionStore(store => store.selectedIndex)

    const { data, isError, isLoading } = useQuery({
        queryKey: ['get/products/id'],
        queryFn: () => productService.getProductById(id!),
        enabled: !!id
    })

    console.log(data);

    if (isLoading) return <Loading />
    if (isError) return <Error />

    return (
        <Box>
            <Box className="flex items-start gap-5">
                <section className="w-1/2 h-[550px] bg-gray-50 flex flex-col gap-3 shadow overflow-hidden">
                    <Box className="h-4/5 flex items-center justify-center">
                        <img src={data?.images?.[selectedIndex]} className="object-contain w-full h-full" alt={data?.name} />
                    </Box>
                    <Box className="flex items-center mx-2 gap-4 w-full">
                        <CustomSwiper images={data?.images} />
                    </Box>
                </section>
                <section className="flex-1 px-2 shadow">
                    <Typography className="text-lg">{data?.name}</Typography>
                    <Typography>{data?.price}</Typography>
                    <Typography>
                        {data?.createdAt
                            ? formatISOToReadable(data.createdAt)
                            : '—'}
                    </Typography>
                    <Typography>{data?.category.name}</Typography>
                    <FeatureRenderer data={data?.features} maxItems={4} />
                </section>
            </Box>
            <Box className="text-lg font-semibold">
                <Typography component='h2'>{data?.description}</Typography>
                <Typography component='h2' className="text-xl">Texniki xüsusiyyətləri:</Typography>
                <FeatureRenderer data={data?.features} />
            </Box>
        </Box>
    )
}