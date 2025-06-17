import { Outlet } from 'react-router-dom';
import Navbar from '@/layouts/Navbar';
import Footer from '@/layouts/Footer';
import { useScrollToUp } from '@/hooks/useScrollToUp';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export default function MainLayout() {
  useScrollToUp();

  const status = useNetworkStatus();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      {!status &&
        <div className='p-2 text-center fixed top-0 w-full z-[877456] bg-netflix-red flex justify-center items-center'>
          <span className='text-white font-semibold text-sm'>İnternet bağlantısı yoxdur. Zəhmət olmasa bağlantınızı yoxlayın.</span>
        </div>
      }
      <Navbar />
      <main className="flex-grow container mx-auto max-w-7xl px-4 py-6 md:py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
