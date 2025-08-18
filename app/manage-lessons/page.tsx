"use client";
import AuthGuard from "@/components/authGuard";
import Header from "@/components/header";
import LessonsInstructor from "@/components/lessonsInstructor";
import LessonsStudent from "@/components/lessonsStudent";
import Sidebar from "@/components/sidebar";
import { Student } from "@/services/studentService";
import { useState, useEffect } from "react";

interface Lesson {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  assignedTo?: string;
}

export default function ManageLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [user, setUser] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsed = user ? JSON.parse(user) : null;
    setUser(parsed);

    setTimeout(() => {
      const allLessons: Lesson[] = [
        { id: "1", title: "Intro to React", description: "Basics of React.js", completed: false, assignedTo: "alice@example.com" },
        { id: "2", title: "Next.js Fundamentals", description: "Learn SSR/SSG", completed: true, assignedTo: "bob@example.com" },
      ];
      const allStudents: Student[] = [
        { name: "Alice", email: "alice@example.com", phone: "111", role: "student", address: "" },
        { name: "Bob", email: "bob@example.com", phone: "222", role: "student", address: "" },
      ];
      setLessons(allLessons);
      setStudents(allStudents);
      setLoading(false);
    }, 500);
  }, []);

  const handleDeleteLesson = (id: string) => {
    setLessons(lessons.filter((l) => l.id !== id));
  };

  const toggleComplete = (id: string) => {
    setLessons(
      lessons.map((l) => (l.id === id ? { ...l, completed: !l.completed } : l))
    );
  };

  if (loading) return <p>Loading...</p>;

  const visibleLessons =
    user?.role === "student"
      ? lessons.filter((l) => l.assignedTo === user.email)
      : lessons;

  return (
    <AuthGuard>
      <Header />
      <Sidebar />
      <div className="ml-[240px] mt-[74px] bg-gray-50">
        {user?.role === "instructor" ? (
          <LessonsInstructor
            lessons={visibleLessons}
            students={students}
            handleDeleteLesson={handleDeleteLesson}
          />
        ) : (
          <LessonsStudent
            lessons={visibleLessons}
            toggleComplete={toggleComplete}
          />
        )}
      </div>
    </AuthGuard>
  );
}
