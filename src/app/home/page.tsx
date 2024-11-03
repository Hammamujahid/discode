'use client'

import { useRouter } from 'next/navigation';
import { auth } from '@/utils/firebase/config';
import Content from './content/page';
import { FaPlus } from "react-icons/fa";
import { useState } from 'react';
import UploadContent from './content/upload';


const HomePage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
    };
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
    <div className='w-screen h-screen bg-white'>
        <Content></Content>
        <button onClick={handleLogout}>
        Logout
      </button>
      <div>
      <button onClick={togglePopup} className="p-2 rounded-full flex justify-center items-center bg-blue-600">
      <FaPlus className="text-white text-4xl" />
    </button>
      </div>
      <UploadContent  isOpen={isPopupOpen} onClose={togglePopup}/>
    </div>
  )
}

export default HomePage