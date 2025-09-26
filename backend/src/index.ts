import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());

// Create a new user
app.post("/users", async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({
      data: { email, name },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "User could not be created" });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Single user by id
app.get("/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
});

// Update user
app.put("/users/:id", async (req, res) => {
  const { name } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { name },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Update failed" });
  }
});

// Delete user
app.delete("/users/:id", async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: "Delete failed" });
  }
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});

app.get("/api/health", (req, res) => {});
