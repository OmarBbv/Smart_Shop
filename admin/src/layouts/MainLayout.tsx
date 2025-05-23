import { Box } from "@/components/ui/Box";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
  return (
    <Box className="flex flex-1">
      <Box
        className="hidden xl:block w-[300px] min-h-screen border-r border-r-gray-200  px-5 pt-5"
        component="aside"
      >
        <Sidebar />
      </Box>
      <Box className="flex-1">
        <Header />
        <Box className="p-2 md:p-10">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
