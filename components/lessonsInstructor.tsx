"use client";
import { useState } from "react";
import { Student } from "@/services/studentService";

interface Lesson {
  id: string;
  title: string;
  description: string;
  assignedTo?: string;
}

interface Props {
  lessons: Lesson[];
  students: Student[];
  handleDeleteLesson: (id: string) => void;
}

export default function LessonsInstructor({
  lessons,
  students,
  handleDeleteLesson,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  return (
    <section className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Lessons</h1>
        <button
          className="btn btn-primary--outlined"
          onClick={() => {
            setShowModal(true);
            setSelectedLesson(null);
          }}
        >
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
                <td className="px-4 py-3">{l.assignedTo || "-"}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-green-500 text-white"
                    onClick={() => {
                      setShowAssignModal(true);
                      setSelectedLesson(l);
                    }}
                  >
                    Assign
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-blue-500 text-white"
                    onClick={() => {
                      setShowModal(true);
                      setSelectedLesson(l);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-500 text-white"
                    onClick={() => handleDeleteLesson(l.id)}
                  >
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
          <div
            className="absolute inset-0 bg-slate-300 opacity-50"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative z-10 max-w-[600px] mx-auto mt-[200px] bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              {selectedLesson ? "Edit Lesson" : "Add Lesson"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(selectedLesson ? "Lesson updated!" : "Lesson added!");
                setShowModal(false);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Title"
                defaultValue={selectedLesson?.title}
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                placeholder="Description"
                defaultValue={selectedLesson?.description}
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white"
                >
                  Save
                </button>
              </div>
            </form>
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
              onSubmit={(e) => {
                e.preventDefault();
                alert("Lesson assigned!");
                setShowAssignModal(false);
              }}
              className="space-y-4"
            >
              <select className="w-full border px-3 py-2 rounded">
                {students.map((s) => (
                  <option key={s.email} value={s.email}>
                    {s.name} ({s.email})
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200"
                  onClick={() => setShowAssignModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-500 text-white"
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
