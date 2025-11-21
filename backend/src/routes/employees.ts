import express from "express";
import { prisma } from "../prismaClient";

export const employeesRouter = express.Router();

employeesRouter.get("/", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 50;
  const skip = (page - 1) * limit;

  const employees = await prisma.employee.findMany({
    skip,
    take: limit,
    include: { department: true }
  });

  res.json(employees);
});

employeesRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const employee = await prisma.employee.findUnique({
    where: { id },
    include: {
      department: true,
      compensation: { orderBy: { date: "desc" }, take: 12 },
      reviews: { orderBy: { date: "desc" }, take: 10 }
    }
  });

  res.json(employee);
});
