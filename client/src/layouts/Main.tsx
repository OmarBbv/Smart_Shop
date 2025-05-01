import { Outlet } from 'react-router-dom';
import Navbar from '@/layouts/Navbar';
import Footer from '@/layouts/Footer';

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-7xl px-4 py-6 md:py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
