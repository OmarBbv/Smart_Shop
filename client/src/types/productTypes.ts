export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  subcategory?: string;
  imageUrl: string;
  rating: number;
  stock: number;
  brand: string;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  colors?: string[];
  sizes?: string[];
}

export interface FilterState {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  brands: string[];
  rating: number | null;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | null;
}

export type FilterAction =
  | { type: 'SET_CATEGORIES'; payload: string[] }
  | { type: 'SET_PRICE_RANGE'; payload: { min: number; max: number } }
  | { type: 'SET_BRANDS'; payload: string[] }
  | { type: 'SET_RATING'; payload: number | null }
  | {
      type: 'SET_SORT_BY';
      payload: 'price-asc' | 'price-desc' | 'rating' | 'newest' | null;
    }
  | { type: 'RESET_FILTERS' };
