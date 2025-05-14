import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToUp = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pathname]);

  return null;
};
