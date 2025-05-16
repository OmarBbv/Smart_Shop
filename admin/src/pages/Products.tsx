import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  X,
  Image as ImageIcon,
  ChevronDown
} from 'lucide-react';
import { products, categories } from '../services/mockData';
import { Product, FormattedProduct, Category } from '../types';
import PageTransition from '../components/ui/PageTransition';
import StatusBadge from '../components/ui/StatusBadge';
import SearchInput from '../components/ui/SearchInput';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Products: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formattedProducts, setFormattedProducts] = useState<FormattedProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<FormattedProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FormattedProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'add' | 'edit'>('view');
  const productsPerPage = 10;

  const categoryMap = categories.reduce<Record<string, string>>((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  // Format prices and dates, prepare product data
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const formatted = products.map(product => ({
        ...product,
        formattedPrice: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(product.price),
        formattedDate: format(new Date(product.createdAt), 'MMM dd, yyyy'),
      }));
      setFormattedProducts(formatted);
      setFilteredProducts(formatted);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...formattedProducts];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(product => product.category === categoryFilter);
    }

    // Apply stock filter
    if (stockFilter !== 'all') {
      if (stockFilter === 'in_stock') {
        result = result.filter(product => product.stock > 0);
      } else if (stockFilter === 'out_of_stock') {
        result = result.filter(product => product.stock === 0);
      } else if (stockFilter === 'low_stock') {
        result = result.filter(product => product.stock > 0 && product.stock < 10);
      }
    }

    // Apply sorting
    result.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, categoryFilter, stockFilter, sortField, sortDirection, formattedProducts]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle sort changes
  const handleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Modal handlers
  const openModal = (type: 'view' | 'add' | 'edit', product?: FormattedProduct) => {
    setModalType(type);
    setSelectedProduct(product || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const getStockStatus = (stock: number): 'in stock' | 'low stock' | 'out of stock' => {
    if (stock === 0) return 'out of stock';
    if (stock < 10) return 'low stock';
    return 'in stock';
  };

  return (
    <PageTransition>
      <div className="mb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <SearchInput
            placeholder="Search products..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <button
            className="btn btn-secondary whitespace-nowrap"
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            <Filter size={16} className="mr-1" />
            Filters
            {(categoryFilter !== 'all' || stockFilter !== 'all') && (
              <span className="ml-1 bg-gray-300 text-gray-800 text-xs px-1.5 py-0.5 rounded-full">
                {(categoryFilter !== 'all' ? 1 : 0) + (stockFilter !== 'all' ? 1 : 0)}
              </span>
            )}
          </button>
          <button
            className="btn btn-primary whitespace-nowrap"
            onClick={() => openModal('add')}
          >
            <Plus size={16} className="mr-1" />
            Add Product
          </button>
        </div>
      </div>

      {filtersVisible && (
        <motion.div 
          className="bg-white rounded-lg p-4 mb-6 shadow-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row justify-between mb-2">
            <h3 className="font-medium text-gray-700">Filters</h3>
            <button 
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={() => {
                setCategoryFilter('all');
                setStockFilter('all');
              }}
            >
              Reset all
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <div className="relative">
                <select
                  className="form-input appearance-none"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown 
                  size={16} 
                  className="absolute right-3 top-3 text-gray-500" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
              <div className="flex flex-wrap gap-2">
                {[
                  {value: 'all', label: 'All'},
                  {value: 'in_stock', label: 'In Stock'},
                  {value: 'low_stock', label: 'Low Stock'},
                  {value: 'out_of_stock', label: 'Out of Stock'}
                ].map((status) => (
                  <button
                    key={status.value}
                    className={`px-3 py-1 text-sm rounded-md ${
                      stockFilter === status.value
                        ? 'bg-primary-100 text-primary-700 border border-primary-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                    onClick={() => setStockFilter(status.value)}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        Product
                        {sortField === 'name' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('category')}
                    >
                      <div className="flex items-center">
                        Category
                        {sortField === 'category' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('price')}
                    >
                      <div className="flex items-center">
                        Price
                        {sortField === 'price' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('stock')}
                    >
                      <div className="flex items-center">
                        Stock
                        {sortField === 'stock' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell"
                      onClick={() => handleSort('rating')}
                    >
                      <div className="flex items-center">
                        Rating
                        {sortField === 'rating' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <motion.tr 
                        key={product.id}
                        className="hover:bg-gray-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                              {product.images.length > 0 ? (
                                <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center">
                                  <ImageIcon size={20} className="text-gray-500" />
                                </div>
                              )}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{product.name}</p>
                              <p className="text-xs text-gray-500 truncate max-w-xs">
                                {product.description.length > 50 
                                  ? `${product.description.substring(0, 50)}...` 
                                  : product.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {categoryMap[product.category] || 'Uncategorized'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.formattedPrice}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <StatusBadge status={getStockStatus(product.stock)} />
                            <span className="text-sm text-gray-700">{product.stock}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                          <div className="flex items-center">
                            <span className="text-amber-500">★</span>
                            <span className="ml-1">{product.rating.toFixed(1)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button 
                              className="text-gray-600 hover:text-gray-800 transition-colors"
                              onClick={() => openModal('view', product)}
                            >
                              <Eye size={18} />
                            </button>
                            <button 
                              className="text-primary-600 hover:text-primary-800 transition-colors"
                              onClick={() => openModal('edit', product)}
                            >
                              <Edit size={18} />
                            </button>
                            <button className="text-error-600 hover:text-error-800 transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        No products found matching the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastProduct, filteredProducts.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredProducts.length}</span> products
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Logic to show pages around current page
                        let pageNum = i + 1;
                        if (totalPages > 5) {
                          if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            className={`relative inline-flex items-center px-4 py-2 border ${
                              currentPage === pageNum
                                ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            } text-sm font-medium`}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {modalType === 'view' ? 'Product Details' : 
                   modalType === 'add' ? 'Add New Product' : 'Edit Product'}
                </h3>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={closeModal}
                >
                  <X size={24} />
                </button>
              </div>

              {modalType === 'view' && selectedProduct && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="bg-gray-100 rounded-lg overflow-hidden h-64 mb-4">
                        {selectedProduct.images.length > 0 ? (
                          <img 
                            src={selectedProduct.images[0]} 
                            alt={selectedProduct.name} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon size={48} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      {selectedProduct.images.length > 1 && (
                        <div className="flex space-x-2 overflow-x-auto pb-2">
                          {selectedProduct.images.map((image, index) => (
                            <div 
                              key={index}
                              className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 border-transparent hover:border-primary-500 cursor-pointer"
                            >
                              <img src={image} alt={`${selectedProduct.name} ${index}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-2xl font-medium text-gray-900">{selectedProduct.name}</h4>
                        <p className="text-sm text-gray-500">Added on {selectedProduct.formattedDate}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-xs text-gray-500">Price</p>
                          <p className="text-xl font-semibold text-gray-900">{selectedProduct.formattedPrice}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Stock</p>
                          <div className="flex items-center">
                            <StatusBadge status={getStockStatus(selectedProduct.stock)} />
                            <span className="ml-2 text-gray-700">{selectedProduct.stock} units</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Rating</p>
                          <div className="flex items-center">
                            <span className="text-amber-500">★</span>
                            <span className="ml-1 text-gray-900">{selectedProduct.rating.toFixed(1)}/5</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Category</p>
                        <p className="text-gray-900">{categoryMap[selectedProduct.category] || 'Uncategorized'}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Description</p>
                        <p className="text-gray-700">{selectedProduct.description}</p>
                      </div>
                      
                      {selectedProduct.featured && (
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          Featured Product
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                    <button 
                      className="btn btn-secondary"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={() => {
                        closeModal();
                        openModal('edit', selectedProduct);
                      }}
                    >
                      Edit Product
                    </button>
                  </div>
                </div>
              )}

              {(modalType === 'add' || modalType === 'edit') && (
                <div className="space-y-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Product Name</label>
                          <input 
                            type="text" 
                            className="form-input mt-1"
                            defaultValue={selectedProduct?.name || ''}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Category</label>
                          <select className="form-input mt-1" defaultValue={selectedProduct?.category || ''}>
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input 
                              type="number" 
                              className="form-input mt-1"
                              defaultValue={selectedProduct?.price || ''}
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                            <input 
                              type="number" 
                              className="form-input mt-1"
                              defaultValue={selectedProduct?.stock || ''}
                              min="0"
                              step="1"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Featured</label>
                          <div className="mt-1">
                            <label className="inline-flex items-center">
                              <input 
                                type="checkbox" 
                                className="form-checkbox h-4 w-4 text-primary-600"
                                defaultChecked={selectedProduct?.featured || false}
                              />
                              <span className="ml-2 text-sm text-gray-700">Mark as featured product</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea 
                            className="form-input mt-1 h-32"
                            defaultValue={selectedProduct?.description || ''}
                          ></textarea>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Product Images</label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                                >
                                  <span>Upload a file</span>
                                  <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                            </div>
                          </div>
                        </div>
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
                        {modalType === 'add' ? 'Add Product' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </PageTransition>
  );
};

export default Products;