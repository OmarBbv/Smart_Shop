import MainLayout from "@/layouts/MainLayout";
import DashboardPage from "@/pages/DashboardPage";
import UserPage from "@/pages/UserPage";
import ProductPage from "@/pages/ProductPage";
import { createBrowserRouter } from "react-router-dom";
import ProductDetail from "@/pages/ProductDetail";
import NewProductPage from "@/pages/NewProductPage";

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
        path: "istifadeciler",
        element: <UserPage />,
      },
      {
        path: 'mehsullar',
        element: <ProductPage />
      },
      {
        path: 'mehsullar/:id',
        element: <ProductDetail />
      },
      {
        path: '/mehsullar/yeni',
        element: <NewProductPage />
      }
    ],
  },
]);
