export interface CategoryType {
    id: number;
    name: string;
    slug: string;
    parentId?: any;
    createdAt: string;
    updatedAt: string;
    subcategories: (Subcategory2 | Subcategory)[];
}

export interface Subcategory2 {
    id: number;
    name: string;
    slug: string;
    parentId: number;
    createdAt: string;
    updatedAt: string;
    subcategories: Subcategory[];
}

export interface Subcategory {
    id: number;
    name: string;
    slug: string;
    parentId: number;
    createdAt: string;
    updatedAt: string;
    subcategories: any[];
}

export interface SelectedCategoryType extends CategoryType {
    fullPath?: string;
}


export type SelectedCategory = (CategoryType | Subcategory2 | Subcategory) & {
    fullPath?: string;
};