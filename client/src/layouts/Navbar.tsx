import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiUser,
} from 'react-icons/fi';
import CustomInput from '@/components/CustomInput';
import CategoryNav from '@/components/CategoryNav';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="container max-w-7xl mx-auto px-4 xl:pt-3 py-3 xl:py-0">
        {/* Üst kısım - Logo, Arama, Profil */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-[var(--color-netflix-red)] rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">
              SMART STORE
            </span>
          </Link>

          <CustomInput
            placeholder="Axtar.."
            type="search"
            classNames="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-netflix-red)] focus:border-transparent text-sm"
          />

          {/* Sağ kısım - Butonlar */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* <Link
              to="/magazalar"
              className="hidden md:block text-sm  hover:text-[var(--color-netflix-red)]"
            >
              Mağazalar
            </Link>
            <Link
              to="/korporation"
              className="hidden md:block text-sm  hover:text-[var(--color-netflix-red)]"
            >
              Korporativ satışlar
            </Link> */}
            <div className="flex items-center gap-4">
              <button className="text-gray-700 hover:text-[var(--color-netflix-red)]">
                <FiHeart size={22} />
              </button>
              <button className="relative text-gray-700 hover:text-[var(--color-netflix-red)]">
                <FiShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </button>
              <button className="text-gray-700 hover:text-[var(--color-netflix-red)] md:hidden">
                <FiSearch size={22} />
              </button>
              <button className="text-gray-700 hover:text-[var(--color-netflix-red)]">
                <FiUser size={22} />
              </button>
              <button
                className="text-gray-700 hover:text-[var(--color-netflix-red)] md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <FiMenu size={22} />
              </button>
            </div>
          </div>
        </div>
        {/* Alt kısım - Kategori ve Menü */}
        <CategoryNav />
        {/* Mobil Menü */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 py-4 px-4 z-50">
            <div className="flex flex-col gap-4">
              <Link to="/catalog" className="flex items-center gap-2 ">
                <FiMenu />
                <span>Katalog</span>
              </Link>
              <Link to="/category/phones" className="">
                Telefonlar
              </Link>
              <Link to="/category/laptops" className="">
                Laptoplar
              </Link>
              <Link to="/category/tv" className="">
                Televizorlar
              </Link>
              <Link to="/category/audio" className="">
                Audio
              </Link>
              <Link to="/category/appliances" className="">
                Ev əşyaları
              </Link>
              <div className="border-t border-gray-200 pt-4 mt-2">
                <Link to="/trade-in" className="block py-2 ">
                  Trade-in
                </Link>
                <Link to="/magazalar" className="block py-2 ">
                  Mağazalar
                </Link>
                <Link to="/korporation" className="block py-2 ">
                  Korporativ satışlar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
