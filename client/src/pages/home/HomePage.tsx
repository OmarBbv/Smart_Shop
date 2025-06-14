import {
  FiChevronRight,
} from 'react-icons/fi';
import HeroBanner from '@/components/ui/home/HeroBanner';
import { Link } from 'react-router-dom';
import { PRODUCT_CATEGORIES, } from '@/data/data';
import FeaturedProduct from '@/components/ui/home/FeaturedProduct';

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Banner Slider */}
      <HeroBanner />

      {/* Kategoriler */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Kategoriyalar</h2>
          <a
            href="#"
            className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm"
          >
            Daha çox <FiChevronRight />
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {PRODUCT_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden mb-3">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-sm md:text-base">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Öne Çıkan Ürünler */}
      <FeaturedProduct />

      {/* Avantajlar Bölümü */}
      {/* <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 flex items-center gap-4">
          <div className="bg-blue-500 p-3 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Ücretsiz Kargo</h3>
            <p className="text-sm text-gray-600">
              250 AZN üzeri tüm siparişlerde ücretsiz kargo
            </p>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-6 flex items-center gap-4">
          <div className="bg-green-500 p-3 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Güvenli Ödeme</h3>
            <p className="text-sm text-gray-600">
              256-bit SSL ile güvenli ödeme seçenekleri
            </p>
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 flex items-center gap-4">
          <div className="bg-purple-500 p-3 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">7/24 Destek</h3>
            <p className="text-sm text-gray-600">
              Her zaman yanınızda olan müşteri desteği
            </p>
          </div>
        </div>
      </section> */}

      {/* Alt Banner */}
      {/* <section className="relative rounded-2xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1588200908342-23b585c03e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
          alt="Kampanya"
          className="w-full h-[200px] md:h-[300px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
          <div className="text-white p-8 md:p-12 max-w-lg">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              YENI ÜRÜNLER İÇİN ÖZEL TEKLİFLER
            </h2>
            <p className="text-sm md:text-base mb-6">
              Yılbaşına özel kampanyaları kaçırmayın!
            </p>
            <button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 rounded-full flex items-center gap-2">
              Alışverişe Başla <FiArrowRight />
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
