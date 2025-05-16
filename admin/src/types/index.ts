export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
  createdAt: string;
  lastLogin: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  featured: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  slug: string;
  productCount: number;
  createdAt: string;
}

export interface MetricData {
  title: string;
  value: number;
  change: number;
  icon: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface PieChartData {
  name: string;
  value: number;
}

export interface AreaChartData {
  date: string;
  users?: number;
  products?: number;
  orders?: number;
  revenue?: number;
}

export interface FormattedUser extends User {
  formattedDate: string;
  lastLoginFormatted: string;
}

export interface FormattedProduct extends Product {
  formattedPrice: string;
  formattedDate: string;
}

export interface FormattedCategory extends Category {
  formattedDate: string;
}