"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Student } from "@/services/studentService";

export default function Sidebar() {
  const [user, setUser] = useState<Student | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    setUser(userString ? JSON.parse(userString) : null);
  }, []);

  const linkClass = (path: string) =>
    `px-6 py-3 hover:bg-gray-100 ${
      pathname === path
        ? "bg-blue-50 text-blue-600 font-medium border-r-4 border-blue-500"
        : "text-gray-600"
    }`;

  return (
    <aside className="fixed top-0 left-0 h-screen w-60 z-10 bg-white border-r border-[#dfdede]">
      <div className="px-6 py-8 text-xl font-bold">Logo</div>
      <nav className="flex flex-col space-y-2">
        {user?.role === "instructor" && (
          <a href="/dashboard" className={linkClass("/dashboard")}>
            Manage Students
          </a>
        )}
        <a href="/manage-lessons" className={linkClass("/manage-lessons")}>
          Manage Lessons
        </a>
        <a href="/messages" className={linkClass("/messages")}>
          Message
        </a>
      </nav>
    </aside>
  );
}
