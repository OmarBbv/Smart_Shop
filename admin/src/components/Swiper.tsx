// Swiper.tsx
import { cn } from '@/lib/utils';
import { useImageSelectionStore } from '@/stores/imageSelectStore';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useShallow } from 'zustand/shallow';

interface Props {
    images?: string[];
}

const CustomSwiper = ({ images }: Props) => {
    const { selectedIndex, setSelectedIndex } = useImageSelectionStore(
        useShallow((state) => ({
            selectedIndex: state.selectedIndex,
            setSelectedIndex: state.setSelectedIndex,
        }))
    )

    return (
        <Swiper
            spaceBetween={12}
            slidesPerView="auto"
            freeMode={true}
            className="px-4"
        >
            {images?.map((url, index) => (
                <SwiperSlide
                    key={index}
                    style={{ width: 80 }}
                    className={cn(`!h-auto border-2 border-gray-300 p-2 overflow-hidden rounded-md cursor-pointer`,
                        selectedIndex === index && 'border-blue-500'
                    )}
                >
                    <div
                        onClick={() => setSelectedIndex(index)}
                        className={`w-full h-full rounded-sm overflow-hidden`}>
                        <img
                            src={url}
                            alt={`slide-${index}`}
                            className="w-full h-full object-cover select-none"
                        />
                    </div>
                </SwiperSlide>
            ))
            }
        </Swiper >
    );
};

export default CustomSwiper;
