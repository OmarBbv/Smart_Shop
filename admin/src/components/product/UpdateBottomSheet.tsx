import { createPortal } from "react-dom"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useProductPopUp } from "@/stores/productDetailPopupStore"
import type { Datum, UpdateServiceType } from "@/types/productTypes"
import { X, Upload, ImageIcon, Tag, DollarSign, FileText, CreditCard } from "lucide-react"
import { useForm } from "react-hook-form"
import { productService } from "@/services/productService"
import { useMutation } from "@tanstack/react-query"
import toast, { Toaster } from "react-hot-toast"

interface Props {
    product: Datum
}

export default function UpdateBottomSheet({ product }: Props) {
    const isUpdateClose = useProductPopUp((state) => state.isCloseUpdateProd)
    const [existingImages, setExistingImages] = useState<string[]>(product?.images || [])
    const [animate, setAnimate] = useState(false)
    const [show, setShow] = useState(true)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [images, setImages] = useState<File[]>([])
    const [dragActive, setDragActive] = useState(false)


    const { register, handleSubmit } = useForm({
        defaultValues: product,
    })
    useEffect(() => {
        setExistingImages(product.images || [])
    }, [product.images])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (files) {
            const selectedFiles = Array.from(files)
            setImages((prev) => [...prev, ...selectedFiles])
        }
    }

    function handleDrag(e: React.DragEvent) {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const files = Array.from(e.dataTransfer.files)
            setImages((prev) => [...prev, ...files])
        }
    }

    function handleUploadImage() {
        inputRef?.current?.click()
    }

    function handleRemoveImage(index: number) {
        setExistingImages((prev) => prev.filter((_, i) => i !== index))
    }

    function handleRemoveNewImage(index: number) {
        setImages((prev) => prev.filter((_, i) => i !== index))
    }

    const { mutate } = useMutation({
        mutationKey: ['post/update-product'],
        mutationFn: ({ id, newData }: { id: number; newData: UpdateServiceType }) => productService.updateProduct(id, newData),
        onSuccess: () => toast.success('Məhsul Güncəlləndi.'),
        onError: () => toast.error('Məhsul Güncəllənərkən xəta baş verdi!')
    });

    function onSubmit(data: Datum) {
        const id = product.id;
        if (!id) return;

        const imgs = [...existingImages, ...images];

        const newData: UpdateServiceType = {
            name: data.name,
            credit_available: data.credit_available,
            description: data.description,
            price: data.price,
            images: imgs,
        }

        console.log(newData);

        mutate({ id, newData });
    }

    function handleClose() {
        setAnimate(false)
        setTimeout(() => {
            setShow(false)
            isUpdateClose()
        }, 300)
    }

    useEffect(() => {
        const timeout = setTimeout(() => setAnimate(true), 10)
        return () => clearTimeout(timeout)
    }, [])

    if (!show) return null

    return createPortal(
        <>
            <Toaster position="top-center" containerClassName="z-[999999]" />

            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${animate ? "opacity-100" : "opacity-0"}`}
                onClick={handleClose}
            />

            <div
                className={`fixed bottom-0 left-0 w-full h-[94vh] bg-gradient-to-br from-white to-gray-50 shadow-2xl z-[9999] overflow-hidden transition-all duration-300 ease-out ${animate ? "translate-y-0" : "translate-y-full"}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                }}
            >
                <div className="sticky top-0 bg-white/80 backdrop-blur-md flex items-center justify-between py-6 px-8 z-10 border-b border-gray-200/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Tag className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                Məhsulu Yenilə
                            </h2>
                            <p className="text-sm text-gray-500">Məhsul məlumatlarını redaktə edin</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="h-full overflow-y-auto pb-24">
                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Əsas Məlumatlar
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Məhsul Adı</label>
                                    <input
                                        {...register("name")}
                                        type="text"
                                        placeholder="Məhsulun adını daxil edin"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" />
                                        Qiymət
                                    </label>
                                    <input
                                        {...register("price", { valueAsNumber: true })} type="number" step="0.01"
                                        placeholder="0.00"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Təsvir</label>
                                    <textarea
                                        {...register("description")}
                                        placeholder="Məhsul haqqında ətraflı məlumat"
                                        rows={4}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200 resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-green-500" />
                                Şəkillər
                            </h3>

                            <div
                                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Upload className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Şəkil əlavə edin</h4>
                                        <p className="text-gray-500 mb-4">Şəkilləri buraya sürükləyin və ya seçin</p>
                                        <button
                                            type="button"
                                            onClick={handleUploadImage}
                                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg"
                                        >
                                            Şəkil Seç
                                        </button>
                                    </div>
                                </div>
                                <input
                                    onChange={handleChange}
                                    ref={inputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                />
                            </div>

                            {images.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Yeni Şəkillər</h4>
                                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                        {images.map((img, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={URL.createObjectURL(img) || "/placeholder.svg"}
                                                    alt="Yeni şəkil"
                                                    className="w-full h-24 object-cover rounded-md border border-gray-200"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveNewImage(index)}
                                                    className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {existingImages.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Mövcud Şəkillər</h4>
                                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                        {existingImages.map((imgUrl, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={imgUrl || "/placeholder.svg"}
                                                    alt="Mövcud şəkil"
                                                    className="w-full h-24 object-cover rounded-md border border-gray-200"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(index)}
                                                    className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-purple-500" />
                                Əlavə Seçimlər
                            </h3>

                            <label className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                                <input
                                    {...register("credit_available")}
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                />
                                <div>
                                    <span className="font-medium text-gray-800">Kreditlə satış</span>
                                    <p className="text-sm text-gray-500">Bu məhsul kredit ilə satıla bilər</p>
                                </div>
                            </label>
                        </div>

                        <div className="sticky bottom-0 bg-white p-6 border-t border-gray-200">
                            <button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                            >
                                Məhsulu Yenilə
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>,
        document.body,
    )
}