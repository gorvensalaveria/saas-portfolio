"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { post } from "@/lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await post("/auth/login", { email, password });
          router.push("/dashboard");
        } catch (e: any) {
          alert(e?.error || "Login failed");
        }
      }}
      className="max-w-sm mx-auto mt-16 space-y-3"
    >
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
      <button className="bg-black text-white px-3 py-2 w-full">Login</button>
    </form>
  );
}
