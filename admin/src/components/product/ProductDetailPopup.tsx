import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useProductPopUp } from "@/stores/productDetailPopupStore"
import { X, ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Box } from "../ui/Box"
import { CustomButton } from "../ui/CustomButton"
import { useShallow } from "zustand/shallow"
import { productService } from "@/services/productService"
import { useRefresh } from "@/stores/refreshStore"

interface Product {
    id: number
    name: string
    price: number
    category?: { name: string }
    features: Record<string, string>
    images: string[] | null
}

export default function ProductDetailPopUp() {
    const { closePopUp, isOpen, selectedProduct } = useProductPopUp(
        useShallow((state) => ({
            closePopUp: state.closePopUp,
            isOpen: state.isOpen,
            selectedProduct: state.selectedProduct,
        }))
    )
    const prodRefresh = useRefresh(state => state.refreshProduct);

    const product = selectedProduct as Product | null

    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isMounted, setIsMounted] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    const scrollContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setIsMounted(true)
        return () => setIsMounted(false)
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    useEffect(() => {
        if (product?.images?.length) {
            setCurrentImageIndex(0)
        }
    }, [product])

    useEffect(() => {
        function onEsc(e: KeyboardEvent) {
            if (e.key === "Escape") handleClose()
        }
        if (isOpen) {
            window.addEventListener("keydown", onEsc)
        }
        return () => window.removeEventListener("keydown", onEsc)
    }, [isOpen])

    if (!isMounted || !product) return null

    const images = product.images && product.images.length > 0 ? product.images : ["/placeholder.svg?height=400&width=600"]
    const priceNumber = Number(product?.price);

    function handleClose() {
        setIsClosing(true)
        setTimeout(() => {
            closePopUp()
            setIsClosing(false)
        }, 300)
    }

    function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            handleClose()
        }
    }

    function scrollToNext() {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    function scrollToPrev() {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    function scrollToImage(index: number) {
        setCurrentImageIndex(index)
    }

    function renderFeatureValue(value: string | object): React.ReactNode {
        if (typeof value === "string") {
            return value;
        }
        if (typeof value === "object" && value !== null) {
            return (
                <ul className="list-disc list-inside ml-4">
                    {Object.entries(value).map(([k, v]) => (
                        <li key={k}>
                            <strong>{k}:</strong> {renderFeatureValue(v)}
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    }

    function handleRemoveProduct() {
        const id = product?.id;

        if (!id) return;

        productService.removeProduct(String(id));
        closePopUp();
        prodRefresh();
    }

    const modalContent = (
        <Box
            id="overlay"
            onClick={handleOverlayClick}
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 transition-opacity",
                isOpen && !isClosing ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
        >
            <Box
                onClick={(e: any) => e.stopPropagation()}
                className={cn(
                    "relative max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300",
                    isOpen && !isClosing ? "scale-100 opacity-100" : "scale-95 opacity-0"
                )}
            >
                {/* Close Button */}
                <CustomButton
                    className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-gray-700 shadow-md hover:bg-white hover:text-gray-900 transition-colors"
                    onClick={handleClose}
                    aria-label="Close popup"
                >
                    <X className="h-5 w-5" />
                </CustomButton>

                {/* Content */}
                <Box className="flex flex-col md:flex-row max-h-[90vh] overflow-auto">
                    {/* Left: Image Section */}
                    <div className="md:w-1/2 p-4 md:p-6 bg-gray-50 flex flex-col">
                        <div className="relative flex-grow">
                            <div className="h-64 sm:h-80 md:h-96 mb-4 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                                <img
                                    src={images[currentImageIndex]}
                                    alt={`${product.name} image ${currentImageIndex + 1}`}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>

                            {images.length > 1 && (
                                <>
                                    {/* Navigation buttons */}
                                    <div className="absolute top-1/2 left-0 right-0 flex justify-between px-2 transform -translate-y-1/2 pointer-events-auto">
                                        <CustomButton
                                            onClick={scrollToPrev}
                                            className="bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </CustomButton>
                                        <CustomButton
                                            onClick={scrollToNext}
                                            className="bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </CustomButton>
                                    </div>

                                    {/* Thumbnails */}
                                    <div
                                        ref={scrollContainerRef}
                                        className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar mt-2"
                                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                    >
                                        {images.map((img, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => scrollToImage(idx)}
                                                className={cn(
                                                    "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-200",
                                                    currentImageIndex === idx
                                                        ? "border-teal-500 shadow-md"
                                                        : "border-gray-200 hover:border-gray-300"
                                                )}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${product.name} thumbnail ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="md:w-1/2 p-6 overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{product?.name}</h1>
                                {product?.category && (
                                    <span className="inline-block bg-teal-50 text-teal-700 text-sm px-3 py-1 rounded-full mt-2 font-medium">
                                        {product?.category?.name}
                                    </span>
                                )}
                            </div>
                            <div className="text-2xl font-bold text-teal-600">${priceNumber}</div>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">Xüsusiyyətləri</h2>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 max-h-64 overflow-y-auto">
                                {Object.entries(product.features || {}).map(([key, value], idx) => (
                                    <div
                                        key={key}
                                        className={cn(
                                            "flex flex-col py-3",
                                            idx !== Object.entries(product.features).length - 1 && "border-b border-gray-200"
                                        )}
                                    >
                                        <span className="text-gray-600 font-medium">{key}</span>
                                        <span className="text-gray-800 font-semibold">{renderFeatureValue(value)}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="flex flex-col sm:flex-row gap-3 mt-8">
                            <CustomButton className="flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white transition-colors duration-200 font-medium flex-1">
                                <Edit className="h-4 w-4" />
                                Düzenle
                            </CustomButton>
                            <CustomButton
                                onClick={handleRemoveProduct}
                                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-red-500 text-red-500 hover:bg-red-50 transition-colors duration-200 font-medium flex-1">
                                <Trash2 className="h-4 w-4" />
                                Sil
                            </CustomButton>
                        </div>
                    </div>
                </Box>
            </Box>
        </Box>
    )

    return isOpen ? createPortal(modalContent, document.body) : null
}
