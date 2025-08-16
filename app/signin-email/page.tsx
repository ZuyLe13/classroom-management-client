"use client";
import { API_URL } from '@/constants/api';
import axios from 'axios';
import { useRouter } from "next/navigation";
import React, { useState } from 'react'

export default function SignInEmail() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("test")

    try {
      console.log("test")

      setLoading(true);
      await axios.post(`${API_URL}/auth/loginEmail`, { email });
      localStorage.setItem('email', email);

      router.push('/verify-email');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h2 className="section-heading">Sign In</h2>
        <p className="mb-6 text-center text-[#a0a0a0]">
          Please enter your email to sign in
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email Address"
            className="input mb-4"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <button 
            type="submit" 
            className="btn btn-primary w-full" 
            disabled={loading}>
            {loading ? 'Processing...' : 'Next'}
          </button>
        </form>
        <p className="p-sm mt-4">
          Don’t have an account? <a className="text-blue-600 cursor-pointer">Sign up</a>
        </p>
      </div>
    </div>
  );
}
