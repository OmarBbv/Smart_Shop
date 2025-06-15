import { httpClient } from "@/config/httpClient";
import { CategoryTypes } from "@/types/categoryTypes";

interface CategoryServiceType {
    getAllCategory(): Promise<CategoryTypes[]>;
}

class CategoryService implements CategoryServiceType {
    async getAllCategory(): Promise<CategoryTypes[]> {
        try {
            const res = await httpClient.get('/categories');
            return res.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}


export const categoriesService = new CategoryService();
