'use client'

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebase/config';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful, redirecting to home...");
      router.push('/home');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
            <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
                  <p>
            Belum punya akun? <Link href="/register"><u className="text-white hover:text-blue-500">Daftar di sini</u></Link>
          </p>
    </div>

  );
};

export default Login;
