import { useReducer, useMemo } from 'react';
import { FilterState, FilterAction, Product } from '@/types/productTypes';

const initialState: FilterState = {
  categories: [],
  priceRange: { min: 0, max: 50000 },
  brands: [],
  rating: null,
  sortBy: null,
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    case 'SET_BRANDS':
      return { ...state, brands: action.payload };
    case 'SET_RATING':
      return { ...state, rating: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'RESET_FILTERS':
      return initialState;
    default:
      return state;
  }
}

export function useProductFilter(products: Product[]) {
  const [filter, dispatch] = useReducer(filterReducer, initialState);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Kategori filtresi
      if (
        filter.categories.length > 0 &&
        !filter.categories.includes(product.category)
      ) {
        return false;
      }

      // Fiyat aralığı filtresi
      const price = product.discountPrice || product.price;
      if (price < filter.priceRange.min || price > filter.priceRange.max) {
        return false;
      }

      // Marka filtresi
      if (filter.brands.length > 0 && !filter.brands.includes(product.brand)) {
        return false;
      }

      // Puanlama filtresi
      if (filter.rating !== null && product.rating < filter.rating) {
        return false;
      }

      return true;
    });
  }, [products, filter]);

  const sortedProducts = useMemo(() => {
    if (!filter.sortBy) {
      return filteredProducts;
    }

    return [...filteredProducts].sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      switch (filter.sortBy) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          // Bu örnekte ürünlerde tarih alanı yok, bu yüzden yeni mi değil mi kontrolü yapıyoruz
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        default:
          return 0;
      }
    });
  }, [filteredProducts, filter.sortBy]);

  return {
    filter,
    dispatch,
    filteredProducts: sortedProducts,
    totalProducts: sortedProducts.length,
  };
}
