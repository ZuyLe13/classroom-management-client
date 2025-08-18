"use client";
import AuthGuard from '@/components/authGuard'
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import React from 'react'

export default function Messages() {
  return (
    <AuthGuard>
      <Header />
      <Sidebar />
      <div className='ml-[240px] mt-[74px] p-8'>Messages</div>
    </AuthGuard>
  )
}
