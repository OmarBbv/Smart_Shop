import { mockCategories } from "@/api/mockData";
import { Box } from "@/components/ui/Box";
import { useState } from "react";

export interface CategoryType {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
  parent?: CategoryType | null;
  subcategories?: CategoryType[];
}

export default function CategoryPage() {
  const [openIds, setOpenIds] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    );
  };

  const renderCategory = (category: CategoryType, level = 0) => {
    const isOpen = openIds.includes(category.id);
    const hasSub = category.subcategories && category.subcategories.length > 0;

    return (
      <div key={category.id} className={`mb-2 w-full`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (hasSub) handleToggle(category.id);
          }}
          aria-expanded={isOpen}
          aria-controls={`category-${category.id}`}
          className={`
            w-full flex items-center justify-between 
            py-2 px-3 rounded-md
            text-left
            hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-colors duration-200
            ${level === 0 ? "font-semibold text-lg" : "text-base"}
            ${hasSub ? "cursor-pointer" : "cursor-default"}
          `}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          type="button"
        >
          <span>{category.name}</span>

          {hasSub && (
            <svg
              className={`w-4 h-4 text-blue-600 transition-transform duration-300 ${isOpen ? "rotate-90" : ""
                }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
            </svg>
          )}
        </button>

        {isOpen && hasSub && (
          <Box
            component="ul"
            id={`category-${category.id}`}
            className="mt-1 border-l border-blue-300 pl-2"
            role="region"
            aria-label={`Alt kategoriler: ${category.name}`}
          >
            {category.subcategories!.map((sub) => (
              <li key={sub.id}>{renderCategory(sub, level + 1)}</li>
            ))}
          </Box>
        )}
      </div>
    );
  };

  return (
    <Box className="w-full mt-6 p-4 bg-white rounded-md shadow-md">
      {mockCategories.map((category) => renderCategory(category))}
    </Box>
  );
}
