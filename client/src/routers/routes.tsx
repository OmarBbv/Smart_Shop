import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import { AuthPage, HomePage, ProductDetail, ProductPage, WislhistPage } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/mehsullar',
        element: <ProductPage />,
      },
      {
        path: '/mehsullar/:id',
        element: <ProductDetail />,
      },
      {
        path: '/istek-siyahim',
        element: <WislhistPage />,
      },
    ],
  },
  {
    path: '/giris',
    element: <AuthPage />
  }
]);

export default router;
