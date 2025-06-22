import { productService } from "@/services/productService";
import { useProductPopStore } from "@/stores/productDetailPopupStore";
import { UpdateServiceType } from "@/types/productTypes";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';

export const ProductDetailPopUp = () => {
    const { productObj, setToggleProd } = useProductPopStore(useShallow(state => ({
        productObj: state.product,
        setToggleProd: state.setToggleProd
    })));

    const product = productObj?.product;
    const [indexImage, setIndexImage] = useState(0);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const { register, handleSubmit, setValue } = useForm<UpdateServiceType>({
        defaultValues: {
            name: product?.name || '',
            price: product?.price || '',
            description: product?.description || '',
            credit_available: product?.credit_available || false,
            images: product?.images || []
        }
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files);
        setSelectedImages(filesArray);
        setValue('images', filesArray);
    };

    const { mutate } = useMutation({
        mutationKey: ['put/updateProduct'],
        mutationFn: (data: any) => productService.updateProduct(product?.id!, data),
        onSuccess: () => console.log('mehsul yuklendi'),
        onError: () => console.log('error')
    })

    const onSubmit = (data: UpdateServiceType) => {
        console.log("Form verisi:", data);
        mutate(data);
    };

    if (productObj?.title === 'Bax' && product) {
        return createPortal(
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-lg w-full max-w-5xl h-[90vh] flex shadow-lg overflow-hidden">

                    <div className="w-1/2 flex flex-col border-r border-r-gray-300 h-full">
                        <div className="h-3/4 p-2 bg-gray-100">
                            <img
                                src={product.images?.[indexImage]}
                                alt="image"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="flex-1 p-2">
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={'auto'}
                                className="!flex items-center"
                            >
                                {product.images?.map((im, i) => (
                                    <SwiperSlide
                                        key={i}
                                        style={{ width: '80px', flexShrink: 0, margin: '0px 10px' }}
                                        className="!w-fit my-2"
                                    >
                                        <img
                                            onClick={() => setIndexImage(i)}
                                            className={`h-20 w-20 object-cover cursor-pointer rounded-md outline-offset-2 ${indexImage === i
                                                ? 'outline-[4px] outline-blue-500'
                                                : 'outline-none'
                                                }`}
                                            src={im}
                                            alt={`product-${i}`}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                    <div className="w-1/2 overflow-y-auto h-full relative">
                        <div className="flex justify-between items-center sticky top-0 left-0 bg-white p-6">
                            <h2 className="text-xl font-bold">{product.name}</h2>
                            <button onClick={setToggleProd}>
                                <X color="#cf2020" />
                            </button>
                        </div>

                        <div className="px-6 pb-6">
                            <p className="text-gray-600 text-sm mt-4">{product.description}</p>

                            <div className="text-sm space-y-1 mt-4">
                                <p><span className="font-semibold">Qiymət:</span> {product.price} ₼</p>
                                <p><span className="font-semibold">Kreditlə satış:</span> {product.credit_available ? "Bəli" : "Xeyr"}</p>
                                <p><span className="font-semibold">Tarix:</span> {new Date(product.createdAt).toLocaleDateString()}</p>
                            </div>

                            {product.features && (
                                <div className="mt-6">
                                    <h3 className="font-semibold text-base mb-2">Xüsusiyyətlər</h3>
                                    <ul className="grid grid-cols-1 gap-2 text-sm">
                                        {Object.entries(product.features).map(([key, value]) => (
                                            <li key={key} className="flex justify-between border-b border-b-gray-300 pb-1">
                                                <span className="font-medium capitalize text-gray-800">{key}:</span>
                                                <span className="text-gray-700 text-right">{value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>,
            document.body
        );
    }

    return createPortal(
        <div className="fixed top-0 left-0 w-full h-screen bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold mb-4">Məhsulu Güncəllə</h2>
                    <button onClick={setToggleProd}>
                        <X color="#cf2020" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Məhsul Adı</label>
                        <input
                            {...register('name')}
                            type="text"
                            className="mt-1 block w-full rounded-md p-1 outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Məhsul Adı"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Təsvir</label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            className="mt-1 block w-full rounded-md p-1 outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Məhsul təsviri"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Qiymət (₼)</label>
                            <input
                                {...register('price')}
                                type="text"
                                className="mt-1 block w-full rounded-md p-1 outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Qiymət"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 w-64 h-48 bg-gray-50 hover:border-blue-500 transition">
                            <label htmlFor="imageUpload" className="cursor-pointer text-sm text-gray-500 hover:text-blue-600 transition text-center">
                                📁 Şəkil yüklə <br />
                                <span className="text-xs text-gray-400">(bir neçə şəkil seçə bilərsiniz)</span>
                            </label>
                            <input
                                id="imageUpload"
                                type="file"
                                multiple
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="flex flex-wrap gap-3 items-start">
                            {selectedImages.map((file, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(file)}
                                    alt={`selected-${index}`}
                                    className="w-24 h-24 object-cover rounded border border-gray-300"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="credit"
                            {...register('credit_available')}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label htmlFor="credit" className="text-sm text-gray-700">Kreditlə satış mövcuddur</label>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            onClick={setToggleProd}
                        >
                            Ləğv et
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Yadda saxla
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};
