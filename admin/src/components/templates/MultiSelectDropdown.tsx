import { usePostStore } from "@/stores/productPostStore";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

interface MultiSelectDropdownProps {
    label: string;
    name: string;
    options: string[];
}

export function MultiSelectDropdown({ label, name, options }: MultiSelectDropdownProps) {
    const { setCurrentPost } = usePostStore(useShallow((state) => ({
        setCurrentPost: state.setCurrentPost,
    })));

    const [state, setState] = useState({
        isOpen: false,
        search: "",
        selectedOptions: [] as string[],
    });

    const toggleOption = (option: string) => {
        const newSelected = state.selectedOptions.includes(option)
            ? state.selectedOptions.filter((opt) => opt !== option)
            : [...state.selectedOptions, option];

        setState(prev => ({
            ...prev,
            selectedOptions: newSelected
        }));

        setCurrentPost({
            features: {
                ...(usePostStore.getState().currentPost.features || {}),
                [name]: newSelected,
            }
        });
    };

    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(state.search.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <div
                className={`border p-2 rounded-md cursor-pointer flex justify-between items-center ${state.isOpen ? "border-green-500" : "border-gray-300"
                    }`}
                onClick={() => setState(prev => ({ ...prev, isOpen: !prev.isOpen }))}
            >
                <span className="text-gray-700 text-sm">
                    {state.selectedOptions.length > 0 ? state.selectedOptions.join(", ") : "Seçmək"}
                </span>
                <svg
                    className={`w-4 h-4 transform transition-transform ${state.isOpen ? "rotate-180" : ""
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {state.isOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <input
                        type="text"
                        placeholder="Axtar..."
                        className="w-full border-b p-2 text-sm outline-none"
                        value={state.search}
                        onChange={(e) => setState(prev => ({ ...prev, search: e.target.value }))}
                    />
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.map((opt, idx) => (
                            <label
                                key={idx}
                                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            >
                                <input
                                    type="checkbox"
                                    checked={state.selectedOptions.includes(opt)}
                                    onChange={() => toggleOption(opt)}
                                    className="mr-2"
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
