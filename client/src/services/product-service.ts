import { httpClient } from "@/config/httpClient";
import { ProductResponse, ProductSeriveType } from "@/types/productServiceType";
import toast from "react-hot-toast";

interface ProductTypes {
    getAllProducts: () => Promise<ProductResponse>;
    getProduct: (id: string) => Promise<ProductSeriveType>;
}

class ProductService implements ProductTypes {
    async getAllProducts(): Promise<ProductResponse> {
        try {
            const res = await httpClient.get('products');
            console.log(res.data);
            return res.data
        } catch (error) {
            console.error("Error fetching products:", error);
            throw new Error("Failed to fetch products");
        }
    };
    async getProduct(id: string): Promise<ProductSeriveType> {
        try {
            const res = await httpClient.get(`products/${id}`,)
            console.log(res.data)
            return res.data.data
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                'Beklenmeyen bir hata oluştu.';
            toast.error(errorMessage);
            throw new Error(error)
        }
    }

}

export const productService = new ProductService();