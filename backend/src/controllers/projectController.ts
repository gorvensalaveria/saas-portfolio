import { Request, Response } from "express";

// In-memory "database"

let projects: { id: number; title: string; description: string }[] = [];
let idCounter = 1;

// Get all projects
export const getProjects = (req: Request, res: Response) => {
  res.json(projects);
};

// Get single project
export const getProject = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const project = projects.find((p) => p.id === id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
};

// CREATE project
export const createProject = (req: Request, res: Response) => {
  const { title, description } = req.body;
  const newProject = { id: idCounter++, title, description };
  projects.push(newProject);
  res.status(201).json(newProject);
};

// UPDATE project
export const updateProject = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description } = req.body;
  const project = projects.find((p) => p.id === id);

  if (!project) return res.status(404).json({ message: "Project not found" });

  project.title = title ?? project.title;
  project.description = description ?? project.description;

  res.json(project);
};

// DELETE project
export const deleteProject = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  projects = projects.filter((p) => p.id !== id);
  res.status(204).send();
};
