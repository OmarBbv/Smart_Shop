import { FiMenu } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import MultiLevelCategory from '@/components/ui/home/MultiLevelCategory';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CategoryNav() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      setHeaderHeight(header.clientHeight);
    }
  }, [isOpenMenu]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpenMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav
        ref={wrapperRef}
        className={`hidden md:flex items-center h-14 relative my-1 transition-all duration-300 rounded-lg z-50`}
      >
        <button
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className={`flex items-center gap-2 hover:text-[var(--color-netflix-red)] xl:text-[17px] h-full
          cursor-pointer transition-all duration-300 pr-3 font-medium
          ${
            isOpenMenu
              ? 'text-[var(--color-netflix-red)] border-b-2 border-[var(--color-netflix-red)]'
              : 'hover:bg-gray-50 rounded-md'
          }`}
        >
          <FiMenu
            className={`transition-transform duration-300 ${
              isOpenMenu ? 'rotate-90' : ''
            }`}
          />
          <span>Katalog</span>
        </button>

        <div className="mx-2 h-6 w-px bg-gray-200"></div>

        <div className="flex space-x-1 items-center">
          {[
            { to: '/category/phones', label: 'Telefonlar' },
            { to: '/category/laptops', label: 'Laptoplar' },
            { to: '/category/tv', label: 'Televizorlar' },
            { to: '/category/audio', label: 'Audio' },
            { to: '/category/appliances', label: 'Ev əşyaları' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `hover:text-[var(--color-netflix-red)] px-3 py-2 rounded-md xl:text-[16px]
                font-medium transition-all duration-300 mx-1
                ${
                  isActive
                    ? 'text-[var(--color-netflix-red)] bg-red-50 border-b-2 border-[var(--color-netflix-red)]'
                    : 'hover:bg-gray-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <AnimatePresence>
          {isOpenMenu && (
            <motion.div
              ref={categoryRef}
              className={`${
                isOpenMenu ? 'block' : 'hidden'
              } absolute top-full left-0 w-full mt-1 bg-white  shadow-xl overflow-hidden z-50`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <MultiLevelCategory />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpenMenu(false)}
            style={{ top: headerHeight ? `${headerHeight}px` : '0px' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
