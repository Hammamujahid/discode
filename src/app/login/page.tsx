"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSpinning(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful, redirecting to home...");
      setTimeout(() => {
        router.push("/home");
        setIsSpinning(false); // Hentikan spinner setelah redirect
      }, 4000);
    } catch (error) {
      console.error("Error logging in:", error);
      setIsSpinning(false); // Hentikan spinner jika terjadi kesalahan
    }
  };

  return (
    <div className="bg-slate-500 w-screen h-screen flex justify-center items-center">
      <div className={`bg-white/10 backdrop-blur-sm shadow-lg border border-white/20 w-1/3 rounded-lg ${isSpinning ? 'animate-spin' : ''}`}>
        <div className="flex items-center justify-center border-b border-white/20">
          <Image
            src="/images/logo-name.png"
            alt="Logo"
            width={150}
            height={150}
          />
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col space-y-4 mt-4 px-6"
        >
          <input
            className="rounded-sm text-black p-1"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="rounded-sm text-black p-1"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 mx-12 rounded-lg py-1 hover:bg-blue-400"
          >
            Login
          </button>
        </form>
        <p className="mt-4 pb-6 px-6">
          Belum punya akun?{" "}
          <Link href="/register">
            <u className="text-white hover:text-blue-500">Daftar di sini</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
