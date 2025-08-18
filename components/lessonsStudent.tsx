"use client";

interface Lesson {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface Props {
  lessons: Lesson[];
  toggleComplete: (id: string) => void;
}

export default function LessonsStudent({ lessons, toggleComplete }: Props) {
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
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Completed</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((l) => (
              <tr key={l.id} className="border-t border-gray-200">
                <td className="px-4 py-3">{l.title}</td>
                <td className="px-4 py-3">{l.description}</td>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={l.completed}
                    onChange={() => toggleComplete(l.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
