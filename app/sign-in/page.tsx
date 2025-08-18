"use client";
import { setUpAccount, signIn, verifyToken } from '@/services/authService';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function SetupAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingToken, setCheckingToken] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    setUsername('');
    setPassword('');

    if (token) {
      (async () => {
        const verifySetupToken = await verifyToken(token);
        setError(verifySetupToken || '');
        setCheckingToken(false);
      })();
    } else {
      setCheckingToken(false);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (token) {
        await setUpAccount({ username, password, token });
        router.push('/sign-in');
        return;
      }
      const userData = await signIn({ username, password });
      localStorage.setItem('token', userData.token ?? '');
      localStorage.setItem('user', JSON.stringify(userData.userData));
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (checkingToken) return <p>Checking token...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h2 className="section-heading">
          {token ? 'Set Up Your Account' : 'Sign In'}
        </h2>
        <p className="mb-6 text-center text-[#a0a0a0]">
          {token ? 'Please enter your username and password to set up your account' : 'Please enter your phone number and password to sign in'}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Username"
            className="input mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Your Password"
            className="input mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button 
            type="submit" 
            className="btn btn-primary w-full" 
            disabled={loading}>
            {loading ? 'Processing...' : 'Next'}
          </button>
        </form>
      </div>
    </div>
  );
}
