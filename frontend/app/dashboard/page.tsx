"use client";
import { useEffect, useState } from "react";
import { get, post, del } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    get("/auth/me").catch(() => router.push("/login"));
  }, [router]);
  useEffect(() => {
    get("/api/projects").then(setProjects);
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await post("/api/projects", { title, description });
          setTitle("");
          setDescription("");
          setProjects(await get("/api/projects"));
        }}
      >
        <input
          className="border p-2 w-full mb-2"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-black text-white px-3 py-2">Add Project</button>
      </form>
      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p.id} className="border p-3 flex justify-between">
            <div>
              <b>{p.title}</b>
              <div className="text-sm opacity-70">{p.description}</div>
            </div>
            <button
              className="text-red-600"
              onClick={async () => {
                await del(`/api/projects/${p.id}`);
                setProjects(await get("/api/projects"));
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
