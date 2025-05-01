import { RouterProvider } from 'react-router-dom';
import router from '@/routers/routes';

export default function App() {
  return <RouterProvider router={router} />;
}
