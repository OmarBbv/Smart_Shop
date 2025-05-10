import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { productPageData } from "@/data/productData"

// Get unique categories and brands from products
const categories = [...new Set(productPageData.map((p) => p.category))]
const brands = [...new Set(productPageData.map((p) => p.brand))]

// Find min and max prices
const minPrice = Math.min(...productPageData.map((p) => p.price))
const maxPrice = Math.max(...productPageData.map((p) => p.price))

interface FilterSidebarProps {
  filters: {
    category: string[]
    brand: string[]
    priceRange: { min: number; max: number }
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string[]
      brand: string[]
      priceRange: { min: number; max: number }
    }>
  >
  closeMobileFilter?: () => void
}

export default function ProductFilterSidebar({ filters, setFilters, closeMobileFilter }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState({
    min: filters.priceRange.min,
    max: filters.priceRange.max,
  })

  // Update price range when slider changes
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange({
      ...priceRange,
      [e.target.name]: Number(e.target.value),
    })
  }

  // Apply price range filter when slider stops
  const handlePriceChangeComplete = () => {
    setFilters({
      ...filters,
      priceRange,
    })
  }

  // Toggle category filter
  const toggleCategory = (category: string) => {
    setFilters({
      ...filters,
      category: filters.category.includes(category)
        ? filters.category.filter((c) => c !== category)
        : [...filters.category, category],
    })
  }

  // Toggle brand filter
  const toggleBrand = (brand: string) => {
    setFilters({
      ...filters,
      brand: filters.brand.includes(brand) ? filters.brand.filter((b) => b !== brand) : [...filters.brand, brand],
    })
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: [],
      brand: [],
      priceRange: { min: minPrice, max: maxPrice },
    })
    setPriceRange({ min: minPrice, max: maxPrice })
    if (closeMobileFilter) {
      closeMobileFilter()
    }
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => toggleCategory(category)}
                className="rounded text-gray-800 focus:ring-gray-800"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-medium mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="rounded text-gray-800 focus:ring-gray-800"
              />
              <span className="text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>${priceRange.min.toLocaleString()}</span>
            <span>${priceRange.max.toLocaleString()}</span>
          </div>
          <input
            type="range"
            name="min"
            min={minPrice}
            max={maxPrice}
            value={priceRange.min}
            onChange={handlePriceChange}
            onMouseUp={handlePriceChangeComplete}
            onTouchEnd={handlePriceChangeComplete}
            className="w-full"
          />
          <input
            type="range"
            name="max"
            min={minPrice}
            max={maxPrice}
            value={priceRange.max}
            onChange={handlePriceChange}
            onMouseUp={handlePriceChangeComplete}
            onTouchEnd={handlePriceChangeComplete}
            className="w-full"
          />
        </div>
      </div>

      {/* Clear Filters */}
      <motion.button
        onClick={clearFilters}
        className="w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        whileTap={{ scale: 0.95 }}
      >
        Clear All Filters
      </motion.button>
    </div>
  )
}
