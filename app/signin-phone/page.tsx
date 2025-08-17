"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { errorMessages } from "@/constants/error";
import { createAccessCode } from "@/services/authService";

export default function SignInPhone() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPhone = phone.replace(/\s+/g, '');

    if (!/^[0-9]{11}$/.test(trimmedPhone)) {
      setError(errorMessages.INVALID_PHONE_NUMBER);
      return;
    }

    try {
      setLoading(true);
      setError('');
      await createAccessCode(trimmedPhone);
      router.push('/verify-phone');
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
          Please enter your phone to sign in
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Your Phone Number"
            className="input mb-4"
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
          />
          {error && <p className="error">{error}</p>}
          <button 
            type="submit" 
            className="btn btn-primary w-full" 
            disabled={loading}>
            {loading ? 'Processing...' : 'Next'}
          </button>
        </form>
        <p className="p-sm mt-4">
          passwordless authentication methods.
        </p>
        <p className="p-sm mt-2">
          Don’t have an account? <a className="text-blue-600 cursor-pointer">Sign up</a>
        </p>
      </div>
    </div>
  );
}