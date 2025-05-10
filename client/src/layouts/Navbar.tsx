import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiHeart, FiMenu, FiUser } from 'react-icons/fi';
import CustomInput from '@/components/CustomInput';
import CategoryNav from '@/components/ui/home/CategoryNav';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const searchRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null!);

  const handleSearchButton = () => {
    setIsOpenSearch(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpenSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpenSearch]);

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

          <div className="flex-1 max-w-lg relative ">
            <CustomInput
              onClick={handleSearchButton}
              ref={inputRef}
              placeholder="Axtar.."
              type="search"
              classNames="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-netflix-red)] focus:border-transparent text-sm"
              autoComplete="off"
            />

            <ul
              id="custom-scrollbar-thin"
              ref={searchRef}
              className={`max-h-[300px] overflow-y-auto absolute z-[60] mt-2 top-full left-0 w-full bg-white border border-gray-300 rounded-md ${isOpenSearch ? 'block' : 'hidden'
                }`}
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <li key={index}>
                  <Link
                    to="/"
                    className="block px-2 py-4 hover:bg-gray-100 text-sm"
                  >
                    Telefonlar
                  </Link>
                </li>
              ))}
            </ul>
          </div>

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
            <div className="flex items-center gap-6">
              <a
                href="https://wa.me/994518888888"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1  text-green-600 text-sm"
                title="WhatsApp İletişim"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885" />
                </svg>
                <span>WhatsApp</span>
              </a>
              <a
                href="https://goo.gl/maps/YourActualMapLink"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1  text-[var(--color-netflix-red)] text-sm"
                title="Haritada Bizi Bul"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                </svg>
                <span>Xəritədə Bizi Tap</span>
              </a>
              <Link
                to="/istek-siyahim"
                className="text-gray-700 hover:text-[var(--color-netflix-red)]"
              >
                <FiHeart size={22} />
              </Link>
              {/* <button className="relative text-gray-700 hover:text-[var(--color-netflix-red)]">
                <FiShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </button> */}
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
                <a
                  href="https://wa.me/905555555555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2"
                >
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345" />
                  </svg>
                  <span>WhatsApp İletişim</span>
                </a>
                <a
                  href="https://goo.gl/maps/YourActualMapLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2"
                >
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                  </svg>
                  <span>Xəritədə Bizi Tap</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
