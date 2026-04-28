"use client";

import { register } from "@/src/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await register(email, password);
      alert("Register success");

      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Register failed");
    }
  };

  return (
    <div className="p-10 flex flex-col gap-4 max-w-sm">
      <h1 className="text-2xl font-bold">Register</h1>

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

      <button className="bg-black text-white p-2" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}
