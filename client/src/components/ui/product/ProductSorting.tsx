import React from 'react';
import { FilterAction } from '@/types/productTypes';

interface ProductSortingProps {
  totalProducts: number;
  sortBy: string | null;
  dispatch: React.Dispatch<FilterAction>;
}

export default function ProductSorting({
  totalProducts,
  sortBy,
  dispatch,
}: ProductSortingProps) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as
      | 'price-asc'
      | 'price-desc'
      | 'rating'
      | 'newest'
      | null;
    dispatch({ type: 'SET_SORT_BY', payload: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center mb-6">
      <div className="mb-3 sm:mb-0 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-blue-500 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
        <p className="text-gray-700">
          <span className="font-semibold text-blue-600">{totalProducts}</span>{' '}
          ürün bulundu
        </p>
      </div>

      <div className="flex items-center rounded-md overflow-hidden border border-gray-200 divide-x divide-gray-200">
        <label
          htmlFor="sort"
          className="px-3 py-2 bg-gray-50 text-gray-700 text-sm whitespace-nowrap"
        >
          Sırala:
        </label>
        <select
          id="sort"
          value={sortBy || ''}
          onChange={handleSortChange}
          className="border-none py-2 pl-3 pr-8 text-gray-700 focus:outline-none focus:ring-0 text-sm bg-white min-w-[140px]"
        >
          <option value="">Varsayılan</option>
          <option value="price-asc">Fiyat (Artan)</option>
          <option value="price-desc">Fiyat (Azalan)</option>
          <option value="rating">Puanlama</option>
          <option value="newest">En Yeni</option>
        </select>
      </div>
    </div>
  );
}
