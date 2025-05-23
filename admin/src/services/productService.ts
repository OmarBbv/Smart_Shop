import httpClient from "@/config/apiConfig";
import { Datum, ProductType } from "@/types/productTypes";

interface ProductServiceInterface {
    getAllProducts(): Promise<ProductType>;
    getProductById(id: string): Promise<Datum>
}

class ProductService implements ProductServiceInterface {

    //? @desc Fetch all products from the server
    async getAllProducts(): Promise<ProductType> {
        try {
            const res = await httpClient.get('/products');
            return res.data;
        } catch (error) {
            console.error('Failed to fetch all products:', error);
            throw error;
        }
    }

    //? @desc Fetch a single product by its ID
    async getProductById(id: string): Promise<Datum> {
        try {
            const res = await httpClient.get(`/products/${id}`);
            return res.data.data;
        } catch (error) {
            console.error(`Failed to fetch product with ID ${id}:`, error);
            throw error;
        }
    }

}

export const productService = new ProductService();