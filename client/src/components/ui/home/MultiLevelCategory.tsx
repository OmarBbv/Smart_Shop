import { categoriesService } from "@/services/category-service"
import { ChevronRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useState, forwardRef } from "react"



export const MultiNav = forwardRef<HTMLDivElement>((_, ref) => {
  const [subIndex, setSubIndex] = useState<number | null>(null)
  const [secondSubIndex, setSecondSubIndex] = useState<number | null>(null)


  const handleRouteCatProd = (slug: string) => {
    if (!slug) return null;

    const url = `/mehsullar/kategoriya/${slug}`
    window.open(url, '_blank');
  }

  const { data: categories } = useQuery({
    queryKey: ["get/all_categories"],
    queryFn: () => categoriesService.getAllCategory(),
  })

  const handleSelectCat = (index: number) => {
    setSubIndex(index)
    setSecondSubIndex(null)
  }

  const handleSelectSubCat = (index: number) => {
    setSecondSubIndex(index)
  }

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 w-full bg-white shadow-2xl border border-gray-100 rounded-b-xl z-50 animate-in slide-in-from-top-2 duration-200"
    >
      <div className="w-full grid grid-cols-3 h-[400px]">
        <div className="border-r bg-gradient-to-b from-gray-50 to-white">
          <div className="p-4 border-b bg-white">
            <h3 className="text-sm font-semibold text-gray-800 uppercase">Kategoriyalar</h3>
          </div>
          <div id="custom-scrollbar-thin" className="h-[calc(400px-60px)] overflow-auto scrollbar-thin scrollbar-thumb-gray-300">
            {categories?.map((cat, i) => {
              const isSelected = subIndex === i
              return (
                <div
                  key={cat.id}
                  onClick={() => handleRouteCatProd(cat.slug)}
                  onMouseEnter={() => handleSelectCat(i)}
                  className={`px-4 min-h-12 flex items-center justify-between cursor-pointer group transition-all
                  ${isSelected ? "bg-blue-500 text-white shadow-md" : "hover:bg-blue-50 text-gray-700"}`}
                >
                  <span className="font-medium">{cat.name}</span>
                  {cat.subcategories?.length > 0 && (
                    <ChevronRight className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-400 group-hover:text-blue-500"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="border-r bg-white">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-800 uppercase">
              {categories?.[subIndex ?? 0]?.name || "Alt Kategoriyalar"}
            </h3>
          </div>
          <div id="custom-scrollbar-thin" className="h-[calc(400px-60px)] overflow-auto">
            {categories?.[subIndex ?? 0]?.subcategories?.map((cat, i) => {
              const isSelected = secondSubIndex === i
              return (
                <div
                  key={cat.id}
                  onClick={() => handleRouteCatProd(cat.slug)}
                  onMouseEnter={() => handleSelectSubCat(i)}
                  className={`px-4 min-h-12 flex items-center justify-between cursor-pointer group transition-all
                  ${isSelected ? "bg-green-500 text-white shadow-md" : "hover:bg-green-50 text-gray-700"}`}
                >
                  <span className="font-medium">{cat.name}</span>
                  {cat?.subcategories.length > 0 ? <ChevronRight className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-400 group-hover:text-green-500"}`} /> : null}
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-gradient-to-b from-white to-gray-50">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-800 uppercase">
              {categories?.[subIndex ?? 0]?.subcategories?.[secondSubIndex ?? 0]?.name || "Məhsullar"}
            </h3>
          </div>
          <div id="custom-scrollbar-thin" className="h-[calc(400px-60px)] overflow-auto">
            {categories?.[subIndex ?? 0]?.subcategories?.[secondSubIndex ?? 0]?.subcategories?.map((cat) => (
              <div
                onClick={() => handleRouteCatProd(cat.slug)}
                key={cat.id}
                className="px-4 min-h-12 flex items-center cursor-pointer group transition-all
                hover:bg-orange-50 text-gray-700 hover:text-orange-600 border-l-2 border-transparent hover:border-orange-400"
              >
                <span className="font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none" />
    </div>
  )
})
MultiNav.displayName = "MultiNav"