import { usePostStore } from "@/stores/productPostStore";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

interface CustomDropdownProps {
    label: string;
    name: string;
    options: string[];
}

export function CustomDropdown({ label, name, options }: CustomDropdownProps) {
    const { setCurrentPost } = usePostStore(useShallow((state) => ({
        setCurrentPost: state.setCurrentPost,
    })));

    const [state, setState] = useState({
        isOpen: false,
        search: "",
        selected: null as string | null,
    });

    const toggleDropdown = () => {
        setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
    };

    const handleSearchChange = (value: string) => {
        setState(prev => ({ ...prev, search: value }));
    };

    const handleSelect = (value: string) => {
        setState({
            isOpen: false,
            search: "",
            selected: value,
        });

        setCurrentPost({
            features: {
                ...(usePostStore.getState().currentPost.features || {}),
                [name]: value,
            }
        });
    };


    const filteredOptions = options.filter(opt =>
        opt.toLowerCase().includes(state.search.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <div
                className={`border p-2 rounded-md cursor-pointer flex justify-between items-center ${state.isOpen ? "border-green-500" : "border-gray-300"
                    }`}
                onClick={toggleDropdown}
            >
                <span className="text-gray-700">{state.selected || "Seçmək"}</span>
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
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    {filteredOptions.map((opt, idx) => (
                        <div
                            key={idx}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() => handleSelect(opt)}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
