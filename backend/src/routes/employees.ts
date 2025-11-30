import express from "express";
import { prisma } from "../prismaClient";
export const employeesRouter = express.Router();

employeesRouter.get("/", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  const {
    search,
    email,
    department,
    position,
    minSalary,
    maxSalary,
    skill,
    hireAfter,
    hireBefore,
    sortBy = "lastName",
    sortDir = "asc"
  } = req.query;

  const where: any = {};

  if (search) {
    where.OR = [
      { firstName: { contains: search as string, mode: "insensitive" } },
      { lastName: { contains: search as string, mode: "insensitive" } }
    ];
  }

  if (email) where.email = { contains: email as string, mode: "insensitive" };
  if (department) where.department = { name: { contains: department as string, mode: "insensitive" } };
  if (position) where.position = { contains: position as string, mode: "insensitive" };
  if (minSalary) where.salary = { gte: Number(minSalary) };
  if (maxSalary) where.salary = { ...(where.salary || {}), lte: Number(maxSalary) };
  if (skill) where.skills = { has: skill };
  if (hireAfter) where.hireDate = { gte: new Date(hireAfter as string) };
  if (hireBefore) where.hireDate = { ...(where.hireDate || {}), lte: new Date(hireBefore as string) };

  const employees = await prisma.employee.findMany({
    skip,
    take: limit,
    where,
    orderBy: { [sortBy as string]: sortDir },
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
      reviews: { orderBy: { date: "desc" }, take: 30 }
    }
  });

  res.json(employee);
});
