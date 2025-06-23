import HeroBanner from '@/components/ui/home/HeroBanner';
import FeaturedProduct from '@/components/ui/home/FeaturedProduct';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HeroBanner />
      <FeaturedProduct />
    </div>
  );
}
