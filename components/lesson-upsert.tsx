"use client";

import { createLesson } from "@/services/instructorService";
import { useState } from "react";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  assignedTo?: string;
}

interface Props {
  lesson?: Lesson;
  onSuccess: (lesson: Lesson) => void;
  onClose: () => void;
}

export default function LessonUpsert({ onClose, lesson, onSuccess }: Props) {
  const [form, setForm] = useState<Lesson>({
    id: lesson?.id || "",
    title: lesson?.title || "",
    description: lesson?.description || "",
    assignedTo: lesson?.assignedTo,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newLesson = await createLesson(form);
      if (onSuccess) {
        onSuccess(newLesson);
      }
    } catch (error) {
      console.error("Error saving lesson:", error);
    } finally {
      setLoading(false);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-slate-300 opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative z-10 max-w-[600px] mx-auto mt-[200px] bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          {lesson ? "Edit Lesson" : "Add Lesson"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            placeholder="Id"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            className="input"
            required
          />
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="input"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="input"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-closed"
              onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary" disabled={loading}>
              {loading
                ? (lesson ? "Updating..." : "Creating...")
                : (lesson ? "Update" : "Create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
