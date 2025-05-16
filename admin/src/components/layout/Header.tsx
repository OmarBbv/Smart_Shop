import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Menu, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, isMobile, toggleSidebar }) => {
  return (
    <motion.header 
      className="h-16 bg-white shadow-sm z-10 px-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <button 
              onClick={toggleSidebar}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
          )}
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 rounded-md bg-gray-100 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:outline-none w-64 text-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>

          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1.5 w-2 h-2 bg-error-500 rounded-full"></span>
          </button>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={18} className="text-gray-500" />
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline-block">Admin User</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;