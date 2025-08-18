"use client";
import AuthGuard from "@/components/authGuard";
import Header from "@/components/header";
import LessonsInstructor from "@/components/lessonsInstructor";
import LessonsStudent from "@/components/lessonsStudent";
import Sidebar from "@/components/sidebar";
import { Student } from "@/services/studentService";
import { useState, useEffect } from "react";

export default function ManageLessons() {
  const [user, setUser] = useState<Student | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsed = user ? JSON.parse(user) : null;
    setUser(parsed);
  }, []);

  return (
    <AuthGuard>
      <Header />
      <Sidebar />
      <div className="ml-[240px] mt-[74px] bg-gray-50">
        {user?.role === "instructor" ? (
          <LessonsInstructor />
        ) : (
          <LessonsStudent />
        )}
      </div>
    </AuthGuard>
  );
}