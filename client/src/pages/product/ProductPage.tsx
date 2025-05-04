import { useState, useEffect } from 'react';
import { products } from '@/data/productData';
import { useProductFilter } from '@/hooks/useProductFilter';
import ProductFilter from '@/components/ui/product/ProductFilter';
import ProductGrid from '@/components/ui/product/ProductGrid';
import ProductSorting from '@/components/ui/product/ProductSorting';

export default function ProductPage() {
  const { filter, dispatch, filteredProducts, totalProducts } =
    useProductFilter(products);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sayfa yüklendiğinde yükleme efekti için
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center lg:text-left">
        Ürünlerimiz
      </h1>

      {/* Mobil filtre açma butonu */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          Filtreleri Göster
        </button>
      </div>

      {/* Mobil filtre paneli */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="bg-white h-full w-4/5 max-w-md p-4 overflow-y-auto">
            <ProductFilter
              filter={filter}
              dispatch={dispatch}
              isMobile={true}
              setMobileFilterOpen={setMobileFilterOpen}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sol taraf - Filtreleme (Masaüstü) */}
        <div className="hidden lg:block lg:w-64 flex-shrink-0">
          <ProductFilter filter={filter} dispatch={dispatch} isMobile={false} />
        </div>

        {/* Sağ taraf - Ürünler */}
        <div className="flex-grow">
          <ProductSorting
            totalProducts={totalProducts}
            sortBy={filter.sortBy}
            dispatch={dispatch}
          />

          <ProductGrid products={filteredProducts} loading={loading} />

          {filteredProducts.length > 0 && (
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200">
                <button className="px-4 py-2 border-r border-gray-200 text-gray-500 hover:text-blue-600">
                  &laquo; Önceki
                </button>
                <button className="px-3 py-2 text-blue-600 font-medium">
                  1
                </button>
                <button className="px-3 py-2 text-gray-500 hover:text-blue-600">
                  2
                </button>
                <button className="px-3 py-2 text-gray-500 hover:text-blue-600">
                  3
                </button>
                <button className="px-4 py-2 border-l border-gray-200 text-gray-500 hover:text-blue-600">
                  Sonraki &raquo;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
