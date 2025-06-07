import { Search } from "lucide-react";
import { Box } from "./Box";

interface Props {
    type: 'input' | 'select' | 'default' | 'search-input';
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    options?: Array<{ value: string | number, label: string }>;
}

export const CustomField = ({ type, label, name, value, onChange, options = [] }: Props) => {
    switch (type) {
        case 'input':
            return (
                <Box className="mb-4">
                    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                    <input
                        id={name}
                        name={name}
                        type="text"
                        value={value}
                        onChange={onChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </Box>
            );

        case 'select':
            return (
                <Box className="mb-4">
                    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                    <select
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </Box>
            );

        case 'default':
            return <input
                id={name}
                name={name}
                type="text"
                value={value}
                onChange={onChange}
                className="block w-full rounded-xs p-2 outline-none border border-gray-300"
            />;

        case 'search-input':
            return (
                <Box className="mb-4 border flex gap-2 items-center p-2 rounded">
                    <Search className="w-5 h-5 text-gray-500" />
                    <input
                        id={name}
                        name={name}
                        type="text"
                        value={value}
                        onChange={onChange}
                        className="block w-full sm:text-sm outline-none border-0 bg-white"
                    />
                </Box>
            );

    }
};
