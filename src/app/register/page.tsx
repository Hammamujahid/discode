'use client'

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/utils/firebase/config';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'user', user.uid), {
        username,
        email,
        dob,
      });
      router.push('/login');
    } catch (error) {
      const errorMessage = (error as Error).message;
      alert('Error registering user: ' + errorMessage);
      console.error('Error registering user:', errorMessage);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      <p>
        Sudah punya akun?{" "}
        <Link href="/login">
          <u className="text-white hover:text-blue-500">Login di sini</u>
        </Link>
      </p>
    </div>
  );
};

export default Register;
