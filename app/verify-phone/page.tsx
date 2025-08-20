"use client";
import { errorMessages } from "@/constants/error";
import { validateAccessCodePhone } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyPhone() {
  const [phone, setPhone] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedPhone = localStorage.getItem('phone');
    if (storedPhone) {
      setPhone(storedPhone);
    } else {
      router.push('/sign-in');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedAccessCode = accessCode.replace(/\s+/g, '');

    if (trimmedAccessCode.length !== 6) {
      setError(errorMessages.INVALID_ACCESS_CODE);
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      const token = await validateAccessCodePhone(phone, trimmedAccessCode);
      if (token) {
        localStorage.setItem('token', token);
      }
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h2 className="section-heading">Phone Verification</h2>
        <p className="mb-6 text-center text-[#a0a0a0]">
          Please enter your code that send to your phone
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter Your Code"
            className="input mb-4"
            onChange={(e) => {setAccessCode(e.target.value)}}
            disabled={loading}
          />
          {error && <p className="error">{error}</p>}
          <button 
            type="submit" 
            className="btn btn-primary w-full" 
            disabled={loading}>
            {loading ? 'Verifying...' : 'Submit'}
          </button>
        </form>
        <p className="p-sm mt-4">
          Code not received? <a className="text-blue-600 cursor-pointer">Send again</a>
        </p>
      </div>
    </div>
  );
}