"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { post } from "@/lib/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await post("/auth/register", { email, password, name });
      // optionally auto-login, but for now go to login
      router.push("/login");
    } catch (e: any) {
      alert(e?.error || "Register failed");
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto mt-16 space-y-3">
      <input
        className="border p-2 w-full"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-black text-white px-3 py-2 w-full">
        Create account
      </button>
    </form>
  );
}
