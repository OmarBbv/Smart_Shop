import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { AuthPage, HomePage, ProductDetail, ProductPage, WislhistPage } from '@/pages';
import AboutPage from '@/pages/about/AboutPage';
import ReturnExchangePage from '@/pages/ReturnExchange/ReturnExchangePage';
import FAQPage from '@/pages/faq/FaqPage';
import DeliveryPage from '@/pages/delivery/DeliveryPage';
import ContactPage from '@/pages/contact/ContactPage';
import StoresPage from '@/pages/stores/StoresPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
        path: '/mehsullar/kategoriya/:slug',
        element: <ProductPage />
      },
      {
        path: '/mehsullar/:id',
        element: <ProductDetail />,
      },
      {
        path: '/istek-siyahim',
        element: <WislhistPage />,
      },
      {
        path: '/haqqimizda',
        element: <AboutPage />
      },
      {
        path: '/qaytarma-ve-deyisdirme',
        element: <ReturnExchangePage />
      },
      {
        path: '/suallar',
        element: <FAQPage />
      },
      {
        path: '/catdirilma',
        element: <DeliveryPage />
      },
      {
        path: '/elaqe',
        element: <ContactPage />
      },
      {
        path: '/magazalar',
        element: <StoresPage />
      }
    ],
  },
  {
    path: '/giris',
    element: <AuthPage />
  }
]);

export default router;
