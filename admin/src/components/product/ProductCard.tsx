import { Product } from "@/api/mockData";
import { Box } from "../ui/Box";
import { Typography } from "../ui/Typography";

interface Props {
    prod: Product
}

export default function ProductCard({ prod }: Props) {
    return (
        <Box className="w-full xl:w-[260px] h-auto border border-gray-200 rounded-sm text-gray-600">
            <Box className="w-full h-[250px] flex justify-center items-center flex-1 border-b border-b-gray-200 px-2 py-3 relative">
                <Typography children="yeni" className="absolute top-2 right-2 bg-red-500 shadow rounded-sm px-2 text-white text-xs leading-5 select-none" />
                <img className="h-full object-contain" src={prod.images[0]} />
            </Box>

            <Box className="flex-1 flex flex-col gap-2 p-3 justify-between">
                <Typography className="flex items-center justify-between font-semibold text-gray-900 text-base">
                    <span>{prod.name}</span>
                    <span>${prod.price}</span>
                </Typography>
                <Typography className="">Xüsusiyyətləri</Typography>

                <Box className="w-full grid grid-cols-2 gap-2">
                    {Object.entries(prod.features).slice(0, 4).map(([key, value]) => {
                        return <Typography className="line-clamp-1" key={key}>{key}: {value}</Typography>;
                    })}
                </Box>

                <Box className="flex-1 flex items-center justify-between">
                    <button className="text-white bg-blue-500 px-3 py-1 text-sm font-semibold leading-5 cursor-pointer">Düzəlt</button>
                    <button className="text-white bg-red-500 px-3 py-1 text-sm font-semibold leading-5 cursor-pointer">Məhsulu sil</button>
                </Box>
            </Box>
        </Box>
    )
}
