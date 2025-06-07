import httpClient from "@/config/apiConfig";
import { CategoryType } from "@/types/categoryTypes";

interface CategoryServiceType {
    getAllCategory(): Promise<CategoryType[]>;
}

class CategoryService implements CategoryServiceType {
    async getAllCategory(): Promise<CategoryType[]> {
        try {
            const res = await httpClient.get('/categories');
            return res.data
        } catch (error: any) {
            throw new Error(error);
        }
    }
}


export const categoryService = new CategoryService();