'use client'

import { getUserProfile } from '@/utils/profile/getUserProfile';
import { UserProfile } from '@/utils/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await getUserProfile();
      if (data) {
        setUserInfo(data);
      }
    };

    getUserInfo();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className='text-black'>
      <h1>Profile Information</h1>
      <p>Username: {userInfo.username || 'No username provided'}</p>
      <p>Bio: {userInfo.bio || 'No bio provided'}</p>
      <Image
        src={userInfo.photo_profile || '/images/default_photoprofile.jpg'}
        alt="Profile"
        width={150}
        height={150}
        className='rounded-full'
      />
      <button onClick={() => router.push("/home/profile/edit")}>
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
