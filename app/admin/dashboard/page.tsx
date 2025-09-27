"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiEdit,
  FiTrash,
  FiPlusCircle,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

// Import your components
import TestBlogPage from "@/components/Test-Blog";
// import EditBlogPage from "./edit-blog/page";
// import DeleteBlogPage from "./delete-blog/page";

interface Admin {
  name: string;
  email: string;
}

export default function AdminPage() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [activePage, setActivePage] = useState<"create" | "edit" | "delete">(
    "create"
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminData = localStorage.getItem("adminInfo");

    if (!token || !adminData) {
      router.push("/admin"); // if not logged in → redirect to login
      return;
    }

    try {
      setAdmin(JSON.parse(adminData));
    } catch (err) {
      console.error("Invalid admin data in localStorage", err);
      router.push("/admin");
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="bg-indigo-700 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 font-bold text-lg">
          📝 Admin Dashboard
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavButton
            label="Create Blog"
            icon={<FiPlusCircle />}
            active={activePage === "create"}
            onClick={() => setActivePage("create")}
          />
          <NavButton
            label="Edit Blog"
            icon={<FiEdit />}
            active={activePage === "edit"}
            onClick={() => setActivePage("edit")}
          />
          <NavButton
            label="Delete Blog"
            icon={<FiTrash />}
            active={activePage === "delete"}
            onClick={() => setActivePage("delete")}
          />
          {admin && (
            <span className="flex items-center gap-2 font-medium bg-indigo-600 px-3 py-1 rounded-lg">
              <FiUser /> {admin.name}
            </span>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-600 text-white flex flex-col gap-3 p-4">
          <NavButton
            label="Create Blog"
            icon={<FiPlusCircle />}
            active={activePage === "create"}
            onClick={() => {
              setActivePage("create");
              setMenuOpen(false);
            }}
          />
          <NavButton
            label="Edit Blog"
            icon={<FiEdit />}
            active={activePage === "edit"}
            onClick={() => {
              setActivePage("edit");
              setMenuOpen(false);
            }}
          />
          <NavButton
            label="Delete Blog"
            icon={<FiTrash />}
            active={activePage === "delete"}
            onClick={() => {
              setActivePage("delete");
              setMenuOpen(false);
            }}
          />
          {admin && (
            <span className="flex items-center gap-2 font-medium mt-2">
              <FiUser /> {admin.name}
            </span>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition mt-2"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow p-6 max-w-6xl mx-auto w-full">
        {activePage === "create" && <TestBlogPage />}
        {activePage === "edit" && (
          <div className="text-center text-gray-600">✏️ Edit Blog Page</div>
        )}
        {activePage === "delete" && (
          <div className="text-center text-gray-600">🗑️ Delete Blog Page</div>
        )}
      </main>
    </div>
  );
}


function NavButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1 rounded-md transition 
        ${
          active
            ? "bg-yellow-400 text-black font-semibold"
            : "hover:bg-indigo-500"
        }
      `}
    >
      {icon} {label}
    </button>
  );
}
