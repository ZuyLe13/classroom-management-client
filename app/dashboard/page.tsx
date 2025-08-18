"use client";
import AuthGuard from '@/components/authGuard';
import Header from '@/components/header';
import ProtectedRoute from '@/components/protectedRoute';
import Sidebar from '@/components/sidebar';
import StudentUpsert from '@/components/student-upsert';
import { deleteStudent, getStudents } from '@/services/studentService';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Student {
  name: string;
  email: string;
  isVerified: boolean;
  phone: string;
  role: string;
  address: string;
}

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<Student | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    setUser(userString ? JSON.parse(userString) : null);

    getStudents()
    .then(data => {
      setStudents(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching students:', error);
      setLoading(false);
    });
  }, []);

  const fetchStudents = async () => {
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

  const handleDeleteStudent = async (phone: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setLoading(true);
      try {
        await deleteStudent(phone);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <AuthGuard>
      <ProtectedRoute roleAllowed={['instructor']}>
        <Header />
        <Sidebar />
        <section className="ml-[240px] mt-[74px] p-8">
          <div className="flex justify-between items-center mb-6 relative">
            <h1 className="text-2xl font-semibold">Manage Students</h1>

            <div className="flex items-center gap-4 relative">
              <button
                className="btn btn-primary--outlined"
                onClick={() => {
                  setShowModal(true);
                  setSelectedStudent(null);
                }}
              >
                + Add Student
              </button>
              <input
                type="text"
                placeholder="Filter"
                className="input input-filter"
              />
            </div>
          </div>

          {/* Table */}
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
                      <button
                        className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                        onClick={() => {
                          setShowModal(true);
                          setSelectedStudent(s);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handleDeleteStudent(s.phone)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-slate-300 opacity-50"
                onClick={() => setShowModal(false)}></div>
            <div className="relative z-10 max-w-[800px] mx-auto mt-[200px]">
              <StudentUpsert
                onClose={() => setShowModal(false)}
                onSuccess={() => {
                  setShowModal(false);
                  fetchStudents();
                }}
                student={selectedStudent ?? undefined}
              />
            </div>
          </div>
        )}
      </ProtectedRoute>
    </AuthGuard>
  );
}