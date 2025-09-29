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
import AdminBlogs from "@/components/Admin-Blogs";
// import EditBlogPage from "./edit-blog/page";
// import DeleteBlogPage from "./delete-blog/page";

interface Admin {
  name: string;
  email: string;
}

export default function AdminPage() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [activePage, setActivePage] = useState<"create" | "edit" | "delete" |"all-blogs">(
    "create"
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminData = localStorage.getItem("adminInfo");

    if (!token || !adminData) {
      router.push("/admin");
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
      <nav className="bg-indigo-700 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 font-bold text-lg">
          📝 Admin Dashboard
        </div>
        <div className="hidden md:flex items-center gap-6 ">
          <NavButton
            label="Create Blog"
            icon={<FiPlusCircle />}
            active={activePage === "create"}
            onClick={() => setActivePage("create")}
            
          />
          <NavButton
            label="All-Blogs"
            icon={<FiEdit />}
            active={activePage === "all-blogs"}
            onClick={() => setActivePage("all-blogs")}
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
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>
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
            label="All-Blogs"
            icon={<FiEdit />}
            active={activePage === "all-blogs"}
            onClick={() => {
              setActivePage("all-blogs");
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
        {activePage === "all-blogs" && <AdminBlogs/>}
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
      className={`flex items-center gap-2 px-3 py-1 rounded-md transition cursor-pointer
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
