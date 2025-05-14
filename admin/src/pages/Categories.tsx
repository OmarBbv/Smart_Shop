import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "@/components/Button"
import Card from "@/components/Card"

interface Category {
  id: number
  name: string
  description: string
  productCount: number
  createdAt: string
}

const Categories: React.FC = () => {
  const [formVisible, setFormVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  // Mock data for categories
  const categories: Category[] = [
    {
      id: 1,
      name: "Electronics",
      description: "Electronic devices and accessories",
      productCount: 42,
      createdAt: "2023-01-15",
    },
    {
      id: 2,
      name: "Clothing",
      description: "Apparel and fashion items",
      productCount: 78,
      createdAt: "2023-02-20",
    },
    {
      id: 3,
      name: "Footwear",
      description: "Shoes, sandals, and boots",
      productCount: 34,
      createdAt: "2023-03-10",
    },
    {
      id: 4,
      name: "Home Appliances",
      description: "Devices for home use",
      productCount: 23,
      createdAt: "2023-04-05",
    },
    {
      id: 5,
      name: "Books",
      description: "Physical and digital books",
      productCount: 56,
      createdAt: "2023-05-01",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log("Form submitted:", formData)
    // Reset form and hide it
    setFormData({
      name: "",
      description: "",
    })
    setFormVisible(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Categories</h1>
        <Button variant="primary" onClick={() => setFormVisible(!formVisible)}>
          {formVisible ? "Cancel" : "Add Category"}
        </Button>
      </div>

      <AnimatePresence>
        {formVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6">
              <div className="p-4">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Add New Category</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Category Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary">
                      Save Category
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Products
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{category.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{category.productCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{category.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="secondary" size="sm" className="mr-2">
                      Edit
                    </Button>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default Categories
