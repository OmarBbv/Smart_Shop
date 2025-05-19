import { useRef } from "react";
import { Box } from "../ui/Box";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDivClick = () => {
    inputRef.current?.focus();
  };

  return (
    <Box
      onClick={handleDivClick}
      className="h-full w-full relative flex items-center flex-1 cursor-text"
    >
      <SearchIcon className="w-5 h-5 text-gray-400" />
      <input
        ref={inputRef}
        placeholder="Axtar"
        className="flex-1 h-1/2 ml-1 mr-4 border-none outline-none p-1 font-semibold"
      />
      <Box
        component="button"
        className="py-[6px] px-[16px] bg-blue-500 text-white rounded-md"
      >
        Axtar
      </Box>
    </Box>
  );
}
