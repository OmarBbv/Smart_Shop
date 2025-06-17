import { httpClient } from "@/config/httpClient";
import { ProductResponse, ProductServiceType } from "@/types/productServiceType";
import toast from "react-hot-toast";

interface InitialValue {
    minPrice: string;
    maxPrice: string;
}

interface ProductTypes {
    getAllProducts: (page?: number, pr?: InitialValue) => Promise<ProductResponse>;
    getProduct: (id: string) => Promise<ProductServiceType>;
    getProductsForCategoryAndSubcategories: (args: { slug: string; pr: InitialValue, page: number }) => Promise<ProductServiceType[]>;
}

class ProductService implements ProductTypes {
    async getAllProducts(page: number = 1, pr?: InitialValue): Promise<ProductResponse> {
        try {
            const params: Record<string, any> = {};
            params.page = page;

            if (pr) {
                if (pr.minPrice) {
                    params.minPrice = pr.minPrice;
                }
                if (pr.maxPrice) {
                    params.maxPrice = pr.maxPrice;
                }
            }

            const res = await httpClient.get('products', { params });
            return res.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw new Error("Üzr istəyirik, məhsulları gətirə bilmədik. Xahiş edirik, internet bağlantınızı yoxlayın və yenidən cəhd edin.");
        }
    };

    async getProduct(id: string): Promise<ProductServiceType> {
        try {
            const res = await httpClient.get(`products/${id}`,)
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

    async getProductsForCategoryAndSubcategories({ slug, pr, page = 1 }: { slug: string; pr: InitialValue, page: number }) {
        const params = {
            ...pr,
            page: page,
        };

        try {
            const res = await httpClient.get(`/categories/${slug}/products`, { params });
            return res.data;
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                'Beklenmeyen bir hata oluştu.';
            toast.error(errorMessage);
        }
    }
}

export const productService = new ProductService();