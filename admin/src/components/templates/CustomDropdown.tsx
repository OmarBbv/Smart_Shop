import { useState } from "react";

interface CustomDropdownProps {
    label: string;
    name: string;
    options: string[];
}

export function CustomDropdown({ label, name, options }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string | null>(null);

    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <div
                className={`border p-2 rounded-md cursor-pointer flex justify-between items-center ${isOpen ? "border-green-500" : "border-gray-300"
                    }`}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className="text-gray-700">{selected || "Seçmək"}</span>
                <svg
                    className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <input
                        type="text"
                        placeholder="Axtar..."
                        className="w-full border-b p-2 text-sm outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {filteredOptions.map((opt, idx) => (
                        <div
                            key={idx}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() => {
                                setSelected(opt);
                                setIsOpen(false);
                                setSearch("");
                            }}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
