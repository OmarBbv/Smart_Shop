import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FilterIcon, X } from "lucide-react"
import { productPageData, products } from "@/data/productData"
import ProductFilterSidebar from "@/components/ui/product/ProductFilter"
import ProductCard from "@/components/ui/product/ProductCard"

export default function ProductPage() {
  const [filteredProducts, setFilteredProducts] = useState(productPageData)
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    priceRange: { min: 0, max: 5000 },
  })
  const [sortOption, setSortOption] = useState("featured")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products]

    // Apply category filter
    if (filters.category.length > 0) {
      result = result.filter((product) => filters.category.includes(product.category))
    }

    // Apply brand filter
    if (filters.brand.length > 0) {
      result = result.filter((product) => filters.brand.includes(product.brand))
    }

    // Apply price range filter
    result = result.filter(
      (product) => product.price >= filters.priceRange.min && product.price <= filters.priceRange.max,
    )

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
        break
      default:
        // Featured sorting (default)
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    setFilteredProducts(result)
  }, [filters, sortOption])

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile filter toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <button onClick={toggleMobileFilter} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
            <FilterIcon size={18} />
            Filters
          </button>
        </div>

        {/* Mobile filter sidebar */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute right-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween" }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button onClick={toggleMobileFilter} className="p-1">
                    <X size={24} />
                  </button>
                </div>
                <ProductFilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  closeMobileFilter={() => setIsMobileFilterOpen(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop filter sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <h2 className="text-xl font-bold mb-6">Filters</h2>
          <ProductFilterSidebar filters={filters} setFilters={setFilters} />
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="hidden md:flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border rounded-md px-3 py-1.5"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Mobile sort options */}
          <div className="md:hidden mb-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="newest">Sort by: Newest</option>
              <option value="price-asc">Sort by: Price: Low to High</option>
              <option value="price-desc">Sort by: Price: High to Low</option>
            </select>
          </div>

          {/* Product count */}
          <p className="text-gray-600 mb-4">Showing {filteredProducts.length} products</p>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products match your filters</p>
              <button
                onClick={() =>
                  setFilters({
                    category: [],
                    brand: [],
                    priceRange: { min: 0, max: 5000 },
                  })
                }
                className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
