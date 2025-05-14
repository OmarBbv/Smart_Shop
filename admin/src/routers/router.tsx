import AdminLayout from "@/layouts/Layout";
import Categories from "@/pages/Categories";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Users from "@/pages/Users";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'users',
                element: <Users />
            },
            {
                path: 'products',
                element: <Products />
            },
            {
                path: 'categories',
                element: <Categories />
            }
        ]
    },
    {
        path: '/login',
        element: <div>Login</div>
    }
])