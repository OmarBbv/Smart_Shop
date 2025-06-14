export interface CategoryTypes {
    id: number;
    name: string;
    slug: string;
    parentId?: any;
    createdAt: string;
    updatedAt: string;
    subcategories: Subcategory2[];
}
export interface Subcategory2 {
    id: number;
    name: string;
    slug: string;
    parentId: number;
    createdAt: string;
    updatedAt: string;
    subcategories: Subcategory[][];
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