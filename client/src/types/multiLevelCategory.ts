export interface Categories {
  id: number;
  name: string;
  slug: string;
  subcategories?: Categories[];
  parentId?: number;
}
