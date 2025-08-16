"use client";
import { API_URL } from '@/constants/api';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function SetupAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    setUsername('');
    setPassword('');
    if (token) {
      axios.get(`${API_URL}/verifySetupToken?token=${token}`)
      .catch(error => {
        console.error('Error verifying token:', error);
      });
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (token) {
        await axios.post(`${API_URL}/setupAccount`, { token, username, password });
        router.push('/setup-account');
        return;
      }
      await axios.post(`${API_URL}/signIn`, { username, password });
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
