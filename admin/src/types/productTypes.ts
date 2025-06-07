export interface ProductType {
    success: boolean;
    message: string;
    data: Datum[];
    pagination: Pagination;
}
interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
}
export interface Datum {
    id: number;
    name: string;
    price: string;
    categoryId: number;
    images?: string[];
    features: Features;
    createdAt: string;
    updatedAt: string;
    category: Category;
    description: string;
    credit_available: boolean
}

export type DatumPost = Omit<Datum, 'id' | 'createdAt' | 'updatedAt' | 'category'>
interface Category {
    name: string;
}
export type Features = Record<string, string>

export interface UpdateServiceType {
    name: string,
    price: string,
    description: string,
    credit_available: boolean,
    images: (string | File)[]
}