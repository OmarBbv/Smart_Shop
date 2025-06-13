export interface ProductSeriveType {
    id: number;
    name: string;
    price: string;
    categoryId: number;
    images: string[];
    description: string;
    credit_available: boolean;
    features: Record<string, any>;
    createdAt: string;
    updatedAt: string;
    category: {
        name: string;
    };
}

export interface ProductResponse {
    success: boolean;
    message: string;
    data: ProductSeriveType[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}
