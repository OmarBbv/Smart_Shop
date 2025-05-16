import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  Package, 
  Tag, 
  ChevronRight, 
  Menu, 
  X
} from 'lucide-react';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, toggleSidebar }) => {
  const navItems: NavItem[] = [
    { title: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { title: 'Users', path: '/users', icon: <Users size={20} /> },
    { title: 'Products', path: '/products', icon: <Package size={20} /> },
    { title: 'Categories', path: '/categories', icon: <Tag size={20} /> },
  ];

  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: { 
      x: '-100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  // Only apply animation for mobile view
  const variants = isMobile ? sidebarVariants : {};
  const initial = isMobile ? { x: '-100%' } : false;
  const animate = isMobile ? (isOpen ? 'open' : 'closed') : false;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-20 ${
          isMobile ? 'w-64' : isOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 ease-in-out flex flex-col`}
        initial={initial}
        animate={animate}
        variants={variants}
      >
        {/* Sidebar header */}
        <div className={`h-16 flex items-center px-4 border-b border-gray-200 ${
          !isMobile && !isOpen ? 'justify-center' : 'justify-between'
        }`}>
          {(!isMobile && isOpen) || isMobile ? (
            <>
              <span className="text-xl font-semibold text-primary-600">AdminDash</span>
              {isMobile && (
                <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-100">
                  <X size={20} />
                </button>
              )}
            </>
          ) : (
            <span className="text-xl font-semibold text-primary-600">AD</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center py-2 px-3 rounded-md transition-colors
                    ${isActive 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'hover:bg-gray-100 text-gray-700'}
                    ${!isMobile && !isOpen ? 'justify-center' : ''}
                  `}
                >
                  <span className="flex items-center justify-center">{item.icon}</span>
                  
                  {(!isMobile && isOpen) || isMobile ? (
                    <span className="ml-3">{item.title}</span>
                  ) : null}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapse button (desktop only) */}
        {!isMobile && (
          <div className="p-4 border-t border-gray-200">
            <button 
              onClick={toggleSidebar}
              className={`p-2 rounded-md w-full flex ${
                isOpen ? 'justify-between' : 'justify-center'
              } items-center hover:bg-gray-100 text-gray-500`}
            >
              {isOpen && <span>Collapse</span>}
              <ChevronRight 
                size={20} 
                className={`transform transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>
          </div>
        )}
      </motion.aside>
    </>
  );
};

export default Sidebar;