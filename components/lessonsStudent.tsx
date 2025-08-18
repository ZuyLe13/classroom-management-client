"use client";
import { getStudentLessons, Student, updateStudentLesson } from "@/services/studentService";
import { useEffect, useState } from "react";
import { useCallback } from "react";

interface Lesson {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
}

export default function LessonsStudent() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [user, setUser] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadMyLessons = useCallback(async () => {
    try {
      setLoading(true);
      if (user) {
        const myLessons = await getStudentLessons(user.phone);
        setLessons(myLessons);
      }
    } catch (error) {
      console.error("Error loading lessons:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const parsed = userStr ? JSON.parse(userStr) : null;
    setUser(parsed);
  }, []);

  useEffect(() => {
    if (user) {
      loadMyLessons();
    }
  }, [user, loadMyLessons]);

  const handleToggleCompleted = async (lessonId: string, completed: boolean) => {
    if (!user) return;
    try {
      await updateStudentLesson(lessonId, user.phone, completed);
      await loadMyLessons();
    } catch (err) {
      console.error("Failed to update completion:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="flex-1 p-8">
      <h1 className="text-2xl font-semibold mb-6">My Lessons</h1>

      <div className="bg-white border border-gray-200 rounded-md shadow overflow-hidden">
        <div className="px-4 py-3 text-2xl font-semibold border-b border-gray-200">
          {lessons.length} Lessons
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3">Completed</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((l) => (
              <tr key={l.id} className="border-t border-gray-200">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={l.isCompleted}
                    onChange={(e) =>
                      handleToggleCompleted(l.id, e.target.checked)
                    }
                  />
                </td>
                <td className="px-4 py-3">{l.title}</td>
                <td className="px-4 py-3">{l.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}