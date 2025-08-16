"use client";
import { API_URL } from '@/constants/api';
import axios from 'axios';
import React, { useState } from 'react';

export default function StudentUpsert({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${API_URL}/addStudent`, formData);
    } catch (error) {
      console.error("Error creating student:", error);
    } finally {
      setLoading(false);
    }
    onClose();
  };

  return (
    <div className='bg-white px-6 py-8 rounded-md'>
      <h1 className='section-heading mb-4'>Create Student</h1>
      <form onSubmit={handleSubmit} >
        <div className='grid grid-cols-2 gap-6'>
          <div className='form-group'>
            <label htmlFor="">Student Name</label>
            <input 
              type="text" 
              className='input' 
              onChange={(e) => {setFormData({...formData, name: e.target.value})}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="">Phone Number</label>
            <input 
              type="text" 
              className='input' 
              onChange={(e) => {setFormData({...formData, phone: e.target.value})}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="">Email Address</label>
            <input 
              type="text" 
              className='input' 
              onChange={(e) => {setFormData({...formData, email: e.target.value})}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="">Role</label>
            <input 
              type="text" 
              className='input' 
              onChange={(e) => {setFormData({...formData, role: e.target.value})}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="">Address</label>
            <input 
              type="text" 
              className='input' 
              onChange={(e) => {setFormData({...formData, address: e.target.value})}}
            />
          </div>
        </div>

        <div className='flex items-end justify-end mt-6'>
          <button type="submit" className='btn btn-primary' disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  )
}
