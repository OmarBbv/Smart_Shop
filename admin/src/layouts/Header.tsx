import { Box } from "@/components/ui/Box";
import { Typography } from "@/components/ui/Typography";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SearchComponent from "@/components/header/Search";
import { AnimatePresence, motion } from "motion/react";

export default function Header() {
  const [isSearch, setIsSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const liRef = useRef<HTMLLIElement | null>(null);

  const handleShowSearch = () => {
    if (liRef.current) {
      setIsSearch((prev) => !prev);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <Box component="header" className="h-[72px] px-6 relative">
      <AnimatePresence>
        {isSearch && (
          <motion.div
            ref={searchRef}
            className="h-[72px] w-full absolute top-0 right-0 flex items-center px-4 shadow-sm bg-white z-50"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{
              duration: 0.2,
              exit: { duration: 0.2 },
            }}
          >
            <SearchComponent />
          </motion.div>
        )}
      </AnimatePresence>

      <Box className="h-full flex items-center w-full justify-end">
        <Box component="ul" className="flex items-center justify-center gap-2">
          <Box
            ref={liRef}
            onClick={handleShowSearch}
            component="li"
            className="p-2 w-8 h-8 flex justify-center items-center border border-gray-200 rounded-sm cursor-pointer"
          >
            <Box
              component="button"
              className="flex justify-center items-center w-full h-full"
            >
              <Search className="w-full h-full" />
            </Box>
          </Box>
          <Box
            component="li"
            className="w-8 h-8 p-[2px] rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500"
          >
            <Box
              className="w-full h-full bg-white rounded-full flex justify-center items-center"
              component="button"
            >
              <Typography className="text-xs">J</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
