import { useState } from 'react';
import { FilterState, FilterAction } from '@/types/productTypes';
import { brands, categories, subcategories } from '@/data/productData';

interface ProductFilterProps {
  filter: FilterState;
  dispatch: React.Dispatch<FilterAction>;
  isMobile: boolean;
  setMobileFilterOpen?: (open: boolean) => void;
}

export default function ProductFilter({
  filter,
  dispatch,
  isMobile,
  setMobileFilterOpen,
}: ProductFilterProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    brands: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = filter.categories.includes(category)
      ? filter.categories.filter((c) => c !== category)
      : [...filter.categories, category];

    dispatch({ type: 'SET_CATEGORIES', payload: newCategories });
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filter.brands.includes(brand)
      ? filter.brands.filter((b) => b !== brand)
      : [...filter.brands, brand];

    dispatch({ type: 'SET_BRANDS', payload: newBrands });
  };

  const handlePriceChange = (min: number, max: number) => {
    dispatch({ type: 'SET_PRICE_RANGE', payload: { min, max } });
  };

  const handleRatingChange = (rating: number) => {
    dispatch({
      type: 'SET_RATING',
      payload: rating === filter.rating ? null : rating,
    });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const handleCloseMobileFilter = () => {
    setMobileFilterOpen && setMobileFilterOpen(false);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-100 ${
        isMobile ? 'p-4' : 'p-5 sticky top-24'
      }`}
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clipRule="evenodd"
            />
          </svg>
          Filtreler
        </h2>
        <button
          onClick={handleReset}
          className="text-blue-600 text-sm hover:underline flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Temizle
        </button>
        {isMobile && (
          <button
            onClick={handleCloseMobileFilter}
            className="text-gray-500 hover:text-gray-800 ml-2"
          >
            ✕
          </button>
        )}
      </div>

      {/* Kategoriler */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer mb-3 pb-2 border-b border-gray-100"
          onClick={() => toggleSection('categories')}
        >
          <h3 className="font-semibold text-gray-700 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            Kategoriler
          </h3>
          <span className="text-blue-500">
            {expandedSections.categories ? '−' : '+'}
          </span>
        </div>

        {expandedSections.categories && (
          <div className="space-y-2 ml-2">
            {categories.map((category) => (
              <div key={category} className="mb-3">
                <label className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors">
                  <input
                    type="checkbox"
                    checked={filter.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="select-none">{category}</span>
                </label>

                {filter.categories.includes(category) &&
                  subcategories[category as keyof typeof subcategories] && (
                    <div className="ml-6 mt-2 space-y-2 pl-2 border-l-2 border-blue-100">
                      {subcategories[
                        category as keyof typeof subcategories
                      ].map((subcategory: string) => (
                        <label
                          key={subcategory}
                          className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-3.5 w-3.5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm select-none">
                            {subcategory}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fiyat Aralığı */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer mb-3 pb-2 border-b border-gray-100"
          onClick={() => toggleSection('price')}
        >
          <h3 className="font-semibold text-gray-700 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                clipRule="evenodd"
              />
            </svg>
            Fiyat Aralığı
          </h3>
          <span className="text-blue-500">
            {expandedSections.price ? '−' : '+'}
          </span>
        </div>

        {expandedSections.price && (
          <div className="space-y-4 ml-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={filter.priceRange.min}
                onChange={(e) =>
                  handlePriceChange(
                    Number(e.target.value),
                    filter.priceRange.max
                  )
                }
                className="w-24 border rounded p-1.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
              <span>-</span>
              <input
                type="number"
                value={filter.priceRange.max}
                onChange={(e) =>
                  handlePriceChange(
                    filter.priceRange.min,
                    Number(e.target.value)
                  )
                }
                className="w-24 border rounded p-1.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                min={filter.priceRange.min}
              />
              <span className="font-medium text-gray-700">₺</span>
            </div>

            <div className="px-1">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>0₺</span>
                <span>25.000₺</span>
                <span>50.000₺</span>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                value={filter.priceRange.max}
                onChange={(e) =>
                  handlePriceChange(
                    filter.priceRange.min,
                    Number(e.target.value)
                  )
                }
                className="w-full accent-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Markalar */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer mb-3 pb-2 border-b border-gray-100"
          onClick={() => toggleSection('brands')}
        >
          <h3 className="font-semibold text-gray-700 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                clipRule="evenodd"
              />
              <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
            </svg>
            Markalar
          </h3>
          <span className="text-blue-500">
            {expandedSections.brands ? '−' : '+'}
          </span>
        </div>

        {expandedSections.brands && (
          <div className="space-y-2 ml-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filter.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="select-none">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Değerlendirme */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer mb-3 pb-2 border-b border-gray-100"
          onClick={() => toggleSection('rating')}
        >
          <h3 className="font-semibold text-gray-700 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Değerlendirme
          </h3>
          <span className="text-blue-500">
            {expandedSections.rating ? '−' : '+'}
          </span>
        </div>

        {expandedSections.rating && (
          <div className="space-y-2 ml-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className={`flex items-center space-x-2 cursor-pointer p-1.5 rounded-md transition-colors ${
                  filter.rating === rating
                    ? 'bg-blue-50 border-blue-100 border'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleRatingChange(rating)}
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < rating ? 'text-yellow-400' : 'text-gray-300'
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm">
                  {rating === 5 ? 've üzeri' : `${rating} ve üzeri`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
