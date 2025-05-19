"use client";

import { Box } from "@/components/ui/Box";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  SirenIcon as S,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const allUsers = Array(25)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: `Adam Trantow ${index + 1}`,
    company: "Mohr, Langworth and Hills",
    role:
      index % 3 === 0
        ? "UI Designer"
        : index % 3 === 1
          ? "Developer"
          : "Product Manager",
    verified: index % 4 !== 0,
    status: index % 5 === 0 ? "Inactive" : "Active",
  }));

const tableData = {
  thead: [
    { id: "name", label: "Name" },
    { id: "company", label: "Company" },
    { id: "role", label: "Role" },
    { id: "verified", label: "Verified" },
    { id: "status", label: "Status" },
  ],
};

export default function UserPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handleFocusBorder = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box className="bg-[#f8fbfd] rounded-2xl shadow-lg overflow-hidden">
        <Box className="h-[96px] px-6 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Box
              onClick={handleFocusBorder}
              className={cn(
                "h-12 w-72 border border-gray-300 rounded-md flex items-center px-2 font-medium text-gray-600 transition-all duration-300",
                isFocused && "border-blue-500 shadow-sm shadow-blue-100"
              )}
            >
              <S className="w-5 h-5 text-gray-500" />
              <input
                ref={inputRef}
                className="h-full w-full px-3 outline-none bg-transparent"
                placeholder="Axtar"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </Box>
          </motion.div>

          <div className="flex items-center gap-2">
            <select
              className="h-10 px-3 border border-gray-300 rounded-md text-gray-700 bg-white"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing items per page
              }}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={15}>15 per page</option>
            </select>
          </div>
        </Box>

        <Box className="w-full bg-white p-4">
          <UserTable
            data={{ ...tableData, tbody: currentUsers }}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      </Box>
    </motion.div>
  );
}

function UserTable({ data, currentPage, totalPages, onPageChange }: any) {
  return (
    <div className="overflow-hidden">
      <Box component="table" className="w-full text-sm border-collapse">
        <thead>
          <Box component="tr" className="bg-[#f4f8fb] text-gray-500">
            {data.thead.map((col: any) => (
              <Box
                key={col.id}
                component="th"
                className="py-4 px-6 font-medium text-left"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center"
                >
                  {col.label}
                </motion.div>
              </Box>
            ))}
            <Box
              component="th"
              className="py-4 px-6 font-medium text-left w-24"
            >
              Actions
            </Box>
          </Box>
        </thead>
        <motion.tbody
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="min-h-[400px]"
        >
          <AnimatePresence mode="wait">
            {data.tbody.map((user: any, idx: number) => (
              <UserRow
                key={`${user.id}-${currentPage}`}
                user={user}
                index={idx}
                columns={data.thead}
              />
            ))}
          </AnimatePresence>

          {data.tbody.length === 0 && (
            <tr>
              <td
                colSpan={data.thead.length + 1}
                className="text-center py-8 text-gray-500"
              >
                No users found
              </td>
            </tr>
          )}
        </motion.tbody>
      </Box>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 px-2">
        <div className="text-sm text-gray-500">
          Showing {data.tbody.length > 0 ? (currentPage - 1) * 5 + 1 : 0} to{" "}
          {Math.min(currentPage * 5, data.tbody.length)} of {data.tbody.length}{" "}
          entries
        </div>

        <div className="flex items-center gap-1">
          <PaginationButton
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </PaginationButton>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationButton
              key={page}
              active={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PaginationButton>
          ))}

          <PaginationButton
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}

function PaginationButton({ children, active, disabled, onClick }: any) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        active
          ? "bg-blue-500 text-white"
          : "bg-white text-gray-700 hover:bg-gray-100",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

function UserRow({ user, index, columns }: any) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border-b border-gray-100 hover:bg-[#f7fafc] transition-colors"
    >
      {columns.map((col: any) => (
        <Box key={col.id} component="td" className="py-5 px-6 text-gray-700">
          {col.id === "verified" ? (
            user.verified ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600"
              >
                ✔
              </motion.span>
            ) : (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600"
              >
                ✖
              </motion.span>
            )
          ) : col.id === "status" ? (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full font-semibold text-xs ${user.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}
            >
              {user.status}
            </motion.span>
          ) : (
            <motion.div
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {user[col.id]}
            </motion.div>
          )}
        </Box>
      ))}

      {/* Dropdown */}
      <Box component="td" className="relative py-5 px-6 text-right">
        <motion.button
          ref={buttonRef}
          onClick={() => setOpen((prev) => !prev)}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <MoreVertical size={20} />
        </motion.button>

        <AnimatePresence>
          {open && (
            <div ref={dropdownRef}>
              <ActionDropdown
                onEdit={() => {
                  alert(`Düzenle: ${user.name}`);
                  setOpen(false);
                }}
                onDelete={() => {
                  alert(`Sil: ${user.name}`);
                  setOpen(false);
                }}
              />
            </div>
          )}
        </AnimatePresence>
      </Box>
    </motion.tr>
  );
}

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

function ActionDropdown({ onEdit, onDelete }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute right-10 top-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-10 overflow-hidden"
      role="menu"
    >
      <motion.button
        whileHover={{ backgroundColor: "#f3f4f6", x: 5 }}
        onClick={onEdit}
        className="block w-full text-left px-4 py-3 text-sm text-gray-700 transition-colors border-b border-gray-100"
        role="menuitem"
      >
        Düzenle
      </motion.button>
      <motion.button
        whileHover={{ backgroundColor: "#fee2e2", x: 5 }}
        onClick={onDelete}
        className="block w-full text-left px-4 py-3 text-sm text-red-600 transition-colors"
        role="menuitem"
      >
        Sil
      </motion.button>
    </motion.div>
  );
}
