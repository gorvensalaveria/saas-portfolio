import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import { PrismaClient } from "@prisma/client";
import projectRoutes from "./routes/projects";
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API http://localhost:${PORT}`));

app.use("/api/projects", projectRoutes);
