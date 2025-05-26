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
import { Templates } from "@/components/Templates";

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
    const [lastCat, setLastCat] = useState('');

    const { data: allCategory, isLoading, isError } = useQuery({
        queryKey: ["/all-category"],
        queryFn: () => categoryService.getAllCategory(),
    });

    useEffect(() => {
        console.log('categoryPathUrl', categoryPathUrl)
        const lastCategory = categoryPathUrl[categoryPathUrl.length - 2];
        setLastCat(lastCategory);
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
        <Box className="w-full p-6 sm:p-8 bg-white mt-12 border border-gray-200">
            <Typography component='h2' className="text-[26px] font-bold text-gray-800 mb-8">
                Yeni Məhsul əlavə et
            </Typography>

            <Box component='form' className="space-y-4 w-full">
                <Typography component='label' className="text-sm font-medium">Şəkilləri yükləyin* (30 şəkilə qədər)</Typography>
                <Box className="flex flex-1 justify-between mt-2">
                    <div className="flex gap-2">
                        <Box className="flex justify-center items-center gap-1 max-w-60 flex-col py-12 px-6 text-xs border border-dashed border-gray-400">
                            <Camera className="size-6" />
                            <span className="font-medium">Fotoşəkil əlavə edin</span>
                            <span className="text-center font-medium">Əsas şəkil axtarış nəticələrində əks olunacaq</span>
                        </Box>

                        <div>yanina sekiller gelecek</div>
                    </div>
                    <div className="border border-gray-400 max-w-60 p-2 rounded-sm flex flex-col gap-2">
                        <span>icon</span>
                        <Typography className="text-sm font-medium text-left">
                            Keyfiyyətli fotoşəkilləri olan elanlar daha tez satılır! Eyni anda bir neçə şəkil seçmək üçün Ctrl düyməsini sıxıb saxlayın
                            1 elan = 1 məhsul, xidmət və ya vakansiya. Şəkilləri və təsviri nömrəsiz və linksiz yerləşdirin
                        </Typography>
                    </div>
                </Box>

                <Box className="flex flex-col gap-2">
                    <Typography>Təsvir *</Typography>
                    <Box sx={{ width: 'clamp(200px, 30vw, 800px)' }} >
                        <textarea className="min-h-[100px] border w-full border-gray-300 outline-none p-2 resize-none rounded-sm tracking-wide"
                            placeholder="İdeal vəziyyətdə Samsung Galaxy S9 satıram. 1 il əvvəl alınıb. Satılma səbəbi: yeni telefon almaq istəyirəm"
                        />
                        <p className="text-end text-[11px] leading-3 font-medium text-gray-500">0/6000</p>
                    </Box>
                </Box>

                <Box className="space-y-2">
                    <Typography>Kateqoriya *</Typography>
                    <CustomButton
                        onClick={openModal}
                        type="button"
                        className="rounded border border-gray-400 px-2 py-2 font-medium leading-3 cursor-pointer"
                    >
                        Seçmək
                    </CustomButton>

                    {categoryPathUrl.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {categoryPathUrl.map((name, i) => (
                                <span
                                    key={i}
                                    className="bg-gray-200 px-2 py-1 rounded text-sm font-medium"
                                >
                                    {name}
                                </span>
                            ))}
                        </div>
                    )}
                </Box>


                <Box className="space-y-2">
                    <Typography>Qiymət *</Typography>
                    <Box className="flex gap-2 items-center">
                        <input type="text" className="border border-gray-300 rounded-sm outline-none p-2 min-w-60 text-sm font-medium" placeholder="100.10" />
                        <Typography className="font-medium" component='span'>AZN</Typography>
                    </Box>
                </Box>
            </Box>

            <Modal
                isOpen={modalIsOpen}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <Box className="flex flex-col gap-3">
                    <Box className="sticky top-0 left-0 w-full flex items-center justify-between bg-white z-40 py-4">
                        <div className="flex-1 flex justify-center">
                            <Typography className="text-center text-lg font-medium">
                                {categoryName && categoryName.length > 0 ? categoryName : 'Kateqoriya seçin'}
                            </Typography>

                        </div>
                        <CustomButton className="absolute right-4" onClick={openModal}>
                            <X />
                        </CustomButton>
                    </Box>
                    <Box className="mt-2">
                        <CustomField type="search-input" onChange={() => console.log('change input')} name="category search" value="name" />
                    </Box>
                    <RenderCategory
                        data={allCategory!}
                        setCategoryName={setCategoryName}
                        setCategoryPathUrl={setCategoryPathUrl}
                        onLastCategorySelected={() => {
                            setIsOpen(false);
                            document.body.style.overflow = '';
                        }}
                    />

                </Box>

            </Modal>

            <Templates temp="Mobil telefonlar" />
        </Box>
    );
}
