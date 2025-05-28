import { useState } from 'react'
import { CategoryType } from "@/types/categoryTypes"

interface Props {
    data: CategoryType[],
    setCategoryName: React.Dispatch<React.SetStateAction<string>>
    setCategoryPathUrl: React.Dispatch<React.SetStateAction<string[]>>
    onLastCategorySelected?: () => void,
}

export function RenderCategory({ data, setCategoryName, setCategoryPathUrl, onLastCategorySelected }: Props) {
    const [allCategory] = useState([...data]);
    const [categoryPath, setCategoryPath] = useState<CategoryType[]>([]);

    const getCurrentCategories = (): CategoryType[] => {
        let current = { subcategories: allCategory }
        for (const selected of categoryPath) {
            current = current.subcategories?.find(cat => cat.id === selected.id) || { subcategories: [] };
        }
        if (current) {
            setCategoryName(current.name);
        }
        return current.subcategories || [];
    };

    const handleCategoryClick = (cat: CategoryType) => {
        setCategoryPath(prev => [...prev, cat])
        setCategoryName(cat.name)
        setCategoryPathUrl(prev => [...prev, cat.name])

        if (!cat.subcategories || cat.subcategories.length === 0) {
            if (onLastCategorySelected) {
                onLastCategorySelected();
            }
        }
    }

    const handleGoBack = () => {
        setCategoryPath(categoryPath.slice(0, -1));
    }

    const currentCategories = getCurrentCategories();

    return (
        <div className="p-4 flex flex-col gap-2">
            {categoryPath.length > 0 && (
                <div>
                    <button
                        onClick={handleGoBack}
                        className="mb-4 text-blue-500 underline"
                    >
                        Geri
                    </button>
                </div>
            )}

            <ul className="grid grid-cols-2 gap-4 w-full">
                {currentCategories.map((cat) => (
                    <li
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat)}
                        className="cursor-pointer text-gray-800 hover:underline transition"
                    >
                        {cat.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
