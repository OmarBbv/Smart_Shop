import { ChevronDown, Search } from "lucide-react";
import { Box } from "./ui/Box";
import { CustomButton } from "./ui/CustomButton";

interface Props {
    type: 'input' | 'select' | 'default' | 'search-input' | 'template';
    label?: string;
    name: string;
    value: string;
    onChange: () => void;
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
                        className="block w-full sm:text-sm outline-none border-0"
                    />
                </Box>
            );

        case 'template':
            return <Box className="flex flex-col gap-1 relative">
                <label htmlFor="">name</label>
                <Box className="flex items-center px-2 relative border rounded-sm h-[44px] w-[270px]">
                    <CustomButton className="w-full h-full outline-none text-sm font-semibold cursor-pointer" />
                    <ChevronDown className="w-5 h-5" />
                </Box>
                <Box className="absolute top-full bg-white z-40 w-full py-1">
                    <div className="relative p-2 border border-gray-200">
                        <input type="text" className="w-full border border-gray-300 outline-none py-1 px-2 rounded-sm" />
                        <ul className="flex flex-col">
                            <li className="w-full py-2 hover:bg-gray-200">1</li>
                            <li className="w-full py-2 hover:bg-gray-200">2</li>
                            <li className="w-full py-2 hover:bg-gray-200">3</li>
                            <li className="w-full py-2 hover:bg-gray-200">4</li>
                            <li className="w-full py-2 hover:bg-gray-200">5</li>
                            <li className="w-full py-2 hover:bg-gray-200">6</li>
                        </ul>
                    </div>
                </Box>
            </Box>
    }
};
