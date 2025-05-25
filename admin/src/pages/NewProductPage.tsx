import { Error } from "@/components/error";
import { Loading } from "@/components/loading";
import { Box } from "@/components/ui/Box";
import { categoryService } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "@/components/ui/Typography";
import { Camera } from "lucide-react";
import { CustomButton } from "@/components/ui/CustomButton";
import Modal from 'react-modal';
import { useState } from "react";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '650px',
        height: '540px',
    },
};

Modal.setAppElement('#root');

export default function NewProductPage() {

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(prev => !prev);
    }

    const { data: allCategory, isLoading, isError } = useQuery({
        queryKey: ["/all-category"],
        queryFn: () => categoryService.getAllCategory(),
    });

    console.log(allCategory)

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
                        type="button" className="rounded border border-gray-400 px-2 py-2 font-medium leading-3 cursor-pointer">
                        Seçmək
                    </CustomButton>
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
                <h2>Hello</h2>
                <button onClick={openModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
        </Box>
    );
}

