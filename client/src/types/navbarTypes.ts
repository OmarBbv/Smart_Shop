export type SubCategory = {
  id: number;
  name: string;
  href: string;
  subCategories?: SubCategory[];
};

export type Category = {
  id: number;
  name: string;
  href: string;
  icon: React.ReactNode;
  subCategories?: SubCategory[];
};
