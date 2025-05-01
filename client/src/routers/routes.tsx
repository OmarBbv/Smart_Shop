import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import Main from '../layouts/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
