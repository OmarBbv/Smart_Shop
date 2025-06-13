export interface WishListResponse {
    message: string;
    wishlistItems: WishlistItem[];
}
interface WishlistItem {
    id: number;
    userId: string;
    productId: number;
    createdAt: string;
    updatedAt: string;
    product: Product;
}
interface Product {
    id: number;
    name: string;
    price: string;
    images: string[];
}

// get all wishlist
export interface AllWishlistRepsonse {
    message: string,
    wishlistItems: WishlistItems[]
}
export interface WishlistItems {
    id: number;
    userId: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
    product: WishProd;
}

export interface WishProd {
    id: number;
    name: string;
    price: string;
    images: string[];
    description: string;
}
