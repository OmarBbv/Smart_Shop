import { Box } from "../ui/Box";
import { Typography } from "../ui/Typography";
import { cn } from "@/lib/utils";
import ActionButton from "./ActionButton";
import ProductDetailPopUp from "./ProductDetailPopup";
import { Datum } from "@/types/productTypes";

interface Props {
    prod: Datum;
    grid: boolean;
}

export default function ProductCard({ prod, grid }: Props) {

    return (
        <Box
            className={cn(
                "group hover:outline-2 cursor-pointer outline-blue-500 h-auto border border-gray-200 rounded-sm text-gray-600",
                grid ? "w-full flex flex-row" : "w-full xl:w-[260px] flex flex-col"
            )}
        >
            <Box
                className={cn(
                    "overflow-hidden flex justify-center items-center relative p-2",
                    grid
                        ? "w-[25%] h-[200px] border-r border-gray-200"
                        : "w-full h-[250px] border-b border-b-gray-200"
                )}
            >
                <Typography
                    children="yeni"
                    className="absolute z-50 top-2 right-2 bg-red-500 shadow rounded-sm px-2 text-white text-xs leading-5 select-none"
                />
                <img
                    className="h-full w-full object-cover group-hover:scale-105 transition-all duration-300"
                    src={prod?.images?.[0]}
                    alt={prod?.name}
                />
            </Box>

            <Box
                className={cn(
                    "flex-1 flex flex-col gap-2 p-3 justify-between",
                    grid ? "w-[60%]" : ""
                )}
            >
                <Typography className="flex items-center justify-between font-semibold text-gray-900 text-base">
                    <span>{prod?.name}</span>
                    <span>${prod?.price}</span>
                </Typography>
                <Typography className="">Xüsusiyyətləri</Typography>

                <Box className="w-full grid grid-cols-2 gap-2">
                    {Object.entries(prod?.features || {})
                        .slice(0, 4)
                        .map(([key, value]) => (
                            <Typography className="line-clamp-1" key={key}>
                                {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
                            </Typography>
                        ))}
                </Box>

                <ActionButton product={prod} />

                <ProductDetailPopUp />
            </Box>
        </Box>
    );
}
