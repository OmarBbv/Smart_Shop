import httpClient from "@/config/apiConfig";
import { Post } from "@/stores/productPostStore";
import { Datum, ProductType, UpdateServiceType } from "@/types/productTypes";

interface ProductServiceInterface {
    getAllProducts(): Promise<ProductType>;
    getProductById(id: string): Promise<Datum>
    getCreateProduct(data: Post): void;
    removeProduct(id: string): Promise<void>;
    updateProduct(id: number, data: UpdateServiceType): Promise<void>
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

    //? @desc Sends a request to create a new product with the given data
    async getCreateProduct(data: Post): Promise<void> {
        const { categoryId, description, features, images, name, price } = data

        console.log('data', data)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('categoryId', categoryId?.toString() ?? '');
        formData.append('features', JSON.stringify(features));

        formData.append('price', price?.toString() ?? '')
        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            await httpClient.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message || "Bilinməyən xəta baş verdi");
            }
            throw new Error("Bilinməyən xəta baş verdi");
        }
    }

    //? @desc Deletes the specified product by its ID
    async removeProduct(id: string): Promise<void> {
        try {
            const res = await httpClient.delete(`/products/${id}`)
            console.log(res.data);
            return res.data
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message || "Bilinməyən xəta baş verdi");
            }
            throw new Error("Bilinməyən xəta baş verdi");
        }
    }

    //? @desc Updates the specified product by its ID with the provided data
    async updateProduct(id: number, data: UpdateServiceType): Promise<void> {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('credit_available', data.credit_available.toString());

        data.images?.forEach(img => {
            formData.append('images', img);
        })

        await httpClient.put(
            `/products/${id}`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
    }
}

export const productService = new ProductService();