"use client";
import StudentUpsert from '@/components/student-upsert';
import { getStudents } from '@/services/studentService';
import React, { useEffect, useState } from 'react'

interface Student {
  name: string;
  email: string;
  isVerified: boolean;
  phone: string;
}

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getStudents()
    .then(data => {
      setStudents(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching students:', error);
      setLoading(false);
    });
  }, [students]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r">
          <div className="p-6 text-xl font-bold">Logo</div>
          <nav className="flex flex-col space-y-2">
            <a className="px-6 py-3 bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-500">
              Manage Students
            </a>
            <a className="px-6 py-3 text-gray-600 hover:bg-gray-100">
              Manage Lessons
            </a>
            <a className="px-6 py-3 text-gray-600 hover:bg-gray-100">Message</a>
          </nav>
        </aside>
  
        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Manage Students</h1>
            <div className="flex items-center gap-2">
              <button className="btn btn-primary--outlined" onClick={() => setShowModal(true)}>
                + Add Student
              </button>
              <input
                type="text"
                placeholder="Filter"
                className="input input-filter"
              />
            </div>
          </div>
  
          <div className="bg-white border border-[#F1F1F1] rounded-lg shadow">
            <div className="px-4 py-3 text-2xl font-semibold border-b border-[#F1F1F1]">
              {students.length} Students
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.phone} className="border-t border-[#F1F1F1]">
                    <td className="px-4 py-3">{s.name}</td>
                    <td className="px-4 py-3">{s.email}</td>
                    <td className="px-4 py-3">
                      <span className="px-3 py-1 rounded bg-green-100 text-green-700">
                        {s.isVerified ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">
                        Edit
                      </button>
                      <button className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
  
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-300 opacity-50"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="relative z-10 max-w-[800px] mx-auto mt-[200px]">
            <StudentUpsert onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

    </div>
  );
}
