import { Error } from "@/components/error";
import { Loading } from "@/components/loading";
import { Box } from "@/components/ui/Box";
import { categoryService } from "@/services/categoryService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Typography } from "@/components/ui/Typography";
import { Camera, X } from "lucide-react";
import { CustomButton } from "@/components/ui/CustomButton";
import Modal from 'react-modal';
import { useEffect, useRef, useState } from "react";
import { CustomField } from "@/components/ui/CustomField";
import { RenderCategory } from "@/components/new_products/RenderCategory";
import TemplatesConfig from "@/components/templates/TemplatesConfig";
import { usePostStore } from "@/stores/productPostStore";
import { useShallow } from "zustand/shallow";
import { productService } from "@/services/productService";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '650px',
        height: '500px',
        paddingTop: '0px'
    },
};

Modal.setAppElement('#root');

export default function NewProductPage() {
    const setCurrentPost = usePostStore(state => state.setCurrentPost);
    const [searchCat, setSearchCat] = useState('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const [categoryPathUrl, setCategoryPathUrl] = useState<string[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [lastCat, setLastCat] = useState<{ lastCategory: string, lastCatIndex: number | null }>({
        lastCategory: '',
        lastCatIndex: null
    });

    const { data: allCategory, isLoading, isError } = useQuery({
        queryKey: ["/all-category"],
        queryFn: () => categoryService.getAllCategory(),
    });

    function openModal() {
        setModalIsOpen(prev => {
            const nextState = !prev;
            document.body.style.overflow = nextState ? 'hidden' : '';
            if (nextState) {
                setCategoryPathUrl([]);
                setCategoryName("");
            } else {
                setCategoryPathUrl([]);
                setCategoryName("");
            }
            return nextState;
        });
    }

    const handleSearchCategory = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        setSearchCat(value);

        const searchCategory = allCategory?.filter(cat =>
            cat.name.toLowerCase().includes(value.toLowerCase()) ||
            cat.slug.toLowerCase().includes(value.toLowerCase())
        );

        return searchCategory
    }



    useEffect(() => {
        const last = categoryPathUrl[categoryPathUrl.length - 1];
        if (lastCat.lastCatIndex !== null && last) {
            setCurrentPost({
                name: last,
                categoryId: lastCat.lastCatIndex,
            });
        }


        setCurrentPost({ images: selectedImages })
    }, [lastCat, selectedImages]);

    useEffect(() => {
        const last = categoryPathUrl[categoryPathUrl.length - 1];
        const secondLast = categoryPathUrl[categoryPathUrl.length - 2];
        if (secondLast === "Mobil telefonlar" || secondLast === "Noutbuk və netbuklar") {
            if (secondLast) {
                setLastCat(prev => ({ ...prev, lastCategory: secondLast }));
            } else {
                setLastCat(prev => ({ ...prev, lastCategory: last }));
            }
        } else {
            setLastCat(prev => ({ ...prev, lastCategory: last }));
        }
    }, [categoryPathUrl]);


    if (isLoading) return <Loading />;
    if (isError) return <Error />;

    return (
        <Box className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-white mt-12 border border-gray-200 rounded-2xl shadow-md max-w-full">
            <Typography component="h2" className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
                Yeni Məhsul əlavə et
            </Typography>

            <Box component="form" className="space-y-6 w-full">
                <div>
                    <Typography component="label" className="text-sm font-medium">
                        Şəkilləri yükləyin* (10 şəkilə qədər)
                    </Typography>
                    <Box className="flex flex-col sm:flex-row justify-between gap-4 mt-3">
                        <Box
                            onClick={() => fileInputRef.current?.click()}
                            className="cursor-pointer flex flex-col items-center justify-center gap-2 w-full sm:max-w-xs border-2 border-dashed border-gray-400 py-10 px-4 text-center rounded-md"
                        >
                            <Camera className="size-6 text-gray-600" />
                            <span className="font-medium text-sm">Fotoşəkil əlavə edin</span>
                            <span className="text-xs text-gray-500">Əsas şəkil axtarış nəticələrində əks olunacaq</span>

                            {/* Gizli input */}
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                ref={fileInputRef}
                                onChange={(e) => {
                                    if (e.target.files) {
                                        setSelectedImages(Array.from(e.target.files));
                                    }
                                }}
                            />
                        </Box>

                        <Box className="max-w-sm flex flex-wrap">
                            {selectedImages.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {selectedImages.map((file, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(file)}
                                            alt={`selected-${index}`}
                                            className="w-20 h-20 object-cover rounded border"
                                        />
                                    ))}
                                </div>
                            )}
                        </Box>

                        <Box className="flex-1 border border-gray-300 rounded-md p-4 text-sm text-gray-600">
                            <span className="block mb-2 text-gray-700 font-semibold">Yönləndirmə</span>
                            Keyfiyyətli fotoşəkilləri olan elanlar daha tez satılır! Eyni anda bir neçə şəkil seçmək üçün Ctrl düyməsini sıxıb saxlayın.
                            1 elan = 1 məhsul, xidmət və ya vakansiya. Şəkilləri və təsviri nömrəsiz və linksiz yerləşdirin.
                        </Box>
                    </Box>
                </div>

                <div className="space-y-2">
                    <Typography>Təsvir *</Typography>
                    <textarea
                        onChange={(e) => setCurrentPost({ description: e.target.value })}
                        className="w-full min-h-[100px] border border-gray-300 rounded-md p-3 text-sm resize-none outline-none"
                        placeholder="İdeal vəziyyətdə Samsung Galaxy S9 satıram. 1 il əvvəl alınıb. Satılma səbəbi: yeni telefon almaq istəyirəm"
                    />
                    <p className="text-end text-xs text-gray-500">0/6000</p>
                </div>

                <div className="space-y-2">
                    <Typography>Kateqoriya *</Typography>
                    <CustomButton
                        onClick={openModal}
                        type="button"
                        className="border border-gray-400 rounded-md px-4 py-2 text-sm font-medium"
                    >
                        Seçmək
                    </CustomButton>
                    {categoryPathUrl.length > 0 && (
                        <div className="mt-2 flex flex-wrap items-center text-sm text-gray-600">
                            {categoryPathUrl.map((name, i) => (
                                <span key={i} className="flex items-center">
                                    <span className="font-medium">{name}</span>
                                    {i < categoryPathUrl.length - 1 && (
                                        <span className="mx-2 text-gray-400">{'>'}</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    )}

                </div>
            </Box>

            <Modal
                isOpen={modalIsOpen}
                contentLabel="Kateqoriya Seçimi"
                style={customStyles}
            >
                <Box className="flex flex-col gap-3">
                    <Box className="sticky top-0 left-0 w-full flex items-center justify-between bg-white z-40 py-4 border-b border-b-gray-200">
                        <div className="flex-1 text-center font-semibold text-lg">
                            {categoryName && categoryName.length > 0 ? categoryName : "Kateqoriya seçin"}
                        </div>
                        <CustomButton className="absolute right-4" onClick={openModal}>
                            <X />
                        </CustomButton>
                    </Box>
                    <Box className="mt-2">
                        <CustomField
                            type="search-input"
                            onChange={handleSearchCategory}
                            name="category search"
                            value={searchCat}
                        />


                    </Box>
                    <RenderCategory
                        data={allCategory!}
                        setLastCat={setLastCat}
                        setCategoryName={setCategoryName}
                        setCategoryPathUrl={setCategoryPathUrl}
                        onLastCategorySelected={() => {
                            setModalIsOpen(false);
                            document.body.style.overflow = "";
                        }}
                    />
                </Box>
            </Modal>

            <TemplatesConfig selectedCategory={lastCat} categoryPathUrl={categoryPathUrl} />

            <ProductShare />
        </Box>
    );

}

function ProductShare() {

    const { currentPost } = usePostStore(
        useShallow((s) => ({
            currentPost: s.currentPost
        }))
    );


    const { mutate } = useMutation({
        mutationKey: ['post/products'],
        mutationFn: async () => {
            if (currentPost.categoryId !== undefined) {
                return productService.getCreateProduct(currentPost)
            }
        },
        onSuccess: () => {
            alert('Mehsul gonderildi')
        },
        onError: () => {
            alert('mehsul gonderilmedi!')
        }
    })

    const handlePostProduct = () => {
        mutate();
    }

    return <Box className="mt-4">
        <CustomButton
            onClick={handlePostProduct}
            className="cursor-pointer bg-green-500 p-2 rounded-sm text-white text-sm"
        >
            Məhsulu Paylaş
        </CustomButton>
    </Box>
}