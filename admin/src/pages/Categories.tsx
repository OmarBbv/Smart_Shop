import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ChevronRight,
  ChevronDown,
  Package
} from 'lucide-react';
import { categories } from '../services/mockData';
import { Category, FormattedCategory } from '../types';
import PageTransition from '../components/ui/PageTransition';
import SearchInput from '../components/ui/SearchInput';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// Helper function to create a categories tree
const buildCategoryTree = (categories: FormattedCategory[]) => {
  const categoryMap: Record<string, FormattedCategory & { children: FormattedCategory[] }> = {};
  
  // First pass: create map of categories with empty children arrays
  categories.forEach(category => {
    categoryMap[category.id] = { ...category, children: [] };
  });
  
  // Second pass: populate children arrays
  const rootCategories: (FormattedCategory & { children: FormattedCategory[] })[] = [];
  
  categories.forEach(category => {
    if (category.parentId) {
      if (categoryMap[category.parentId]) {
        categoryMap[category.parentId].children.push(categoryMap[category.id]);
      }
    } else {
      rootCategories.push(categoryMap[category.id]);
    }
  });
  
  return rootCategories;
};

interface CategoryItemProps {
  category: FormattedCategory & { children: FormattedCategory[] };
  depth: number;
  onEdit: (category: FormattedCategory) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, depth, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(depth < 1);
  const hasChildren = category.children.length > 0;
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const paddingLeft = `${(depth + 1) * 16}px`;
  
  return (
    <>
      <motion.div 
        className={`flex items-center p-3 hover:bg-gray-50 ${depth === 0 ? 'border-b border-gray-200' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center flex-1" style={{ paddingLeft }}>
          {hasChildren ? (
            <button 
              className="p-1 rounded-full hover:bg-gray-200 mr-2"
              onClick={toggleExpand}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          ) : (
            <span className="ml-6"></span>
          )}
          
          <span className="font-medium text-gray-800">{category.name}</span>
          <span className="ml-2 text-xs text-gray-500">({category.productCount})</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            className="p-1 text-primary-600 hover:text-primary-800 transition-colors"
            onClick={() => onEdit(category)}
          >
            <Edit size={16} />
          </button>
          <button className="p-1 text-error-600 hover:text-error-800 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </motion.div>
      
      {isExpanded && hasChildren && (
        <div>
          {category.children.map(child => (
            <CategoryItem 
              key={child.id} 
              category={child} 
              depth={depth + 1} 
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </>
  );
};

const Categories: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formattedCategories, setFormattedCategories] = useState<FormattedCategory[]>([]);
  const [categoryTree, setCategoryTree] = useState<(FormattedCategory & { children: FormattedCategory[] })[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FormattedCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  
  // Format dates and prepare category data
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const formatted = categories.map(category => ({
        ...category,
        formattedDate: format(new Date(category.createdAt), 'MMM dd, yyyy'),
      }));
      setFormattedCategories(formatted);
      setCategoryTree(buildCategoryTree(formatted));
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);
  
  // Filter categories based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = formattedCategories.filter(
        category => category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCategoryTree(buildCategoryTree(filtered));
    } else {
      setCategoryTree(buildCategoryTree(formattedCategories));
    }
  }, [searchQuery, formattedCategories]);
  
  // Modal handlers
  const openModal = (type: 'add' | 'edit', category?: FormattedCategory) => {
    setModalType(type);
    setSelectedCategory(category || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };
  
  return (
    <PageTransition>
      <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <SearchInput
            placeholder="Search categories..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <button
            className="btn btn-primary whitespace-nowrap"
            onClick={() => openModal('add')}
          >
            <Plus size={16} className="mr-1" />
            Add Category
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : categoryTree.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {categoryTree.map(category => (
              <CategoryItem 
                key={category.id} 
                category={category} 
                depth={0} 
                onEdit={(category) => openModal('edit', category)}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            {searchQuery 
              ? 'No categories found matching your search.' 
              : 'No categories available. Add your first category.'}
          </div>
        )}
      </div>
      
      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-5">
                {modalType === 'add' ? 'Add New Category' : 'Edit Category'}
              </h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input 
                    type="text" 
                    className="form-input mt-1"
                    defaultValue={selectedCategory?.name || ''}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea 
                    className="form-input mt-1 h-24"
                    defaultValue={selectedCategory?.description || ''}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Parent Category</label>
                  <select 
                    className="form-input mt-1"
                    defaultValue={selectedCategory?.parentId || ''}
                  >
                    <option value="">None (Top Level)</option>
                    {categories
                      .filter(cat => cat.id !== selectedCategory?.id)
                      .map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Slug</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      /
                    </span>
                    <input
                      type="text"
                      className="form-input rounded-none rounded-r-md"
                      defaultValue={selectedCategory?.slug || ''}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                  <button 
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    className="btn btn-primary"
                  >
                    {modalType === 'add' ? 'Add Category' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </PageTransition>
  );
};

export default Categories;