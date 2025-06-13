import { httpClient } from "@/config/httpClient";
import { ProductResponse } from "@/types/productServiceType";

interface ProductTypes {
    getAllProducts: () => Promise<ProductResponse>;
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

}

export const productService = new ProductService();