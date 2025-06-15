import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { MultiNav } from "./MultiLevelCategory"


const navs = ["Katalog", "Telefonlar", "Notebooklar", "Qulaqcıqlar"]

export default function CategoryNav() {
  const [isMulticat, setIsMulticat] = useState(false)
  const katalogRef = useRef<HTMLLIElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const multiNavRef = useRef<HTMLDivElement>(null)

  const handleSelectNav = (index: number) => {
    if (index === 0) setIsMulticat((prev) => !prev)
  }

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

  return (
    <div className="relative">
      <nav ref={menuRef} className="flex items-center w-full h-12 mt-4 bg-white border-b border-gray-100">
        <ul className="flex items-center h-full w-full">
          {navs.map((item, i) => {
            const isActive = i === 0 && isMulticat
            return (
              <li
                ref={i === 0 ? katalogRef : null}
                key={i}
                onClick={() => handleSelectNav(i)}
                className={`cursor-pointer px-6 h-full flex items-center relative select-none transition-all
                ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:text-blue-600"}
                ${i === 0 ? "font-medium" : ""}
                group hover:bg-blue-50`}
              >
                <span className="flex items-center gap-2">
                  {item}
                  {i === 0 && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${isMulticat ? "rotate-180" : ""}`}
                    />
                  )}
                </span>
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600
                  transform transition-all duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                />
              </li>
            )
          })}
        </ul>
      </nav>

      {isMulticat && <MultiNav ref={multiNavRef} />}
    </div>
  )
}


