import MainLayout from "@/layouts/MainLayout";
import CategoryPage from "@/pages/CategoryPage";
import DashboardPage from "@/pages/DashboardPage";
import UserPage from "@/pages/UserPage";
import ProductPage from "@/pages/ProductPage";
import { createBrowserRouter } from "react-router-dom";
import ProductDetail from "@/pages/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "kategoriyalar",
        element: <CategoryPage />,
      },
      {
        path: "istifadeciler",
        element: <UserPage />,
      },
      {
        path: 'mehsullar',
        element: <ProductPage />
      },
      {
        path: 'mehsullar/:id', // Yeni route
        element: <ProductDetail />
      }
    ],
  },
]);
