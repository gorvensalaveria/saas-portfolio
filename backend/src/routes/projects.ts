import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth, AuthedRequest } from "../middleware/requireAuth";
const prisma = new PrismaClient();
const router = Router();

router.use(requireAuth);

router.get("/", async (_req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(projects);
});

router.post("/", async (req: AuthedRequest, res) => {
  const { title, description } = req.body;
  const project = await prisma.project.create({
    data: { title, description, ownerId: req.userId },
  });
  res.status(201).json(project);
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, description } = req.body;
  const project = await prisma.project.update({
    where: { id },
    data: { title, description },
  });
  res.json(project);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.project.delete({ where: { id } });
  res.status(204).send();
});

export default router;
