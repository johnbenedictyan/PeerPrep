import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const prisma = new PrismaClient();

app.get("/", (req: Request, res: Response) => {
  // Get All Users
  const users = prisma.user.findMany().then((users) => {
    res.json({ message: "User Service Server", users: users });
  });
});

app.get("/seed", async (req: Request, res: Response) => {
  // Add Seed Data
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      password: "Password123",
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      password: "Password123",
    },
  });
  res.json("Done Seeding")
});

app.post("/", (req: Request, res: Response) => {
  // Create a single User
  res.send("Create single User");
});

app.put("/", (req: Request, res: Response) => {
  // Update a single User
  res.send("Update single User");
});

app.delete("/", (req: Request, res: Response) => {
  // Delete a single User
  res.send("Delete single User");
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: User Service is running at http://localhost:${port}`
  );
});
