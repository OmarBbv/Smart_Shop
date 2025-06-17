import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { MultiNav } from "./MultiLevelCategory"
import { useQuery } from "@tanstack/react-query"
import { categoriesService } from "@/services/category-service"
import { NavLink } from "react-router-dom"

export default function CategoryNav() {
  const [isMulticat, setIsMulticat] = useState(false)
  const katalogRef = useRef<HTMLLIElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const multiNavRef = useRef<HTMLDivElement>(null)

  const { data: categories } = useQuery({
    queryKey: ['get/all-category'],
    queryFn: () => categoriesService.getAllCategory()
  })

  const localCategory = categories?.map(c => ({
    name: c.name,
    slug: c.slug
  }))


  useEffect(() => {
    if (!localCategory || localCategory.length === 0) return;

    const stored = localStorage.getItem('categories');
    const parsed = stored ? JSON.parse(stored) : null;

    if (JSON.stringify(parsed) !== JSON.stringify(localCategory)) {
      localStorage.setItem('categories', JSON.stringify(localCategory));
    }
  }, [localCategory]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !katalogRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node) &&
        !multiNavRef.current?.contains(event.target as Node)
      ) {
        setIsMulticat(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const isActive = isMulticat

  return (
    <div className="relative">
      <nav ref={menuRef} className="flex items-center w-full h-12 mt-4 bg-white border-b border-gray-100">
        <ul className="flex items-center h-full w-full">
          <li
            ref={katalogRef}
            onClick={() => setIsMulticat((prev) => !prev)}
            className={`cursor-pointer px-6 h-full flex items-center relative select-none transition-all text-sm
              ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:text-blue-600"}
              font-medium group hover:bg-blue-50`}
          >
            <span className="flex items-center gap-2">
              Katalog
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isMulticat ? "rotate-180" : ""}`}
              />
            </span>
            <div
              className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600
                transform transition-all duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
            />
          </li>

          {
            localCategory ? localCategory.map((c, i) => {
              return <NavLink
                to={`mehsullar/kategoriya/${c.slug}`}
                key={i}
                className={({ isActive }) => (`text-sm cursor-pointer px-6 h-full flex items-center relative select-none transition-all  hover:text-blue-600 group hover:bg-blue-50 ${isActive ? 'text-netflix-red' : 'text-gray-700'}`)}
              >
                <span className="flex items-center gap-2">
                  {c.name}
                </span>
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600
                  transform transition-all duration-300 scale-x-0 group-hover:scale-x-100"
                />
              </NavLink>
            })
              : categories?.map((c, i) => (
                <NavLink
                  to={`mehsullar/kategoriya/${c.slug}`}
                  key={i}
                  className={({ isActive }) => (`text-sm cursor-pointer px-6 h-full flex items-center relative select-none transition-all  hover:text-blue-600 group hover:bg-blue-50 ${isActive ? 'text-netflix-red' : 'text-gray-700'}`)}
                >
                  <span className="flex items-center gap-2">
                    {c.name}
                  </span>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600
                  transform transition-all duration-300 scale-x-0 group-hover:scale-x-100"
                  />
                </NavLink>
              ))
          }
        </ul>
      </nav>

      {isMulticat && <MultiNav ref={multiNavRef} />}
    </div>
  )
}
