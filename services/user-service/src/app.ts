import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const prisma = new PrismaClient();

app.get("/", async (req: Request, res: Response) => {
  // Get All Users
  const users = await prisma.user.findMany();
  res.json({ message: "User Service Server", users: users });
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
  res.json("Done Seeding");
});

app.post("/", (req: Request, res: Response) => {
  // Check if request body is valid
  if (!req.body.email || !req.body.name || !req.body.password) {
    res.status(400).json({ message: "Invalid Request Body" });
  } else {
    // Create a single User
    const user = prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      },
    });
    res.json(user);
  }
});

app.put("/:id", (req: Request, res: Response) => {
  // Check if user exists
  const user = prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    // Update a single User
    const updatedUser = prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      },
    });
    res.json(updatedUser);
  }
});

app.delete("/", (req: Request, res: Response) => {
  // Check if user exists
  const user = prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    // Delete a single User
    const deletedUser = prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(deletedUser);
  }
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: User Service is running at http://localhost:${port}`
  );
});
