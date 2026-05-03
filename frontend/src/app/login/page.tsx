"use client";

import { login } from "@/src/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(email, password);

      localStorage.setItem("token", res.access_token);

      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[40%] xl:w-[30%] flex flex-col gap-4">
        <h1 className=" text-3xl font-bold">Login</h1>

        <input
          className="border p-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="w-full flex flex-col justify-between gap-y-4">
          <button className="bg-black text-white p-2 cursor-pointer" onClick={handleLogin}>
            Login
          </button>
          <Link href="/register" className="bg-black text-white p-2 text-center">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
