import { Box } from "@/components/ui/Box";
import { NavLink } from "react-router-dom";
import { Home, Users, Package, PackagePlus } from "lucide-react";
import { Typography } from "@/components/ui/Typography";

interface NavProps {
  name: string;
  icon: React.ElementType;
  href: string;
  count?: number;
}

const navItems: NavProps[] = [
  {
    name: "Ana səhifə",
    icon: Home,
    href: "/",
  },
  {
    name: "Istifadəçilər",
    icon: Users,
    href: "/istifadeciler",
  },
  {
    name: "Məhsullar",
    icon: Package,
    href: "/mehsullar",
    count: 5,
  },
  {
    name: "Yeni Məhsul Əlavə Et",
    icon: PackagePlus,
    href: "/mehsullar/yeni",
  },
] as const;

export default function Sidebar() {

  return (
    <Box className="flex flex-col" component="ul">
      <Typography
        className="h-10 text-lg mt-2 font-extrabold tracking-widest text-blue-500"
        component="a"
        children="SMART SHOP"
      />
      <Box className="my-4 px-3 py-6 bg-gray-100 rounded-lg">
        <Box
          component="p"
          className="text-xl font-semibold text-gray-600 select-none"
        >
          Xoş Gəlmisiz! Ömər 👋
        </Box>
      </Box>
      <Box className="space-y-1" component="ul">
        {navItems.map((item, i) => (
          <Box
            key={i}
            component="li"
            className="list-none"
          >
            <NavLink
              to={item.href}
              end={item.href === '/mehsullar'}
              className={({ isActive }) =>
                [
                  "flex items-center p-[8px_12px_8px_16px] flex-1 h-[44px] gap-2 cursor-pointer space-x-2 rounded-sm transition-all duration-200 justify-between",
                  isActive
                    ? "bg-[#D5E5FA] text-[#1877F2] hover:bg-[#b6d6ff]"
                    : "text-[#637381] hover:bg-gray-100"
                ].join(" ")
              }
            >
              <Box className="flex items-center gap-2 flex-1">
                <item.icon className="w-5 h-5" />
                <Typography className="text-sm block font-medium">
                  {item.name}
                </Typography>
              </Box>
              {item.count && item?.count > 0 && (
                <Box
                  component="span"
                  className="font-bold text-xs p-2 w-8 h-8 flex justify-center items-center rounded-md bg-[#FFE9D5] text-[#7A0916]"
                >
                  <span>+</span>
                  <span>{item.count}</span>
                </Box>
              )}
            </NavLink>
          </Box>
        ))}

      </Box>
    </Box>
  );
}
