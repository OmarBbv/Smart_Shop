import { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const BANNER_IMAGES = [
  'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1601944179066-29786cb9d32a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
];

export default function HeroBanner() {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
      setRightIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden flex gap-10">
      <div className="flex flex-1 max-h-[300px]">
        <BannerImage
          images={BANNER_IMAGES}
          currentIndex={leftIndex}
          setCurrentIndex={setLeftIndex}
        />
      </div>
      <div className="hidden lg:flex flex-1 max-h-[300px]">
        <BannerImage
          images={BANNER_IMAGES}
          currentIndex={rightIndex}
          setCurrentIndex={setRightIndex}
        />
      </div>
    </div>
  );
}

function BannerImage({
  images,
  currentIndex,
  setCurrentIndex,
}: {
  images: string[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    console.log('clicked next', currentIndex);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    console.log('clicked prev', currentIndex);
  };

  return (
    <div className="relative flex flex-1 rounded-2xl overflow-hidden select-none">
      <div
        onClick={prev}
        className="cursor-pointer  absolute left-4 top-1/2 -translate-y-1/2 z-30 p-1 w-8 h-8 bg-white rounded-full hidden lg:flex justify-center items-center"
      >
        <FiArrowLeft
          size={16}
          className="hidden lg:inline-block  cursor-pointer"
        />
      </div>
      <div
        onClick={next}
        className="cursor-pointer  absolute right-4 top-1/2 -translate-y-1/2 z-30 p-1 w-8 h-8 bg-white rounded-full hidden lg:flex justify-center items-center"
      >
        <FiArrowRight
          size={16}
          className="hidden lg:inline-block  cursor-pointer"
        />
      </div>

      <div className="w-full h-full overflow-hidden relative">
        <div
          className="flex transition-all duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover shrink-0"
            />
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white lg:text-3xl font-bold z-20">
        Welcome to Our Website
      </div>

      <ul className="absolute bottom-4 left-1/2 -translate-x-1/2 gap-3 z-20 flex items-center">
        {images.map((_, index) => {
          return (
            <li
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full cursor-pointer ${currentIndex === index ? 'bg-red-500' : 'bg-gray-100'
                }`}
            />
          );
        })}
      </ul>
    </div>
  );
}
