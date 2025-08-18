"use client";
import { addStudent, Student, updateStudent } from '@/services/studentService';
import React, { useState } from 'react';

interface Props {
  student?: Student;
  onSuccess?: (student: Student) => void;
  onClose: () => void;
}

export default function StudentUpsert({ student, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    name: student?.name || '',
    phone: student?.phone || '',
    email: student?.email || '',
    role: student?.role || '',
    address: student?.address || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      let savedStudent;
      if (student) {
        savedStudent = await updateStudent(student.phone, { ...formData });
      } else {
        savedStudent = await addStudent(formData);
      }
      if (onSuccess) {
        onSuccess(savedStudent);
      }
    } catch (error) {
      console.error("Error creating student:", error);
    } finally {
      setLoading(false);
    }
    onClose();
  };

  return (
    <div className='bg-white px-6 py-8 rounded-md'>
      <h1 className='section-heading mb-4'>{student ? "Edit Student" : "Create Student"}</h1>
      <form onSubmit={handleSubmit} >
        <div className='grid grid-cols-2 gap-6'>
          <div className='form-group'>
            <label htmlFor="">Student Name</label>
            <input 
              type="text" 
              className='input' 
              value={formData.name}
              onChange={(e) => {setFormData({...formData, name: e.target.value})}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="">Phone Number</label>
            <input 
              type="text" 
              className='input' 
              value={formData.phone}
              onChange={(e) => {setFormData({...formData, phone: e.target.value})}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="">Email Address</label>
            <input 
              type="text" 
              className='input' 
              value={formData.email}
              onChange={(e) => {setFormData({...formData, email: e.target.value})}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="">Role</label>
            <input 
              type="text" 
              className='input' 
              value={formData.role}
              onChange={(e) => {setFormData({...formData, role: e.target.value})}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="">Address</label>
            <input 
              type="text" 
              className='input' 
              value={formData.address}
              onChange={(e) => {setFormData({...formData, address: e.target.value})}}
            />
          </div>
        </div>

        <div className='flex items-end justify-end gap-4 mt-6'>
          <button type="button" className='btn btn-closed' onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className='btn btn-primary' disabled={loading}>
            {loading 
              ? (student ? "Updating..." : "Creating...") 
              : (student ? "Update" : "Create")}
          </button>
        </div>
      </form>
    </div>
  )
}
