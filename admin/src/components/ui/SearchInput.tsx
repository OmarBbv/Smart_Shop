import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  placeholder = 'Search...', 
  value, 
  onChange 
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-4 py-2 w-full rounded-md bg-white border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
      />
      <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
    </div>
  );
};

export default SearchInput;