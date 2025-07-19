import { useState } from 'react';
import { BannerImage } from './BannerImage';
import { useQuery } from '@tanstack/react-query';
import { heroService } from '@/services/hero-service';
import { LoadingOrError } from '@/components/Loading';

export default function HeroBanner() {
  const {
    data: heroData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['get/hero'],
    queryFn: () => heroService.getAllHero(),
  });

  const staticHeroData = [
    {
      product: {
        images: ['https://via.placeholder.com/600x300?text=Banner+1'],
      },
    },
    {
      product: {
        images: ['https://via.placeholder.com/600x300?text=Banner+2'],
      },
    },
  ];

  const bannerProductImages = (
    heroData?.length ? heroData : staticHeroData
  ).map((h) => h.product.images);

  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1);

  if (isLoading) return <LoadingOrError isLoading={isLoading} />;
  if (isError) return <LoadingOrError error={(error as Error).message} />;

  return (
    <div className="relative overflow-hidden flex gap-10">
      <div className="flex flex-1 h-[300px]">
        <BannerImage
          bannerProductImages={bannerProductImages?.[0]}
          currentIndex={leftIndex}
          setCurrentIndex={setLeftIndex}
        />
      </div>
      <div className="hidden lg:flex flex-1 h-[300px]">
        <BannerImage
          bannerProductImages={bannerProductImages?.[1]}
          currentIndex={rightIndex}
          setCurrentIndex={setRightIndex}
        />
      </div>
    </div>
  );
}
