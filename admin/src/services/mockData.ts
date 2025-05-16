import { User, Product, Category, MetricData, AreaChartData, PieChartData } from '../types';
import { 
  Users, 
  ShoppingCart, 
  BarChart, 
  Tags,
  TrendingUp,
  DollarSign,
  Package
} from 'lucide-react';

// Generate random dates within the last 2 years
const randomDate = (start = new Date(2023, 0, 1), end = new Date()) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

// Generate random avatar URLs
const randomAvatar = (id: string) => {
  return `https://i.pravatar.cc/150?u=${id}`;
};

// Sample product images from Pexels
const productImages = [
  'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
  'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg',
  'https://images.pexels.com/photos/1742370/pexels-photo-1742370.jpeg',
  'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
  'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg',
  'https://images.pexels.com/photos/4443335/pexels-photo-4443335.jpeg',
];

// Mock Users Data
export const users: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 10 === 0 ? 'admin' : i % 5 === 0 ? 'editor' : 'user',
  status: i % 7 === 0 ? 'inactive' : i % 13 === 0 ? 'pending' : 'active',
  avatar: randomAvatar(`user-${i + 1}`),
  createdAt: randomDate(),
  lastLogin: randomDate(),
}));

// Mock Categories Data with hierarchy
export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Electronics',
    description: 'Electronic devices and gadgets',
    parentId: null,
    slug: 'electronics',
    productCount: 12,
    createdAt: randomDate(),
  },
  {
    id: 'cat-2',
    name: 'Computers',
    description: 'Desktop and laptop computers',
    parentId: 'cat-1',
    slug: 'computers',
    productCount: 5,
    createdAt: randomDate(),
  },
  {
    id: 'cat-3',
    name: 'Smartphones',
    description: 'Mobile phones and accessories',
    parentId: 'cat-1',
    slug: 'smartphones',
    productCount: 7,
    createdAt: randomDate(),
  },
  {
    id: 'cat-4',
    name: 'Clothing',
    description: 'Apparel and fashion items',
    parentId: null,
    slug: 'clothing',
    productCount: 15,
    createdAt: randomDate(),
  },
  {
    id: 'cat-5',
    name: 'Men\'s Clothing',
    description: 'Clothing for men',
    parentId: 'cat-4',
    slug: 'mens-clothing',
    productCount: 8,
    createdAt: randomDate(),
  },
  {
    id: 'cat-6',
    name: 'Women\'s Clothing',
    description: 'Clothing for women',
    parentId: 'cat-4',
    slug: 'womens-clothing',
    productCount: 7,
    createdAt: randomDate(),
  },
  {
    id: 'cat-7',
    name: 'Home & Kitchen',
    description: 'Home appliances and kitchen products',
    parentId: null,
    slug: 'home-kitchen',
    productCount: 9,
    createdAt: randomDate(),
  },
  {
    id: 'cat-8',
    name: 'Books',
    description: 'Books and publications',
    parentId: null,
    slug: 'books',
    productCount: 14,
    createdAt: randomDate(),
  },
];

// Mock Products Data
export const products: Product[] = Array.from({ length: 50 }, (_, i) => {
  const categoryIndex = Math.floor(Math.random() * categories.length);
  const productCategory = categories[categoryIndex];
  
  return {
    id: `prod-${i + 1}`,
    name: `Product ${i + 1}`,
    description: `This is the description for Product ${i + 1}. It's a great product with many features.`,
    price: Math.floor(Math.random() * 1000) + 10,
    stock: Math.floor(Math.random() * 100),
    category: productCategory.id,
    images: [
      productImages[Math.floor(Math.random() * productImages.length)],
      productImages[Math.floor(Math.random() * productImages.length)],
    ],
    featured: i % 5 === 0,
    rating: Math.floor(Math.random() * 5) + 1,
    createdAt: randomDate(),
    updatedAt: randomDate(),
  };
});

// Mock Metrics Data
export const metricsData: MetricData[] = [
  {
    title: 'Total Users',
    value: users.length,
    change: 12.5,
    icon: 'Users',
  },
  {
    title: 'Total Products',
    value: products.length,
    change: 8.2,
    icon: 'Package',
  },
  {
    title: 'Categories',
    value: categories.length,
    change: 5.1,
    icon: 'Tags',
  },
  {
    title: 'Revenue',
    value: 24500,
    change: 15.3,
    icon: 'DollarSign',
  },
];

// Mock Area Chart Data (7 days)
export const areaChartData: AreaChartData[] = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (6 - i));
  
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    users: Math.floor(Math.random() * 50) + 50,
    products: Math.floor(Math.random() * 20) + 10,
    orders: Math.floor(Math.random() * 30) + 20,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  };
});

// Mock Pie Chart Data for Categories
export const categoriesPieData: PieChartData[] = categories
  .filter(category => category.parentId === null)
  .map(category => ({
    name: category.name,
    value: category.productCount,
  }));

// Mock data for metrics icons
export const getMetricIcon = (iconName: string) => {
  switch (iconName) {
    case 'Users':
      return Users;
    case 'Package':
      return Package;
    case 'Tags':
      return Tags;
    case 'DollarSign':
      return DollarSign;
    case 'TrendingUp':
      return TrendingUp;
    case 'BarChart':
      return BarChart;
    case 'ShoppingCart':
      return ShoppingCart;
    default:
      return BarChart;
  }
};