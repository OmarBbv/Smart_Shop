import { Error } from "@/components/error";
import { Loading } from "@/components/loading";
import { Box } from "@/components/ui/Box";
import { categoryService } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "@/components/ui/Typography";
import { Camera, X } from "lucide-react";
import { CustomButton } from "@/components/ui/CustomButton";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { CustomField } from "@/components/CustomField";
import { RenderCategory } from "@/components/new_products/RenderCategory";
import TemplatesConfig from "@/components/templates/TemplatesConfig";

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
    const [categoryPathUrl, setCategoryPathUrl] = useState<string[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [lastCat, setLastCat] = useState<any>(null);

    const { data: allCategory, isLoading, isError } = useQuery({
        queryKey: ["/all-category"],
        queryFn: () => categoryService.getAllCategory(),
    });

    useEffect(() => {
        const lastCategory = categoryPathUrl[categoryPathUrl.length - 1];
        if (lastCategory) setLastCat(lastCategory);
    }, [categoryPathUrl])

    useEffect(() => {
        console.log('lastCat', lastCat)
    }, [lastCat])

    function openModal() {
        setIsOpen(prev => {
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


    if (isLoading) return <Loading />;
    if (isError) return <Error />;

    return (
        <Box className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-white mt-12 border border-gray-200 rounded-2xl shadow-md max-w-full">
            <Typography component="h2" className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
                Yeni Məhsul əlavə et
            </Typography>

            <Box component="form" className="space-y-6 w-full">
                {/* Ad (name) */}
                {/* Məhsul Adı və Qiymət (yan yana) */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6">
                    {/* Məhsul Adı */}
                    <div className="flex-1 space-y-2">
                        <Typography>Məhsul Adı *</Typography>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
                            placeholder="Məhsulun adı"
                        />
                    </div>

                    {/* Qiymət */}
                    <div className="w-full sm:w-60 space-y-2 mt-4 sm:mt-0">
                        <Typography>Qiymət *</Typography>
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full outline-none"
                                placeholder="100.10"
                            />
                            <Typography className="text-sm font-medium">AZN</Typography>
                        </div>
                    </div>
                </div>


                {/* Şəkillər */}
                <div>
                    <Typography component="label" className="text-sm font-medium">
                        Şəkilləri yükləyin* (30 şəkilə qədər)
                    </Typography>
                    <Box className="flex flex-col sm:flex-row justify-between gap-4 mt-3">
                        <Box className="flex flex-col items-center justify-center gap-2 w-full sm:max-w-xs border-2 border-dashed border-gray-400 py-10 px-4 text-center rounded-md">
                            <Camera className="size-6 text-gray-600" />
                            <span className="font-medium text-sm">Fotoşəkil əlavə edin</span>
                            <span className="text-xs text-gray-500">Əsas şəkil axtarış nəticələrində əks olunacaq</span>
                        </Box>

                        <Box className="flex-1 border border-gray-300 rounded-md p-4 text-sm text-gray-600">
                            <span className="block mb-2 text-gray-700 font-semibold">Yönləndirmə</span>
                            Keyfiyyətli fotoşəkilləri olan elanlar daha tez satılır! Eyni anda bir neçə şəkil seçmək üçün Ctrl düyməsini sıxıb saxlayın.
                            1 elan = 1 məhsul, xidmət və ya vakansiya. Şəkilləri və təsviri nömrəsiz və linksiz yerləşdirin.
                        </Box>
                    </Box>
                </div>

                {/* Təsvir */}
                <div className="space-y-2">
                    <Typography>Təsvir *</Typography>
                    <textarea
                        className="w-full min-h-[100px] border border-gray-300 rounded-md p-3 text-sm resize-none outline-none"
                        placeholder="İdeal vəziyyətdə Samsung Galaxy S9 satıram. 1 il əvvəl alınıb. Satılma səbəbi: yeni telefon almaq istəyirəm"
                    />
                    <p className="text-end text-xs text-gray-500">0/6000</p>
                </div>

                {/* Kateqoriya */}
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
                        <div className="mt-2 flex flex-wrap gap-2">
                            {categoryPathUrl.map((name, i) => (
                                <span
                                    key={i}
                                    className="bg-gray-200 px-3 py-1 rounded-md text-sm font-medium"
                                >
                                    {name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </Box>

            {/* Modal */}
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
                            onChange={() => console.log("change input")}
                            name="category search"
                            value="name"
                        />
                    </Box>
                    <RenderCategory
                        data={allCategory!}
                        setCategoryName={setCategoryName}
                        setCategoryPathUrl={setCategoryPathUrl}
                        onLastCategorySelected={() => {
                            setIsOpen(false);
                            document.body.style.overflow = "";
                        }}
                    />
                </Box>
            </Modal>

            <TemplatesConfig selectedCategory={lastCat} />
        </Box>
    );

}
