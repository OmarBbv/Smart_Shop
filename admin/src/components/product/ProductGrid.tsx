import React from "react";
import { Box } from "../ui/Box";

interface Props {
    children: React.ReactNode;
    grid: boolean;
}

export default function ProductGrid({ children, grid }: Props) {
    return (
        <Box
            className={
                grid
                    ? "grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
                    : "flex flex-wrap gap-4 w-full"
            }
        >
            {children}
        </Box>
    );
}
