import React from "react";
import { Box } from "../ui/Box";

interface Props {
    children: React.ReactNode
}

export default function ProductGrid({ children }: Props) {
    return <Box className="flex flex-wrap flex-1 gap-4">{children}</Box>
}