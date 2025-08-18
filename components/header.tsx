'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/sign-in');
  }

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-end px-8 py-4 border-b border-[#dfdede] bg-white z-10">
      <button
        className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-700"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        U
      </button>

      {showDropdown && (
        <div className="absolute right-[30px] top-[60px] w-40 bg-white border border-[#dfdede] rounded-lg shadow-md z-50 overflow-hidden">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              alert("Edit Profile clicked");
              setShowDropdown(false);
            }}
          >
            Edit Profile
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
            onClick={() => {
              handleSignOut();
              setShowDropdown(false);
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
