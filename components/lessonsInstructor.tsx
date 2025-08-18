"use client";
import { useEffect, useState } from "react";
import { getStudents, Student } from "@/services/studentService";
import LessonUpsert from "./lesson-upsert";
import { assignLessonToStudent, deleteLesson, getAllLessons } from "@/services/instructorService";

interface Lesson {
  id: string;
  title: string;
  description: string;
  assignedTos?: string[];
}

export default function LessonsInstructor() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLessons();
    loadStudents();
  }, []);

  const loadLessons = async () => {
    setLoading(true);
    try {
      const data = await getAllLessons();
      setLessons(data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (selectedLesson) {
        await assignLessonToStudent(selectedLesson.id, selectedStudent?.phone || "");
        await loadLessons();
      }
    } catch (error) {
      console.error('Error assigning lesson to student:', error);
    } finally {
      setLoading(false);
    }
    setShowAssignModal(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const student = students.find((s) => s.phone === selectedValue);
    setSelectedStudent(student || null);
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (confirm("Are you want to delete this lesson?")) {
      try {
        setLoading(true);
        await deleteLesson(lessonId);
        await loadLessons();
      } catch (error) {
        console.error('Error deleting lesson:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Lessons</h1>
        <button
          className="btn btn-primary--outlined"
          onClick={() => {
            setShowModal(true);
            setSelectedLesson(null);
          }}>
          + Add Lesson
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-md shadow">
        <div className="px-4 py-3 text-2xl font-semibold border-b border-gray-200">
          {lessons.length} Lessons
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Assigned To</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((l) => (
              <tr key={l.id} className="border-t border-gray-200">
                <td className="px-4 py-3">{l.title}</td>
                <td className="px-4 py-3">{l.description}</td>
                <td className="px-4 py-3 truncate">{l.assignedTos?.join(", ") || "-"}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    className="btn--sm btn-assign"
                    onClick={() => {
                      setShowAssignModal(true);
                      setSelectedLesson(l);
                    }}>
                    Assign
                  </button>
                  <button
                    className="btn--sm btn-edit"
                    onClick={() => {
                      setShowModal(true);
                      setSelectedLesson(l);
                    }}>
                    Edit
                  </button>
                  <button
                    className="btn--sm btn-delete"
                    onClick={() => handleDeleteLesson(l.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-slate-300 opacity-50"
              onClick={() => setShowModal(false)}></div>
          <div className="relative z-10 max-w-[800px] mx-auto mt-[200px]">
            <LessonUpsert
              onClose={() => setShowModal(false)}
              onSuccess={() => {
                setShowModal(false);
                loadLessons();
              }}
              lesson={selectedLesson ?? undefined}
            />
          </div>
        </div>
      )}

      {/* Modal Assign */}
      {showAssignModal && selectedLesson && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-300 opacity-50"
            onClick={() => setShowAssignModal(false)}
          ></div>
          <div className="relative z-10 max-w-[500px] mx-auto mt-[200px] bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Assign &quot;{selectedLesson.title}&quot; to Student
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <select
                className="input"
                value={selectedStudent?.phone || ""}
                onChange={handleOnChange}
              >
                <option value="" disabled>Select a student</option>
                {students.filter((s) => s.role === "student").map((s) => (
                  <option key={s.phone} value={s.phone}>{s.name}</option>
                ))}
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-closed"
                  onClick={() => setShowAssignModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
