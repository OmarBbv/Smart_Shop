export interface ProductFeature {
    [key: string]: string;
}

export interface Product {
    id: number;
    name: string;
    price: string;
    categoryId: number;
    images: string[];
    description: string;
    credit_available: boolean;
    features: ProductFeature;
    createdAt: string;
    updatedAt: string;
}

export interface BannerProduct {
    id: number;
    description: string;
    productId: number;
    createdAt: string;
    updatedAt: string;
    product: Product;
}

export interface BannerProductResponse {
    success: boolean;
    message: string;
    data: BannerProduct[];
}
