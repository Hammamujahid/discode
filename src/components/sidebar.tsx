'use client'

import { auth } from '@/utils/firebase/config';
import React from 'react'
import { useRouter } from 'next/navigation';
import { FaBell, FaHome, FaSignOutAlt, FaUserAlt } from 'react-icons/fa'

const Sidebar = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            alert("Berhasil Logout");
            router.push("/login");
        } catch (error) {
            console.error('Error logout:', error);
        }
    };
  return (
    <div className="w-25 bg-slate-800 px-8 flex flex-col justify-center space-y-20 border-r-2 border-black h-screen">
    <button
      onClick={() => router.push("/home")}
      className="bg-slate-900 p-2 rounded-lg flex justify-center"
    >
      <FaHome className="size-9" />
    </button>
    <button
      onClick={() => router.push("/home/notification")}
      className="bg-slate-900 p-2 rounded-lg flex justify-center"
    >
      <FaBell className="size-9" />
    </button>
    <button
      onClick={() => router.push("/home/profile")}
      className="bg-slate-900 p-2 rounded-lg flex justify-center"
    >
      <FaUserAlt className="size-9" />
    </button>
    <button onClick={handleLogout} className="bg-red-500 p-2 rounded-lg flex justify-center">
      <FaSignOutAlt className="size-9" />
    </button>
  </div>
  )
}

export default Sidebar