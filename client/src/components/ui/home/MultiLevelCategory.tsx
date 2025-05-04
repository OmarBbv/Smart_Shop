import { categoriesMockData as categories } from '@/data/data';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function MultiLevelCategory() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<number | null>(
    null
  );
  const [activeSubSubcategory, setActiveSubSubcategory] = useState<
    number | null
  >(null);

  const getSubcategories = () => {
    if (activeCategory === null) return [];
    const category = categories[activeCategory];
    if (!category) return [];
    return category.subcategories || [];
  };

  const getSubSubcategories = () => {
    if (activeCategory === null || activeSubcategory === null) return [];
    const category = categories[activeCategory];
    if (!category) return [];
    const subcategory = category.subcategories?.[activeSubcategory];
    if (!subcategory) return [];
    return subcategory.subcategories || [];
  };

  const subcategories = getSubcategories();
  const subSubcategories = getSubSubcategories();

  return (
    <div className="hidden lg:grid lg:grid-cols-3 w-full py-3 bg-white">
      <div
        id="custom-scrollbar-thin"
        className="flex flex-col text-sm border-r border-gray-200 max-h-[500px] overflow-y-auto"
      >
        {categories.map((item, index) => (
          <div
            key={item.slug}
            className={`flex items-center justify-between gap-2 leading-12 px-5 cursor-pointer hover:bg-slate-100 ${
              activeCategory === index ? 'bg-slate-100' : ''
            }`}
            onMouseEnter={() => {
              setActiveCategory(index);
              if (
                item.subcategories !== undefined &&
                item.subcategories.length > 0
              ) {
                setActiveSubcategory(0);
                if (
                  item.subcategories[0].subcategories !== undefined &&
                  item.subcategories[0].subcategories.length > 0
                ) {
                  setActiveSubSubcategory(0);
                } else {
                  setActiveSubSubcategory(null);
                }
              } else {
                setActiveSubcategory(null);
                setActiveSubSubcategory(null);
              }
            }}
          >
            <div className="flex items-center gap-2">
              {item.name}
              {item.subcategories !== undefined &&
                item.subcategories.length > 0 && (
                  <span className="text-xs text-gray-500">
                    ({item.subcategories.length})
                  </span>
                )}
            </div>
            {item.subcategories !== undefined &&
              item.subcategories.length > 0 && (
                <ChevronRight className="text-gray-500" size={16} />
              )}
          </div>
        ))}
      </div>

      <div
        id="custom-scrollbar-thin"
        className="flex flex-col text-sm border-r border-gray-200 max-h-[500px] overflow-y-auto"
      >
        {subcategories.map((subcat, index) => (
          <div
            key={subcat.slug}
            className={`flex items-center justify-between gap-2 leading-12 px-5 cursor-pointer hover:bg-slate-100 ${
              activeSubcategory === index ? 'bg-slate-100' : ''
            }`}
            onMouseEnter={() => {
              setActiveSubcategory(index);
              if (
                subcat.subcategories !== undefined &&
                subcat.subcategories.length > 0
              ) {
                setActiveSubSubcategory(0);
              } else {
                setActiveSubSubcategory(null);
              }
            }}
          >
            <div className="flex items-center gap-2">{subcat.name}</div>
            {subcat.subcategories !== undefined &&
              subcat.subcategories.length > 0 && (
                <ChevronRight className="text-gray-500" size={16} />
              )}
          </div>
        ))}
      </div>

      <div
        id="custom-scrollbar-thin"
        className="flex flex-col text-sm max-h-[500px] overflow-y-auto"
      >
        {subSubcategories.map((item, index) => (
          <div
            key={item.slug}
            className={`flex items-center gap-2 leading-12 px-5 cursor-pointer hover:bg-slate-100 ${
              activeSubSubcategory === index ? 'bg-slate-100' : ''
            }`}
            onMouseEnter={() => setActiveSubSubcategory(index)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
