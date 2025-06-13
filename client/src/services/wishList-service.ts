import { httpClient } from "@/config/httpClient";
import { WishlistItems, WishListResponse } from "@/types/wishlistType";
import toast from "react-hot-toast";

interface WishlistServiceInterface {
    addItemToWishlist(id: number): Promise<WishListResponse>;
    removeItemFromWishlist(id: number): Promise<WishListResponse>;
    allWishlist(): Promise<WishlistItems[]>
}

class WishlistService implements WishlistServiceInterface {
    addItemToWishlist = async (id: number): Promise<any> => {
        try {
            const res = await httpClient.post(`wishlist/${id}`);
            return res.data;
        } catch (error: any) {
            const message = error?.response?.data?.message || "Server Xətası";
            toast.error(message);
            throw new Error(message);
        }
    };

    removeItemFromWishlist = async (id: number): Promise<any> => {
        try {
            const res = await httpClient.delete(`wishlist/${id}`);
            return res.data;
        } catch (error: any) {
            const message = error?.response?.data?.message || "Server Xətası";
            throw new Error(message);
        }
    }

    async allWishlist(): Promise<WishlistItems[]> {
        try {
            const res = await httpClient.get('/wishlist');
            return res.data.data;
        } catch (error: any) {
            const message = error?.response?.data?.message || "Server Xətası";
            throw new Error(message);
        }
    }


}

export const wishlistService = new WishlistService();
